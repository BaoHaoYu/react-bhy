import classnames from 'classnames'
import * as React from 'react'

import { IRowProps } from '../index.interface'

// @ts-ignore
import s from './style.scss'

class Row extends React.Component<IRowProps> {
  public render() {
    return (
      <div
        style={this.props.style}
        className={classnames(this.props.className, s.row)}>
        {this.props.children}
      </div>
    )
  }
}

export default Row
