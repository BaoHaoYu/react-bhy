import * as React from 'react'
import { IFormControlProps } from '../control'

export interface IFormProps {
  /**
   * 通用Props
   */
  formControlProps?: IFormControlProps

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
