import { action } from 'mobx'
import { observer } from 'mobx-react'
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
} from '../../../packages/form-util-mobx/src/index'

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

const FormItem = observer((props: IProps) => {
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
})

@observer
export class WidthMobx extends React.Component<any> {
  public height = 50

  public form = new FormGroupUtil({
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
        'Name',
      ),
      address: new FormControlUtil(
        [need(), maxLength(40)],
        'xxx address',
        'Address',
      ),
    }),
  })

  constructor(props: any) {
    super(props)
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
  }

  /**
   * 提交
   */
  @action public submit = () => {
    this.form.verify()
    console.log(this.form.value)
    console.log('All data verification：', this.form.pass)
  }

  /**
   * 添加错误
   */
  @action public addError = () => {
    setTimeout(() => {
      this.form.get('name').setError('Duplicate name')
    }, 1000)
  }

  /**
   * 添加表单
   */
  @action public addFamily = () => {
    ;(this.form.get('family') as FormArrayUtil).config.push(
      new FormGroupUtil({
        name: new FormControlUtil([need(), maxLength(4)], '', 'Name'),
        type: new FormControlUtil([need()], '', 'Relationship'),
        age: new FormControlUtil([need(), isNumber()], '', 'Age'),
      }),
    )
  }

  /**
   * 删除
   * @param index
   */
  @action public deleteFamily = (index: number) => {
    this.form.get('family').config.splice(index, 1)
  }

  /**
   * 设置值
   */
  @action public setFormValue = () => {
    this.form.setValue({
      name: 'dddd',
      age: 27,
      university: { name: 'HAHA University' },
    })
  }

  public render() {
    const card = cardStyle
    console.log(this.form.value)
    return (
      <Form formControlProps={{ height: this.height }}>
        <FormItem control={this.form.get('name')} onChange={this.onChange} />
        <FormItem control={this.form.get('age')} onChange={this.onChange} />

        <FormControl label={'Family staff'}>
          <div>
            {this.form
              .get('family')
              .config.map((group: FormGroupUtil, index: number) => {
                return (
                  <Form
                    formControlProps={{ height: this.height }}
                    key={index}
                    style={{ marginBottom: 10, ...cardStyle }}
                  >
                    <FormItem
                      control={group.get('name')}
                      onChange={this.onChange}
                    />
                    <FormItem
                      control={group.get('age')}
                      onChange={this.onChange}
                    />
                    <FormItem
                      control={group.get('type')}
                      onChange={this.onChange}
                    />

                    <FowRow>
                      <button onClick={this.deleteFamily.bind(this, index)}>
                        delete
                      </button>
                    </FowRow>
                  </Form>
                )
              })}
          </div>

          <button onClick={this.addFamily}>Add a family member</button>
        </FormControl>
        <FormControl label={'University'}>
          <Form style={card} formControlProps={{ height: this.height }}>
            <FormItem
              height={this.height}
              control={this.form.get('university').get('name')}
              onChange={this.onChange}
            />
            <FormItem
              height={this.height}
              control={this.form.get('university').get('address')}
              onChange={this.onChange}
            />
          </Form>
        </FormControl>

        <FowRow>
          <div style={{ marginTop: 20 }}>
            <button onClick={this.submit}>submit</button>

            <button onClick={this.addError}>add error</button>

            <button onClick={this.setFormValue}>set form data</button>
          </div>
        </FowRow>
      </Form>
    )
  }
}
