import { Middleware } from 'koa';
import log4js, { Logger } from 'log4js';
import path from 'path';

export type BaseType = {[key: string]: any};
export type LoggerType = Logger & BaseType;

log4js.configure({
    appenders: {
        console:{ // 记录器1:输出到控制台
            type : 'console',
        },
        logFile: {
            type: 'file',
            filename: `${path.join(__dirname, '../../../logs/')}logFile.log`,
            maxLogSize : 20971520,
        },
        infoLog: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: `${path.join(__dirname, '../../../logs/')}infoLog`,
            daysToKeep: 10, // 仅仅保持10天
        },
        errLog: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: `${path.join(__dirname, '../../../logs/')}errLog`,
        }
    },
    categories: {
        default: { appenders: ['infoLog', 'console', 'logFile'], level: 'info' }, // 输出到控制台 log文件 log日期文件 且登记大于info即可
        console:{appenders:['console'], level:'debug'}, // 开发环境  输出到控制台
        errorLog:{appenders:['errLog'], level:'error'}, // error 等级log 单独输出到error文件中 任何环境的errorlog 将都以日期文件单独记录
        production: {appenders:['infoLog'], level:'warn'} // 生产环境 只输出到按日期命名的文件，且只输出警告以上的log
    },
});

export const loggerErr = log4js.getLogger('errLog');

const loggerMiddleware: Middleware = async(ctx, next) => {
    const contextLogger: BaseType = {};
    const logger: LoggerType = process.env.NODE_ENV === 'production' ? log4js.getLogger('production') : log4js.getLogger('infoLog');
    const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
    methods.forEach((method) => {
        contextLogger[method] = (message: string) => {
            logger[method](message);
        };
    });
    ctx.log = contextLogger;
    await next();
};

export default loggerMiddleware;