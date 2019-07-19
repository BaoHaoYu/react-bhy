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
    const enterTime = number('enterTime', Animate.defaultProps.enterTime!)
    const levelTime = number('levelTime', Animate.defaultProps.levelTime!)

    return (
      <div>
        <Animate show={fade} enterTime={enterTime} levelTime={levelTime}>
          <p>fade:ddddddddddd</p>
        </Animate>

        <Animate
          unmountOnExit={false}
          show={moveX}
          animateKey={['moveX']}
          enterTime={enterTime}
          levelTime={levelTime}
        >
          <p>moveX:ddddddddddd</p>
        </Animate>

        <Animate
          show={fadeAndMoveX}
          animateKey={['moveX', 'fade']}
          enterTime={enterTime}
          levelTime={levelTime}
        >
          <p>moveX and fade:ddddddddddd</p>
        </Animate>

        <Animate
          show={fadeAndMoveY}
          animateKey={['moveY', 'fade']}
          enterTime={enterTime}
          levelTime={levelTime}
        >
          <p>moveY and fade:ddddddddddd</p>
        </Animate>
      </div>
    )
  })
