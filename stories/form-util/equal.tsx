import * as React from 'react'
import {
  beEqual,
  equal,
  FormControl,
  FormGroup,
  minLength,
  need,
} from '../../packages/form-util/src'
import { FormItem } from './form-item'
export class Equal extends React.Component<any> {
  public state: {
    form: FormGroup
  }
  constructor(props: any) {
    super(props)
    const password1 = new FormControl([need(), minLength(8)], '', '密码')
    const password2 = new FormControl([need()], '', '再次输入密码')

    password1.addValidatorFn(beEqual(password2))
    password2.addValidatorFn(equal(password1))

    this.state = {
      form: new FormGroup({
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
    control: FormControl,
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
