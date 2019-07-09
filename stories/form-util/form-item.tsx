import * as React from 'react'
import { FormControl } from '../../packages/form-util/src'

export function FormItem(props: { control: FormControl; onChange: any }) {
  const onChange = (e: any) => props.onChange(e, props.control)
  return (
    <div style={{ display: 'flex' }}>
      <label>{props.control.label} :</label>
      <div>
        <input
          type="text"
          value={props.control.getValue()}
          onChange={onChange}
        />
        {!props.control.pass && (
          <div style={{ color: 'red' }}>{props.control.error}</div>
        )}
      </div>
    </div>
  )
}
