const registerStartDialog = require('./start');
const registerReservationDialog = require('./reservation');
const registerSelectOrderDialog = require('./select-order');
const registerOrderCoffeeDialog = require('./order-coffee');
const registerOrderFoodDialog = require('./order-food');

const createDialogs = (bot) => {
  registerStartDialog(bot);
  registerReservationDialog(bot);
  registerSelectOrderDialog(bot);
  registerOrderCoffeeDialog(bot);
  registerOrderFoodDialog(bot);
}

module.exports = createDialogs;