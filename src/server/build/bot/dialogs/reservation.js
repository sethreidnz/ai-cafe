'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESERVATION_DIALOG_NAME = undefined;

var _database = require('../../database');

var _constants = require('../constants');

var builder = require('botbuilder');


var registerReservationDialog = function registerReservationDialog(bot) {
  bot.dialog(RESERVATION_DIALOG_NAME, [function (session, args, next) {
    session.dialogData.reservation = {};
    var reservationDate = builder.EntityRecognizer.findEntity(args.entities, _constants.ENTITY_NAMES.DATE_TIME);
    if (!reservationDate) {
      builder.Prompts.time(session, "Yes I can make a booking for you. What time would you like to book?");
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
    builder.Prompts.text(session, 'Can I have a name for the booking?');
  }, function (session, results) {
    session.dialogData.reservation.name = results.response;
    var reservationDetails = session.dialogData.reservation;
    _database.reservationService.addItem(reservationDetails);
    builder.Prompts.text(session, 'Thanks ' + reservationDetails.name + ' we\'ll make a booking for ' + reservationDetails.groupSize + ' people, on ' + reservationDetails.date + '.');
    session.endDialog();
  }]);
};

var RESERVATION_DIALOG_NAME = exports.RESERVATION_DIALOG_NAME = 'reservation';
exports.default = registerReservationDialog;
//# sourceMappingURL=reservation.js.map