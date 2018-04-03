const builder = require("botbuilder");
import { reservationService } from "../../database";
import { DIALOG_NAMES } from "../constants";

const OPTIONS = {
  RESERVATION: "Make a reservation",
  ORDER: "Make an order",
  REVIEW: "Write a review"
};

const registerStartDialog = bot => {
  bot.dialog(DIALOG_NAMES.START, [(session, args, next) => {
    builder.Prompts.choice(session, `Welcome to the A.I. Cafe. What would you like to do?`, `${OPTIONS.RESERVATION}|${OPTIONS.ORDER}|${OPTIONS.REVIEW}`, { listStyle: builder.ListStyle.button });
  }, (session, results) => {
    switch (results.response.entity) {
      case OPTIONS.RESERVATION:
        {
          console.log(DIALOG_NAMES.RESERVATION);
          session.replaceDialog(DIALOG_NAMES.RESERVATION);
          break;
        }
      case OPTIONS.ORDER:
        {
          session.replaceDialog(DIALOG_NAMES.ORDER);
          break;
        }
      case OPTIONS.REVIEW:
        {
          session.replaceDialog(DIALOG_NAMES.REVIEW);
          break;
        }
    }
  }]);
};

export default registerStartDialog;
//# sourceMappingURL=start.js.map