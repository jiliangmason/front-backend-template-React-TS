import { Middleware } from 'koa';
import { loggerErr } from './logger';

const ErrorMiddleware: Middleware = async (ctx, next) => {
    try {
      await next();
    } catch(err) {
      loggerErr.error(err);
      if (err) {
        ctx.throw(400, err.message)
        return;
      }
      console.error(err);
    }
};

export default ErrorMiddleware;
