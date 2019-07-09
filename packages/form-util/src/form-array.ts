import { FormControl } from './form-control'
import { FormGroup } from './form-group'
import { FormCommom } from './from-commom'
type Config = Array<FormGroup | FormArray | FormControl>

/**
 * 数组型表单
 */
export class FormArray extends FormCommom<Config> {
  public formType: 'control' | 'group' | 'array' = 'array'
  public config: Config = []
  constructor(config: Config) {
    super(config)
  }

  public map(cb: any) {
    return this.config.map(cb)
  }

  /**
   * 添加新的表单
   */
  public push(item: FormGroup | FormArray | FormControl) {
    this.config.push(item)
  }

  /**
   * 移除表单
   * @param index 下标
   */
  public removeAt(index: number) {
    this.config.splice(index, 1)
  }

  public setControl() {
    return
  }
}
