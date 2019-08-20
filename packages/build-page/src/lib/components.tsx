import { addDispatchToProps } from '@react-efficiency/decorators'
import { isEqual } from 'lodash-es'
import * as React from 'react'
import { IBuild, IPageComponentProps } from './main.interface'

interface IState {
  /**
   * 数据改变次数
   */
  dataChangeNumber: number
  /**
   * 数据对应的hash
   */
  hashs: string[]
  /**
   * 是否请求中
   */
  requesting: boolean
}

/**
 * 页面的组件
 */
export default function buildPageComponent<Props, State = {}>(
  p: IBuild<Props, State>,
) {
  return function build<T extends React.ComponentClass<Props>>(Target: T) {
    class Build extends React.Component<Props & IPageComponentProps> {
      public static displayName = Target.displayName

      public state: IState

      public handler = p.buildHandler
        ? p.buildHandler(this.props as Props & IPageComponentProps)
        : {}
      constructor(props: any) {
        super(props)
        this.state = {
          dataChangeNumber: 0,
          hashs: [],
          requesting: this.getInfo().requesting,
        }
      }

      /**
       * getSnapshotBeforeUpdate
       */
      public getSnapshotBeforeUpdate() {
        const nextProps = this.props
        const state = this.state
        const info = this.getInfo()
        const hashs: any[] = []
        p.serverActions.map((action) => {
          hashs.push(nextProps.dispatch(action.getServer()).get('hash'))
        })
        if (info.allDataLoad && !isEqual(hashs, state.hashs)) {
          if (p.serverRely) {
            if (isAllNotSame(hashs, state.hashs)) {
              state.dataChangeNumber = state.dataChangeNumber + 1
              state.hashs = hashs
            }
          } else {
            state.dataChangeNumber = state.dataChangeNumber + 1
            state.hashs = hashs
          }
        }
        return null
      }

      /**
       * 获得最新的基本信息
       */
      public getInfo = () => {
        const { dispatch } = this.props
        // 原始的数据
        const serverData: any[] = []
        // 是否有接口请求中
        let requesting: boolean = false
        // 是否有接口发生错误
        let error: boolean = false
        // 所有数据是否加载完毕
        let allDataLoad: boolean = true
        p.serverActions.map((serverAction) => {
          const serverDataItme = dispatch(serverAction.getResponseData())
          serverData.push(serverDataItme)
          // 只要有一个加载中，则表示数据在加载中
          if (dispatch(serverAction.isRequesting())) {
            requesting = true
          }
          // 表示数据有错误
          if (dispatch(serverAction.isError())) {
            error = true
          }
          // 如果有有的数据为null则表示数据为没有加载完毕
          if (dispatch(serverAction.getResponseData()) === undefined) {
            allDataLoad = false
          }
        })
        return {
          serverData,
          requesting,
          error,
          allDataLoad,
        }
      }

      /**
       * 计算组件的props
       */
      public addProps = () => {
        const info = this.getInfo()
        const newProps = p.mapStateToProps(this.props.state, {
          ...(this.props as any),
          ...info,
          dataChangeNumber: this.state.dataChangeNumber,
          getInfo: () => this.getInfo(),
        })
        return {
          ...newProps,
          serverData: info.serverData,
          requesting: info.requesting,
          error: info.error,
          allDataLoad: info.allDataLoad,
        }
      }

      public render() {
        const newProps = this.addProps()
        return <Target {...this.props} {...newProps} {...this.handler} />
      }
    }

    return addDispatchToProps(Build)
  }
}

/**
 * 是否全部相同
 */
function isAllNotSame(list1: any[], list2: any[]) {
  for (let i = 0; i < list1.length; i++) {
    const item1 = list1[i]
    const item2 = list2[i]
    if (item1 === item2) {
      return false
    }
  }
  return true
}

export { IBuild, IPageComponentProps }
