const uuidv4 = require("uuid/v4");
const { orderService } = require("../database");

export default server => {
  server.get("/api/orders", (req, res, next) => {
    orderService.getAll().then(allOrders => {
      res.send(allOrders);
      return next();
    });
  });
  server.post("/orders", (req, res, next) => {
    const order = req.body;
    order.id = uuidv4();
    orderService.upsertItem(order).then(order => {
      res.status(200);
      res.send(order.id);
      return next();
    });
  });
  server.put("/orders/:id", (req, res, next) => {
    const order = req.body;
    order.id = req.params.idl;
    orderService.upsertItem(order).then(order => {
      res.status(200);
      res.send(order.id);
      return next();
    });
  });
  server.del("/orders/:id", (req, res, next) => {
    const itemId = req.params.id;
    console.log(itemId);
    orderService.deleteItem(itemId).then(() => {
      res.status(200);
      res.send();
      return next();
    });
  });
};
