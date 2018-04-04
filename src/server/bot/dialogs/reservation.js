const builder = require("botbuilder");
const { reservationService } = require("../../database");
const { DIALOG_NAMES, ENTITY_NAMES } = require("../constants");

const registerReservationDialog = bot => {
  bot.dialog(DIALOG_NAMES.RESERVATION, [
    (session, args, next) => {
      session.dialogData.reservation = {};
      const reservationDate = args && builder.EntityRecognizer.findEntity(
        args.entities,
        ENTITY_NAMES.DATE_TIME
      );
      if (!reservationDate) {
        builder.Prompts.time(
          session,
          "What time would you like to book?"
        );
      } else {
        session.dialogData.reservation.date = reservationDate;
        next();
      }
    },
    (session, results) => {
      if (!session.dialogData.reservation.reservationDate) {
        const reservationDate = builder.EntityRecognizer.parseTime(
          results.response.entity
        );
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
      builder.Prompts.choice(
        session,
        `Thanks ${reservationDetails.name}. You've asked to make a booking for ${reservationDetails.groupSize} people, on ${reservationDetails.date}.Is that correct?`,
        "Yes|No",
        { listStyle: builder.ListStyle.button }
      );
    },
    (session, results) => {
      if (results.response.entity.toLowerCase() === "yes") {
        const reservationDetails = session.dialogData.reservation;
        reservationService.addItem(reservationDetails);
        session.endConversation("Thank you!.");
      } else {
        session.send("Okay lets try again...");
        session.replaceDialog(DIALOG_NAMES.RESERVATION);
      }
    }
  ]);
};

module.exports = registerReservationDialog;
