import classnames from 'classnames'
import * as React from 'react'
import { ITableLayoutYProps } from '../index.interface'
import { IColTdProps } from './col-td'

/**
 * 水平布局
 */
const TableLayoutY: React.StatelessComponent<ITableLayoutYProps> = (props) => {
  let rootStyle: React.CSSProperties = {}
  if (props.fullParent) {
    rootStyle = { height: '100%' }
  }
  const childrenList = React.Children.toArray(props.children)
  const children = childrenList
      .map((item: React.ReactElement<IColTdProps>, index: number) => {
        let spaceLeft: number | undefined
        let spaceRight: number | undefined
        if (props.space !== undefined) {
          spaceLeft = props.space / 2
          spaceRight = props.space / 2
        }
        return React.cloneElement(item, { ...item.props, spaceRight, spaceLeft, key: index })
      })
  return (
      <div
          className={classnames(props.className)}
          style={{ ...props.style, ...rootStyle, marginRight: -props.space! / 2, marginLeft: -props.space! / 2 }}
      >
        <div
            style={{ display: 'table', tableLayout: 'fixed', height: '100%', width: '100%' }}
        >
          <div style={{ display: 'table-row' }}>
            {children}
          </div>
        </div>
      </div>
  )
}

export default TableLayoutY
