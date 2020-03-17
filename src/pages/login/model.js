import { router, pathMatchRegexp } from 'utils'
import api from 'api'
import store from 'store'
import moment from 'moment'

const { login } = api

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
       const data = yield call(login, payload)
      // const data = {success: true, data: { username: 'Eva' } }
      const { locationQuery } = yield select(_ => _.app)

      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query', payload: data.data })
        store.set('user', data.data)
        store.set('login_time', moment().format('YYYY-MM-DD HH:mm:ss'))
        if (!pathMatchRegexp('/login', from)) {
          if (!from || from === '/') router.push('/dashboard')
          else router.push(from)
        } else {
          router.push('/dashboard')
        }
      } else {
        throw data
      }
    },
  },
}
