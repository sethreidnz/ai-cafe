'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KoaChatConnector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _botbuilder = require('botbuilder');

var _koa = require('koa');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KoaChatConnector = exports.KoaChatConnector = function (_ChatConnector) {
    _inherits(KoaChatConnector, _ChatConnector);

    function KoaChatConnector() {
        _classCallCheck(this, KoaChatConnector);

        return _possibleConstructorReturn(this, (KoaChatConnector.__proto__ || Object.getPrototypeOf(KoaChatConnector)).apply(this, arguments));
    }

    _createClass(KoaChatConnector, [{
        key: 'listen',
        value: function listen() {
            var _listen = _get(KoaChatConnector.prototype.__proto__ || Object.getPrototypeOf(KoaChatConnector.prototype), 'listen', this).call(this);

            return async function (ctx, next) {
                if (!ctx.request.body) {
                    throw new Error("Request body is missing. Please make sure you have a body parsing middleware properly configured.");
                }

                await new Promise(function (resolve) {
                    var req = ctx.request;
                    var res = {
                        send: function send(status, body) {
                            ctx.status = status;
                            ctx.body = body;
                        },
                        status: function status(code) {
                            ctx.status = code;
                        },
                        end: function end() {
                            resolve();
                        }
                    };

                    _listen(req, res);
                });

                await next();
            };
        }
    }]);

    return KoaChatConnector;
}(_botbuilder.ChatConnector);
//# sourceMappingURL=koa-chat-connector.js.map