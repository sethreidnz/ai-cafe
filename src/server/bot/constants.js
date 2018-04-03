const DIALOG_NAMES = {
  START: "start",
  RESERVATION: "reservation",
  ORDER: "order"
};

const INTENT_NAMES = {
  GREETING: "Greeting",
  RESERVATION: "Booking",
  ORDER: "Order",
  START_OVER: "Utilities.StartOver",
  CANCEL: "Utilities.Cancel"
};

const ENTITY_NAMES = {
  DATE_TIME: "builtin.datetimeV2.datetime",
  PRODUCT: "Product",
  GROUP_SIZE: "GroupSize"
};

module.exports = {
  DIALOG_NAMES,
  INTENT_NAMES,
  ENTITY_NAMES
}
