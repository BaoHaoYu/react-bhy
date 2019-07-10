import { RouteComponentProps, withRouter } from '@react-efficiency/decorators'
import { map } from 'lodash-es'
import * as React from 'react'

type State<Params> = {
  [P in keyof Params]: {
    value: Params[P]
    onChange(props: any): void
  }
}
/**
 * 路由Params改变所有执行的函数
 */
type Change<Props = {}> = (p: {
  props: Props
  /**
   * 新值
   */
  value: string
  /**
   * 老的值
   */
  old: string
}) => void

/**
 * 封装路由params改变事件
 * @param rp
 */
export default function RouteParamsChange<Params = {}>(
  rp: Record<keyof Params, Change>,
) {
  return function myWithRouter(Target: any): any {
    @withRouter
    class ParamsChange extends React.Component<RouteComponentProps<Params>> {
      public static dispalyName = Target.dispayname

      public static getDerivedStateFromProps(
        nextProps: RouteComponentProps<Params>,
        state: State<Params>,
      ) {
        let isChange = false
        map(rp, (changeFunc: Change, oneParam) => {
          if (nextProps.match.params[oneParam] !== state[oneParam]) {
            // 调用改变函数
            changeFunc({
              props: nextProps,
              value: nextProps.match.params[oneParam],
              old: state[oneParam],
            })
            state[oneParam] = nextProps.match.params[oneParam]
            isChange = true
          }
        })
        if (isChange) {
          return state
        }
        return null
      }

      public state: object = {}

      constructor(props: any) {
        super(props)

        map(rp, (value, key) => {
          this.state[key] = this.props.match.params[key]
        })
      }

      public render() {
        return <Target {...this.props} />
      }
    }

    return ParamsChange
  }
}
