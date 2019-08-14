import { FormControl } from './form-control'
import { FormGroup } from './form-group'
import { FormCommon } from './from-common'

/**
 * 数组型表单
 */
export class FormArray extends FormCommon {
  public formType: 'control' | 'group' | 'array' = 'array'
  constructor(config: Array<FormGroup | FormArray | FormControl>) {
    super(config)
  }
}
