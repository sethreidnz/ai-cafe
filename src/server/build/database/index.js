'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reservationService = exports.orderService = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _contants = require('./contants');

var _databaseCollectionService = require('./database-collection-service');

var _utility = require('./utility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();


var documentClient = (0, _utility.getDocumentClient)(process.env.COSMOSDB_HOST, process.env.COSMOSDB_KEY);

var orderService = exports.orderService = new _databaseCollectionService.DatabaseCollectionService(documentClient, _contants.DATABASE_NAME, _contants.ORDERS_COLLECTION_NAME);
orderService.init();

var reservationService = exports.reservationService = new _databaseCollectionService.DatabaseCollectionService(documentClient, _contants.DATABASE_NAME, _contants.RESERVATIONS_COLLECTION_NAME);
reservationService.init();
//# sourceMappingURL=index.js.map