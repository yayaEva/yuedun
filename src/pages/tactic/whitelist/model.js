import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  createUser,
} = api

export default modelExtend(pageModel, {
  namespace: 'whitelist',

  state: {},

  effects: {
    *save({ payload }, { call, put }) {
      const data = yield call(createUser, payload)
      if (data.success) {
        return data.data
      } else {
        throw data
      }
    },
  },
})
