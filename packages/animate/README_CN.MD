<!-- toc -->
- [安装](#%e5%ae%89%e8%a3%85)
- [特点](#%e7%89%b9%e7%82%b9)
- [简单例子](#%e7%ae%80%e5%8d%95%e4%be%8b%e5%ad%90)
- [props extends Partial<TransitionProps>](#props-extends-partialtransitionprops)
- [动画的状态](#%e5%8a%a8%e7%94%bb%e7%9a%84%e7%8a%b6%e6%80%81)
- [animateKey](#animatekey)
<!-- tocstop -->

## 安装
**yarn**  
`yarn add @react-efficiency/animate`

**npm**  
`npm install @react-efficiency/animate --save`

## 特点
对`transition all {time}ms ease-in-out`的时间动态生成

## 简单例子
```tsx
import Animate from '@react-efficiency/animate'
import * as React from 'react'

export const Demo: React.FunctionComponent<any> = () => {
  const [state, setState] = React.useState({ in: false })

  const startAnimate = () => {
    setState({ in: !state.in })
  }

  return (
    <div>
      <Animate in={state.in} animateKey={['fade']}>
        <div>content</div>
      </Animate>

      <button onClick={startAnimate}>animate</button>
    </div>
  )
}
```

## props extends Partial<TransitionProps>
| props            | type     | desc                                            |
| :--------------- | :------- | :---------------------------------------------- |
| animateKey       | string[] | 动画键，可以组合，[参考animateKey](#animateKey) |
| animateCssModule | object   | cssModule                                       |

其他props参考[TransitionProps](https://reactcommunity.org/react-transition-group/css-transition)

## 动画的状态
参考[TransitionProps](https://reactcommunity.org/react-transition-group/css-transition)
- `entered`
- `entering`
- `exited`
- `exiting`
- `unmounted`

## animateKey
对每个状态进行css定义
```scss
.animateKey {
  opacity: 0;
 
  &.animateKey--entering {
    opacity: 0;
  }

  &.animateKey--entered {
    opacity: 1;
  }
}
```