import { Map } from 'immutable'
import * as React from 'react'
import { connect } from 'react-redux'
import { getFastState, unmount } from './reducer'

interface IProps {
  keyPath: string[]

  children: <T extends Map<any, any>>(state: T) => React.ReactNode

  didMount?(): void
}

interface IState {
  didMount: boolean
}

class ReduxFast extends React.Component<IProps & { dispatch: any }> {
  public state: IState = {
    didMount: false,
  }

  public componentDidMount() {
    this.props.didMount && this.props.didMount()

    this.setState({ didMount: true })
  }

  public componentWillUnmount() {
    this.props.dispatch(unmount(this.props.keyPath))
  }

  public render() {
    const state = this.props.dispatch(getFastState(this.props.keyPath))
    if (!state) {
      return ''
    }
    return this.props.children(state)
  }
}

export default connect(
  () => {
    return {}
  },
  (dispatch) => ({ dispatch }),
)(ReduxFast)
