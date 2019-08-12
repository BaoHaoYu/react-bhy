import { computed } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { heheServer } from './deom.state'
interface IHehe {
  heheList: Array<{
    heheName: string
    id: number
  }>
}
@observer
export class GetData extends React.Component<any> {
  @computed public get hehe() {
    const heheList: IHehe['heheList'] = []
    if (!heheServer.data) {
      return []
    }
    heheServer.data.data.map((item: any) => {
      heheList.push({
        heheName: item.name,
        id: item.id,
      })
    })

    return heheList
  }
  public renderHeheLlist = () => {
    if (heheServer.data) {
      return this.hehe.map((item) => {
        return <div key={item.id}>呵呵名称：{item.heheName}</div>
      })
    }
    return
  }
  public onClickGetHeh = () => {
    heheServer.startRequest()
  }
  public render() {
    return (
      <div>
        <div>
          <button onClick={this.onClickGetHeh}>get hehe</button>
          {heheServer.requesting && 'loading hehe.....'}
          {this.renderHeheLlist()}
        </div>
      </div>
    )
  }
}
