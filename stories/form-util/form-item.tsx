import * as React from 'react'
import { FormControl } from '../../packages/form-util/src'

export function FormItem(props: {
  control: FormControl
  onChange: any
  labelWidth?: number
  height?: number
}) {
  const onChange = (e: any) => props.onChange(e, props.control)
  return (
    <div style={{ height: props.height }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: props.labelWidth }}>
          {props.control.label} :
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={props.control.getValue()}
            onChange={onChange}
            style={{ borderRadius: 3, padding: 4 }}
          />
          {!props.control.pass && (
            <div
              style={{
                color: 'red',
                fontSize: 12,
                position: 'absolute',
                top: '100%',
              }}>
              {props.control.error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
