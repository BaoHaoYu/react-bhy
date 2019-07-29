import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import 'normalize.css'
import * as React from 'react'
import { Base } from './simple'

storiesOf('form-util 表单数据分离', module)
  .addDecorator(withKnobs)
  .add('基础', () => {
    return (
      <div>
        <Base />
      </div>
    )
  })
