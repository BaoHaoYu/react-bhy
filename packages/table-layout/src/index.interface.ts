import * as React from 'react'

/**
 * 利用display:table来垂直布局，比如高度100%，上边是固定高度，下边是自适应的高度
 */
export interface ITableLayoutYProps extends React.HTMLAttributes<any> {
  /**
   * 间隔
   */
  space?: number
  /**
   * fullParent
   */
  fullParent?: boolean
}
