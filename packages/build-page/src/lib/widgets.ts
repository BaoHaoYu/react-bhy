import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { fromJS, Iterable, Map } from 'immutable'
import { from } from 'immutable/contrib/cursor'
import { defaultTo, isArray } from 'lodash-es'

import { Action } from 'redux-actions'
import * as uuid from 'uuid'
import { buildMeta, buildWidgetType } from './help'
import * as NPage from './widget.interface'

/**
 * 页面的widgets
 * @param config
 */
const page = (config:any) => {
  const _hash = '_BASE_PAGE_'
  const keyPath: string[] = isArray(config.reducerKey)
    ? config.reducerKey
    : [config.reducerKey]
  const defaultData = config.defaultData
  const types = {
    SET_DATA: buildWidgetType('SET_DATA', _hash, config.hash),
    SET_AJAXING: buildWidgetType('SET_AJAXING', _hash, config.hash),
    LEVEL_PAGE: buildWidgetType('LEVEL_PAGE', _hash, config.hash),
    UPDATE_AGAIN_REQUEST_NUMBER: buildWidgetType(
      'UPDATE_AGAIN_REQUEST_NUMBER',
      _hash,
      config.hash,
    ),
    CLEARN_AGAIN_REQUEST_NUMBER: buildWidgetType(
      'CLEARN_AGAIN_REQUEST_NUMBER',
      _hash,
      config.hash,
    ),
    SET_ERROR: buildWidgetType('SET_ERROR', _hash, config.hash),
    SIMPLE: buildWidgetType('SIMPLE', _hash, config.hash),
    SIMPLE_CB: buildWidgetType('SIMPLE_CB', _hash, config.hash),
  }
  const reducerMap = {
    [types.SET_AJAXING]: (state: any, action: Action<NPage.ISetRequesting>) => {
      const payload = action.payload!
      return state.updateIn(
        ['server', payload.key],
        ($$item: NPage.MapServerData) => {
          return $$item
            .set('requesting', payload.value)
            .set('axios', payload.axios)
            .set('axiosSource', payload.axiosSource)
            .update('number', (v: number) => (!payload.value ? v + 1 : v))
        },
      )
    },
    [types.SET_DATA]: (state: any, action: Action<NPage.ISetData>) => {
      const payload = action.payload!
      return state.updateIn(['server', payload.key], ($$v: any) =>
        $$v
          .set('responseData', payload.responseData)
          .set('hash', uuid.v4())
          .set('error', false)
          .set('againRequestNumber', 0),
      )
    },
    [types.UPDATE_AGAIN_REQUEST_NUMBER]: (
      state: any,
      action: Action<NPage.ISetData>,
    ) => {
      const payload = action.payload!
      return state.updateIn(['server', payload.key], ($$v: any) =>
        $$v.update('againRequestNumber', (value: number) => value + 1),
      )
    },
    [types.SET_ERROR]: (state: any, action: Action<NPage.ISetErrorToStore>) => {
      const payload = action.payload!
      return state.updateIn(['server', payload.key], ($$v: any) =>
        $$v
          .set('hash', uuid.v4())
          .set('error', true)
          .set('responseData', payload.responseData),
      )
    },
    [types.CLEARN_AGAIN_REQUEST_NUMBER]: (
      state: any,
      action: Action<NPage.ISetData>,
    ) => {
      const payload = action.payload!
      return state.updateIn(['server', payload.key], ($$v: any) =>
        $$v.set('againRequestNumber', 0),
      )
    },
    [types.LEVEL_PAGE]: (state: any) => {
      return process.env.NODE_ENV !== 'production' ? state : defaultData
    },
    [types.SIMPLE]: (state: any, { payload }: any) => {
      return payload
    },
    [types.SIMPLE_CB]: (state: any, { payload }: any) => {
      return payload(state)
    },
  }

  const actions: NPage.IPageActions = {
    getServerData: (key, isMap) => (dispatch: any) => {
      return dispatch(actions.getRootState(!isMap)).getIn([
        'server',
        key,
        'responseData',
      ])
    },
    getKeyServer: (key, isMap) => (dispatch: any) => {
      const $$root = dispatch(actions.getRootState())
      return (isMap ? $$root : from($$root)).getIn(['server', key])
    },
    leavePage: (meta) => (dispatch: any) => {
      const $$servers = dispatch(actions.getRootState()).getIn(['server'])
      // 取消所有的请求
      $$servers &&
        $$servers.map(($$item: Map<keyof NPage.IServerData, any>) => {
          if ($$item.get('axiosSource')) {
            return $$item.get('axiosSource').cancel((r: any) => r())
          }
        })

      dispatch({
        type: types.LEVEL_PAGE,
        meta: buildMeta(meta, '离开页面'),
      })
    },
    setRequesting: (ap) => {
      return {
        type: types.SET_AJAXING,
        payload: {
          key: ap.key,
          value: ap.value,
          axiosSource: ap.axiosSource,
          axios: ap.axios,
        },
        meta: buildMeta(ap.meta, '设置请求中'),
      }
    },
    setDataToStroe: (ap) => {
      return {
        type: types.SET_DATA,
        payload: {
          key: ap.key,
          responseData: ap.responseData,
        },
        meta: buildMeta(ap.meta, '把数据保存到store'),
      }
    },
    startRequest: (ap) => async (dispatch: any) => {
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()

      // 如果是初始化数据，一开始requesting一开始就是请求中，所以第一次请求不是重复请求
      const requesting = dispatch(actions.isRequesting(ap.key))
      const num = dispatch(actions.getKeyServer(ap.key)).get('number')
      if (ap.isInitData) {
        // 中断请求之后的代码
        if (requesting && num !== 0) {
          throw {
            msg: '重复请求！',
            params: ap,
            requesting,
            number: num,
          }
        }
      }

      if (!ap.isInitData && requesting) {
        throw {
          msg: '重复请求！',
          params: ap,
          requesting,
          number: num,
        }
      }
      const serverData = dispatch(
        actions.getServerData( ap.key, true ),
      )

      // 如果不是生产环境，并且有数据就，不请求最新服务器了，加快ui开发
      if (
        process.env.NODE_ENV !== 'production' &&
        serverData != null &&
        !ap.force
      ) {
        return { data: serverData }
      } else {
        // 延时
        if (ap.delay !== undefined) {
          await sleep(ap.delay)
        }
        const oneAxios = dispatch(
          actions.axios({
            ...ap.axiosOpt,
            cancelToken: source.token,
          }),
        ).catch(
          (thrown: {
            config: AxiosRequestConfig
            response: AxiosResponse
            data: any
          }) => {
            dispatch(
              actions.setRequesting({
                key: ap.key,
                value: false,
                meta: ap.meta,
              }),
            )
            dispatch(
              actions.setErrorToStore({
                key: ap.key,
                responseData: thrown.response.data,
              }),
            )
            // 取消请求
            if (axios.isCancel(thrown)) {
              // 取消回调
              ap.onCancle && ap.onCancle()
              // 终端请求之后的代码
              throw { msg: '取消请求！', params: ap }
            }
            // 其他类似500，404错误处理
            throw {
              msg: `request error ！${thrown.config.method} url：${thrown.config.url}，status：${thrown.response.status}`,
              thrown,
            }
          },
        )
        // 打开请求中
        dispatch(
          actions.setRequesting({
            key: ap.key,
            meta: ap.meta,
            value: true,
            axios: oneAxios,
            axiosSource: source,
          }),
        )
        // 发起请求，获得数据
        const response = await oneAxios
        // 关闭请求中
        dispatch(
          actions.setRequesting({
            key: ap.key,
            meta: ap.meta,
            value: false,
          }),
        )
        return response
      }
    },
    getRootState: (isCursor) => (dispatch: any, getState: any) => {
      const state = getState()
      // 如果根部状态树是使用redux-immutable生成的immutable类型
      if (Iterable.isIterable(state)) {
        return isCursor
          ? from(state.getIn(keyPath))
          : state.getIn(keyPath)
      } else {
        return isCursor ? from(state[keyPath[0]]) : state[keyPath[0]]
      }
    },
    isRequesting: (key) => (dispatch: any) => {
      return dispatch(actions.getRootState()).getIn([
        'server',
        key,
        'requesting',
      ])
    },
    isError: (key) => (dispatch: any) => {
      return dispatch(actions.getRootState()).getIn([
        'server',
        key,
        'error',
      ])
    },
    axios: (axiosOpt: AxiosRequestConfig) => () => {
      return axios(axiosOpt)
    },
    simple: (ap) => {
      return {
        type: types.SIMPLE,
        payload: ap.state,
        meta: buildMeta(ap.meta, '简单改变'),
      }
    },
    simpleCb: (cb, meta) => {
      return {
        type: types.SIMPLE_CB,
        payload: cb,
        meta: buildMeta(meta, '简单改变'),
      }
    },
    setErrorToStore: (p) => {
      return {
        type: types.SET_ERROR,
        payload: p,
        mete: buildMeta(p.meta, '设置错误'),
      }
    },
  }

  /**
   * 封装数据服务
   */
  const createServerActions = (
    rootP: NPage.ICreateServerActions,
  ): NPage.IServerActions => {
    const pageAxiosOpt = defaultTo(config.axiosOpt, {})

    let axiosOpt = { ...pageAxiosOpt, ...rootP.axiosOpt }
    const key = rootP.key
    const serverActions: NPage.IServerActions = {
      getServerDataFromStore: (ap = { isMap: false }) => {
        return actions.getServerData(key, ap.isMap)
      },
      setRequesting: (ap) => {
        return actions.setRequesting({
          key,
          value: ap.value,
          meta: ap.meta,
        })
      },
      setDataToStroe: (ap) => {
        return actions.setDataToStroe({
          meta: `设置数据--${rootP.desc}`,
          key,
          responseData: ap.responseData,
        })
      },
      getServerFromStore: () => {
        return actions.getKeyServer(key)
      },
      isRequesting: () => {
        return actions.isRequesting(key)
      },
      isError: () => {
        return actions.isError(key)
      },
      startRequest: (ap) => {
        axiosOpt = { ...axiosOpt, ...ap.axiosOpt }
        return actions.startRequest({
          key,
          isInitData: rootP.isInitData,
          axiosOpt,
          delay: defaultTo(ap.delay, rootP.delay),
          force: defaultTo(ap.force, rootP.force),
          meta: `请求服务器--${rootP.desc}`,
        })
      },
      getServerDataToStore: (ap = { axiosOpt: {} }) => async (
        dispatch: any,
      ) => {
        axiosOpt = { ...axiosOpt, ...ap.axiosOpt }
        const response: AxiosResponse = await dispatch(
          serverActions.startRequest({
            axiosOpt,
            force: defaultTo(ap.force, rootP.force),
          }),
        )
        let error = false
        const isError = defaultTo(rootP.isError, config.isError)
        // 如果定义的错误判断函数
        if (isError) {
          // 获得请求是否发生错误
          error = isError(response)
          // 如果发生错误，判断是否需要重复这个请求
          if (error) {
            const errorAgainRequest = defaultTo(
              rootP.errorAgainRequest,
              config.errorAgainRequest,
            )
            if (errorAgainRequest) {
              // 新的请求参数
              const opt = errorAgainRequest({ response, axiosOpt })
              // 新的请求参数存在，说明需要重新请求
              if (opt) {
                axiosOpt = opt
                const againRequestNumber = dispatch(
                  serverActions.getServerFromStore(),
                ).get('againRequestNumber')
                // 重复请求次数在允许的范围内
                if (againRequestNumber < defaultTo(rootP.errorAgainNum, 1)) {
                  dispatch(serverActions.updateAgainRequestNumber())
                  dispatch(
                    serverActions.getServerDataToStore({ ...ap, axiosOpt }),
                  )
                } else {
                  // 把错误信息存储起来
                  dispatch(
                    serverActions.setErrorToStore({
                      responseData: fromJS(response.data),
                    }),
                  )
                }
              }
            } else {
              // 把错误信息存储起来
              dispatch(
                serverActions.setErrorToStore({
                  responseData: fromJS(response.data),
                }),
              )
            }
          } else {
            // 数据存储到redux的store
            dispatch(
              serverActions.setDataToStroe({
                responseData: fromJS(response.data),
              }),
            )
          }
        } else {
          // 数据存储到redux的store
          dispatch(
            serverActions.setDataToStroe({
              responseData: fromJS(response.data),
            }),
          )
        }

        return response
      },
      cancelRequest: (ap: { msg: string } = { msg: rootP.desc }) => (
        dispatch: any,
      ) => {
        const axiosSource = (dispatch(
          serverActions.getServerFromStore(),
        ) as NPage.MapServerData).get('axiosSource')

        if (axiosSource) {
          axiosSource.cancel(ap.msg)
        }
      },
      updateAgainRequestNumber: () => {
        return {
          type: types.UPDATE_AGAIN_REQUEST_NUMBER,
          payload: { key: rootP.key },
          meta: '重复请求数+1',
        }
      },
      resetAgainRequestNumber: () => {
        return {}
      },
      setErrorToStore: (p) => {
        return actions.setErrorToStore({
          key: rootP.key,
          responseData: p.responseData,
        })
      },
    }
    return serverActions
  }

  return {
    actions,
    reducerMap,
    createServerActions,
  }
}

/**
 * 生成server[key]的默认数据
 */
export function initServerData(
  p: { requesting: boolean } = { requesting: false },
): NPage.IServerData {
  return {
    responseData: undefined,
    hash: undefined,
    number: 0,
    againRequestNumber: 0,
    requesting: p.requesting,
    error: false,
  }
}

function sleep(time: number = 0) {
  return new Promise((r: any) => {
    setTimeout(() => {
      r()
    }, time)
  })
}

export { NPage }

export default page
