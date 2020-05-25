export default {
  serverPort: 8082,
  defaultSsoConfig: { // 无需logout路由，不需要进入sso中间件的登出
      protocol: 'https',
      hostname: 'sso.corp.kuaishou.com',
      port: '443',
      context: '/cas',
      validateMethod: '/cas/p3/serviceValidate',
      userInfoSessionKey: 'userInfo', // 用户信息会挂载到this.session[userInfoSessionKey]上
  },
};
