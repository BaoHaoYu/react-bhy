import { isArray, map } from 'lodash-es'
import { FormControl } from './form-control'
export class FormCommon {
  public formType: 'control' | 'group' | 'array'

  /**
   * 是否通过验证
   */
  public pass: boolean

  /**
   * 配置
   */
  public config: any
  constructor(config: any) {
    if (config) {
      this.config = config
    } else if (this.formType === 'array') {
      this.config = []
    } else if (this.formType === 'group') {
      this.config = {}
    }
  }
  /**
   * 验证当前表单
   */
  public verify() {
    const resultObj = {}
    let pass = true
    map(this.config, (value: FormCommon, key: string) => {
      resultObj[key] = value.verify()

      // 一个有错，则全部错误
      if (value.formType === 'control' && !value.pass) {
        pass = false
      }
    })

    this.pass = pass

    return resultObj
  }

  /**
   * 根据键获得表单类
   * @param keyPatch 路径
   */

  public get<K extends FormCommon>(...key: any[]): K | FormControl {
    const _keyPath = [...key]
    const _getIn = (config: any): any => {
      const firstKey = _keyPath.shift()

      if (_keyPath.length !== 0) {
        return _getIn(config[firstKey].config)
      }
      return config[firstKey]
    }
    return _getIn(this.config)
  }

  /**
   * 获得表单的值
   */
  public get value(): any {
    /**
     * 深度遍历表单配置，获得表单的值
     * @param config 配置
     * @param formType 表单类型
     */
    const _getValue = (
      config: any,
      formType: 'control' | 'group' | 'array',
    ): any => {
      // 根据类型的不同，封装数据也是不同的
      const form = formType === 'array' ? [] : {}
      // 遍历配置，每个元素可能是 FormControlUtil ，FormGroupUtil , FormArrayUtil
      map(config, (item, key: string | number) => {
        // 如果是最基础的控制 FormControlUtil，则直接获取其value封装到form中
        if (item.formType === 'control') {
          if (isArray(form)) {
            form.push(item.value)
          } else {
            form[key] = item.value
          }
        }
        // 继续递归遍历
        else {
          if (isArray(form)) {
            form.push(_getValue(item.config, item.formType))
          } else {
            form[key] = _getValue(item.config, item.formType)
          }
        }
      })
      return form
    }

    return _getValue(this.config, this.formType)
  }

  /**
   * 深度为control设置值
   * @param value 要设置的值
   */
  public setValue(value: any) {
    function _setValue(_config: any, _value: any) {
      map(_config, (item, key: string | number) => {
        if (_value[key]) {
          if (item.formType === 'control') {
            item.setValue(_value[key])
          } else {
            _setValue(item.config, _value[key])
          }
        }
      })
    }

    _setValue(this.config, value)
  }
}
