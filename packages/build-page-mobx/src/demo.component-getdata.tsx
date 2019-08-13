import { action, computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { deleteHehe, getHehe } from './demo.component-getdata-actions'
import { heheServer } from './deom.state'
interface IHehe {
  heheList: Array<{
    heheName: string
    id: number
  }>
}

class GetData1 extends React.Component<any> {
  @observable public value = 'ddddd'

  @action public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.value = e.target.value
  }

  @computed public get hehe() {
    const heheList: IHehe['heheList'] = []
    if (!heheServer.data) {
      return []
    }
    console.log('@computed public get hehe()')

    heheServer.data.data.map((item: any) => {
      heheList.push({
        heheName: item.name,
        id: item.id,
      })
    })

    return heheList
  }

  public render() {
    return (
      <div>
        <div>
          <button onClick={getHehe}>get hehe</button>
          {heheServer.requesting && 'loading hehe.....'}
          {this.hehe.map((item, index) => {
            return (
              <div key={item.id}>
                呵呵名称：{item.heheName}
                <button onClick={deleteHehe.bind(this, index)}>删除</button>
              </div>
            )
          })}
        </div>
        length ={this.hehe.length}
        <input value={this.value} type={'text'} onChange={this.onChange} />
      </div>
    )
  }
}

export const GetData = observer(GetData1)
