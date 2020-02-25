export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  // logoutUser: '/user/logout',
  logoutUser: '/logout.json',
  // loginUser: 'POST /user/login',
  loginUser: '/login.json',

  queryUser: '/user/:id',
  // queryUserList: '/users',
  queryUserList: '/list.json',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  // dashboard 事件
  totalEvent: '/totalEvent', // 事件总数
  typeEvent: '/typeEvent', // 威胁类型
  srcipEvent: '/srcipEvent', // 事件源地址TOP5
  dstipEvent: '/dstipEvent', // 事件目标地址TOP5
  listEvent: '/listEvent', // 最新事件
  queryBytime:'/queryBytime',//全屏监控list
}
