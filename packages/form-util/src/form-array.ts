import { FormControl } from './form-control'
import { FormGroup } from './form-group'
import { FormCommon } from './from-common'

/**
 * 数组型表单
 */
export class FormArray<
  T extends FormGroup<any> | FormArray<any> | FormControl = any
> extends FormCommon<T[]> {
  public formType: 'control' | 'group' | 'array' = 'array'
  constructor(config: T[]) {
    super(config)
  }
}
