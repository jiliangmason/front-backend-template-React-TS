import Koa from 'koa';
import path from 'path';
import serve from 'koa-static';
import koaBody from 'koa-body';
import koaLogger from 'koa-logger';
import session from 'koa-session';
import cors from 'koa2-cors';
import config from './config';
import loggerMiddleware, { loggerErr } from './middleware/logger';
import error from './middleware/error';
import validateMiddleware from './middleware/validate';
import { routerMiddleware, allowedMethods } from './router/router';

const app = new Koa();
app.keys = ['session secret key'];

// 日志打印
app.use(koaLogger());
app.use(loggerMiddleware);
app.use(error);

// session配置
app.use(session(app));
// body解析
app.use(koaBody());
// cookie验证，可选
app.use(validateMiddleware({
  whiteList: ['/api/logout'],
}));
// 跨域
app.use(cors());
// 路由
app.use(routerMiddleware);
app.use(allowedMethods);
// 静态资源目录
app.use(serve(path.join(__dirname, '../client')));

app.listen(config.serverPort, () => {
  console.log(`server is running at : http://localhost:${config.serverPort}`);
});
// 全局异常捕获
process.on('uncaughtException', err => {
  loggerErr.error(JSON.stringify(err));
});
