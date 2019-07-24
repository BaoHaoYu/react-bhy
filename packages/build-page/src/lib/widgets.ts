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
const buildPageWidgets: NPage.Base = (config) => {
  const _hash = '_BASE_PAGE_'
  const keyPath: string[] = isArray(config.reducerKey)
    ? config.reducerKey
    : [config.reducerKey]
  const defaultData = config.defaultData
  const types = createTypes(_hash, config)
  const reducerMap = createReducerMap(types, defaultData)

  const actions: NPage.IPageActions = createPageActions(types, keyPath)

  const createServerActions = (
    rootConfig: NPage.ICreateServerActions,
  ): NPage.IServerActions => {
    const pageAxiosOpt = defaultTo(config.axiosOpt, {})

    let axiosOpt = { ...pageAxiosOpt, ...rootConfig.axiosOpt }
    const key = rootConfig.key
    const meta = rootConfig.desc
    const serverActions: NPage.IServerActions = {
      getServerDataFromStore: (isMap = false) => {
        return serverActions.getServerData(isMap)
      },
      getServerData: (isMap) => (dispatch: any) => {
        return dispatch(actions.getRootState(!isMap)).getIn([
          'server',
          key,
          'responseData',
        ])
      },
      getKeyServer: (isMap: boolean) => (dispatch: any) => {
        const $$root = dispatch(actions.getRootState())
        return (isMap ? $$root : from($$root)).getIn(['server', key])
      },
      setRequesting: (ap) => {
        return {
          type: types.SET_AJAXING,
          payload: {
            key,
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
            key,
            responseData: ap.responseData,
          },
          meta: buildMeta(meta, '把数据保存到store'),
        }
      },
      getServerFromStore: () => {
        return serverActions.getKeyServer()
      },
      isRequesting: () => (dispatch: any) => {
        return dispatch(actions.getRootState()).getIn([
          'server',
          key,
          'requesting',
        ])
      },
      isError: () => (dispatch: any) => {
        return dispatch(actions.getRootState()).getIn(['server', key, 'error'])
      },
      startRequest: (ap) => async (dispatch: any) => {
        axiosOpt = { ...axiosOpt, ...ap.axiosOpt }
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        // 如果是初始化数据，一开始requesting一开始就是请求中，所以第一次请求不是重复请求
        const requesting = dispatch(serverActions.isRequesting())
        const num = dispatch(serverActions.getKeyServer(false)).get('number')
        if (rootConfig.isInitData) {
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

        if (!rootConfig.isInitData && requesting) {
          throw {
            msg: '重复请求！',
            params: ap,
            requesting,
            number: num,
          }
        }

        const serverData = dispatch(serverActions.getServerData(true))

        // 如果不是生产环境，并且有数据就，不请求最新服务器了，加快ui开发
        if (
          process.env.NODE_ENV !== 'production' &&
          serverData != null &&
          !ap.force
        ) {
          return { data: serverData.toJS() }
        } else {
          // 延时
          if (ap.delay !== undefined) {
            await sleep(ap.delay)
          }
          const oneAxios = dispatch(
            actions.axios({
              ...axiosOpt,
              cancelToken: source.token,
            }),
          ).catch(
            (thrown: {
              config: AxiosRequestConfig
              response: AxiosResponse
              data: any
            }) => {
              dispatch(
                serverActions.setRequesting({
                  value: false,
                  meta,
                }),
              )
              dispatch(serverActions.setErrorToStore(key, thrown.response.data))
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
            serverActions.setRequesting({
              meta,
              value: true,
              axios: oneAxios,
              axiosSource: source,
            }),
          )
          // 发起请求，获得数据
          const response = await oneAxios
          // 关闭请求中
          dispatch(
            serverActions.setRequesting({
              meta,
              value: false,
            }),
          )
          return response
        }
      },
      getServerDataToStore: (ap = { axiosOpt: {} }) => async (
        dispatch: any,
      ) => {
        axiosOpt = { ...axiosOpt, ...ap.axiosOpt }
        const response: AxiosResponse = await dispatch(
          serverActions.startRequest({
            axiosOpt,
            force: defaultTo(ap.force, rootConfig.force),
          }),
        )

        rootConfig.done && rootConfig.done(response, serverActions, dispatch)

        dispatch(
          serverActions.setDataToStroe({ responseData: fromJS(response.data) }),
        )

        return response
      },
      cancelRequest: (msg = rootConfig.desc) => (dispatch: any) => {
        const axiosSource = (dispatch(
          serverActions.getServerFromStore(),
        ) as NPage.MapServerData).get('axiosSource')

        if (axiosSource) {
          axiosSource.cancel(msg)
        }
      },
      updateAgainRequestNumber: () => {
        return {
          type: types.UPDATE_AGAIN_REQUEST_NUMBER,
          payload: { key: rootConfig.key },
          meta: '重复请求数+1',
        }
      },
      resetAgainRequestNumber: () => {
        return {}
      },
      setErrorToStore: (responseData) => {
        return {
          type: types.SET_ERROR,
          payload: {
            key,
            responseData,
          },
          mete: buildMeta(meta, '设置错误'),
        }
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

function createTypes(
  _hash: string,
  config: {
    reducerKey: string | string[]
    defaultData: any
    pageName: string // 取消请求
    // 取消请求
    hash: string
    axiosOpt?: AxiosRequestConfig | undefined // 终端请求之后的代码
  },
) {
  return {
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
}

function createPageActions(
  types: {
    SET_DATA: string
    SET_AJAXING: string
    LEVEL_PAGE: string
    UPDATE_AGAIN_REQUEST_NUMBER: string
    CLEARN_AGAIN_REQUEST_NUMBER: string
    SET_ERROR: string
    SIMPLE: string
    SIMPLE_CB: string
  },
  keyPath: string[],
): NPage.IPageActions {
  const actions: NPage.IPageActions = {
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
    getRootState: (isCursor) => (dispatch: any, getState: any) => {
      const state = getState()
      // 如果根部状态树是使用redux-immutable生成的immutable类型
      if (Iterable.isIterable(state)) {
        return isCursor ? from(state.getIn(keyPath)) : state.getIn(keyPath)
      } else {
        return isCursor ? from(state[keyPath[0]]) : state[keyPath[0]]
      }
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
  }

  return actions
}

function createReducerMap(
  types: {
    SET_DATA: string
    SET_AJAXING: string
    LEVEL_PAGE: string
    UPDATE_AGAIN_REQUEST_NUMBER: string
    CLEARN_AGAIN_REQUEST_NUMBER: string
    SET_ERROR: string
    SIMPLE: string
    SIMPLE_CB: string
  },
  defaultData: any,
) {
  return {
    [types.SET_AJAXING]: (state: any, action: Action<NPage.ISetRequesting>) => {
      const payload = action.payload
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
      const payload = action.payload
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
      const payload = action.payload
      return state.updateIn(['server', payload.key], ($$v: any) =>
        $$v.update('againRequestNumber', (value: number) => value + 1),
      )
    },
    [types.SET_ERROR]: (state: any, action: Action<NPage.ISetErrorToStore>) => {
      const payload = action.payload
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
      const payload = action.payload
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

export default buildPageWidgets
