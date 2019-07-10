import * as React from 'react'
import { FormControlUtil } from '../../packages/form-util/src'
import { FormControl, IFormControlProps } from '../../packages/form/src'

interface IProps extends IFormControlProps {
  control: FormControlUtil
  onChange: any
}

export function FormItem(props: IProps) {
  const onChange = (e: any) => props.onChange(e, props.control)
  return (
    <FormControl
      {...props}
      error={props.control.error}
      label={props.control.label}>
      <input
        type={'text'}
        value={props.control.getValue()}
        onChange={onChange}
        style={{ borderRadius: 3, padding: 4 }}
      />
    </FormControl>
  )
}
