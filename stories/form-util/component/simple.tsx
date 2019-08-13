import * as React from 'react'

import {
  FormArrayUtil,
  FormControlUtil,
  FormGroupUtil,
  isNumber,
  maxLength,
  need,
  regExp,
  regExpReverse,
  setLocalization,
} from '@react-efficiency/form-util/src'
import {
  Form,
  FormControl,
  FowRow,
  IFormControlProps,
} from '../../../packages/form/src'

setLocalization('zh_cn')

interface IProps extends IFormControlProps {
  control: FormControlUtil
  onChange: any
}
const cardStyle = {
  border: '1px solid #d0d0d0',
  borderRadius: 5,
  padding: 10,
  width: 360,
  boxShadow: '1px 1px 5px 1px #d0d0d0',
}

function FormItem(props: IProps) {
  const onChange = (e: any) => props.onChange(e, props.control)
  return (
    <FormControl
      {...props}
      error={props.control.error}
      label={props.control.label}
    >
      <input
        type={'text'}
        value={props.control.getValue()}
        onChange={onChange}
        style={{ borderRadius: 3, padding: 4 }}
      />
    </FormControl>
  )
}

export class Base extends React.Component<any> {
  public state: {
    form: FormGroupUtil
  }

  public height = 50

  constructor(props: any) {
    super(props)
    const form = new FormGroupUtil({
      name: new FormControlUtil(
        [
          need(),
          maxLength(4),
          regExpReverse(/\d/g, "[label] can't contain numbers"),
        ],
        'Job',
        'name',
      ),

      age: new FormControlUtil(
        [need(), regExp(/^\d+$/, 'Must be a number')],
        '',
        'age',
      ),

      family: new FormArrayUtil([]),

      university: new FormGroupUtil({
        name: new FormControlUtil(
          [need(), maxLength(40)],
          'xxx University',
          'University name',
        ),

        address: new FormControlUtil(
          [need(), maxLength(40)],
          'xxx address',
          'University address',
        ),
      }),
    })

    this.state = {
      form,
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

  /**
   * 提交
   */
  public submit = () => {
    this.state.form.verify()
    this.setState(this.state)
    console.log(this.state.form.getValue())
    console.log('All data verification：', this.state.form.pass)
  }

  /**
   * 添加错误
   */
  public addError = () => {
    setTimeout(() => {
      ;(this.state.form.get('name') as FormControlUtil).setError(
        'Duplicate name',
      )
      this.setState(this.state)
    }, 1000)
  }

  /**
   * 添加表单
   */
  public addFamily = () => {
    ;(this.state.form.get('family') as FormArrayUtil).config.push(
      new FormGroupUtil({
        name: new FormControlUtil([need(), maxLength(4)], '', 'Name'),
        type: new FormControlUtil([need()], '', 'Relationship'),
        age: new FormControlUtil([need(), isNumber()], '', 'Age'),
      }),
    )

    this.setState(this.state)
  }

  /**
   * 删除
   * @param index
   */
  public deleteFamily = (index: number) => () => {
    ;(this.state.form.get('family') as FormArrayUtil).config.splice(index, 1)

    this.setState(this.state)
  }

  /**
   * 设置值
   */
  public setFormValue = () => {
    this.state.form.setValue({
      name: 'dddd',
      age: 27,
      university: { name: 'HAHA University' },
    })
    this.setState(this.state)
  }

  public render() {
    const card = cardStyle
    return (
      <Form formControlProps={{ height: this.height }}>
        <FormItem
          control={this.state.form.get('name')}
          onChange={this.onChange}
        />
        <FormItem
          control={this.state.form.get('age')}
          onChange={this.onChange}
        />

        <FormControl label={'Family staff'}>
          <div>
            {(this.state.form.get('family') as FormArrayUtil).config.map(
              (group: FormGroupUtil, index: number) => {
                return (
                  <div key={index} style={{ marginBottom: 10 }}>
                    <div key={index} style={card}>
                      <FormItem
                        height={this.height}
                        control={group.get('name')}
                        onChange={this.onChange}
                      />
                      <FormItem
                        height={this.height}
                        control={group.get('age')}
                        onChange={this.onChange}
                      />
                      <FormItem
                        height={this.height}
                        control={group.get('type')}
                        onChange={this.onChange}
                      />

                      <button onClick={this.deleteFamily(index)}>delete</button>
                    </div>
                  </div>
                )
              },
            )}
          </div>

          <button onClick={this.addFamily}>Add a family member</button>
        </FormControl>

        <FormControl label={'University'}>
          <div style={card}>
            <FormItem
              height={this.height}
              control={this.state.form.getIn(['university', 'name'])}
              onChange={this.onChange}
            />
            <FormItem
              height={this.height}
              control={this.state.form.getIn(['university', 'address'])}
              onChange={this.onChange}
            />
          </div>
        </FormControl>

        <FowRow>
          <button onClick={this.submit}>submit</button>

          <button onClick={this.addError}>add error</button>

          <button onClick={this.setFormValue}>set form data</button>
        </FowRow>
      </Form>
    )
  }
}
