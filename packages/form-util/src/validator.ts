import { FormControl } from './form-control'

/**
 * 验证结果
 */
export interface IResult {
  /**
   * 是否通过验证
   */
  pass: boolean
  /**
   * 验证类型，如need,maxLength,minLength等等
   */
  type: string
  /**
   * 错误信息
   */
  error?: string | null
}

/**
 * 验证函数，对value进行验证，然后返回结果
 */
export type ValidatorFn = (value: any) => IResult

/**
 * 必填验证，如果需要修改默认的提示，则
 * const newNeed = （） => need(newDefaultError)
 * @param error 错误提示
 */
export const need = (error = '[label]必填'): ValidatorFn => (value: any) => {
  const pass = `${value}`.length !== 0
  return {
    pass,
    type: 'need',
    error: !pass ? error : null,
  }
}

/**
 * 最大长度验证
 * @param max 最大长度
 * @param error 错误提示
 */
export const maxLength = (
  max: number,
  error: string = '[label]最大长度不可超过[maxLength]个字符',
): ValidatorFn => (value: any) => {
  const pass = `${value}`.length <= max
  return {
    pass,
    type: 'maxLength',
    error: !pass ? error.replace('[maxLength]', max.toString()) : null,
  }
}

/**
 * 最小长度验证
 * @param min 最小长度
 * @param error 错误提示
 */
export const minLength = (
  min: number,
  error: string = '[label]最小长度不可少于[minLength]个字符',
): ValidatorFn => (value: any) => {
  const pass = `${value}`.length >= min
  return {
    pass,
    type: 'minLength',
    error: !pass ? error.replace('[minLength]', min.toString()) : null,
  }
}

/**
 * 数字验证
 * @param error 错误提示
 */
export const isNumber = (error: string = '[label]必须是数字'): ValidatorFn => (
  value: any,
) => {
  const pass = /^\d+$/.test(value.toString())
  return {
    pass,
    type: 'isNumber',
    error: !pass ? error : null,
  }
}

/**
 * 正则表达式验证，通过表示正确
 * @param reg 正则表达式
 * @param error 错误提示
 */
export const regExp = (
  reg: RegExp,
  error: string = '[label]格式不对',
): ValidatorFn => (value: any) => {
  const pass = reg.test(value.toString())
  return {
    pass,
    type: 'regExp',
    error: !pass ? error : null,
  }
}

/**
 * 正则表达式验证，通过表示错误
 * @param reg 正则表达式
 * @param error 错误提示
 */
export const regExpReverse = (
  reg: RegExp,
  error: string = '[label]格式不对',
): ValidatorFn => (value: any) => {
  const pass = reg.test(value.toString())
  return {
    pass: !pass,
    type: 'regExpReverse',
    error: pass ? error : null,
  }
}

/**
 * 等值验证，等于谁
 * @param control 要等于的表单控制
 * @param error 错误提示
 */
export const equal = (
  control: FormControl,
  error: string = `[label]和${control.label}必须相同`,
): ValidatorFn => (value: any) => {
  const pass = value === control.value
  return {
    pass,
    type: 'equal',
    error: !pass ? error : null,
  }
}

/**
 * 等值验证，被谁相等，修改值得时候，都会触发 被相等的表单 的验证函数
 * @param control 被相等的表单控制
 * @param error 错误提示
 */
export const beEqual = (
  control: FormControl,
): ValidatorFn => (value: any) => {
  control.verify()
  return {
    pass: true,
    type: 'beEqual',
    error: null,
  }
}
