import { defaultTo, find } from 'lodash-es'
import * as React from 'react'

import * as ReactDom from 'react-dom'
import {
  AutoSizer,
  List,
  ListProps,
  Size,
  WindowScroller,
  WindowScrollerProps,
  AutoSizerProps,
} from 'react-virtualized'
import { IState, IVirtualizedListProps } from './index.interface'
import Row from './row'

export * from './index.interface'

/**
 * 更具id滚动到指定位置
 * @param list 列表数据
 * @param rowHeight 行高
 * @param id 根据的id
 */
function findItem(
  list: IVirtualizedListProps['listData'],
  rowHeight: number,
  id: any,
) {
  let scrollTop = 0
  const hasFindItem = find(list, (item, index) => {
    const itemRowheight = defaultTo(list[index].rowHeight, rowHeight)
    scrollTop = scrollTop + defaultTo(itemRowheight, rowHeight)
    if (item.id === id) {
      scrollTop -= defaultTo(itemRowheight, rowHeight)
    }
    return item.id === id
  })

  return { scrollTop, hasFindItem }
}

/**
 * react-virtualized列表
 */
export default class VirtualizedList extends React.Component<
  IVirtualizedListProps,
  IState
> {
  public static defaultProps: Partial<IVirtualizedListProps> = {
    overscanColumnCount: 2,
  }

  public static getDerivedStateFromProps(
    nextProps: IVirtualizedListProps,
    state: IState,
  ) {
    // 定位逻辑
    if (
      (nextProps.scrollToId !== state.scrollToId ||
        nextProps.changeScrollToId !== state.changeScrollToId) &&
      state.didMount
    ) {
      // 计算要滚动的高度
      const { scrollTop, hasFindItem } = findItem(
        nextProps.listData,
        nextProps.rowHeight as number,
        nextProps.scrollToId,
      )
      // 滚动到指定位置
      if (hasFindItem) {
        state.scrollElement!.scrollTo(0, scrollTop)
      }
      return {
        scrollToId: nextProps.scrollToId,
        changeScrollToId: nextProps.changeScrollToId,
      }
    }
    return null
  }

  public state: IState = {
    didMount: false,
    changeScrollToId: this.props.changeScrollToId,
    scrollToId: this.props.scrollToId,
    scrollElement: this.props.scrollElement,
  }
  /**
   * 默认的scrollElement
   */
  public scrollElement: Element

  /**
   * 滚动的高度
   */
  public scrollTop: number = 0

  /**
   * 渲染行
   * @param p
   */
  public rowRenderer: IVirtualizedListProps['rowRenderer'] = (p): any => {
    if (this.props.rowRenderer) {
      return this.props.rowRenderer(p)
    }
    const id = this.props.listData[p.index].id
    if (this.props.simpleRowRenderer) {
      return (
        <div
          key={defaultTo(this.props.listData[p.index].id, p.key)}
          style={p.style}>
          <Row id={id} style={{ height: '100%' }}>
            {this.props.simpleRowRenderer(this.props.listData[p.index])}
          </Row>
        </div>
      )
    }
    return <span>rowRenderer or simpleRowRenderer is undefined</span>
  }

  /**
   * 获得行的高度
   * @param p
   */
  public rowHeight: ListProps['rowHeight'] = (p) => {
    return defaultTo(
      this.props.listData[p.index].rowHeight,
      this.props.rowHeight,
    )
  }
  public renderList = (p: Size & { scrollTop: number; height: number }) => {
    const props = { ...this.props }
    delete props.className
    delete props.style
    return (
      <List
        {...props}
        rowCount={this.props.rowCount!}
        rowHeight={this.rowHeight}
        style={{ outline: 'none' }}
        width={p.width}
        height={p.height}
        autoHeight={true}
        rowRenderer={this.rowRenderer!}
        scrollTop={p.scrollTop}
      />
    )
  }

  public renderAutoSizer: WindowScrollerProps['children'] = (p) => {
    const children: AutoSizerProps['children'] = (ap) =>
      this.renderList({ ...ap, scrollTop: p.scrollTop, height: p.height })
    return (
      <AutoSizer
        className={'autoSizer'}
        disableHeight={true}
        children={children}
      />
    )
  }

  /**
   * WindowScroller
   */
  public renderWindowScroller = () => {
    const children: WindowScrollerProps['children'] = (p) => this.renderAutoSizer(p)
    return (
      <WindowScroller
        className={'windowScroller'}
        onScroll={this.onScroll}
        scrollElement={defaultTo(this.props.scrollElement, this.scrollElement)}
        children={children}
      />
    )
  }

  /**
   * 发生滚动的时候触发
   * @param p
   */
  public onScroll: WindowScrollerProps['onScroll'] = (p) => {
    this.scrollTop = p.scrollTop
  }

  /**
   * 渲染完毕，获得滚动的元素
   */
  public componentDidMount() {
    this.scrollElement = ReactDom.findDOMNode(this) as Element
    this.state.didMount = true
    this.state.scrollElement = defaultTo(
      this.props.scrollElement,
      this.scrollElement,
    )
    this.setState(this.state)
  }

  public render() {
    return (
      <div
        className={this.props.className}
        style={{ overflowY: 'auto', ...this.props.style }}>
        {this.state.didMount && this.renderWindowScroller()}
      </div>
    )
  }
}
