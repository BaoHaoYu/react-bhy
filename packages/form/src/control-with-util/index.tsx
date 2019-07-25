import { FormControlUtil } from '@react-efficiency/form-util'
import * as React from 'react'
import { FormControl, IFormControlProps } from '../control'
export interface IFormControlWithUtilProps extends IFormControlProps {
  formControlUtil: FormControlUtil
}

export const FormControlWithUtil: React.FunctionComponent<
  IFormControlWithUtilProps
> = (props) => {
  return (
    <FormControl
      {...props}
      label={props.formControlUtil.label}
      error={props.formControlUtil.error}
    />
  )
}
