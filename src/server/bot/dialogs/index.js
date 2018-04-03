const registerReservationDialog = require('./reservation');
const registerStartDialog = require('./start');

const createDialogs = (bot) => {
  registerReservationDialog(bot);
  registerStartDialog(bot);
}

module.exports = createDialogs;