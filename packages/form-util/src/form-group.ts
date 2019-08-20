import { FormArray } from './form-array'
import { FormCommon } from './form-common'
import { FormControl } from './form-control'

export class FormGroup<
  T extends Record<keyof T, FormGroup<any> | FormArray<any> | FormControl> = any
> extends FormCommon<T> {
  public formType: 'control' | 'group' | 'array' = 'group'
  constructor(config: T) {
    super(config)
  }
}
