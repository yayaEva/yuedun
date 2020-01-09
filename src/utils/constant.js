export const ROLE_TYPE = {
  ADMIN: 'admin',
  DEFAULT: 'admin',
  DEVELOPER: 'developer',
}

export const CANCEL_REQUEST_MESSAGE = 'cancel request'

export const ROLES = [{
  value: 0,
  label: '系统管理员'
}, {
  value: 1,
  label: '操作员'
}, {
  value: 2,
  label: '审计员'
}]

export const TYPE = [{
  value: '',
  label: '全部'
}, {
  value: 'APT',
  label: 'APT'
}, {
  value: 'DDOS',
  label: 'DDOS'
}, {
  value: '僵木蠕',
  label: '僵木蠕'
}, {
  value: '恶意域名',
  label: '恶意域名'
}]

export const LEVELS = [{
  value: '',
  label: '全部'
}, /**{
  value: '严重',
  label: '严重'
}, **/{
  value: '高危',
  label: '高危'
}, {
  value: '中危',
  label: '中危'
}, {
  value: '低危',
  label: '低危'
}]

export const pagination = {
  current: 1,
  pageSize: 10,
  total: 1,
}

export const EVENT_TYPES = [{
  value: '远程控制',
  label: '远程控制'
}, {
  value: '僵尸网络',
  label: '僵尸网络',
}, {
  value: '网站后门',
  label: '网站后门',
}, {
  value: '网页篡改',
  label: '网页篡改',
}, {
  value: 'DDOS攻击',
  label: 'DDOS攻击',
}, {
  value: '网络盗号',
  label: '网络盗号',
}, {
  value: '网络欺诈',
  label: '网络欺诈',
}, {
  value: '数据泄露',
  label: '数据泄露',
}, {
  value: '漏洞利用',
  label: '漏洞利用',
}, {
  value: '攻击事件',
  label: '攻击事件',
}, {
  value: '设备安全',
  label: '设备安全',
}, {
  value: '其他威胁',
  label: '其他威胁',
}]

export const REPORT_TPLS = [{
  value: '0',
  label: '标准版'
}, {
  value: '1',
  label: '高级版'
}, {
  value: '2',
  label: '自定义'
}]

export const REPORT_EVENTS = [{
  span: 8,
  value: '数据统计',
  label: '数据统计'
}, {
  span: 8,
  value: '系统威胁等级',
  label: '系统威胁等级'
}, {
  span: 8,
  value: '威胁事件类型',
  label: '威胁事件类型'
}, {
  span: 8,
  value: '高危事件',
  label: '高危事件'
}, {
  span: 8,
  value: '中危事件',
  label: '中危事件'
}, {
  span: 8,
  value: '低危事件',
  label: '低危事件'
}, {
  span: 16,
  value: '事件源地址和事件目标地址TOP10',
  label: '事件源地址和事件目标地址TOP10'
}, {
  span: 8,
  value: '威胁事件趋势图',
  label: '威胁事件趋势图'
}]

export const REPORT_EVENTS_MAP = [{
  value: '曲线图',
  label: '曲线图'
}, {
  value: '柱状图',
  label: '柱状图'
}, {
  value: '饼状图',
  label: '饼状图'
}]
