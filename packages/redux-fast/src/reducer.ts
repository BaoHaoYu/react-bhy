import { fromJS, Map } from 'immutable'
import { from } from 'immutable/contrib/cursor'
import { handleActions } from 'redux-actions'

const NAME_SPACE = 'fast'
export const REDUCER_KEY = 'fast'

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
export const setFastState = <T, K>(
  keyPath: string[],
  cb: (state: Map<T, K>) => Map<T, K>,
  meta?: string,
) => {
  return {
    type: types.fastState,
    payload: {
      keyPath,
      cb,
    },
    meta,
  }
}

export const getFastState = (keyPath: string[]) => (
  dispatch: any,
  getState: any,
) => {
  return from(getState()[REDUCER_KEY]).getIn(keyPath)
}

export const unmount = (keyPath: string[]) => {
  return {
    type: types.fastUnmount,
    payload: {
      keyPath,
    },
  }
}

const reduccer = handleActions(
  {
    [types.fastState]: (state, action) => {
      return state.updateIn(action.payload.keyPath, (s: any = fromJS({})) => {
        return action.payload.cb(s)
      })
    },
    [types.fastUnmount]: (state, action) => {
      return state.deleteIn(action.payload.keyPath)
    },
  },
  fromJS({}),
)

export default reduccer
