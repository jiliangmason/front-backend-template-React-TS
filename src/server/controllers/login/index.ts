import { Middleware } from 'koa';

const logout: Middleware = (ctx, next) => {
    ctx.session.userInfo = null;
    ctx.cookies.set('uid','', { signed:false, maxAge:0 });
    ctx.status = 200;
    ctx.body = {
        result: 10086,
        msg: 'logout'
    };
};

export default { logout }