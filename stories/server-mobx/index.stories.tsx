import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { GetData } from './page-base/demo.component-getdata'
import { Error } from './page-base/demo.error'
import { Main } from './page-base/demo.main'
storiesOf('server-mobx 服务请求', module)
  .addDecorator(withKnobs)
  .add('1.基础', () => {
    return (
      <div>
        <Main />
      </div>
    )
  })
  .add('2.点击按钮获得数据', () => {
    return <GetData />
  })
  .add('3.处理错误数据', () => {
    return <Error />
  })
  .add('4.自定义错误', () => {
    return <div />
  })
