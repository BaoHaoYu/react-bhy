import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
  CancelTokenSource,
} from 'axios'
import { Map } from 'immutable'
import { Dispatch } from 'redux'
import { ActionMeta, ReducerMapMeta } from 'redux-actions'

/**
 * 服务器返回数据
 */
type IData = any

/**
 * 页面统一的数据格式
 */
export interface IDefaltData {
  /**
   * 来自服务器的数据
   */
  server: Record<string, IServerData>
  /**
   * 临时操作产生的数据
   */
  temp: any
}

/**
 * 存储在本地的数据
 */
export interface IServerData {
  /**
   * 是否在请求中
   */
  requesting: boolean
  /**
   * 请求返回结果
   */
  responseData?: IData
  /**
   * 记录请求的次数，只要开始请求，即使发生错误，number也会+1
   */
  number: number
  /**
   * 重新请求的次数
   */
  againRequestNumber: number
  /**
   * 唯一标识符，每次请求完毕，并且数据没有发生错误，都会发生改变
   */
  hash?: string
  /**
   * 请求是否发生异常
   */
  error?: boolean
  /**
   * axios对象
   */
  axios?: AxiosStatic
  /**
   * 方便中断请求
   */
  axiosSource?: CancelTokenSource
}

/**
 * 存储在本地的数据，immutable类型
 */
export type MapServerData = Map<keyof IServerData, any>

/**
 * redux的actions
 */
export interface IPageActions {
  /**
   * 获得redux的状态,带有keyPath
   */
  getServerData: (ap: { key: string; isMap?: boolean }) => any
  /**
   * 获得整个server的数据
   */
  getKeyServer: (ap: {
    key: string
    isMap?: boolean
  }) => (dispatch: Dispatch) => Map<keyof IServerData, any>
  /**
   * 离开页面
   */
  leavePage: (ap: { meta: string }) => (dispatch: Dispatch) => any
  /**
   * 设置请求中
   */
  setRequesting: (
    ap: ISetRequesting,
  ) => ActionMeta<Omit<ISetRequesting, 'meta'>, string>
  /**
   * 设置来自服务器的数据，会更新hash
   */
  setDataToStroe: (
    ap: ISetData & { meta: string },
  ) => ActionMeta<ISetData, string>
  /**
   * 获得服务器的数据
   */
  startRequest: (
    ap: IStartXHR,
  ) => (dispatch: Dispatch) => Promise<AxiosResponse>
  /**
   * 获得在redux存储的数据
   * @param ap.isCursor 是否带有keyPath的数据
   */
  getRootState: (ap?: { isCursor?: boolean }) => any
  /**
   * 是否在请求中
   */
  isRequesting: (ap: { key: string }) => (dispatch: Dispatch) => boolean
  /**
   * 是否错误
   */
  isError: (ap: { key: string }) => (dispatch: Dispatch) => boolean
  /**
   * 请求方法
   */
  axios: (axiosOpt: AxiosRequestConfig) => any
  /**
   * 推销:简单改变数据，因为很多情况下都是简单改变
   */
  simple: (p: { state: any; meta: string }) => ActionMeta<any, string>
  /**
   * 推销:简单改变数据，通过cd回调，因为很多情况下都是简单改变
   */
  simpleCb: <T>(p: {
    cb: (state: T) => T
    meta: string
  }) => ActionMeta<any, string>
  /**
   * 设置错误内容
   */
  setErrorToStore: (p: ISetErrorToStore) => any
}

/**
 * 其他返回结果
 */
export interface IOtherReturn {
  /**
   * 使用createServerActions，可以少传两个参数，key和meta
   */
  createServerActions: (p: ICreateServerActions) => IServerActions
}

/**
 * IOtherReturn.createServerActions的参数
 */
export interface ICreateServerActions extends Omit<IStartXHR, 'meta'> {
  /**
   * 数据描述
   */
  desc: string
  /**
   * 重新请求的次数（默认：1）
   */
  errorAgainNum?: number
  /**
   * TODO：是否制作一个新的AxiosOpts配置（默认：false）
   */
  buildNewAxiosOpts?: boolean

  /**
   * 是否错误（会被 Base['isError'] 覆盖）
   */
  isError?(p: { response: AxiosResponse }): boolean

  /**
   * 错误重新请求（会被 Base['errorAgainRequest'] 覆盖）
   * @return 新的axios请求参数，或者null，null表示不重复请求
   */
  errorAgainRequest?(p: {
    response: AxiosResponse
    axiosOpt: AxiosRequestConfig
  }): AxiosRequestConfig | null
}

/**
 * IOtherReturn.createServerActions的返回结果
 */
export interface IServerActions {
  /**
   * 是否在请求中
   */
  isRequesting: () => (dispatch: Dispatch) => boolean
  /**
   * 是否错误
   */
  isError: () => (dispatch: Dispatch) => boolean
  /**
   * 设置请求中
   */
  setRequesting: (
    ap: Omit<ISetRequesting, 'key'>,
  ) => ActionMeta<Omit<ISetRequesting, 'meta'>, string>
  /**
   * 设置来自服务器的数据，会更新hash
   */
  setDataToStroe: (ap: Omit<ISetData, 'key'>) => ActionMeta<ISetData, string>
  /**
   * 获得redux的状态,带有keyPath
   */
  getServerDataFromStore: (ap?: { isMap?: boolean }) => any
  /**
   * 获得整个server的数据
   */
  getServerFromStore: (ap?: {
    isMap?: boolean
  }) => (dispatch: Dispatch) => Map<keyof IServerData, any>
  /**
   * 获得服务器的数据
   */
  startRequest: (
    ap: Omit<IStartXHR, 'key' | 'meta'>,
  ) => (dispatch: Dispatch) => Promise<AxiosResponse>
  /**
   * 执行请求，然后数据放入本地的redux的store
   */
  getServerDataToStore: (
    ap?: Omit<IStartXHR, 'key' | 'meta'>,
  ) => (dispatch: Dispatch) => Promise<AxiosResponse>
  /**
   * 取消请求
   */
  cancelRequest: (ap: { msg: string }) => void
  /**
   * 取消请求
   */
  updateAgainRequestNumber: () => any
  /**
   * 重置请求次数
   */
  resetAgainRequestNumber: () => any
  /**
   * 设置错误内容
   */
  setErrorToStore: (p: Omit<ISetErrorToStore, 'key'>) => any
}

/**
 * IPageActions.getDataFromServer的参数
 */
export interface IStartXHR {
  /**
   * 数据键名
   */
  key: string
  /**
   * 是否初始化数据，如果是，说明数据requesting初始化就是true
   */
  isInitData?: boolean
  /**
   * 延迟
   */
  delay?: number
  /**
   * 是否强制请求服务，比如手动点击重复重新加载请求的，建议设置force为true
   */
  force?: boolean
  /**
   * axios请求的配置
   */
  axiosOpt: AxiosRequestConfig
  /**
   * 说明
   */
  meta: string

  /**
   * 取消请求的回调
   */
  onCancle?(): void
}

/**
 * IPageActions.setRequesting的参数
 */
export interface ISetRequesting {
  /**
   * 数据的键名
   */
  key: string
  /**
   * true：加载中，false：加载完毕
   */
  value: boolean
  /**
   * 描述
   */
  meta: string
  /**
   * 用于取消请用
   */
  axiosSource?: CancelTokenSource
  /**
   * axios对象
   */
  axios?: AxiosStatic
}

/**
 * IPageActions.setData的参数
 */
export interface ISetData {
  /**
   * 数据的键名
   */
  key: string
  /**
   * 要设置的数据
   */
  responseData: IData
}

/**
 * IPageActions.ISetErrorToStore的参数
 */
export interface ISetErrorToStore {
  /**
   * 数据的键名
   */
  key: string
  /**
   * 响应的数据
   */
  responseData: IData
  /**
   * 触发说明
   */
  meta?: string
}

/**
 * 制作redux的widgets
 */
export type Base = (p: {
  // todo
  server?: Record<string, ICreateServerActions>
  /**
   * reducer的键
   */
  reducerKey: string[] | string
  /**
   * 默认数据
   */
  defaultData: any
  /**
   * 页面名称
   */
  pageName: string
  /**
   * 唯一标识符
   */
  hash: string
  /**
   * 请求是否错误（会被ICreateServerActions['axiosOpt']覆盖）
   */
  axiosOpt?: AxiosRequestConfig
  /**
   * 请求是否错误（会被ICreateServerActions['isError']覆盖）
   */
  isError?(p: { response: AxiosResponse }): boolean

  /**
   * 错误重新请求（会被ICreateServerActions['errorAgainRequest']覆盖）
   * @return 新的axios请求参数，或者null，null表示不重复请求
   */
  errorAgainRequest?(p: {
    response: AxiosResponse
    axiosOpt: AxiosRequestConfig
  }): AxiosRequestConfig | null
}) => {
  actions: IPageActions
  reducerMap: ReducerMapMeta<any, any, any>
} & IOtherReturn
