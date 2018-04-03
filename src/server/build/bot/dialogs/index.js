'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reservation = require('./reservation');

var _reservation2 = _interopRequireDefault(_reservation);

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDialogs = function createDialogs(bot) {
  (0, _reservation2.default)(bot);
  (0, _start2.default)(bot);
};

exports.default = createDialogs;
//# sourceMappingURL=index.js.map