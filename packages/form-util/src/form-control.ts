import { IResult, ValidatorFn } from './validator'

/**
 * 最小块的表单
 */
export class FormControl {
  public formType: 'control' | 'group' | 'array' = 'control'

  /**
   * 是否通过验证
   */
  public pass: boolean = true

  /**
   * 表单值
   */
  public value: any

  /**
   * 标签文本
   */
  public label?: string = ''

  /**
   * 验证函数
   */
  public validatorFn: ValidatorFn[]

  /**
   * 第一个错误
   */
  public error?: string | null

  /**
   * 验证结果，每个验证函数对应一个结果
   */
  public verifyResult?: IResult[]
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
   * 验证函数
   */
  public verify(): IResult[] {
    const verifyResult: IResult[] = []

    this.validatorFn.forEach((validatorFn) => {
      const result = validatorFn(this.value)
      if (result.error) {
        result.error = result.error.replace('[label]', this.label || '')
      }
      verifyResult.push(result)
    })

    // 找到第一个没有验证的通过
    const findNotPass = verifyResult.find((v) => !v.pass)

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
  public addValidatorFn(fn: ValidatorFn) {
    this.validatorFn.push(fn)
  }

  /**
   * 设置值
   * @param value 当前值
   */
  public setValue(value: any) {
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
   * 设置错误提示
   * @param error 错误提示
   */
  public setError(error: string) {
    this.error = error
    if (error !== null || error !== undefined) {
      this.pass = false
    } else {
      this.pass = true
    }
  }
}
