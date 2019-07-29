## Installation
**yarn**
`yarn add @react-efficiency/animate`

**npm**
`npm install @react-efficiency/animate --save`

## Features
Time dynamic generation of `transition all {time}ms ease-in-out`

## Simple example
```tsx
import Animate from '@react-efficiency/animate'
import * as React from 'react'

export const Demo: React.FunctionComponent<any> = () => {
  Const [state, setState] = React.useState({ in: false })

  Const startAnimate = () => {
    setState({ in: !state.in })
  }

  Return (
    <div>
      <Animate in={state.in} animateKey={['fade']}>
        <div>content</div>
      </Animate>

      <button onClick={startAnimate}>animate</button>
    </div>
  )
}
```

## Props extends Partial<TransitionProps>
| props            | type     | desc                                                                |
| :--------------- | :------- | :------------------------------------------------------------------ |
| animateKey       | string[] | Animated keys, can be combined, [reference animateKey](#animateKey) |
| animateCssModule | object   | cssModule                                                           |

Other props reference [TransitionProps] (https://reactcommunity.org/react-transition-group/css-transition)

## Animation status
Refer to [TransitionProps] (https://reactcommunity.org/react-transition-group/css-transition)
- `entered`
- `entering`
- `exited`
- `exiting`
- `unmounted`

## animateKey
CSS definition for each state
```scss
.animateKey {
  Opacity: 0;
 
  &.animateKey--entering {
    Opacity: 0;
  }

  &.animateKey--entered {
    Opacity: 1;
  }
}
```