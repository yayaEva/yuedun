import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'

const {
  queryUserList,
  totalEvent,
  typeEvent,
  srcipEvent,
  dstipEvent,
  listEvent,
  delEvent,
  safetyTrend,
} = api

export default modelExtend(pageModel, {
  namespace: 'dashboard',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    queryEvents: {},
    queryCardList: {},
    totalEvent: {
      list: [],
    },
    typeEvent: {
      list: [],
    },
    srcipEvent: {
      list: [],
    },
    dstipEvent: {
      list: [],
    },
    listEvent: {
      list: [],
    },
    safetyTrend:{
      list:[],
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathMatchRegexp('/dashboard', pathname) ||
          pathMatchRegexp('/', pathname)
        ) {
          // dispatch({ type: 'queryEvents' })
          // dispatch({ type: 'queryCardList' })
          dispatch({ type: 'totalEvent' })
          dispatch({ type: 'typeEvent' })
          dispatch({ type: 'srcipEvent' })
          dispatch({ type: 'dstipEvent' })
          dispatch({ type: 'listEvent' })
          dispatch({ type: 'safetyTrend' })
        }
      })
    },
  },
  effects: {
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
    *typeEvent({ payload = {} }, { call, put }) {
      const data = yield call(typeEvent, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'typeEvent',
            list: data.data,
          },
        })
      }
    },
    *safetyTrend({ payload = {} }, { call, put }) {
      const data = yield call(safetyTrend, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'safetyTrend',
            list: data.data,
          },
        })
      }
    },

    *queryEvents({ payload = {} }, { call, put }) {
      const data = yield call(queryUserList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'queryEvents',
            list: data.data,
          },
        })
      }
    },
    *queryCardList({ payload = {} }, { call, put }) {
      const data = yield call(queryUserList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'queryCardList',
            source: data.data.slice(0, 5),
            target: data.data.slice(0, 5),
          },
        })
      }
    },
    
    *delete({ payload }, { call, put, select }) {
      const data = yield call(delEvent, { id: payload })
      // const { selectedRowKeys } = yield select(_ => _.dashboard)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            // selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },
  },
  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
