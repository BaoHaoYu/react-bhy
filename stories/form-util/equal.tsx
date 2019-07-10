import * as React from 'react'
import {
  beEqual,
  equal,
  FormControlUtil,
  FormGroupUtil,
  minLength,
  need,
} from '../../packages/form-util/src'
import { FormItem } from './form-item'
export class Equal extends React.Component<any> {
  public state: {
    form: FormGroupUtil
  }
  constructor(props: any) {
    super(props)
    const password1 = new FormControlUtil([need(), minLength(8)], '', '密码')
    const password2 = new FormControlUtil([need()], '', '再次输入密码')

    password1.addValidatorFn(beEqual(password2))
    password2.addValidatorFn(equal(password1))

    this.state = {
      form: new FormGroupUtil({
        password1,
        password2,
      }),
    }
  }

  /**
   * 表单的值发生改变
   * @param e
   * @param control
   */
  public onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    control: FormControlUtil,
  ) => {
    control.setValue(e.target.value)
    this.setState(this.state)
  }

  public render() {
    return (
      <div>
        <FormItem
          control={this.state.form.get('password1')}
          onChange={this.onChange}
        />

        <FormItem
          control={this.state.form.get('password2')}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
