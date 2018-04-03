import registerReservationDialog from './reservation';
import registerStartDialog from './start';

const createDialogs = (bot) => {
  registerReservationDialog(bot);
  registerStartDialog(bot);
}

export default createDialogs;