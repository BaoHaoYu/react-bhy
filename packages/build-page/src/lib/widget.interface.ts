import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
  CancelTokenSource,
} from 'axios'
import { Map } from 'immutable'
import { Dispatch } from 'redux'
import { ActionMeta, ReducerMapMeta } from 'redux-actions'

export interface ITypes {
  SET_DATA: string
  SET_AJAXING: string
  LEVEL_PAGE: string
  SET_ERROR: string
  SIMPLE: string
  SIMPLE_CB: string
}

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
   * 离开页面
   */
  leavePage: (meta: string) => (dispatch: Dispatch) => any
  /**
   * 获得在redux存储的数据
   * @param isCursor 是否带有keyPath的数据
   */
  getRootState: (isCursor?: boolean) => any
  /**
   * 推销:简单改变数据，因为很多情况下都是简单改变
   */
  simple: (state: any, meta: string) => ActionMeta<any, string>
  /**
   * 推销:简单改变数据，通过cd回调，因为很多情况下都是简单改变
   */
  simpleCb: <T>(cb: (state: T) => T, meta: string) => ActionMeta<any, string>
}

/**
 * IOtherReturn.createServerActions的参数
 */
export interface ICreateServerActions extends Omit<IStartXHR, 'meta'> {
  /**
   * 数据描述
   */
  desc: string

  done?(
    response: AxiosResponse,
    serverActions: IServerActions,
    dispatch: any,
  ): void
}

/**
 * IOtherReturn.createServerActions的返回结果
 */
export interface IServerActions {
  /**
   * 获得整个server的数据
   */
  getKeyServer: (
    isMap?: boolean,
  ) => (dispatch: Dispatch) => Map<keyof IServerData, any>
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
  getServerDataFromStore: (isMap?: boolean) => any
  /**
   *
   */
  getServerData: (isMap: boolean) => any
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
  ) => (dispatch: Dispatch) => Promise<AxiosResponse | { data: any }>
  /**
   * 执行请求，然后数据放入本地的redux的store
   */
  getServerDataToStore: (
    ap?: Omit<IStartXHR, 'key' | 'meta'>,
  ) => (dispatch: Dispatch) => Promise<AxiosResponse>
  /**
   * 取消请求
   */
  cancelRequest: (msg: string) => void
  /**
   * 设置错误内容
   */
  setErrorToStore: (responseData: IData, meta?: string) => any
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
  axios?: Promise<AxiosResponse<any>>
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
}) => {
  actions: IPageActions
  reducerMap: ReducerMapMeta<any, any, any>
  /**
   * 使用createServerActions，可以少传两个参数，key和meta
   */
  createServerActions: (p: ICreateServerActions) => IServerActions
}
