const orders = require('./orders');
const messages = require('./messages');
const reservations = require('./reservations');

module.exports = (router) => {
  messages(router);
  orders(router);
  reservations(router);
  return router;
};
