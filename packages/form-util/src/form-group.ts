import { FormArray } from './form-array'
import { FormControl } from './form-control'
import { FormCommom } from './from-commom'
type Config = Record<string, FormControl | FormGroup | FormArray>

export class FormGroup extends FormCommom<Config> {
  public formType: 'control' | 'group' | 'array' = 'group'
  constructor(config: Config) {
    super(config)
  }

  public addItem() {
    return
  }

  public removeItem() {
    return
  }

  public setItem() {
    return
  }
}
