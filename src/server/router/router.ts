import Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import User from '../controllers/user';
import LoginController from '../controllers/login';

const router = new Router<DefaultState, Context>({prefix: '/api'});
router.get('/user', User);
router.get('/logout', LoginController.logout);

export default router;

export const routerMiddleware = router.routes();

export const allowedMethods = router.allowedMethods();

