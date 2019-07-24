import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { ProviderRoot } from '../store'
import PageAsyncGetData from './page-async-getdata'
import PageBase from './page-base'
import PageCommonError from './page-common-error'
import PageHandleError from './page-handle-error'
storiesOf('build-page 页面快速搭建', module)
  .addDecorator(withKnobs)
  .addDecorator(ProviderRoot)
  .add('1.基础', () => {
    return (
      <div>
        <PageBase />
      </div>
    )
  })
  .add('2.点击按钮获得数据', () => {
    return (
      <div>
        <PageAsyncGetData />
      </div>
    )
  })
  .add('3.处理错误数据', () => {
    return (
      <div>
        <PageHandleError />
      </div>
    )
  })
  .add('4.自定义错误', () => {
    return (
      <div>
        <PageCommonError />
      </div>
    )
  })
