const dotenv  = require('dotenv');
dotenv.config()
const { DATABASE_NAME, ORDERS_COLLECTION_NAME, RESERVATIONS_COLLECTION_NAME }  = require('./contants');
const DatabaseCollectionService  = require('./database-collection-service');
const { getDocumentClient }  = require('./utility');

const documentClient = getDocumentClient(
  process.env.COSMOSDB_HOST,
  process.env.COSMOSDB_KEY);

const orderService = new DatabaseCollectionService(documentClient, DATABASE_NAME, ORDERS_COLLECTION_NAME);
orderService.init();

const reservationService = new DatabaseCollectionService(documentClient, DATABASE_NAME, RESERVATIONS_COLLECTION_NAME);
reservationService.init();

module.exports = {
  orderService,
  reservationService
}
