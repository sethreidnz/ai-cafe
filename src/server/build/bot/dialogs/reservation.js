"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require("../../database");

var _constants = require("../constants");

var builder = require("botbuilder");


var registerReservationDialog = function registerReservationDialog(bot) {
  bot.dialog(_constants.DIALOG_NAMES.RESERVATION, [function (session, args, next) {
    session.dialogData.reservation = {};
    var reservationDate = args && builder.EntityRecognizer.findEntity(args.entities, _constants.ENTITY_NAMES.DATE_TIME);
    if (!reservationDate) {
      builder.Prompts.time(session, "What time would you like to book?");
    } else {
      session.dialogData.reservation.date = reservationDate;
      next();
    }
  }, function (session, results) {
    if (!session.dialogData.reservation.reservationDate) {
      var reservationDate = builder.EntityRecognizer.parseTime(results.response.entity);
      session.dialogData.reservation.date = reservationDate;
    }
    builder.Prompts.number(session, "How many people in your group?");
  }, function (session, results) {
    session.dialogData.reservation.groupSize = results.response;
    builder.Prompts.text(session, "Can I have a name for the booking?");
  }, function (session, results) {
    session.dialogData.reservation.name = results.response;
    var reservationDetails = session.dialogData.reservation;
    builder.Prompts.choice(session, "Thanks " + reservationDetails.name + ". You've asked to make a booking for " + reservationDetails.groupSize + " people, on " + reservationDetails.date + ".Is that correct?", "Yes|No", { listStyle: builder.ListStyle.button });
  }, function (session, results) {
    if (results.response.entity.toLowerCase() === "yes") {
      var reservationDetails = session.dialogData.reservation;
      _database.reservationService.addItem(reservationDetails);
      session.send("Thank you!.");
      session.endDialog();
    } else {
      session.send("Okay lets try again...");
      session.replaceDialog(_constants.DIALOG_NAMES.RESERVATION);
    }
  }]);
};

exports.default = registerReservationDialog;
//# sourceMappingURL=reservation.js.map