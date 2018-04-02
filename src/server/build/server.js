'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _cors = require('@koa/cors');

var _cors2 = _interopRequireDefault(_cors);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// configure the routes
var router = new _koaRouter2.default();
(0, _routes2.default)(router);

// configure the app
var app = new _koa2.default();
app.use((0, _cors2.default)()).use((0, _koaBody2.default)()).use(router.routes()).use(router.allowedMethods()).listen(5000);

module.exports = app;
//# sourceMappingURL=server.js.map