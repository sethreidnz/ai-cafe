"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var uuidv4 = require("uuid/v4");

var _require = require("../database"),
    orderService = _require.orderService;

exports.default = function (router) {
  router.get('/api/orders', async function (ctx, next) {
    var allOrders = await orderService.getAll("SELECT * FROM Orders");
    ctx.body = allOrders;
  });

  router.get('/api/orders/:id', async function (ctx, next) {
    var itemId = ctx.params.id;
    var order = await orderService.getItem(itemId);
    ctx.body = order;
  });

  router.post('/orders', async function (ctx, next) {
    var order = ctx.request.body;s;
    await orderService.createItem(updatedOrder);
    ctx.status = 200;
  });

  router.put('/api/orders/:id', async function (ctx, next) {
    var itemId = ctx.params.id;
    var updatedOrder = ctx.request.body;
    await orderService.upsertItem(updatedOrder);
    ctx.status = 200;
  });

  router.delete('/api/orders/:id', async function (ctx, next) {
    var itemId = ctx.params.id;
    await orderService.deleteItem(itemId);
    ctx.status = 200;
  });
};
//# sourceMappingURL=orders.js.map