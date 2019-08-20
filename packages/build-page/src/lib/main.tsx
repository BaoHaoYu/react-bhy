import { addDispatchToProps } from '@react-efficiency/decorators'
import * as React from 'react'
import * as NPageMain from './main.interface'

/**
 * 页面的主体
 */
export default function buildPage(pa: NPageMain.IPage) {
  return function _buildPage(Target: any): any {
    class Page extends React.Component<{ dispatch: any }> {
      public static displayName = Target.displayName

      public state = {
        load: false,
      }

      public async componentDidMount() {
        if (pa.setData) {
          await pa.setData(this.props)
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

    return addDispatchToProps(Page)
  }
}

export { NPageMain }
