const { ChatConnector } = require('botbuilder');
const { Middleware } = require('koa');

module.exports = class KoaChatConnector extends ChatConnector {
    listen() {
        const _listen = super.listen();

        return async (ctx, next) => {
            if (!(ctx.request).body) {
                throw new Error("Request body is missing. Please make sure you have a body parsing middleware properly configured.");
            }

            await new Promise(resolve => {
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
            })
            
            await next();
        };
    }

}