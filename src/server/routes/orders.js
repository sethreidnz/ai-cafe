const Router = require('koa-router');
const uuidv4 = require('uuid/v4');
const router = new Router();
const { orderService } = require('../database');

router.get('/orders', async (ctx, next) => {
  const allOrders = await orderService.getAll("SELECT * FROM Families f");
  ctx.body = allOrders
});

router.get('/orders/:id', async (ctx, next) => {
  const itemId = ctx.params.id;
  const order = await orderService.getItem(itemId);
  ctx.body = order
});

router.post('/orders', async (ctx, next) => {
  const order = ctx.request.body;
  order.id = uuidv4();
  await orderService.upsertItem(updatedOrder);
  ctx.status = 200;
});

router.put('/orders/:id', async (ctx, next) => {
  const itemId = ctx.params.id;
  const updatedOrder = ctx.request.body;
  await orderService.upsertItem(updatedOrder);
  ctx.status = 200;
});

router.delete('/orders/:id', async (ctx, next) => {
  const itemId = ctx.params.id;
  await orderService.deleteItem(itemId);
  ctx.status = 200;
});

module.exports = router