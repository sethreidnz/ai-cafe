var builder = require('botbuilder');
import { ENTITY_NAMES } from '../constants';
export const RESERVATION_DIALOG_NAME = 'reservation';
const registerReservationDialog = bot => {
  bot.dialog(RESERVATION_DIALOG_NAME, [
    (session, args, next) => {
      const bookingTime = builder.EntityRecognizer.findEntity(args.entities, ENTITY_NAMES.DATE_TIME);
      if (!bookingTime) {
        builder.Prompts.time(session, "Yes I can make a booking for you. What time would you like to book?");
      } else {
        next({ response: bookingTime.entity });
      }
    },
    (session, results) => {
      const bookingTime = builder.EntityRecognizer.parseTime(results.response);
      session.dialogData.reservationDate = bookingTime;
      const groupSize = builder.EntityRecognizer.findEntity(args.entities, ENTITY_NAMES.GROUPSIZE);
      if (!groupSize) {
        builder.Prompts.text(session, "How many people in your group?");
      } else {
        next({ response: groupSize.entity });
      }
      builder.Prompts.number(session, "How many people in your group?");
    },
    (session, results) => {
      session.dialogData.groupSize = results.response;
      builder.Prompts.text(session, `Can I have a name for the booking?`);
    },
    (session, results) => {
      session.dialogData.bookingName = results.response;
      builder.Prompts.text(session, `Thanks ${session.dialogData.bookingName} we'll make a booking for ${session.dialogData.groupSize} people, on ${session.dialogData.reservationDate}.`);
      session.endDialog();
    }
  ]);
};

export default registerReservationDialog;