import 'normalize.css'
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
} from '../../packages/form-util/src'
import { FormItem } from './form-item'
import { Form, FormControl, FowRow } from '../../packages/form/src'

export class Base extends React.Component<any> {
  public state: {
    form: FormGroupUtil
  }

  public height = 50

  constructor(props: any) {
    super(props)
    const form = new FormGroupUtil({
      name: new FormControlUtil(
        [need(), maxLength(4), regExpReverse(/\d/g, '[label]不能含有数字')],
        '小光',
        '姓名',
      ),

      age: new FormControlUtil([need(), regExp(/^\d+$/, '必须是数字')], '', '年龄'),

      family: new FormArrayUtil([]),

      bigSchool: new FormGroupUtil({
        name: new FormControlUtil([need(), maxLength(40)], 'xxx大学', '大学名字'),

        address: new FormControlUtil(
          [need(), maxLength(40)],
          'xxx街道',
          '大学地址',
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
    console.log('所有数据验证：', this.state.form.pass)
  }

  /**
   * 添加错误
   */
  public addError = () => {
    setTimeout(() => {
      ;(this.state.form.get('name') as FormControlUtil).setError('姓名重复')
      this.setState(this.state)
    }, 1000)
  }

  /**
   * 添加表单
   */
  public addFamily = () => {
    ;(this.state.form.get('family') as FormArrayUtil).push(
      new FormGroupUtil({
        name: new FormControlUtil([need(), maxLength(4)], '', '名字'),
        type: new FormControlUtil([need()], '', '关系'),
        age: new FormControlUtil([need(), isNumber()], '', '年龄'),
      }),
    )

    this.setState(this.state)
  }

  /**
   * 删除
   * @param index
   */
  public deleteFamily = (index: number) => () => {
    ;(this.state.form.get('family') as FormArrayUtil).removeAt(index)

    this.setState(this.state)
  }

  /**
   * 设置值
   */
  public setFormValue = () => {
    this.state.form.setValue({
      name: '包',
      age: 27,
      bigSchool: { name: '哈哈大学' },
    })
    this.setState(this.state)
  }

  public render() {
    const card = {
      border: '1px solid #d0d0d0',
      borderRadius: 5,
      padding: 10,
      width: 300,
      boxShadow: '1px 1px 5px 1px #d0d0d0',
    }
    return (
      <Form>
        <FormItem
          height={this.height}
          control={this.state.form.get('name')}
          onChange={this.onChange}
        />
        <FormItem
          height={this.height}
          control={this.state.form.get('age')}
          onChange={this.onChange}
        />

        <FormControl label={'家庭人员'}>
          <div>
            {(this.state.form.get('family') as FormArrayUtil).map(
              (group: FormGroupUtil, index: number) => {
                return (
                  <div key={index} style={{ marginBottom: 10 }}>
                    <div
                      key={index}
                      style={card}
                    >
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

                      <button onClick={this.deleteFamily(index)}>删除</button>
                    </div>
                  </div>
                )
              },
            )}
          </div>

          <button onClick={this.addFamily}>添加家庭组成员</button>
        </FormControl>

        <FormControl
          label={'大学'}
        >
          <div style={ card }>
            <FormItem
              height={this.height}
              control={this.state.form.getIn(['bigSchool', 'name'])}
              onChange={this.onChange}
            />
            <FormItem
              height={this.height}
              control={this.state.form.getIn(['bigSchool', 'address'])}
              onChange={this.onChange}
            />
          </div>
        </FormControl>

        <FowRow>
          <button onClick={this.submit}>提交数据</button>

          <button onClick={this.addError}>自定义错误</button>

          <button onClick={this.setFormValue}>设置表单值</button>
        </FowRow>
      </Form>
    )
  }
}
