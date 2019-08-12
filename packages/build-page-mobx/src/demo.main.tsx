import * as React from 'react'
import { Com1 } from './demo.component'
import { foodServer, peopleServer } from './deom.state'
export class Main extends React.Component<any> {
  public componentDidMount() {
    peopleServer.startRequest()
    foodServer.startRequest()
  }
  public render() {
    return (
      <div>
        <Com1 />
      </div>
    )
  }
}
