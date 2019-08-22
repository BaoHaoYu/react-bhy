import { observer } from 'mobx-react'
import * as React from 'react'
import { errorServer } from './deom.state'

export interface IErrorProps {
  className?: string

  style?: React.CSSProperties
}

@observer
export class Error extends React.Component<IErrorProps> {
  public componentDidMount() {
    errorServer.startRequest()
  }
  public render() {
    if (!errorServer.data) {
      return ''
    }
    if (errorServer.error) {
      return 'error'
    }
    return <div>{'ddddddddddddddddddddddddddddddddddddd'}</div>
  }
}
