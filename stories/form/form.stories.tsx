import { boolean, number, radios, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  Form,
  FormControl,
  FowRow,
  IFormControlProps,
} from '../../packages/form/src'

storiesOf('form 表单', module)
  .addDecorator(withKnobs)
  .add('基础', () => {
    const props: IFormControlProps = {
      layout: radios('layout', { x: 'x', y: 'y' }, 'x') as any,
      showLabel: boolean('showLabel', true),
      require: boolean('require', false),
      height: number('height', 40, { range: true, max: 100, min: 5, step: 1 }),
    }
    return (
      <Form formControlProps={props}>
        <FowRow style={{ paddingBottom: 10 }}>
          <h2>表单头部</h2>
        </FowRow>

        <FormControl label={'名字'}>
          <input type={'text'} />
        </FormControl>
        <FormControl label={'密码'}>
          <input type={'text'} />
        </FormControl>
        <FormControl label={'电话'}>
          <input type={'text'} />
        </FormControl>
        <FormControl require={true} label={'身份证号码'}>
          <input type={'text'} />
        </FormControl>

        <FowRow style={{ paddingTop: 10 }}>
          <button>提交</button>
        </FowRow>
      </Form>
    )
  })
