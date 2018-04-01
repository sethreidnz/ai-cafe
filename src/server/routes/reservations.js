const uuidv4 = require("uuid/v4");
const { reservationService } = require("../database");

export default router => {
  router.get('/api/reservations', async (ctx, next) => {
    const allOrders = await reservationService.getAll("SELECT * FROM Orders");
    ctx.body = allOrders
  });
  
  router.get('/api/reservations/:id', async (ctx, next) => {
    const itemId = ctx.params.id;
    const order = await reservationService.getItem(itemId);
    ctx.body = order
  });
  
  router.post('/reservations', async (ctx, next) => {
    const order = ctx.request.body;
    await reservationService.createItem(updatedOrder);
    ctx.status = 200;
  });
  
  router.put('/api/reservations/:id', async (ctx, next) => {
    const itemId = ctx.params.id;
    const updatedOrder = ctx.request.body;
    await reservationService.upsertItem(updatedOrder);
    ctx.status = 200;
  });
  
  router.delete('/api/reservations/:id', async (ctx, next) => {
    const itemId = ctx.params.id;
    await reservationService.deleteItem(itemId);
    ctx.status = 200;
  });
};
