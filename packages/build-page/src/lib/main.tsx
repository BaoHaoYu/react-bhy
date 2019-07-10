import {
  addDispatchToProps,
  RouteComponentProps,
  withRouter,
} from '@react-efficiency/decorators'
import * as React from 'react'
import * as NPageMain from './main.interface'

/**
 * 页面的主体
 */
export default function buildPage<Params = {}>(pa: NPageMain.IPage<Params>) {
  return function _buildPage(Target: any): any {
    @addDispatchToProps
    @withRouter
    class Page extends React.Component<
      { dispatch: any } & RouteComponentProps<Params>
    > {
      public static displayName = Target.displayName

      public state = {
        load: false,
      }

      public async componentDidMount() {
        if (pa.setData) {
          await pa.setData({
            props: this.props as NPageMain.IPageComponentProps<Params>,
          })
        }
        this.setState({ load: true })
      }

      public componentWillUnmount() {
        this.props.dispatch(pa.pageActions.leavePage(Target.displayName))
      }

      public render() {
        if (!this.state.load) {
          return <span />
        }
        return <Target {...this.props} />
      }
    }

    return Page
  }
}

export { NPageMain }
