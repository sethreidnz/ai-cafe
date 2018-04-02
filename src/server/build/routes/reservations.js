"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var uuidv4 = require("uuid/v4");

var _require = require("../database"),
    reservationService = _require.reservationService;

exports.default = function (router) {
  router.get('/api/reservations', async function (ctx, next) {
    var allOrders = await reservationService.getAll("SELECT * FROM Orders");
    ctx.body = allOrders;
  });

  router.get('/api/reservations/:id', async function (ctx, next) {
    var itemId = ctx.params.id;
    var order = await reservationService.getItem(itemId);
    ctx.body = order;
  });

  router.post('/reservations', async function (ctx, next) {
    var order = ctx.request.body;
    await reservationService.createItem(updatedOrder);
    ctx.status = 200;
  });

  router.put('/api/reservations/:id', async function (ctx, next) {
    var itemId = ctx.params.id;
    var updatedOrder = ctx.request.body;
    await reservationService.upsertItem(updatedOrder);
    ctx.status = 200;
  });

  router.delete('/api/reservations/:id', async function (ctx, next) {
    var itemId = ctx.params.id;
    await reservationService.deleteItem(itemId);
    ctx.status = 200;
  });
};
//# sourceMappingURL=reservations.js.map