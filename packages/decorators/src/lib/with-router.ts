import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

export default function add<Props = {}> (target: React.ComponentClass<Props & RouteComponentProps>): any {
  return withRouter(target)
}

export { RouteComponentProps }
