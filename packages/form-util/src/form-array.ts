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

  /**
   * @deprecated config.map
   * @param cb 
   */
  public map(cb: any) {
    return this.config.map(cb)
  }

  /**
   * @deprecated config.push()
   * 添加新的表单
   */
  public push(item: FormGroup | FormArray | FormControl) {
    this.config.push(item)
  }

  /**
   * @deprecated config.splice(index, 1)
   * @param index 下标
   */
  public removeAt(index: number) {
    this.config.splice(index, 1)
  }
}
