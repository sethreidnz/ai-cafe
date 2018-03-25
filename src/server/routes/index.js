import orders from './orders';
import messages from './messages';

export default(server) => {
  orders(server);
  messages(server);
};
