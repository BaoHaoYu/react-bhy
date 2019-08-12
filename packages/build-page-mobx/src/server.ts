import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios'
import { action, observable } from 'mobx'
import * as uuid from 'uuid'
interface IThrown {
  config: AxiosRequestConfig
  response: AxiosResponse
  data: any
}
export class ServerState {
  @observable public error: boolean = false
  @observable public hash?: string
  @observable public number = 0
  @observable public requesting = false
  @observable public data?: any
  public axiosSource?: CancelTokenSource
  public config: AxiosRequestConfig = {}
  public isInitData: boolean = false
  constructor(isInitData: boolean, config: AxiosRequestConfig) {
    this.isInitData = isInitData
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
    if (this.axiosSource) {
      this.axiosSource.cancel(msg)
    }
  }

  /**
   * 获得数据保存到本地
   * @param config 配置
   * @param force 是否强制请求
   * @param onCancle 取消的回调
   */
  @action public async startRequest(
    config?: AxiosRequestConfig,
    force: boolean = true,
    onCancle?: any,
  ) {
    const info = this.beforeRequest(config, force)
    if (info) {
      this.hash = uuid.v4()
      return info
    }

    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    this.setRequesting(true)
    this.axiosSource = source
    const response = await axios({
      ...this.config,
      ...config,
    }).catch(this.errorRequest(onCancle))

    if (response) {
      this.data = response.data
      this.axiosSource = undefined
      this.hash = uuid.v4()
      this.setRequesting(false)
    }

    return response
  }

  /**
   * 发送请求前
   * @param config 配置
   * @param force 是否强制请求
   */
  @action private beforeRequest(config?: AxiosRequestConfig, force?: boolean) {
    if (this.isInitData) {
      // 中断请求之后的代码
      if (this.requesting && this.number !== 0) {
        throw {
          msg: '重复请求！',
          config,
        }
      }
    }
    if (!this.isInitData && this.requesting) {
      throw {
        msg: '重复请求！',
        config,
      }
    }
    if (process.env.NODE_ENV !== 'production' && this.data != null && !force) {
      return { data: this.data }
    }
    return null
  }

  /**
   * 清除出现错误的时候处理方法
   * @param onCancle 取消请求的回调
   */
  private errorRequest(onCancle?: any) {
    return (thrown: IThrown) => {
      if (axios.isCancel(thrown)) {
        // 终端请求之后的代码
        onCancle && onCancle()
        throw {
          msg:
            '取消请求！' + `${thrown.config.method} url：${thrown.config.url}`,
        }
      }
      throw {
        msg: `request error ！${thrown.config.method} url：${thrown.config.url}，status：${thrown.response.status}`,
        thrown,
      }
    }
  }
}
