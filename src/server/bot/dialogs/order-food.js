const builder = require("botbuilder");
const moment = require("moment");
const { orderService } = require("../../database");
const { DIALOG_NAMES, ENTITY_NAMES } = require("../constants");

const registerOrderFoodDialog = bot => {
  bot.dialog(DIALOG_NAMES.ORDER_FOOD, [
    (session, args, next) => {
      session.dialogData.order = {};
      builder.Prompts.choice(
        session,
        `What would you like?`,
        "Cheese toasty|Mince and cheese pie|Chicken salad|Pumpkin Pie",
        { listStyle: builder.ListStyle.button }
      );
    },
    (session, results) => {
      session.dialogData.order.item = results.response.entity;
      builder.Prompts.time(
        session,
        `When do you want pick it up?`
      );
    },
    (session, results) => {
      session.dialogData.order.pickupTime = builder.EntityRecognizer.parseTime(
        results.response.entity
      );
      builder.Prompts.text(
        session,
        `Name for the order?`
      );
    },
    (session, results) => {
      session.dialogData.order.name = results.response;
      orderService.addItem(session.dialogData.order);
      session.endConversation(`Thank you ${session.dialogData.order.name} your order of ${session.dialogData.order.item} will be ready at ${moment(session.dialogData.order.pickupTime).format('MMMM Do YYYY, h:mm:ss a')}!`);
    }
  ]);
};

module.exports = registerOrderFoodDialog;
