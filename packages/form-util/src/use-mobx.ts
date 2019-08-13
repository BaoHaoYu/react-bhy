import { action, computed, decorate, observable } from 'mobx'
import { FormControl } from './form-control'
import { FormCommon } from './from-common'

decorate(FormControl, {
  error: observable,
  formType: observable,
  label: observable,
  pass: observable,
  validatorFn: observable,
  value: observable,

  addValidatorFn: action,
  setError: action,
  setValue: action,
  verify: action,
})

decorate(FormCommon, {
  config: observable,
  verify: action,
  value: computed,
})
