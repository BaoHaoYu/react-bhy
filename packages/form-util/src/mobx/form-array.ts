import { action, observable } from 'mobx'
import { FormControl } from './form-control'
import { FormGroup } from './form-group'
import { FormCommon } from './from-common'
type Config = Array<FormGroup | FormArray | FormControl>

/**
 * 数组型表单
 */
export class FormArray extends FormCommon<Config> {
  public formType: 'control' | 'group' | 'array' = 'array'
  @observable public config: Config = []
  constructor(config: Config) {
    super(config)
  }
}
