import { post } from './httpService'

export const userLogin = (params) => post('User\\Login.index', params)
export const userCode = (params) => post('Code\\Code.index', params)
// export const userInfo = (params) => post('/user/info', params)

export const warnIndex = (params) => post('Report\\Report.getTypeCounts', params)
export const warnPush = (params, rest) => post('Push\\ReportPush.getList', params, rest)
export const warnList = (params, rest) => post('Report\\Report.getList', params, rest)
export const warnManage = (params) => post('Report\\Report.blockList', params)

export const mailList = (params) => post('Config\\Config.get', params)
export const mailAdd = (params) => post('Config\\Config.index', params)
export const mailEdit = (id, params) => post('Config\\Config.edit', { ...params, id })

export const warnBlocking = (params) => post('Block\\Block.getList', params)
export const warnBlockingDelete = (id, is_used) => post('Block\\Block.used', { id, is_used })
export const warnBlockingConfirm = (params) => post('Block\\Block.index', params)

export const warnUserList = (params) => post('Push\\AlarmPush.getList', params)
export const warnDelete = (id) => post('Push\\AlarmPush.del', { id })
export const warnDisabled = (id, is_used) => post('Push\\AlarmPush.used', { id, is_used })
export const warnAdd = (params) => post('Push\\AlarmPush.add', params)
export const warnEdit = (id, params) => post('Push\\AlarmPush.edit', { ...params, id })

export const protectList = (params) => post('/protect/list', params)
export const protectEdit = (params) => post('/protect/edit', params)
export const protectConf = (params) => post('/protect/conf', params)
export const protectUpdateConf = (params) => post('/protect/updateconf', params)

export const assetsList = (params) => post('Important\\Important.getList', params)
export const assetsDelete = (id) => post('Important\\Important.del', { id })
export const assetsAdd = (params) => post('Important\\Important.add', params)
export const assetsEdit = (id, params) => post('Important\\Important.edit', { ...params, id })
export const assetsUpload = (params) => post('/assets/upload', params)

export const reportList = (params) => post('/report/list', params)
export const reportPhase = (params) => post('/report/phase', params)
export const reportSend = (params) => post('/report/send', params)

export const platformLogsLogin = (params) => post('Log\\Log.getList', params)
export const platformLogsManage = (params) => post('User\\User.getList', params)
export const platformUpdatePwd = (params) => post('User\\User.updatePwd', params)

export const accountList = (params) => post('User\\User.getList', params)
export const accountDelete = (user_id, username) => post('User\\User.del', { user_id, username })
export const accountAdd = (params) => post('User\\User.createUser', params)
export const accountEdit = (user_id, params) => post('User\\User.edit', { ...params, user_id })