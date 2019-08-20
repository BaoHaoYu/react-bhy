import { IPageActions, IServerActions } from './widget.interface'

/**
 * 负责生成页面组件的类
 * @return React组件类
 */
export interface IPage {
  /**
   * 负责执行离开页面，进入页面的设置
   */
  pageActions: IPageActions

  /**
   * 设置数据，或者加载其他东西
   */
  setData?(props: { dispatch: any }): Promise<any>
}

/**
 * IPage.setData的参数
 */
export type SetData = IPageComponentProps

/**
 * 页面数据信息
 */
export interface IPageServerData {
  /**
   * 是否完成加载
   */
  allDataLoad: boolean
  /**
   * 原始的数据
   */
  serverData: any[]
  /**
   * 是否请求中
   */
  requesting: boolean
  /**
   * 是否有错
   */
  error: boolean
}

/**
 * buildPageComponent的参数
 */
export interface IBuild<Props, State = {}> {
  /**
   * serverActions数组
   */
  serverActions: IServerActions[]
  /**
   * shouldComponentUpdate中优化，如果处于加载中，则不会触发render
   */
  pure?: boolean
  /**
   * 对于serverActions是否是强依赖关系
   * 是的话表示所的serverActions对应的数据更新才会改变dataChangeNumber,
   */
  serverRely?: boolean
  /**
   * 处理方法
   */
  buildHandler?: (props: Props & IPageComponentProps) => Partial<Props>

  /**
   * 计算额外的属性
   */
  mapStateToProps(state: any, p: IMapProps): any
}

/**
 * IBuild.mapProps的参数
 */
export interface IMapProps extends IPageComponentProps {
  /**
   * 获得借口数据最新的状态，如是否加载中，是否有错之类的
   */
  getInfo(): IPageServerData
}

/**
 * 页面组件注入的props
 */
export interface IPageComponentProps extends IPageServerData {
  /**
   * redux整个状态树
   */
  state: any
  /**
   * 派发器
   */
  dispatch: any
  /**
   * 依赖的数据都改变了，dataChangeNumber值会+1
   */
  dataChangeNumber: number
}
