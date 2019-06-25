import * as React from 'react'

export interface IColTdProps extends React.HTMLAttributes<any> {
  /**
   * 对齐方式
   */
  verticalAlign?: 'top' | 'middle' | 'bottom'
  /**
   * 间隔
   */
  spaceLeft?: number
  /**
   * 间隔
   */
  spaceRight?: number
  /**
   * 是否隐藏
   */
  hidden?: boolean
  /**
   * 宽度
   */
  width?: number | string
}

const ColTd: React.StatelessComponent<IColTdProps> = (props) => {
  const spaceStyle: React.CSSProperties = {}
  if (props.spaceRight !== undefined) {
    spaceStyle.paddingRight = props.spaceRight
  }
  if (props.spaceLeft !== undefined) {
    spaceStyle.paddingLeft = props.spaceLeft
  }
  const style: React.CSSProperties = {
    ...props.style,
    ...spaceStyle,
    width: props.width,
    verticalAlign: props.verticalAlign,
    display: props.hidden ? 'none' : 'table-cell'
  }
  return (
      <div
          style={style}
          className={props.className}
      >
        {props.children}
      </div>
  )
}

ColTd.defaultProps = {
  verticalAlign: 'top'
}

export default ColTd as React.StatelessComponent<Omit<IColTdProps, 'spaceLeft' | 'spaceRight'>>
