import { boolean, number, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Animate from '../../packages/animate/src'
storiesOf('animate 动画', module)
  .addDecorator(withKnobs)
  .add('基础', () => {
    const fade = boolean('fade', false)
    const moveX = boolean('moveX', false)
    const fadeAndMoveX = boolean('fade and moveX', false)
    const fadeAndMoveY = boolean('fade and MoveY', false)
    const enterTime = number('enterTime', 300)
    const levelTime = number('levelTime', 300)

    return (
      <div>
        <Animate in={fade} timeout={{ enter: enterTime, exit: levelTime }}>
          <p>fade:ddddddddddd</p>
        </Animate>

        <Animate
          unmountOnExit={false}
          in={moveX}
          animateKey={['moveX']}
          timeout={{ enter: enterTime, exit: levelTime }}
        >
          <p>moveX:ddddddddddd</p>
        </Animate>

        <Animate
          in={fadeAndMoveX}
          animateKey={['moveX', 'fade']}
          timeout={{ enter: enterTime, exit: levelTime }}
        >
          <p>moveX and fade:ddddddddddd</p>
        </Animate>

        <Animate
          in={fadeAndMoveY}
          animateKey={['moveY', 'fade']}
          timeout={{ enter: enterTime, exit: levelTime }}
        >
          <p>moveY and fade:ddddddddddd</p>
        </Animate>
      </div>
    )
  })
