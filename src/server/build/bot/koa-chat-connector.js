function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { ChatConnector } from 'botbuilder';
import { Middleware } from 'koa';

export class KoaChatConnector extends ChatConnector {
    listen() {
        const _listen = super.listen();

        return (() => {
            var _ref = _asyncToGenerator(function* (ctx, next) {
                if (!ctx.request.body) {
                    throw new Error("Request body is missing. Please make sure you have a body parsing middleware properly configured.");
                }

                yield new Promise(function (resolve) {
                    const req = ctx.request;
                    const res = {
                        send(status, body) {
                            ctx.status = status;
                            ctx.body = body;
                        },
                        status(code) {
                            ctx.status = code;
                        },
                        end() {
                            resolve();
                        }
                    };

                    _listen(req, res);
                });

                yield next();
            });

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        })();
    }

}
//# sourceMappingURL=koa-chat-connector.js.map