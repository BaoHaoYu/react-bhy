import * as React from 'react'

/**
 * 子节点是否高度100%，td必须也是高度100%，否则会在火狐的子节点高度100%无效
 */
export interface IRowTdProps extends React.HTMLAttributes<any> {
  /**
   * 间隔
   */
  spaceTop?: number
  /**
   * 间隔
   */
  spaceBottom?: number
  /**
   * 高度
   */
  height?: number | string
}

const RowTdY: React.StatelessComponent<IRowTdProps> = (props) => {
  const newStyle: React.CSSProperties = {}
  if (props.spaceBottom !== undefined) {
    newStyle.paddingBottom = props.spaceBottom
  }
  if (props.spaceTop !== undefined) {
    newStyle.paddingTop = props.spaceTop
  }
  return (
    <div style={{ height: props.height, display: 'table-row' }}>
      <div
        style={{ ...props.style, ...newStyle, display: 'table-cell' }}
        className={props.className}>
        {props.children}
      </div>
    </div>
  )
}

RowTdY.defaultProps = {}

export default RowTdY as React.StatelessComponent<
  Omit<IRowTdProps, 'spaceTop' | 'spaceBottom'>
>
