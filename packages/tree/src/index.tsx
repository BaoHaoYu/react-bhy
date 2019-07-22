import * as React from 'react'

import { defaultTo, find, set } from 'lodash-es'
import Node from './components/node/index'
import * as NNode from './components/node/index.interface'
import * as NTree from './index.interface'

export * from './components/node/index.interface'
export * from './index.interface'
import VirtualizedList, {
  IVirtualizedListProps,
} from '@react-efficiency/virtualized-list'
// @ts-ignore
import s from './style/index.scss'
import {
  addInfo,
  arrayJoin,
  changeWholeTreeToSimpleTree,
  checkChildren,
  checkParent,
  checkSelf,
  mergaData,
  searchTree,
} from './util/_index'
import { apendNodesById } from './util/apend-nodes-by-id'
import { deleteNodesByIds } from './util/delete-nodes-by-ids'
import { findCheckededIds } from './util/find-checked-ids'
import { findSeletedIds } from './util/find-seleted-ids'
import { insterNodesById } from './util/inster-nodes-by-id'
import { openNodesByIds } from './util/open-nodes-by-ids'
import { openSeletedNodes } from './util/open-seleted-nodes'

// 复杂逻辑使用immutalbe
class Tree extends React.Component<NTree.IProps, NTree.ITreeState> {
  public static defaultProps: Partial<NTree.IProps>

  // 滚动的高度
  public scrollTop = 0

  public state: NTree.ITreeState = {
    treeData: this.props.treeData as NTree.TreeDataDeal,
    isSearching: this.props.search !== '',
    isDraging: false,
    didMount: false,
    search: this.props.search,
    treeDataSimple: [],
    searchOpen: true,
    changeToSearch: this.props.changeToSearch,
  }

  constructor(p: NTree.IProps) {
    super(p)
    const { treeDataSimple, treeDataDeal } = this.initData(
      this.props,
      this.state,
    )
    this.state.treeDataSimple = treeDataSimple
    this.state.treeData = treeDataDeal
    this.props.onInit && this.props.onInit(treeDataDeal)
  }

  /**
   * 初始化
   * @param props
   * @param state
   */
  public initData(
    props: NTree.IProps,
    state: NTree.ITreeState,
  ): {
    treeDataSimple: NTree.TreeDataSimple
    treeDataDeal: NTree.TreeDataDeal
  } {
    const newTreeData = addInfo(props.treeData as NTree.TreeDataDeal)
    const simple = changeWholeTreeToSimpleTree({
      treeData: newTreeData,
      isSearching: state.isSearching,
      openMatchSerchParents: state.searchOpen,
    })

    return {
      treeDataSimple: simple,
      treeDataDeal: newTreeData,
    }
  }

  public getSnapshotBeforeUpdate(
    preProps: NTree.IProps,
    preState: NTree.ITreeState,
  ) {
    const nextProps = this.props
    const nextState = this.state
    // 搜索条件发生改变
    if (nextProps.search !== preProps.search && nextProps.search !== '') {
      const treeDataSearch = searchTree(
        nextProps.treeData as NTree.TreeDataDeal,
        nextProps.search,
      )
      nextProps.onSearch && nextProps.onSearch({ treeData: treeDataSearch })

      const treeDataSimple = changeWholeTreeToSimpleTree({
        treeData: nextProps.treeData as NTree.TreeDataDeal,
        isSearching: true,
        openMatchSerchParents: true,
      })
      this.setState({
        ...this.state,
        treeDataSimple,
        search: nextProps.search,
        isSearching: true,
      })
      return null
    } else if (nextProps.search === '' && nextState.isSearching) {
      const treeDataSimple = changeWholeTreeToSimpleTree({
        treeData: nextProps.treeData as NTree.TreeDataDeal,
        isSearching: false,
        openMatchSerchParents: false,
      })
      this.setState({
        ...this.state,
        treeDataSimple,
        search: nextProps.search,
        isSearching: false,
      })
      return null
    }
    // 树的数据发生改变
    if (nextProps.treeData !== preProps.treeData) {
      this.setState({
        ...this.state,
        ...this.initData(nextProps, nextState),
      })
      return null
    }

    return null
  }

  /**
   * 完成加载,记录滚动的元素
   */
  public componentDidMount() {
    this.state.didMount = true
    this.setState(this.state)
  }

  public render() {
    const treeDataSimple = this.state.treeDataSimple
    return (
      <div className={s.tree}>
        <VirtualizedList
          onScroll={this.onScroll}
          rowCount={treeDataSimple.length}
          scrollElement={defaultTo(this.props.scrollElement, window)}
          rowHeight={this.props.rowHeight}
          listData={treeDataSimple}
          simpleRowRenderer={this.simpleRowRenderer}
        />
      </div>
    )
  }
  /**
   * onScroll
   */
  public onScroll = (d: any) => {
    this.scrollTop = d.scrollTop
  }

  /**
   * 渲染行
   * @param node
   */
  public simpleRowRenderer: IVirtualizedListProps['simpleRowRenderer'] = (
    node: NNode.ITreeDataItemSimple,
  ) => {
    const props: NTree.IProps = this.props
    const keyPath: number[] = node.keyPath
    const hasOpenBtn = defaultTo(node.hasOpenBtn, props.hasOpenBtn)

    return (
      <Node
        className={node.className}
        id={node.id}
        title={node.title}
        icon={node.icon}
        iconClass={node.iconClass}
        // 外部传入，也可以在节点内部定义，节点内部的配置优先级更高
        selectable={defaultTo(node.selectable, props.selectable)}
        checkable={defaultTo(node.checkable, props.checkable)}
        toggleSelect={defaultTo(node.toggleSelect, props.toggleSelect)}
        selectStyle={defaultTo(node.selectStyle, props.selectStyle)}
        hideIcon={defaultTo(node.hideIcon, props.hideIcon)}
        clickNodeOpen={defaultTo(node.clickNodeOpen, props.clickNodeOpen)}
        hasSplitline={defaultTo(node.hasSplitline, props.hasSplitline)}
        splitlineColor={defaultTo(node.splitlineColor, props.splitlineColor)}
        rowHeight={defaultTo(node.rowHeight, props.rowHeight)}
        hasLocalBtn={defaultTo(node.hasLocalBtn, props.hasLocalBtn)}
        // 外部传入，和node的props通用
        leftSpace={props.leftSpace}
        offsetX={props.offsetX}
        toggleCheck={props.toggleCheck}
        maxCheck={props.maxCheck}
        singleCheck={props.singleCheck}
        maxSelect={props.maxSelect}
        singleSelect={props.singleSelect}
        iconSpace={props.iconSpace}
        deepSpace={props.deepSpace}
        canMoveToNoChildren={props.canMoveToNoChildren}
        renderNodeRight={props.renderNodeRight}
        renderNodeIcon={props.renderNodeIcon}
        renderNodeCheck={props.renderNodeCheck}
        renderNodeLocal={props.renderNodeLocal}
        renderNodeOpen={props.renderNodeOpen}
        // 通过计算得到东西
        keyPath={keyPath}
        index={node.index}
        selected={node.selected}
        disabled={node.disabled}
        open={node.open}
        checked={node.checked}
        halfChecked={node.halfChecked}
        node={node}
        deep={keyPath.length}
        sourceProps={this.state.sourceProps}
        isLocaling={this.state.isSearching}
        showOpen={!!(hasOpenBtn && node.children)}
        // 节点触发的函数
        onClickNode={this.onClickNode}
        onOpen={this.onOpen}
        onCheck={this.onCheck}
        onClickLocal={this.onClickLocal}
      />
    )
  }

  /**
   * 展示收缩节点
   * @param p 执行该操作节点的props
   */
  public onOpen: NNode.HandleNode = (p: NNode.INodeProps): void => {
    const keyPath: string[] = arrayJoin(p.node.keyPath, 'children')
    const open: boolean = !!p.node.open

    p.node.open = !open

    set(this.props.treeData, [...keyPath, 'open'], !open)
    const treeDataSimple = changeWholeTreeToSimpleTree({
      treeData: this.props.treeData as NTree.TreeDataDeal,
      isSearching: false,
      openMatchSerchParents: false,
    })
    // TODO 展开 防止滚动，更新完毕后继续滚动
    this.setState({
      ...this.state,
      treeDataSimple,
      treeData: [...this.props.treeData] as NTree.TreeDataDeal,
      searchOpen: false,
      actionType: 'onOpen',
    })

    this.props.onOpen &&
      this.props.onOpen({
        treeData: this.props.treeData,
        node: p.node,
        open: !open,
      })
  }

  /**
   * 点击节点
   * @param node 执行该操作节点的props
   */
  public onClickNode: NNode.HandleNode = (node: NNode.INodeProps): void => {
    if (node.clickNodeOpen && node.node.children) {
      this.onOpen(node)
    }

    if (node.selectable) {
      if (node.clickNodeOpen && node.node.children) {
        return
      }
      this.onSelect(node)
    }
  }

  /**
   * 执行选中操作
   * @param p 执行该操作节点的props
   */
  public onSelect: NNode.HandleNode = (p: NNode.INodeProps): void => {
    this.state.actionType = 'onSelect'
    if (
      this.props.maxSelect !== undefined &&
      findSeletedIds(this.props.treeData as NTree.TreeDataDeal).length ===
        this.props.maxSelect
    ) {
      return
    }
    const selected: boolean = this.props.toggleSelect ? !p.node.selected : true
    if (this.props.singleSelect) {
      mergaData(this.props.treeData as NTree.TreeDataDeal, { selected: false })
    }
    p.node.selected = selected

    this.props.onSelect &&
      this.props.onSelect({
        treeData: this.props.treeData,
        selected,
        node: p.node,
      })
  }

  /**
   * 勾选节点
   */
  public onCheck: NNode.HandleNode = (p): void => {
    this.state.actionType = 'onCheck'
    if (
      this.props.maxCheck !== undefined &&
      findCheckededIds(this.props.treeData as NTree.TreeDataDeal).length ===
        this.props.maxCheck
    ) {
      return
    }
    const checked = this.props.toggleCheck ? !p.checked : true
    const treeData = this.props.treeData

    if (this.props.singleCheck) {
      mergaData(this.props.treeData as NTree.TreeDataDeal, { checked: false })
    }

    checkSelf(p.node, checked)
    checkChildren(
      p.node.children! as NTree.TreeDataDeal,
      p.halfChecked ? true : checked,
      this.state.isSearching,
    )
    checkParent(p.node as NNode.ITreeDataItemDidDeal)
    const simple = changeWholeTreeToSimpleTree({
      treeData: treeData as NTree.TreeDataDeal,
      isSearching: this.state.isSearching,
      openMatchSerchParents: this.state.searchOpen,
    })

    this.setState({
      ...this.state,
      treeDataSimple: simple,
    })
    this.props.onCheck &&
      this.props.onCheck({
        treeData,
        checked,
        node: p.node,
      })
  }

  /**
   * 点击定位按钮
   * @param props
   */
  public onClickLocal: NNode.HandleNode = (props: NNode.INodeProps): void => {
    this.state.isSearching = false
    const info = this.initData(this.props, this.state)
    // @ts-ignore
    const findItem = find(
      info.treeDataSimple,
      (item: NNode.ITreeDataItemSimple) => {
        return item.id === props.node.id
      },
    )

    this.state = {
      ...this.state,
      ...info,
      isSearching: false,
    } as NTree.ITreeState
    this.setState(this.state)
  }
}

Tree.defaultProps = {
  search: '',
  contentHeight: 600,
  selectStyle: 'row',
  hasOpenBtn: true,
  rowHeight: 35,
  hasLocalBtn: true,
  toggleSelect: true,
  toggleCheck: true,
  leftSpace: 0,
  offsetX: 0,
  deepSpace: 25,
  iconSpace: 4,
  overscanRowCount: 3,
}

export {
  NTree,
  NNode,
  arrayJoin,
  apendNodesById,
  deleteNodesByIds,
  openNodesByIds,
  findSeletedIds,
  findCheckededIds,
  insterNodesById,
  openSeletedNodes,
}
export default Tree
