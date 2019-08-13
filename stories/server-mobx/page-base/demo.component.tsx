import { computed } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { foodServer, peopleServer } from './deom.state'
interface IFood {
  foodList: Array<{
    foodName: string
    id: number
  }>
}
interface IPeople {
  peopleList: Array<{
    peopleName: string
    id: number
  }>
}

@observer
export class Com1 extends React.Component<any> {
  @computed public get food() {
    const foodList: IFood['foodList'] = []
    if (!foodServer.data) {
      return []
    }
    foodServer.data.data.map((item: any) => {
      foodList.push({
        foodName: item.name,
        id: item.id,
      })
    })

    return foodList
  }

  @computed public get people() {
    if (!peopleServer.data) {
      return []
    }
    const peopleList: IPeople['peopleList'] = []
    peopleServer.data.data.map((item: any) => {
      peopleList.push({
        peopleName: item.name,
        id: item.id,
      })
    })

    return peopleList
  }

  public render() {
    if (foodServer.requesting || peopleServer.requesting) {
      return 'loading....'
    }
    const foodList = this.food.map((item) => {
      return <li key={item.id}>食物名称：{item.foodName}</li>
    })

    const peopleList = this.people.map((item) => {
      return <li key={item.id}>人员名称：{item.peopleName}</li>
    })
    return (
      <div>
        <ul>{foodList}</ul>
        <ul>{peopleList}</ul>
      </div>
    )
  }
}
