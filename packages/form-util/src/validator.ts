import { FormControl } from './form-control'

type Locale = 'en' | 'zh_cn'

let locale = 'en'

const errorText: Record<
  Locale,
  {
    need: string
    maxLength: string
    minLength: string
    isNumber: string
    regExp: string
    regExpReverse: string
    equal: string
  }
> = {
  en: {
    need: '[label] required',
    maxLength: '[label] maximum length cannot exceed [maxLength] characters',
    minLength:
      '[label] minimum length cannot be less than [minLength] characters',
    isNumber: '[label] must be a number',
    regExp: '[label] is not in the right format',
    regExpReverse: '[label] is not in the right format',
    equal: '[label] and [equalLabel] must be the same',
  },
  zh_cn: {
    need: '[label]必填',
    maxLength: '[label]最大长度不可超过[maxLength]个字符',
    minLength: '[label]最小长度不可少于[minLength]个字符',
    isNumber: '[label]必须是数字',
    regExp: '[label]格式不对',
    regExpReverse: '[label]格式不对',
    equal: '[label]和[equal]必须相同',
  },
}

export function setLocalization(_locale: Locale) {
  locale = _locale
}

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
export const need = (error = errorText[locale].need): ValidatorFn => (
  value: any,
) => {
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
  error: string = errorText[locale].maxLength,
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
  error: string = errorText[locale].minLength,
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
export const isNumber = (
  error: string = errorText[locale].isNumber,
): ValidatorFn => (value: any) => {
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
  error: string = errorText[locale].regExp,
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
  error: string = errorText[locale].regExpReverse,
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
  error: string = errorText[locale].equal,
): ValidatorFn => (value: any) => {
  const pass = value === control.value
  return {
    pass,
    type: 'equal',
    error: !pass ? error.replace('equalLabel', control.label || '') : null,
  }
}

/**
 * 等值验证，被谁相等，修改值得时候，都会触发 被相等的表单 的验证函数
 * @param control 被相等的表单控制
 * @param error 错误提示
 */
export const beEqual = (control: FormControl): ValidatorFn => (value: any) => {
  control.verify()
  return {
    pass: true,
    type: 'beEqual',
    error: null,
  }
}
