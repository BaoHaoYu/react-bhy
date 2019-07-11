import * as React from 'react'
import { buildPageMain } from '../../../packages/build-page/src/index'
import RequestAfter from './components/request-after'
import * as widgets from './redux/widgets'

@buildPageMain({
  pageActions: widgets.page.actions,
})
export default class PageAsyncGetData extends React.Component<any> {
  public render() {
    return (
      <div>
        <h1 style={{ marginBottom: 12 }}>可以防止重复请求</h1>
        <RequestAfter />
      </div>
    )
  }
}
