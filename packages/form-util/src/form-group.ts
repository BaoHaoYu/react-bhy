import { FormArray } from './form-array'
import { FormControl } from './form-control'
import { FormCommon } from './from-common'

export class FormGroup<
  T extends Record<keyof T, FormGroup<any> | FormArray<any> | FormControl> = any
> extends FormCommon<T> {
  public formType: 'control' | 'group' | 'array' = 'group'
  constructor(config: T) {
    super(config)
  }
}
