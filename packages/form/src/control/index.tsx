import classnames from 'classnames'
import { defaultTo } from 'lodash-es'
import * as React from 'react'
import { FaAsterisk } from 'react-icons/fa'
import { IFormControlProps } from './index.interface'
// @ts-ignore
import s from './style/index.scss'

export * from './index.interface'

const NAME = 'form-control'

export const FormControl: React.FunctionComponent<IFormControlProps> = (
  props,
) => {
  /**
   * 设置表格样式
   */
  const setTabelStyle = (): React.CSSProperties => {
    const isTable = props.layout === 'x' && !props.single

    if (isTable) {
      return {
        display: 'table-cell',
        verticalAlign: 'baseline',
      }
    }
    return {}
  }

  /**
   * label标签
   */
  const renderLabel = (): React.ReactNode | void => {
    if (props.showLabel) {
      const isTable = props.layout === 'x' && !props.single
      let width = defaultTo(props.labelWidth, props.labelContainWidth)
      if (isTable) {
        width = defaultTo(width, 1)
      }
      const asterisk = props.require && (
        <span style={{ marginRight: 4 }}>
          <FaAsterisk size={props.asteriskSize} color={props.asteriskColor} />
        </span>
      )
      return (
        <label
          style={{ ...setTabelStyle(), width }}
          className={s[NAME + '__label']}
        >
          {asterisk}
          <span>
            {props.label}
            {props.layout !== 'y' && '：'}
          </span>
        </label>
      )
    }
  }

  /**
   * 渲染内容
   */
  const renderContent = (): React.ReactNode => {
    return (
      <div style={{ ...setTabelStyle() }} className={s[NAME + '__content']}>
        {props.children}

        {/* 警告 */}
        {renderError()}
      </div>
    )
  }

  /**
   * 错误信息
   */
  const renderError = (): React.ReactNode | void => {
    if (props.error) {
      return <p className={s[NAME + '__errorText']}>{props.error}</p>
    }
  }

  const rootClassName = classnames(
    s[NAME + ''],
    s[NAME + '--layout-' + props.layout],
    {
      [s[NAME + '--single']]: props.single,
    },
  )

  if (props.single) {
    return (
      <div
        className={rootClassName}
        style={{ ...props.style, height: props.height }}
      >
        <div className={s[NAME + '__contain']}>
          {/* label */}
          {renderLabel()}

          {/* 子组件 */}
          {renderContent()}
        </div>
      </div>
    )
  }
  return (
    <div
      className={rootClassName}
      style={{ ...props.style, height: props.height }}
    >
      {/* label */}
      {renderLabel()}

      {/* 渲染内容 */}
      {renderContent()}
    </div>
  )
}

FormControl.defaultProps = {
  layout: 'x',
  showLabel: true,
  single: true,
  require: false,
  asteriskColor: 'red',
  asteriskSize: 10,
}

FormControl.displayName = '表单控制'
