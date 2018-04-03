const uuidv4 = require("uuid/v4");
const { orderService } = require("../database");

module.exports = router => {
  router.get('/api/orders', async (ctx, next) => {
    const allOrders = await orderService.getAll("SELECT * FROM Orders");
    ctx.body = allOrders
  });
  
  router.get('/api/orders/:id', async (ctx, next) => {
    const itemId = ctx.params.id;
    const order = await orderService.getItem(itemId);
    ctx.body = order
  });
  
  router.post('/orders', async (ctx, next) => {
    const order = ctx.request.body;s
    await orderService.createItem(updatedOrder);
    ctx.status = 200;
  });
  
  router.put('/api/orders/:id', async (ctx, next) => {
    const itemId = ctx.params.id;
    const updatedOrder = ctx.request.body;
    await orderService.upsertItem(updatedOrder);
    ctx.status = 200;
  });
  
  router.delete('/api/orders/:id', async (ctx, next) => {
    const itemId = ctx.params.id;
    await orderService.deleteItem(itemId);
    ctx.status = 200;
  });
};
