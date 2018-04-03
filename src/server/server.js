const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const KoaRouter = require('koa-router');
const createRoutes = require('./routes');

// configure the routes
const router = new KoaRouter();
createRoutes(router);

// configure the app
var app = new Koa();
app
  .use(cors())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(5000);

module.exports = app;