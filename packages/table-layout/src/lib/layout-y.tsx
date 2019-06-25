import classnames from 'classnames'
import * as React from 'react'
import { ITableLayoutYProps } from '../index.interface'
import { IRowTdProps } from './row-td'

/**
 * 垂直布局
 */
const TableLayoutY: React.StatelessComponent<ITableLayoutYProps> = (props) => {
  let rootStyle: React.CSSProperties = {}
  if (props.fullParent) {
    rootStyle = { height: '100%', width: '100%' }
  }
  const childrenList = React.Children.toArray(props.children)
  const children = childrenList
      .map((item: React.ReactElement<IRowTdProps>, index: number) => {
        let spaceTop: number | undefined
        let spaceBottom: number | undefined
        if (props.space !== undefined) {
          spaceTop = props.space / 2
          spaceBottom = props.space / 2
          // 只有一个元素，没有任何边距
          if (childrenList.length === 1) {
            spaceTop = undefined
            spaceBottom = undefined
          }
          // 第一个只有边距
          if (index === 0) {
            spaceTop = undefined
          }
          // 最后一个只有上边距
          if (index === childrenList.length - 1) {
            spaceBottom = undefined
          }
        }
        return React.cloneElement(item, { ...item.props, spaceBottom, spaceTop, key: index })
      })
  return (
      <div
          className={classnames(props.className)}
          style={{ ...props.style, ...rootStyle, display: 'table', tableLayout: 'fixed' }}
      >
        {children}
      </div>
  )
}

export default TableLayoutY
