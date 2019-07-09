import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Base } from './base'
import { Equal } from './equal'
storiesOf('表单数据分离', module)
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
