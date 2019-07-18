import classnames from 'classnames'
import {
  FaAngleDown,
  FaAngleRight,
  FaCheckSquare,
  FaMapMarker,
  FaMinusSquare,
  FaRegSquare,
} from 'react-icons/fa'
import * as NNode from './index.interface'

import * as React from 'react'

// @ts-ignore
import s from './style.scss'

/**
 * 单个节点
 */
class Node extends React.Component<NNode.INodeProps, NNode.IState> {
  public static defaultProps: {
    [P in keyof NNode.INodeProps]?: NNode.INodeProps[P]
  }

  /**
   * 点击节点
   */
  public onClickNode = (): void => {
    const { onClickNode, disabled } = this.props
    !disabled && onClickNode(this.props)
  }

  /**
   * 总体render
   */
  public render() {
    const props = this.props as NNode.IAllNodeProps

    // 根部样式
    const leftSpace =
      (props.deep - 1) * (props.deepSpace as number) +
      (props.leftSpace as number) +
      (props.offsetX as number)

    // 根部className
    const containClassName = classnames(s.row__contain, {
      [s['row--can-oprate']]: props.selectStyle === 'row',
      [s['row--selected']]: props.selectStyle === 'row' && props.selected,
    })
    // 内容className
    const contentClassName = classnames(s.row__content, {
      [s['row--can-oprate']]: props.selectStyle === 'content',
      [s['row--selected']]: props.selectStyle === 'content' && props.selected,
    })
    // 标题className
    const titleClassName = classnames(s.row__title, {
      [s['row--can-oprate']]: props.selectStyle === 'title',
      [s['row--selected']]: props.selectStyle === 'title' && props.selected,
    })

    return (
      <div className={classnames(s.row)}>
        <div
          onClick={this.onClickNode}
          className={containClassName}
          style={{
            position: 'relative',
            height: '100%',
            paddingLeft: leftSpace,
          }}
        >
          <div style={{ height: '100%' }} className={contentClassName}>
            {/*默认触发展开的地方*/}
            <div className={s.row_toggleOpen}>{this.renderOpen()}</div>

            {/*图标*/}
            {this.renderIcon()}

            {/*勾选框*/}
            {this.renderCheck()}

            {/*标题*/}
            <span className={titleClassName}>{props.title}</span>

            {/*定位*/}
            {this.renderLocal()}

            {/*标题的右边*/}
            {props.renderNodeRight && props.renderNodeRight()}
          </div>
        </div>
      </div>
    )
  }

  public onOpen = (e: React.SyntheticEvent<HTMLElement>) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.props.onOpen(this.props)
  }

  /**
   * 打开按钮
   */
  public renderOpen = (): any => {
    if (this.props.renderNodeOpen) {
      return this.props.renderNodeOpen()
    }

    return (
      <span
        className={s.row__open}
        style={{ visibility: this.props.showOpen ? 'visible' : 'hidden' }}
        onClick={this.onOpen}
      >
        {this.props.open ? <FaAngleDown /> : <FaAngleRight />}
      </span>
    )
  }

  /**
   * 图标
   */
  public renderIcon = (): any => {
    if (!this.props.hideIcon) {
      if (this.props.icon) {
        return this.props.icon
      }
      return (
        <i
          style={{ marginRight: this.props.iconSpace }}
          className={classnames(this.props.iconClass)}
        />
      )
    }
  }

  public onCheck = (e: React.SyntheticEvent<HTMLElement>) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.props.onCheck(this.props)
  }
  /**
   * 勾选按钮
   */
  public renderCheck = (): any => {
    if (this.props.checkable) {
      let checkIcon: any
      if (this.props.renderNodeCheck) {
        checkIcon = this.props.renderNodeCheck()
      } else if (!this.props.halfChecked && !this.props.checked) {
        checkIcon = <FaRegSquare />
      } else if (this.props.halfChecked) {
        checkIcon = <FaMinusSquare />
      } else {
        checkIcon = <FaCheckSquare />
      }
      const className = classnames(s.row__checkbox, {
        [s['row__checkbox--checked']]:
          this.props.halfChecked || this.props.checked,
      })
      return (
        <div className={className} onClick={this.onCheck}>
          {checkIcon}
        </div>
      )
    }
  }

  public onClickLocal = (e: React.SyntheticEvent<HTMLElement>) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.props.onClickLocal(this.props)
  }

  /**
   * 定位按钮
   */
  public renderLocal = (): any => {
    if (this.props.isLocaling && this.props.hasLocalBtn) {
      const local = this.props.renderNodeLocal ? (
        this.props.renderNodeLocal()
      ) : (
        <FaMapMarker />
      )
      return (
        <span className={s.ssss} onClick={this.onClickLocal}>
          {local}
        </span>
      )
    }
  }
}

export default Node
