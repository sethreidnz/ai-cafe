import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import KoaRouter from 'koa-router';
import createRoutes from './routes';

// configure the routes
const router = new KoaRouter();
createRoutes(router);

// configure the app
var app = new Koa();
app.use(cors()).use(koaBody()).use(router.routes()).use(router.allowedMethods()).listen(5000);

module.exports = app;
//# sourceMappingURL=server.js.map