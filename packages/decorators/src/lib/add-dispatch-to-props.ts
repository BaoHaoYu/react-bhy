import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

/**
 * 为props加入dispatch，执行dispatch(someActons就可以刷新组件)
 */
export default function addDispatchToProps<Props = {}> (target: React.ComponentClass<Props>): any {
  return connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
    return {
      ...ownProps,
      ...dispatchProps
    }
  }, { pure: false })(target as any)
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    dispatch
  }
}

export interface IAddDispatchToProps {
  dispatch: Dispatch
}
