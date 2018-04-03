function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const uuidv4 = require("uuid/v4");

export class DatabaseCollectionService {
  constructor(documentClient, databaseId, collectionId) {
    this.documentClient = documentClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;
    this.collection = null;
    this.init.bind(this);
    this.createDatabase.bind(this);
    this.find.bind(this);
    this.addItem.bind(this);
    this.upsertItem.bind(this);
    this.getItem.bind(this);
    this.deleteItem.bind(this);
  }

  ensureCollectionExists() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.collection) return;
      yield _this.init();
    })();
  }

  init() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      try {
        const collection = yield _this2.getOrCreateCollection(_this2.databaseId, _this2.collectionId);
        _this2.collection = collection;
        return _this2;
      } catch (error) {
        console.error(`Error initializing database collection service for database: '${_this2.databaseId}', collectionId: '${_this2.collectionId}'`);
        console.log(error);
      }
    })();
  }

  getOrCreateDatabase(databaseId) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let database = yield _this3.getDatabase(databaseId);
      if (!database) {
        database = _this3.createDatabase(databaseId);
      }
      return database;
    })();
  }

  createDatabase(databaseId) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const databaseResponse = yield _this4.documentClient.createDatabaseAsync({
        id: databaseId
      });
      return databaseResponse.resource;
    })();
  }

  getDatabase(databaseId) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      let result;
      const querySpec = {
        query: 'SELECT * FROM root r WHERE  r.id = @id',
        parameters: [{
          name: '@id',
          value: databaseId
        }]
      };
      const queryIterator = yield _this5.documentClient.queryDatabases(querySpec);
      const results = yield queryIterator.toArrayAsync();
      return results.feed.length !== 0 ? results.feed[0] : null;
    })();
  }

  createCollection(databaseLink, collectionId) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const databaseResponse = yield _this6.documentClient.createCollectionAsync(databaseLink, {
        id: collectionId
      });
      return databaseResponse.response;
    })();
  }

  getOrCreateCollection(databaseId, collectionId) {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      const database = yield _this7.getOrCreateDatabase(databaseId);
      let collection = yield _this7.getCollection(database._self, collectionId);
      if (!collection) {
        collection = _this7.createCollection(database._self, collectionId);
      }
      return collection;
    })();
  }

  getCollection(databaseLink, collectionId) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      let result;
      const querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
          name: '@id',
          value: collectionId
        }]
      };
      const queryIterator = yield _this8.documentClient.queryCollections(databaseLink, querySpec);
      const results = yield queryIterator.toArrayAsync();
      return results.feed.length !== 0 ? results.feed[0] : null;
    })();
  }

  getAll() {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      yield _this9.ensureCollectionExists();
      const results = yield _this9.find('SELECT * from c');
      return results;
    })();
  }

  find(querySpec) {
    var _this10 = this;

    return _asyncToGenerator(function* () {
      yield _this10.ensureCollectionExists();
      const queryIterator = yield _this10.documentClient.queryDocuments(_this10.collection._self, querySpec);
      const results = yield queryIterator.toArrayAsync();
      return results.feed;
    })();
  }

  addItem(item) {
    var _this11 = this;

    return _asyncToGenerator(function* () {
      yield _this11.ensureCollectionExists();
      item.id = uuidv4();
      yield _this11.documentClient.createDocumentAsync(_this11.collection._self, item);
      return item;
    })();
  }

  upsertItem(updatedItem) {
    var _this12 = this;

    return _asyncToGenerator(function* () {
      yield _this12.ensureCollectionExists();
      yield _this12.documentClient.upsertDocumentAsync(_this12.collection._self, updatedItem);
      return updatedItem;
    })();
  }

  getItem(itemId) {
    var _this13 = this;

    return _asyncToGenerator(function* () {
      yield _this13.ensureCollectionExists();
      const querySpec = {
        query: 'SELECT * FROM root r WHERE r.id = @id',
        parameters: [{ name: '@id', value: itemId }]
      };
      const queryIterator = yield _this13.documentClient.queryDocuments(_this13.collection._self, querySpec);
      const results = yield queryIterator.toArrayAsync();
      return results.feed[0];
    })();
  }

  deleteItem(itemId) {
    var _this14 = this;

    return _asyncToGenerator(function* () {
      yield _this14.ensureCollectionExists();
      const currentItem = yield _this14.getItem(itemId);
      if (!currentItem) {
        throw new Error(`Cannot delete item ${itemId} because it doesn't exist.`);
      }
      return yield _this14.documentClient.deleteDocumentAsync(currentItem._self);
    })();
  }
}
//# sourceMappingURL=database-collection-service.js.map