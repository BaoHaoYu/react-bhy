import * as React from 'react'
import { buildPageMain } from '../../../packages/build-page/src/index'
import List from './components/list'
import * as widgets from './redux/widgets'

@buildPageMain({
  pageActions: widgets.page.actions,
  setData: async (p) => {
    await p.props.dispatch(widgets.setAllData())
  },
})
export default class PageBase extends React.Component<any> {
  public render() {
    return (
      <div>
        <h1 style={{ marginBottom: 12 }}>page1</h1>
        <List />
      </div>
    )
  }
}
