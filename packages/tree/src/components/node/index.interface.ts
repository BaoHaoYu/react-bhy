/**
 * 组件props
 */
export interface INodeProps
  extends ICommon,
    INodeData,
    INodeDataHelp,
    INodeHandle {
  /**
   * 节点数据
   */
  node: ITreeDataItemSimple

  /**
   * 节点的深度
   */
  deep: number

  /**
   * 拖动源的props
   */
  sourceProps?: INodeProps

  /**
   * 处于定位状态
   */
  isLocaling?: boolean

  /**
   * 是否有显示展开按钮
   */
  showOpen?: boolean
}

/**
 * 拖动的时候，联动被拖动的节点和目标节点
 */
export type HandleDrag = (p: { source: ISources; target: ITarget }) => void

/**
 * 处理没有联动的事件，如点击
 * @param {INodeProps} 触发该事件的节点的props
 */
export type HandleNode = (p: INodeProps) => void

/**
 * 节点会触发的事件
 */
export interface INodeHandle {
  /**
   * 点击节点
   */
  onClickNode: HandleNode

  /**
   * 点击打开
   */
  onOpen: HandleNode

  /**
   * 勾选
   */
  onCheck: HandleNode

  /**
   * 点击定位按钮
   */
  onClickLocal: HandleNode
}

/**
 * 在树的数据里面加入的辅助数据
 */
export interface INodeDataHelp {
  /**
   * 节点路径
   */
  keyPath: any[]

  /**
   * 标记
   */
  index: number

  /**
   * 是否符合搜索展示出来的条件
   */
  _matchSearch?: boolean

  /**
   * 深度
   */
  deep: number

  /**
   * 父节点keyPath
   */
  parentKeyPath?: any[]

  /**
   * 是否半勾
   */
  halfChecked?: boolean
}

/**
 * 嵌套树的节点
 */
export type TreeDataItem = INodeData

/**
 * 经过处理的嵌套书节点，如加入keyPath，或者加入_matchSearch
 */
export interface ITreeDataItemDidDeal extends INodeData, INodeDataHelp {
  children?: ITreeDataItemDidDeal[]
  parentNode?: ITreeDataItemDidDeal
  rootNode?: ITreeDataItemDidDeal
}

/**
 * 解开嵌套后树的节点
 */
export interface ITreeDataItemSimple extends INodeData, INodeDataHelp {
  children?: ITreeDataItemSimple[]
  parentNode?: ITreeDataItemSimple
  rootNode?: ITreeDataItemSimple
}

/**
 * 节点数据的基本类型，可以从最外层组件传入，当作公共的配置，在节点内部定义会覆盖外部公用的
 */
export interface INodeDefaultto {
  /**
   * check类似，不过是点击通过点击节点触发
   */
  selectable?: boolean

  /**
   * 是否可以显示单选框
   */
  checkable?: boolean

  /**
   * heck类似
   */
  toggleSelect?: boolean

  /**
   * 选中样式，title代表之高亮标题，row高亮一整行,content高亮图标和标题
   */
  selectStyle?: 'title' | 'row' | 'content'

  /**
   * 隐藏节点图标
   */
  hideIcon?: boolean

  /**
   * 显示打开按钮
   */
  hasOpenBtn?: boolean

  /**
   * 点击节点任意位置都出发展开操作
   */
  clickNodeOpen?: boolean

  /**
   * 是否有分割线
   */
  hasSplitline?: boolean

  /**
   * 分割线颜色
   */
  splitlineColor?: string

  /**
   * 节点的高度
   */
  rowHeight?: number

  /**
   * 是否显示定位按钮
   */
  hasLocalBtn?: boolean
}

/**
 * 节点的数据,非immutable类型
 */
export interface INodeData extends INodeDefaultto {
  /**
   * 节点id，唯一标识
   */
  id: any
  /**
   * 是否选中
   */
  selected?: boolean

  /**
   * 是否勾上了
   */
  checked?: boolean

  /**
   * 是否打开
   */
  open?: boolean
  /**
   * 是否可以操作
   */
  disabled?: boolean
  /**
   * 父节点
   */
  parentNode?: INodeData

  /**
   * 根部节点
   */
  rootNode?: INodeData

  /**
   * 要显示文字
   */
  title: any

  /**
   * 图标类
   */
  iconClass?: string

  /**
   * 完全自定义icon
   */
  icon?: any

  /**
   * 附带的数据
   */
  data?: any

  /**
   * 子列表
   */
  children?: INodeData[]
}

/**
 * 需要从最外层的props传入节点组件
 */
export interface ICommon extends INodeDefaultto {
  /**
   * 左边边距，防止拖动指示用的箭头被遮挡
   */
  leftSpace?: number

  /**
   * 水平偏移
   */
  offsetX?: number

  /**
   * 是否可以取消选中
   */
  toggleCheck?: boolean

  /**
   * 最多可以选多少个
   */
  maxCheck?: number

  /**
   * 单选模式，选中一个后，其他选中的就会取消
   */
  singleCheck?: boolean

  /**
   * 最多可以选中多少个
   */
  maxSelect?: number

  /**
   * 和check类似
   */
  singleSelect?: boolean

  /**
   * 图标和标题之间的间距
   */
  iconSpace?: number

  /**
   * 下一级和上一级的边距差
   */
  deepSpace?: number

  /**
   * 是否可以移动到么有children的节点
   */
  canMoveToNoChildren?: boolean

  /**
   * 定制：设置节点右边的内容，如果定义了该函数，则该函数的优先级最高
   */
  renderNodeRight?(): JSX.Element

  /**
   * 定制：设置节点的图表，如果定义了该函数，则该函数的优先级最高
   */
  renderNodeIcon?(): any

  /**
   * 定制：设置勾选的节点，如果定义了该函数，则该函数的优先级最高
   */
  renderNodeCheck?(): any

  /**
   * 定制：设置定位按钮，如果定义了该函数，则该函数的优先级最高
   */
  renderNodeLocal?(): any

  /**
   * 定制：设置展开按钮，如果定义了该函数，则该函数的优先级最高
   */
  renderNodeOpen?(): any
}

/**
 * 目标节点的props
 */
export type ITarget = INodeProps

/**
 * 拖动节点传递的props
 */
export type ISources = INodeProps

export interface IState {
  /**
   * target的触发区域，'top' 'center' 'bottom'，从而判断显示那些指示箭头
   */
  dir?: 'top' | 'center' | 'bottom' | null

  /**
   * 拖动节点到目标节点上面，是否符合一些条件判断，如深度这些东西
   */
  allow: boolean
}

export type IAllNodeProps = INodeProps
