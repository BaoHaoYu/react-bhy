import * as uitl from '@react-efficiency/form-util'
import { action, computed, decorate, observable } from 'mobx'
export * from '@react-efficiency/form-util'

decorate(uitl.FormControlUtil, {
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

decorate(uitl.FormCommonUtil, {
  config: observable,
  verify: action,
  value: computed,
})
