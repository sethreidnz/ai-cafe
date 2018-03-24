const { DatabaseCollectionService } = require('./database-collection-service');
const { getDocumentClient } = require('./utility');
const documentClient = getDocumentClient(
  process.env.COSMOSDB_HOST,
  process.env.COSMOSDB_KEY);

const orderService = new DatabaseCollectionService(documentClient, "AICafe", "Orders");
orderService.init();

module.exports = {
  orderService
}