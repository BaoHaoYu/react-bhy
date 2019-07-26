import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import {
  buildPageWidgets,
  initServerData,
} from '../../../../packages/build-page/src/index'
import { addReducer } from '../../../store'
import * as config from '../../config'

const PAGE_NAME = '基本的数据获取'
const REDUCER_KEY = 'pageBaseReducer'

const defaultData = {
  server: {
    _dataOne: initServerData({ requesting: true }),
    _dataTwo: initServerData({ requesting: true }),
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

export const dataOneServer = page.createServerActions({
  axiosOpt: {
    url: '/data/listFood.json',
    baseURL: config.baseURL,
  },
  isInitData: true,
  key: '_dataOne',
  desc: '数据1',
})

export const dataTwoServer = page.createServerActions({
  axiosOpt: {
    url: '/data/listPeople.json',
    baseURL: config.baseURL,
  },
  isInitData: true,
  key: '_dataTwo',
  desc: '数据2',
})

export const setAllData = () => (dispatch: any) => {
  dispatch(dataOneServer.requestAndSave())
  dispatch(dataTwoServer.requestAndSave())
}
