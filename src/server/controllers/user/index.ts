import { Middleware } from 'koa';
import { get } from 'lodash';

const User: Middleware = async (ctx, next) => {
    ctx.body = {
        result: 1,
        msg: 'ok',
        data: {
            userName: get(ctx.session, ['userInfo', 'userName']),
        }
    };
    return next();
};

export default User;