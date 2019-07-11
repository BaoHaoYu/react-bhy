import * as React from 'react'
import {
  buildPageComponent,
  IPageComponentProps,
} from '../../../../../packages/build-page/src'
import * as widgets from '../../redux/widgets'

interface IProps {
  heheList: Array<{
    heheName: string
    id: number
  }>
}

@buildPageComponent({
  serverActions: [widgets.dataTreeServer],
  mapStateToProps: (state, props) => {
    if (!props.allDataLoad) {
      return
    }
    const heheServerData = props.serverData[0]

    const heheList: IProps['heheList'] = []
    heheServerData
      .getIn(['data'])
      .toList()
      .map((item: any) => {
        heheList.push({
          heheName: item.get('name'),
          id: item.get('id'),
        })
      })

    return {
      heheList,
    } as IProps
  },
})
class RequestAfter extends React.Component<IPageComponentProps & IProps> {
  public renderHeheLlist = () => {
    if (this.props.allDataLoad) {
      return this.props.heheList.map((item) => {
        return <div key={item.id}>呵呵名称：{item.heheName}</div>
      })
    }
    return
  }

  public onClickGetHeh = () => {
    this.props.dispatch(widgets.getHehe())
  }

  public render() {
    return (
      <div>
        <button onClick={this.onClickGetHeh}>get hehe</button>
        {this.props.requesting && 'loading hehe.....'}
        {this.renderHeheLlist()}
      </div>
    )
  }
}

export default RequestAfter as React.ComponentType<any>
