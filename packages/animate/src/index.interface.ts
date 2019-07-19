import { TransitionProps } from 'react-transition-group/Transition'
/**
 * ('fade' | 'moveX' | 'moveY')
 */
export type TAnimateKey = any[]

export interface IAnimateProps extends Partial<TransitionProps> {
  /**
   * 进入时间
   */
  enterTime?: number
  /**
   * 离开时间
   */
  levelTime?: number
  /**
   * 动画类型
   */
  animateKey?: TAnimateKey
  /**
   * 是否加载子组件
   */
  show?: boolean
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
