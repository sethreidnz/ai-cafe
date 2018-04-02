"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bot = require("../bot");

exports.default = function (router) {
  router.post("/api/messages", _bot.connector.listen());
};
//# sourceMappingURL=messages.js.map