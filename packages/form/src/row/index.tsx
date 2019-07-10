import * as React from 'react'
export interface IFowRowProps {
  className?: string

  style?: React.CSSProperties
}

export const FowRow: React.FunctionComponent<IFowRowProps> = (props) => {
  return (
    <div
      className={props.className}
      style={{ ...props.style, display: 'table-row' }}>
      <div style={{ display: 'table-cell' }} />

      <div style={{ display: 'table-cell' }}>{props.children}</div>
    </div>
  )
}
