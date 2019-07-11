import * as React from 'react'
export interface IFowRowProps {
  className?: string

  style?: React.CSSProperties

  layout?: 'x' | 'y'
}

export const FowRow: React.FunctionComponent<IFowRowProps> = (props) => {
  if (props.layout === 'x') {
    return (
      <div
        className={props.className}
        style={{ ...props.style, display: 'table-row' }}>
        <div style={{ display: 'table-cell' }} />

        <div
          style={{
            display: 'table-cell',
            textAlign: 'left',
          }}>
          {props.children}
        </div>
      </div>
    )
  }

  return (
    <div className={props.className} style={props.style}>
      {props.children}
    </div>
  )
}

FowRow.defaultProps = {
  layout: 'x',
}
