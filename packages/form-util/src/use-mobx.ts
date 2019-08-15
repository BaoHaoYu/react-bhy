import { action, computed, decorate, observable } from 'mobx'
import { FormCommonUtil, FormControlUtil } from '../src'

export function useMobx() {
  decorate(FormControlUtil, {
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

  decorate(FormCommonUtil, {
    config: observable,
    verify: action,
    value: computed,
  })
}
