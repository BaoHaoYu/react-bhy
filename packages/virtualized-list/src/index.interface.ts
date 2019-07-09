import * as React from 'react'
import { ListProps } from 'react-virtualized'

export interface IRowProps extends React.HTMLAttributes<any> {
  /**
   * 唯一标识
   */
  id: any
  /**
   * 行高
   */
  rowHeight?: number
}

/**
 * rowHeight，rowRenderer，rowCount是必填项
 */
export type IVirtualizedListProps<T extends IRowProps = any> = {
  /**
   * 滚动元素，可以是window
   */
  scrollElement?: Element | Window

  /**
   * 列表数据
   */
  listData: T[]

  /**
   * 滚动到指定的id
   */
  scrollToId?: any

  /**
   * 简单渲染
   */
  simpleRowRenderer?: (item: T) => any

  /**
   * 改变后，会重新滚动到指定的id（scrollToId）
   */
  changeScrollToId?: any
} & Partial<ListProps>

export interface IState {
  changeScrollToId: any
  didMount: boolean
  scrollToId: any
  scrollElement?: Element | Window
}
