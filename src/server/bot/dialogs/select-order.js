const builder = require("botbuilder");
const { reservationService } = require("../../database");
const { DIALOG_NAMES, ENTITY_NAMES, ACTION_NAMES } = require("../constants");

const registerSelectOrderDialog = bot => {
  bot.dialog(DIALOG_NAMES.SELECT_ORDER, [
    (session, args, next) => {
      session.dialogData.order = {
        name: null,
        items: []
      }
      var cards = getFoodChoiceCard();

      // create reply with Carousel AttachmentLayout
      var reply = new builder.Message(session)
        .text("What type of order would you like to make?")
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);

      session.send(reply);
    },
    (session, result) => {
      console.log(result);
    }
  ])
  .beginDialogAction(ACTION_NAMES.ORDER_COFFEE, DIALOG_NAMES.ORDER_COFFEE)
  .beginDialogAction(ACTION_NAMES.ORDER_FOOD, DIALOG_NAMES.ORDER_FOOD);
};

const getFoodChoiceCard = (session) => {
  return [
    new builder.HeroCard(session)
      .images([
        builder.CardImage.create(
          session,
          "https://aicafe.blob.core.windows.net/images/coffee.jpg",
        )
      ])
      .buttons([builder.CardAction.dialogAction(session, ACTION_NAMES.ORDER_COFFEE, null, "Coffee")]),
    new builder.HeroCard(session)
      .images([
        builder.CardImage.create(
          session,
          "https://aicafe.blob.core.windows.net/images/food.jpg"
        )
      ])
      .buttons([builder.CardAction.dialogAction(session, ACTION_NAMES.ORDER_FOOD,  null, "Food")])
  ];
}

module.exports = registerSelectOrderDialog;