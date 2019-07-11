import * as React from 'react'
import {
  buildPageComponent,
  IPageComponentProps,
} from '../../../../../packages/build-page/src'
import * as widgets from '../../redux/widgets'

interface IProps {
  foodList: Array<{
    foodName: string
    id: number
  }>

  peopleList: Array<{
    peopleName: string
    id: number
  }>
}

@buildPageComponent({
  serverActions: [widgets.dataOneServer, widgets.dataTwoServer],
  mapStateToProps: (state, props) => {
    if (!props.allDataLoad) {
      return
    }
    const foodServerData = props.serverData[0]
    const peopleServerData = props.serverData[1]

    const foodList: IProps['foodList'] = []
    const peopleList: IProps['peopleList'] = []
    foodServerData
      .getIn(['data'])
      .toList()
      .map((item: any) => {
        foodList.push({
          foodName: item.get('name'),
          id: item.get('id'),
        })
      })
    peopleServerData
      .getIn(['data'])
      .toList()
      .map((item: any) => {
        peopleList.push({
          peopleName: item.get('name'),
          id: item.get('id'),
        })
      })

    return {
      foodList,
      peopleList,
    } as IProps
  },
})
class List extends React.Component<IPageComponentProps & IProps> {
  public render() {
    if (!this.props.allDataLoad) {
      return 'loading....'
    }
    const foodList = this.props.foodList.map((item) => {
      return <li key={item.id}>食物名称：{item.foodName}</li>
    })

    const peopleList = this.props.peopleList.map((item) => {
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

export default List as React.ComponentType<any>
