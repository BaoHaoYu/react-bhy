import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import 'normalize.css'
import * as React from 'react'
import { Equal } from './component/equal'
import { Base } from './component/simple'
import { WidthMobx } from './component/width-mobx'

storiesOf('form-util 表单数据分离', module)
  .addDecorator(withKnobs)
  .add('基础', () => {
    return (
      <div>
        <Base />
      </div>
    )
  })
  .add('等值验证', () => {
    return (
      <div>
        <Equal />
      </div>
    )
  })
  .add('和mobx一起用', () => {
    return (
      <div>
        <WidthMobx />
      </div>
    )
  })
