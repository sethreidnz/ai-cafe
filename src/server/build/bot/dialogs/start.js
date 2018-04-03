"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require("../../database");

var _constants = require("../constants");

var builder = require("botbuilder");


var OPTIONS = {
  RESERVATION: "Make a reservation",
  ORDER: "Make an order",
  REVIEW: "Write a review"
};

var registerStartDialog = function registerStartDialog(bot) {
  bot.dialog(_constants.DIALOG_NAMES.START, [function (session, args, next) {
    builder.Prompts.choice(session, "Welcome to the A.I. Cafe. What would you like to do?", OPTIONS.RESERVATION + "|" + OPTIONS.ORDER + "|" + OPTIONS.REVIEW, { listStyle: builder.ListStyle.button });
  }, function (session, results) {
    switch (results.response.entity) {
      case OPTIONS.RESERVATION:
        {
          console.log(_constants.DIALOG_NAMES.RESERVATION);
          session.replaceDialog(_constants.DIALOG_NAMES.RESERVATION);
          break;
        }
      case OPTIONS.ORDER:
        {
          session.replaceDialog(_constants.DIALOG_NAMES.ORDER);
          break;
        }
      case OPTIONS.REVIEW:
        {
          session.replaceDialog(_constants.DIALOG_NAMES.REVIEW);
          break;
        }
    }
  }]);
};

exports.default = registerStartDialog;
//# sourceMappingURL=start.js.map