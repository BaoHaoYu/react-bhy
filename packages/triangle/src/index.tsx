import * as React from 'react'

type IStyleKey = 'top' | 'bottom' | 'right' | 'left'

/**
 * 通过css实现的三角形
 */
export interface ITriangleProps {
  className?: string
  /**
   * 三角形颜色
   */
  color?: string
  /**
   *  三角形宽度
   */
  width?: number
  /**
   * 指向
   */
  styleKey?: IStyleKey
}

function top(p: { color: string; width: number }): React.CSSProperties {
  return {
    borderRight: `${p.width}px solid transparent`,
    borderBottom: `${p.width}px solid ${p.color}`,
    borderLeft: `${p.width}px solid transparent`,
  }
}

function bottom(p: { color: string; width: number }): React.CSSProperties {
  return {
    borderRight: `${p.width}px solid transparent`,
    borderTop: `${p.width}px solid ${p.color}`,
    borderLeft: `${p.width}px solid transparent`,
  }
}

function right(p: { color: string; width: number }): React.CSSProperties {
  return {
    borderBottom: `${p.width}px solid transparent`,
    borderLeft: `${p.width}px solid ${p.color}`,
    borderTop: `${p.width}px solid transparent`,
  }
}

function left(p: { color: string; width: number }): React.CSSProperties {
  return {
    borderBottom: `${p.width}px solid transparent`,
    borderRight: `${p.width}px solid ${p.color}`,
    borderTop: `${p.width}px solid transparent`,
  }
}

function getStyle(key: IStyleKey, color: string, width: number) {
  return { right, left, top, bottom }[key]({ color, width })
}

// 三角形
const Triangle: React.FunctionComponent<ITriangleProps> = (props) => {
  const { color, width, styleKey, className } = props
  return (
    <div className={className} style={getStyle(styleKey!, color!, width!)} />
  )
}

Triangle.defaultProps = {
  color: 'red',
  width: 6,
  styleKey: 'top',
}
export default Triangle
