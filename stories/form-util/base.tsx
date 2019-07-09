import * as React from 'react'
import 'normalize.css'
import {
  FormArray,
  FormControl,
  FormGroup,
  isNumber,
  maxLength,
  need,
  regExp,
  regExpReverse,
} from '../../packages/form-util/src'
import { FormItem } from './form-item'

export class Base extends React.Component<any> {
  public state: {
    form: FormGroup
  }
  constructor(props: any) {
    super(props)
    const form = new FormGroup({
      name: new FormControl(
        [need(), maxLength(4), regExpReverse(/\d/g, '[label]不能含有数字')],
        '小光',
        '姓名',
      ),

      age: new FormControl([need(), regExp(/^\d+$/, '必须是数字')], '', '年龄'),

      family: new FormArray([]),

      bigSchool: new FormGroup({
        name: new FormControl([need(), maxLength(40)], 'xxx大学', '大学名字'),

        address: new FormControl(
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
    control: FormControl,
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
      ;(this.state.form.get('name') as FormControl).setError('姓名重复')
      this.setState(this.state)
    }, 1000)
  }

  /**
   * 添加表单
   */
  public addFamily = () => {
    ;(this.state.form.get('family') as FormArray).push(
      new FormGroup({
        name: new FormControl([need(), maxLength(4)], '', '名字'),
        type: new FormControl([need()], '', '关系'),
        age: new FormControl([need(), isNumber()], '', '年龄'),
      }),
    )

    this.setState(this.state)
  }

  /**
   * 删除
   * @param index
   */
  public deleteFamily = (index: number) => () => {
    ;(this.state.form.get('family') as FormArray).removeAt(index)

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
    return (
      <div>
        <FormItem
          control={this.state.form.get('name')}
          onChange={this.onChange}
        />
        <FormItem
          control={this.state.form.get('age')}
          onChange={this.onChange}
        />

        <div>
          <label>家庭人员：</label>

          <div>
            {(this.state.form.get('family') as FormArray).map(
              (group: FormGroup, index: number) => {
                return (
                  <div key={index} style={{ border: '1px solid', padding: 10 }}>
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

                    <button onClick={this.deleteFamily(index)}>删除</button>
                  </div>
                )
              },
            )}
          </div>

          <button onClick={this.addFamily}>添加家庭组成员</button>
        </div>

        <div>
          <label>大学：</label>
          <FormItem
            control={this.state.form.getIn(['bigSchool', 'name'])}
            onChange={this.onChange}
          />
          <FormItem
            control={this.state.form.getIn(['bigSchool', 'address'])}
            onChange={this.onChange}
          />
        </div>

        <button onClick={this.submit}>提交数据</button>

        <button onClick={this.addError}>自定义错误</button>

        <button onClick={this.setFormValue}>设置表单值</button>
      </div>
    )
  }
}
