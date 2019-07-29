import { TransitionProps } from 'react-transition-group/Transition'
/**
 * ('fade' | 'moveX' | 'moveY')
 */
export type TAnimateKey = any[]

export interface IAnimateProps extends Partial<TransitionProps> {
  /**
   * animateCssModule
   */
  animateCssModule?: object
  /**
   * 动画类型
   */
  animateKey?: TAnimateKey
  /**
   * react组件的children
   */
  children: any
  /**
   * 动画容器的样式
   */
  style?: object
  /**
   * 动画容器的类名
   */
  className?: string
}
