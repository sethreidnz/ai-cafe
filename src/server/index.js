require('dotenv').config()
const Koa = require('koa');
const koaBody = require('koa-body');
const orders = require('./routes/orders');
var app = new Koa();
app
  .use(koaBody())
  .use(orders.routes())
  .use(orders.allowedMethods())
  .listen(3000);