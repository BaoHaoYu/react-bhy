import classnames from 'classnames'
import * as React from 'react'
import { Transition } from 'react-transition-group'
import { IAnimateProps } from './index.interface'
// @ts-ignore
import s from './style/index.scss'
import buildCss from './util/buildCss'

class Animate extends React.Component<IAnimateProps> {
  public static defaultProps: Partial<IAnimateProps>

  public state = { timeout: this.props.enterTime }

  public transitionStyle = () => ({
    entered: buildCss(
      'transition',
      `all ${this.props.enterTime}ms ease-in-out`,
    ),
    exiting: buildCss(
      'transition',
      `all ${this.props.levelTime}ms ease-in-out`,
    ),
  })

  /**
   * unmounted exited entering entered exiting
   * @param status
   */
  public renderTransitionChildren = (
    status: 'unmounted' | 'exited' | 'entering' | 'entered' | 'exiting',
  ) => {
    const props: IAnimateProps = this.props
    const className = classnames(
      s[status],
      props.className,
      ...(props.animateKey as string[]).map((key) => {
        return s[key]
      }),
    )
    const style = {
      ...this.transitionStyle()[status],
      ...props.style,
    }

    return (
      <div className={className} style={style}>
        {props.children}
      </div>
    )
  }

  public render() {
    const props: IAnimateProps = this.props
    return (
      <Transition
        onEnter={props.onEnter}
        onExited={props.onExited}
        mountOnEnter={props.mountOnEnter}
        unmountOnExit={props.unmountOnExit}
        in={props.show}
        timeout={
          props.show ? (props.enterTime as number) : (props.levelTime as number)
        }
      >
        {this.renderTransitionChildren}
      </Transition>
    )
  }
}

Animate.defaultProps = {
  enterTime: 300,
  levelTime: 300,
  mountOnEnter: true,
  unmountOnExit: true,
  exitedRender: true,
  animateKey: ['fade'],
  style: {},
}

export { IAnimateProps, Animate }

export default Animate
