import modelExtend from 'dva-model-extend'

const defaultState = {
  list: [],
  pagination: {
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
    total: 0,
    pageSize: 20,
  },
}

export const model = {
  reducers: {
    updateState(state, { payload }) {
      const { $$type, ...restState } = payload
      const currentState =  $$type ? state[$$type] : state
      const item = {
        ...currentState,
        ...restState,
      }
      return $$type ? { ...state, [$$type]: item } : { ...state, ...item }
    },
  },
}

export const pageModel = modelExtend(model, {
  state: {
    ...defaultState,
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { $$type, list, pagination, ...restState } = payload
      const currentState = $$type ? { ...defaultState, ...state[$$type] } : state
      const item = {
        ...currentState,
        ...restState,
        list,
        pagination: {
          ...currentState.pagination,
          ...pagination,
        },
      }
      return $$type ? { ...state, [$$type]: item } : { ...state, ...item }
    },
  },
})
