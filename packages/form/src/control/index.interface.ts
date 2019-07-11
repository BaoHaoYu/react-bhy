import * as React from 'react'

export interface IFormControlProps {
  /**
   * 是否必填
   */
  require?: boolean

  /**
   * 是否可以编辑
   */
  disabled?: boolean

  /**
   * label
   */
  label?: string

  /**
   * 是否显示label
   */
  showLabel?: boolean

  /**
   * 星号图标颜色
   */
  asteriskColor?: string

  /**
   * 星号图标尺寸
   */
  asteriskSize?: number

  /**
   * 水平排布，或者垂直排布
   */
  layout?: 'x' | 'y'

  /**
   * 高度
   */
  height?: any

  /**
   * 宽度
   */
  width?: number

  /**
   * 是否单个(脱离表单，单独使用)
   */
  single?: boolean

  /**
   * 错误提示
   */
  error?: string | null

  /**
   * 样式
   */
  formControlCssModule?: React.CSSProperties

  /**
   * 被控制的内容
   */
  children?: any

  /**
   * @deprecated 请使用labelWidth label容器的宽度
   */
  labelContainWidth?: number

  /**
   * label容器的宽度
   */
  labelWidth?: number | string

  /**
   * 样式
   */
  style?: React.CSSProperties
}
