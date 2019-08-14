import { FormArray } from './form-array'
import { FormControl } from './form-control'
import { FormCommon } from './from-common'

export class FormGroup extends FormCommon {
  public formType: 'control' | 'group' | 'array' = 'group'
  constructor(config: Record<string, FormControl | FormGroup | FormArray>) {
    super(config)
  }
}
