import classnames from 'classnames'
import * as React from 'react'
import { ITableLayoutYProps } from '../index.interface'
import { IColTdProps } from './col-td'

/**
 * 水平布局
 */
export const TableLayoutHorizontal: React.FunctionComponent<
  ITableLayoutYProps
> = (props) => {
  let rootStyle: React.CSSProperties = {}
  if (props.fullParent) {
    rootStyle = { height: '100%' }
  }
  const childrenList = React.Children.toArray(props.children).filter(
    (item: React.ReactElement<IColTdProps>, index: number) =>
      !item.props.hidden,
  )

  const children = childrenList.map(
    (item: React.ReactElement<IColTdProps>, index: number) => {
      let spaceLeft: number | undefined
      let spaceRight: number | undefined
      if (props.space !== undefined) {
        spaceLeft = props.space / 2
        spaceRight = props.space / 2
        // 只有一个元素，没有任何边距
        if (childrenList.length === 1) {
          spaceLeft = undefined
          spaceRight = undefined
        }
        // 第一个只有边距
        if (index === 0) {
          spaceLeft = undefined
        }
        // 最后一个只有上边距
        if (index === childrenList.length - 1) {
          spaceRight = undefined
        }
      }
      return React.cloneElement(item, {
        ...item.props,
        spaceLeft,
        spaceRight,
        key: index,
      })
    },
  )
  return (
    <div
      className={classnames(props.className)}
      style={{ ...props.style, ...rootStyle }}
    >
      <div
        style={{
          display: 'table',
          tableLayout: 'fixed',
          height: '100%',
          width: '100%',
        }}
      >
        <div style={{ display: 'table-row' }}>{children}</div>
      </div>
    </div>
  )
}
