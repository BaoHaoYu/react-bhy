import { FormArray } from './form-array'
import { FormControl } from './form-control'
import { FormCommon } from './from-common'
type Config = Record<string, FormControl | FormGroup | FormArray>

export class FormGroup extends FormCommon<Config> {
  public formType: 'control' | 'group' | 'array' = 'group'
  constructor(config: Config) {
    super(config)
  }
}
