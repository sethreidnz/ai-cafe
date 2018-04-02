'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orders = require('./orders');

var _orders2 = _interopRequireDefault(_orders);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _reservations = require('./reservations');

var _reservations2 = _interopRequireDefault(_reservations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
  (0, _messages2.default)(router);
  (0, _orders2.default)(router);
  (0, _reservations2.default)(router);
  return router;
};
//# sourceMappingURL=index.js.map