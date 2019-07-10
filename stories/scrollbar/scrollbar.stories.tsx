import { color, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Scrollbars from '../../packages/scrollbar/src'

storiesOf('scrollbars 滚动', module)
  .addDecorator(withKnobs)
  .add('基本', () => {
    return (
      <div style={{ width: 500 }}>
        <Scrollbars
          scrollBarColor={color('scrollBarColor', '#d1d1d1')}
          style={{ height: 400 }}>
          <div style={{ height: 900 }}>dddd</div>
        </Scrollbars>
      </div>
    )
  })
  .add('完全自定义', () => {
    return (
      <div style={{ width: 500 }}>
        <Scrollbars
          verticalBarStyle={{ borderRadius: 5, width: 10 }}
          scrollBarColor={color('scrollBarColor', '#d1d1d1')}
          style={{ height: 400 }}>
          <div style={{ height: 900 }}>dddd</div>
        </Scrollbars>
      </div>
    )
  })
