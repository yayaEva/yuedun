import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryUserList,
  createUser,
} = api

export default modelExtend(pageModel, {
  namespace: 'systemStatus',

  state: {},

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryUserList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *save({ payload }, { call, put }) {
      const data = yield call(createUser, payload)
      if (data.success) {
        return data.data
      } else {
        throw data
      }
    },
  },

  reducers: {},
})
