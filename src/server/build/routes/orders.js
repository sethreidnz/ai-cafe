function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const uuidv4 = require("uuid/v4");
const { orderService } = require("../database");

export default (router => {
  router.get('/api/orders', (() => {
    var _ref = _asyncToGenerator(function* (ctx, next) {
      const allOrders = yield orderService.getAll("SELECT * FROM Orders");
      ctx.body = allOrders;
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })());

  router.get('/api/orders/:id', (() => {
    var _ref2 = _asyncToGenerator(function* (ctx, next) {
      const itemId = ctx.params.id;
      const order = yield orderService.getItem(itemId);
      ctx.body = order;
    });

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })());

  router.post('/orders', (() => {
    var _ref3 = _asyncToGenerator(function* (ctx, next) {
      const order = ctx.request.body;s;
      yield orderService.createItem(updatedOrder);
      ctx.status = 200;
    });

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  })());

  router.put('/api/orders/:id', (() => {
    var _ref4 = _asyncToGenerator(function* (ctx, next) {
      const itemId = ctx.params.id;
      const updatedOrder = ctx.request.body;
      yield orderService.upsertItem(updatedOrder);
      ctx.status = 200;
    });

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  })());

  router.delete('/api/orders/:id', (() => {
    var _ref5 = _asyncToGenerator(function* (ctx, next) {
      const itemId = ctx.params.id;
      yield orderService.deleteItem(itemId);
      ctx.status = 200;
    });

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  })());
});
//# sourceMappingURL=orders.js.map