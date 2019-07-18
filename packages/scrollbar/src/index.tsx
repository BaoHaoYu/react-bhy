import { isFunction } from 'lodash-es'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import * as uuid from 'uuid'
import { IScrollbarsProps, IState, TChildrenFunc } from './index.interface'
// @ts-ignore
import s from './style.scss'

/**
 * 封装滚动组件
 */
class MyScrollbars extends React.Component<IScrollbarsProps, IState> {
  public static defaultProps: Partial<IScrollbarsProps> = {
    scrollBarColor: '#bababa',
  }

  public state: IState = {
    didMount: false,
    scrollElement: null,
  }

  public id = uuid.v4()

  public componentDidMount() {
    const props: IScrollbarsProps = this.props
    const scrollElement = (document.getElementById(this.id) as HTMLElement)
      .children[0]
    this.setState({ didMount: true, scrollElement })
    props.didMount && props.didMount({ scrollElement })
  }

  public renderChildren = (
    props: IScrollbarsProps,
  ): React.ReactNode | undefined => {
    if (this.state.didMount && this.state.scrollElement) {
      if (isFunction(props.children)) {
        return props.children({ scrollElement: this.state.scrollElement })
      }
      return props.children
    }
    return
  }

  /**
   * 水平滚动条
   * @param p
   */
  public renderThumbHorizontal = (p: any) => {
    const style = {
      backgroundColor: this.props.scrollBarColor,
      ...p.style,
      ...this.props.horizontalBarStyle,
    }
    return <div {...p} className={`${s.scrollbar__bar}`} style={style} />
  }

  /**
   * 垂直滚动条
   * @param p
   */
  public renderThumbVertical = (p: any) => {
    const style = {
      backgroundColor: this.props.scrollBarColor,
      ...p.style,
      ...this.props.verticalBarStyle,
    }
    return <div {...p} className={`${s.scrollbar__bar}`} style={{ ...style }} />
  }

  public render() {
    const props: IScrollbarsProps = this.props
    return (
      <Scrollbars
        id={this.id}
        renderThumbVertical={this.renderThumbVertical}
        renderThumbHorizontal={this.renderThumbHorizontal}
        {...this.props}
      >
        {this.renderChildren(props)}
      </Scrollbars>
    )
  }
}

export { TChildrenFunc, IScrollbarsProps }

export default MyScrollbars
