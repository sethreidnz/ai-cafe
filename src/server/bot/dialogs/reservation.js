const builder = require('botbuilder');
import { reservationService } from "../../database";
import { ENTITY_NAMES } from '../constants';

const registerReservationDialog = bot => {
  bot.dialog(RESERVATION_DIALOG_NAME, [
    (session, args, next) => {
      session.dialogData.reservation = {};
      const reservationDate = builder.EntityRecognizer.findEntity(args.entities, ENTITY_NAMES.DATE_TIME);
      if (!reservationDate) {
        builder.Prompts.time(session, "Yes I can make a booking for you. What time would you like to book?");
      } else {
        session.dialogData.reservation.date = reservationDate;
        next();
      }
    },
    (session, results) => {
      if (!session.dialogData.reservation.reservationDate) {
        const reservationDate = builder.EntityRecognizer.parseTime(results.response.entity);
        session.dialogData.reservation.date = reservationDate;
      }
      builder.Prompts.number(session, "How many people in your group?");
    },
    (session, results) => {
      session.dialogData.reservation.groupSize = results.response;
      builder.Prompts.text(session, `Can I have a name for the booking?`);
    },
    (session, results) => {
      session.dialogData.reservation.name = results.response;
      const reservationDetails = session.dialogData.reservation;
      reservationService.addItem(reservationDetails);
      builder.Prompts.text(session, `Thanks ${reservationDetails.name} we'll make a booking for ${reservationDetails.groupSize} people, on ${reservationDetails.date}.`);
      session.endDialog();
    }
  ]);
};

export const RESERVATION_DIALOG_NAME = 'reservation';
export default registerReservationDialog;