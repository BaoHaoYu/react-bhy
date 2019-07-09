import * as React from 'react'
import { ScrollbarProps } from 'react-custom-scrollbars'

/**
 * 封装滚动组件
 */
export interface IScrollbarsProps extends ScrollbarProps {
  style?: React.CSSProperties
  /**
   * react组件的children
   */
  children:
    | React.ReactNode
    | ((p: { scrollElement: Element }) => React.ReactNode)

  /**
   * 滚动条颜色
   */
  scrollBarColor?: any

  /**
   * 垂直滚动条样式
   */
  verticalBarStyle?: React.CSSProperties

  /**
   * 水平滚动条样式
   */
  horizontalBarStyle?: React.CSSProperties

  /**
   * 完成加载，获得对应的滚动元素
   * @param p
   * @param p.scrollElement 滚动元素
   */
  didMount?(p: { scrollElement: Element }): void

  /**
   * react-custom-scrollbars里面onUpdate方法
   * @param p
   */
  onUpdate?(p: {
    clientHeight: number
    clientWidth: number
    left: number
    scrollHeight: number
    scrollLeft: number
    scrollTop: number
    scrollWidth: number
    top: number
  }): void
}

export type TChildrenFunc = (p: { scrollElement: Element }) => React.ReactNode

export interface IState {
  didMount: boolean
  scrollElement: Element | null
}
