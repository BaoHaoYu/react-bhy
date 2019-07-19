import * as React from 'react'
import { Transition } from 'react-transition-group'
import { IAnimateProps } from './index.interface'
// @ts-ignore
import s from './style/index.scss'
import { animateClass, transitionStyle } from './util'

const Animate: React.FunctionComponent<IAnimateProps> = (
  props: IAnimateProps,
) => {
  return (
    <Transition {...props} timeout={props.timeout!}>
      {(status) => {
        const className = animateClass(status, props)

        const timeout = props.timeout as {
          appear?: number
          enter?: number
          exit?: number
        }

        return (
          <div
            className={className}
            style={transitionStyle(timeout.enter!, timeout.exit!)[status]}
          >
            {props.children}
          </div>
        )
      }}
    </Transition>
  )
}

Animate.defaultProps = {
  mountOnEnter: true,
  unmountOnExit: true,
  animateKey: ['fade'],
  timeout: {
    enter: 300,
    exit: 300,
  },
}

export { IAnimateProps, Animate }

export default Animate
