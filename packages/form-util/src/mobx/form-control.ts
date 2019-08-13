import { action, observable } from 'mobx'
import { IResult, ValidatorFn } from '../validator'
/**
 * 最小块的表单
 */
export class FormControl {
  @observable public formType: 'control' | 'group' | 'array' = 'control'

  /**
   * 是否通过验证
   */
  @observable public pass: boolean = true

  /**
   * 表单值
   */
  @observable public value: any

  /**
   * 标签文本
   */
  @observable public label?: string = ''

  /**
   * 验证函数
   */
  @observable public validatorFn: ValidatorFn[]

  /**
   * 第一个错误
   */
  @observable public error?: string | null

  /**
   * 验证结果，每个验证函数对应一个结果
   */
  @observable public verifyResult?: IResult[]
  /**
   * 最小块的表单
   * @param validatorFn 验证函数
   * @param value 初始化值
   * @param label 标签,用于错误提示
   */
  constructor(validatorFn: ValidatorFn[], value?: any, label?: string) {
    this.validatorFn = validatorFn
    this.value = value
    this.label = label
  }

  /**
   * 验证函数，会对IResult.error中的[label]字符进行替换
   */
  @action public verify(): IResult[] {
    const verifyResult: IResult[] = []

    // 循环所有的验证函数，保存每个验证函数的验证结果
    this.validatorFn.forEach((validatorFn) => {
      const result = validatorFn(this.value)
      if (result.error) {
        result.error = result.error.replace('[label]', this.label || '')
      }
      verifyResult.push(result)
    })

    // 找到第一个没有验证的通过
    const findNotPass = verifyResult.find((v) => !v.pass)

    // 保存第一个没有验证通过的结果，因为多个验证函数没有通过验证，则显示第一个
    if (!findNotPass) {
      this.error = null
      this.pass = true
    } else {
      this.error = findNotPass.error
      this.pass = false
    }

    this.verifyResult = verifyResult

    return verifyResult
  }

  /**
   * 添加新的验证函数
   * @param fn 验证函数
   */
  @action public addValidatorFn(fn: ValidatorFn) {
    this.validatorFn.push(fn)
  }

  /**
   * 设置值
   * @param value 当前值
   */
  @action public setValue(value: any) {
    this.value = value
    this.verify()
  }

  /**
   * 获得值
   */
  public getValue() {
    return this.value
  }

  /**
   * 设置错误提示，如果为null则表示清除错误
   * @param error 错误提示
   */
  @action public setError(error?: string | null) {
    this.error = error
    if (error !== null && error !== undefined) {
      this.pass = false
    } else {
      this.pass = true
    }
  }
}
