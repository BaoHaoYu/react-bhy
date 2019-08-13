import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios'
import { action, configure, observable, runInAction } from 'mobx'
import * as uuid from 'uuid'

configure({ enforceActions: true })

interface IThrown {
  config: AxiosRequestConfig
  response: AxiosResponse
  data: any
}
export class ServerState {
  // 是否发生错误
  @observable public error: boolean = false
  // 每次请求成功保存到本地，hash会自动重新生成
  @observable public hash?: string
  // 请求次数
  @observable public number = 0
  // 是否请求中
  @observable public requesting = false
  // 服务器数据
  @observable public data?: any
  // axios的配置
  public config: AxiosRequestConfig = {}
  // 用于取消请求
  private cancelTokenSource?: CancelTokenSource
  constructor(config: AxiosRequestConfig) {
    this.config = config
  }

  /**
   * 设置是否请求中
   * @param requesting 是否请求中
   */
  @action public setRequesting(requesting: boolean) {
    this.requesting = requesting
    this.number = !requesting ? this.number + 1 : this.number
  }

  /**
   * 取消请求
   * @param msg 附加信息
   */
  @action public cancle(msg?: any) {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel(msg)
      this.setRequesting(false)
    }
  }

  /**
   * 重置数据
   */
  @action public resetData() {
    this.data = undefined
  }

  /**
   * 获得数据保存到本地
   * @param config 配置
   * @param force 是否强制请求
   * @param onCancle 取消的回调
   */
  @action public async startRequest(
    config?: AxiosRequestConfig | null,
    force: boolean = true,
    onCancle?: any,
  ) {
    try {
      const info = this.beforeRequest(force)
      if (info) {
        this.hash = uuid.v4()
        return info
      }

      const CancelToken = axios.CancelToken
      const source = CancelToken.source()

      this.setRequesting(true)
      this.cancelTokenSource = source
      const response = await axios({
        ...this.config,
        ...config,
      })

      if (response) {
        runInAction('完成请求', () => {
          this.data = response.data
          this.cancelTokenSource = undefined
          this.hash = uuid.v4()
        })

        this.setRequesting(false)
      }

      return response
    } catch (error) {
      this.errorRequest(error, onCancle)
    }
    return
  }

  /**
   * 发送请求前
   * @param config 配置
   * @param force 是否强制请求
   */
  @action private beforeRequest(force?: boolean) {
    if (this.requesting) {
      throw {
        msg: '重复请求！',
      }
    }
    if (
      process.env.NODE_ENV !== 'production' &&
      this.data !== undefined &&
      !force
    ) {
      return { data: this.data }
    }
    return null
  }

  /**
   * 清除出现错误的时候处理方法
   * @param onCancle 取消请求的回调
   */
  private errorRequest(error: any = {}, onCancle?: any) {
    if (axios.isCancel(error)) {
      // 终止请求之后的代码
      onCancle && onCancle()
      console.log({
        msg: '取消请求！' + `${error.config.method} url：${error.config.url}`,
      })
    } else if (error.response) {
      console.log({
        msg: `request error ！${error.config.method} url：${error.config.url}，status：${error.response.status}`,
        error,
      })
    } else {
      console.log(error)
    }
  }
}
