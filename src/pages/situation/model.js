import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import store from 'store'

const {
  queryUserList,
  totalEvent,
  listEvent,
  srcipEvent,
  dstipEvent,
} = api

export default modelExtend(pageModel, {
  namespace: 'situation',

  state: {
    totalEvent: {
      list: [],
    },
    listEvent: {
      list: [],
    },
    srcipEvent: {
      list: [],
    },
    dstipEvent: {
      list: [],
    },
    mapType: store.get('mapType') || 'world',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/situation', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({ type: 'totalEvent' })
          dispatch({ type: 'listEvent' })
          dispatch({ type: 'srcipEvent' })
          dispatch({ type: 'dstipEvent' })
        }
      })
    },
  },

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
    *totalEvent({ payload = {} }, { call, put }) {
      const data = yield call(totalEvent, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'totalEvent',
            list: data.data,
          },
        })
      }
    },
    *listEvent({ payload = {} }, { call, put }) {
      const data = yield call(listEvent, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'listEvent',
            list: data.data,
          },
        })
      }
    },
    //目标ip
    *dstipEvent({ payload = {} }, { call, put }) {
      const data = yield call(dstipEvent, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'dstipEvent',
            list: data.data,
          },
        })
      }
    },
    //源ip
    *srcipEvent({ payload = {} }, { call, put }) {
      const data = yield call(srcipEvent, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'srcipEvent',
            list: data.data,
          },
        })
      }
    },
  },

  reducers: {
    mapType(state, { payload }) {
      store.set('mapType', payload)
      state.mapType = payload
    },
  },
})
