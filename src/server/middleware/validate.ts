import { Middleware } from 'koa';
import { get } from 'lodash';
import { Base64 } from 'js-base64';
import minimatch from 'minimatch';

type ValidateConfig = {
    whiteList: string[];
}

const validateMiddleware = (config: ValidateConfig) => {
    const { whiteList = [] } = config;
    let isInWhiteList = false;

    const validate: Middleware = async (ctx, next) => {
        const userId = ctx.cookies.get('uid') || '';
        const userName = get(ctx.session, ['userInfo', 'userName']) || '';

        whiteList.some(item => {
            if (minimatch(ctx.path, item)) {
                isInWhiteList = true;
            }
            return isInWhiteList;
        });

        if (isInWhiteList) {
            return next();
        }

        if (userId) {
            const uid = JSON.parse(Base64.decode(userId)).userName;
            if (uid === userName) {
                return next()
            }
            ctx.body = {
                result: 302,
                msg: 'need sso',
            }
            return false // 直接中断中间件执行
        }
        if (!userId && userName) {
            const params = {
                userName,
            };
            const cookieOptions = {
                maxAge: 7 * 24 *3600 * 1000,
                httpOnly: false,
            };
            const encodeBase64 = Base64.encode(JSON.stringify(params));
            ctx.cookies.set('uid', encodeBase64, cookieOptions);
            return next();
        }
        if (!userId && !userName) {
            ctx.status = 200;
            ctx.body = {
                result: 10086,
                msg: 'logout'
            };
            return false;
        }
        return next();
    };

    return validate;
}

export default validateMiddleware;

