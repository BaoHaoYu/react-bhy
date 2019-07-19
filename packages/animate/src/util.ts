import classnames from 'classnames'
import { IAnimateProps } from './index.interface'
// @ts-ignore
import s from './style/index.scss'
function buildCss(css: string, value: any) {
  return {
    ['webkit' + css]: value,
    ['moz' + css]: value,
    ['ms' + css]: value,
    ['o' + css]: value,
    [css]: value,
  }
}

export function transitionStyle(enter: number, exit: number) {
  return {
    entered: buildCss('transition', `all ${enter}ms ease-in-out`),
    exiting: buildCss('transition', `all ${exit}ms ease-in-out`),
  }
}

export function animateClass(status: string, props: IAnimateProps) {
  return classnames(
    s[status],
    props.className,
    ...(props.animateKey as string[]).map((key) => {
      return s[key]
    }),
  )
}
