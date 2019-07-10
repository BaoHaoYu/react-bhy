import classnames from 'classnames'
import { compact } from 'lodash-es'
import * as React from 'react'
import { IFormControlProps } from '../control/index.interface'
import { IFormProps, IReduxProps } from './index.interface'
// @ts-ignore
import s from './style/index.scss'

export class Form extends React.Component<IFormProps> {
  public static defaultProps: { [P in keyof IFormProps]?: IFormProps[P] }

  public render() {
    const props: IFormProps = this.props

    const formControlProps: IFormControlProps & IReduxProps = {
      ...Form.defaultProps.formControlProps,
      ...props.formControlProps,
    }

    const rootClassName = classnames(
      s.form,
      s[`form-${formControlProps.layout}`],
    )
    return (
      <div className={rootClassName} style={props.style}>
        {this.renderChildren(formControlProps)}
      </div>
    )
  }

  public renderChildren = (formControlProps: IFormControlProps): any => {
    const props: IFormProps = this.props
    const children = compact(React.Children.toArray(props.children))
    return children.map(
      (child: React.ReactElement<IFormControlProps>, index) => {
        if (props.lastAutoHeight && index === children.length - 1) {
          formControlProps.height = undefined
        }
        const fprops = {
          ...child.props,
          ...formControlProps,
        }
        return React.cloneElement(child, fprops)
      },
    )
  }
}

const defaultFormControlProps: IFormControlProps = {
  layout: 'x',
  height: 65,
  showLabel: true,
  single: false,
}

Form.defaultProps = {
  footer: null,
  formControlProps: defaultFormControlProps,
  children: [],
  lastAutoHeight: true,
}
