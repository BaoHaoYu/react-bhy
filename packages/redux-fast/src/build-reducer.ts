import { fromJS, Map } from 'immutable'
import { from } from 'immutable/contrib/cursor'

export function buildFastReducer(redcuerKey: string) {
  const NAME_SPACE = 'fast_' + redcuerKey
  const REDUCER_KEY = redcuerKey

  const types = {
    fastState: NAME_SPACE + '--state',
    fastUnmount: NAME_SPACE + '--unmount',
  }

  /**
   * 快速改变状态
   * @param keyPath immatable路径
   * @param cd 回调，改变状态的函数
   * @param meta action的meta
   */
  const setFastState = <T, K>(
    cb: (state: Map<T, K>) => Map<T, K>,
    meta?: string,
  ) => {
    return {
      type: types.fastState,
      payload: cb,
      meta,
    }
  }

  const getFastState = () => (dispatch: any, getState: any) => {
    return from(getState()[REDUCER_KEY])
  }

  const reduccerMap = {
    [types.fastState]: (state: any, action: any) => {
      return state.updateIn(action.payload.keyPath, (s: any = fromJS({})) => {
        return action.payload.cb(s)
      })
    },
    [types.fastUnmount]: (state: any, action: any) => {
      return state.deleteIn(action.payload.keyPath)
    },
  }

  return {
    reduccerMap,
    setFastState,
    getFastState,
  }
}
