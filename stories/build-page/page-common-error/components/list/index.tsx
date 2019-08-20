import * as React from 'react'
import {
  buildPageComponent,
  IPageComponentProps,
} from '../../../../../packages/build-page/src'
import * as widgets from '../../redux/widgets'

@buildPageComponent({
  serverActions: [widgets.dataOneServer],
  mapStateToProps: (state, props) => {
    if (!props.allDataLoad) {
      return
    }

    return {
      msg: props.serverData[0].data,
    }
  },
})
class List extends React.Component<IPageComponentProps & { msg: string }> {
  public render() {
    if (this.props.requesting) {
      return 'loading....'
    }
    return (
      <div>
        500 数据结果处理
        {this.props.error && (
          <div style={{ color: 'red' }}>{this.props.msg}</div>
        )}
      </div>
    )
  }
}

export default List as React.ComponentType<any>
