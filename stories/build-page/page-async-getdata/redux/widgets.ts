import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import {
  buildPageWidgets,
  initServerData,
} from '../../../../packages/build-page/src/index'
import { addReducer } from '../../../store'
import * as config from '../../config'

const PAGE_NAME = '进入页面后通过操作获得数据'
const REDUCER_KEY = 'pageAsyncGetDataReducer'

const defaultData = {
  server: {
    _dataTree: initServerData({ requesting: false }),
  },
}
const $$defaultData = fromJS(defaultData)

export const page = buildPageWidgets({
  reducerKey: REDUCER_KEY,
  defaultData: $$defaultData,
  pageName: PAGE_NAME,
  hash: REDUCER_KEY,
})

addReducer(REDUCER_KEY, handleActions(page.reducerMap, $$defaultData))

export const dataTreeServer = page.createServerActions({
  axiosOpt: {
    url: '/data/listHehe.json',
    baseURL: config.baseURL,
  },
  force: true,
  isInitData: false,
  key: '_dataTree',
  desc: '数据3',
})

export const getHehe = () => (dispatch: any) => {
  dispatch(dataTreeServer.getServerDataToStore())
}
