import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

/**
 * 为props加入dispatch，执行dispatch(someActons就可以刷新组件)
 */
export default function addStateToProps<Props = {}>(mapStateToProps: any): any {
  return (target: React.ComponentClass<Props>) => {
    return connect(
      null,
      mapDispatchToProps,
      (stateProps, dispatchProps, ownProps) => {
        return {
          ...mapStateToProps(stateProps, dispatchProps, ownProps),
          ...ownProps,
          ...dispatchProps,
        }
      },
      { pure: false },
    )(target as any)
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {}
}

export interface IAddDispatchToProps {
  dispatch: Dispatch
}
