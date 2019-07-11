import * as React from 'react'

/**
 * 子节点是否高度100%，td必须也是高度100%，否则会在火狐的子节点高度100%无效
 */
export interface IRowTdProps extends React.HTMLAttributes<any> {
  /**
   * 高度
   */
  height?: number | string
}

const RowTdY: React.StatelessComponent<IRowTdProps> = (props) => {
  return (
    <div style={{ height: props.height, display: 'table-row' }}>
      <div
        style={{ ...props.style, display: 'table-cell' }}
        className={props.className}>
        {props.children}
      </div>
    </div>
  )
}

RowTdY.defaultProps = {}

export default RowTdY