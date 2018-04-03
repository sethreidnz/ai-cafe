const connector = require('../bot');

module.exports = router => {
  router.post("/api/messages", connector.listen());
}