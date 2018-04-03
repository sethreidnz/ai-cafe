import orders from './orders';
import messages from './messages';
import reservations from './reservations';

export default (router => {
  messages(router);
  orders(router);
  reservations(router);
  return router;
});
//# sourceMappingURL=index.js.map