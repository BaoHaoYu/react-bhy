import * as React from 'react'
import { IFormControlProps } from '../control'

export interface IReduxProps {
  changeInit?: any

  toTrueInit?: any
}

export interface IFormProps {
  /**
   * 通用Props
   */
  formControlProps?: IFormControlProps & IReduxProps

  /**
   * 最后的一个表单自适应高度
   */
  lastAutoHeight?: boolean

  /**
   * 样式
   */
  style?: React.CSSProperties

  /**
   * 底部的元素
   */
  footer?: any

  /**
   * react的children
   */
  children: any
}
