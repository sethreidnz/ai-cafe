import { connector } from '../bot';

export default (router => {
  router.post("/api/messages", connector.listen());
});
//# sourceMappingURL=messages.js.map