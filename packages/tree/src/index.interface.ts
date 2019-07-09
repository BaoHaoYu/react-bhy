import { RequiredPick } from '@bhy/react-interface-base'
import * as TreeNode from './components/node/index.interface'

/**
 * 默认props
 */
export type IDefaultProps = RequiredPick<
  ITreeProps,
  | 'search'
  | 'contentHeight'
  | 'selectStyle'
  | 'hasOpenBtn'
  | 'rowHeight'
  | 'hasLocalBtn'
  | 'toggleSelect'
  | 'toggleCheck'
  | 'leftSpace'
  | 'offsetX'
  | 'deepSpace'
  | 'iconSpace'
  | 'overscanRowCount'
  | 'scrollElement'
>

export interface ITreeProps extends TreeNode.ICommon {
  /**
   * 数据
   */
  treeData: TreeData
  /**
   * 搜索
   */
  search?: string
  /**
   * 根部列表滚动位置
   */
  scrollTop?: number
  /**
   * 列表内容即滚动内容的高度
   */
  contentHeight?: number
  /**
   * 单个选中，父节点高亮
   */
  singleSelectParentHightline?: boolean
  /**
   * 滚动元素
   */
  scrollElement?: HTMLElement | Window
  /**
   * 处理后的树
   */
  treeDataDeal?: TreeDataDeal
  /**
   * 发生改变则会重新触发搜索
   */
  changeToSearch?: any
  /**
   * react-v List 的overscanRowCount
   */
  overscanRowCount?: number

  /**
   * 选中操作
   */
  onSelect?(p: {
    treeData: TreeData
    node: TreeNode.ITreeDataItemSimple
    selected: boolean
  }): void

  /**
   * 勾选操作
   */
  onCheck?(p: {
    treeData: TreeData
    node: TreeNode.ITreeDataItemSimple
    checked: boolean
  }): void

  /**
   * 移动操作
   */
  onMove?(p: {
    treeData: TreeData
    source: TreeNode.ISources
    target: TreeNode.ITarget
    dir: 'top' | 'bottom' | 'center'
  }): void

  /**
   * 展开操作
   */
  onOpen?(p: {
    treeData: TreeData
    node: TreeNode.ITreeDataItemSimple
    open: boolean
  }): void

  /**
   * 搜索操作
   */
  onSearch?(p: { treeData: TreeData }): void

  /**
   * 初始化操作
   */
  onInit?(treeDataDeal: TreeDataDeal): void
}

export type IProps = ITreeProps & IDefaultProps

/**
 * 树的数据，嵌套格式
 */
export type TreeData = TreeNode.TreeDataItem[]

/**
 * 树的数据，嵌套格式，不过经过处理了
 */
export type TreeDataDeal = TreeNode.ITreeDataItemDidDeal[]

/**
 * 解开嵌套后的树的数据结构
 */
export type TreeDataSimple = TreeNode.ITreeDataItemSimple[]

/**
 * 状态
 */
export interface ITreeState {
  /**
   *
   */
  treeData: TreeDataDeal
  /**
   * 转化成单列的数据
   */
  treeDataSimple: TreeDataSimple
  /**
   * 发生改变就触发搜索
   */
  changeToSearch?: any
  /**
   * 被拖动的Node节点的props
   */
  sourceProps?: TreeNode.ISources
  /**
   * 搜索的内容
   */
  search: string
  /**
   * 是否处于搜索状态
   */
  isSearching: boolean
  /**
   * 是否处于拖动节点的状态
   */
  isDraging: boolean
  /**
   * 是否完成生命周期 componentDidMount
   */
  didMount: boolean
  /**
   * 动作类型
   */
  actionType?:  // 初始化数据
    | 'initData'
    // 搜索
    | 'onSearch'
    // 移动到上边
    | 'onMove'
    // 展开或者收缩节点
    | 'onOpen'
    // 勾选节点
    | 'onCheck'
    // 选中节点
    | 'onSelect'
    // id发生改变
    | 'idChange'
  /**
   * 如果节点符合搜索条件，打开节点的父节点
   */
  searchOpen: boolean
}
