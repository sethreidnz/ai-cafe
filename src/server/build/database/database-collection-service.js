'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuidv4 = require("uuid/v4");

var DatabaseCollectionService = exports.DatabaseCollectionService = function () {
  function DatabaseCollectionService(documentClient, databaseId, collectionId) {
    _classCallCheck(this, DatabaseCollectionService);

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

  _createClass(DatabaseCollectionService, [{
    key: 'ensureCollectionExists',
    value: async function ensureCollectionExists() {
      if (this.collection) return;
      await this.init();
    }
  }, {
    key: 'init',
    value: async function init() {
      try {
        var collection = await this.getOrCreateCollection(this.databaseId, this.collectionId);
        this.collection = collection;
        return this;
      } catch (error) {
        console.error('Error initializing database collection service for database: \'' + this.databaseId + '\', collectionId: \'' + this.collectionId + '\'');
        console.log(error);
      }
    }
  }, {
    key: 'getOrCreateDatabase',
    value: async function getOrCreateDatabase(databaseId) {
      var database = await this.getDatabase(databaseId);
      if (!database) {
        database = this.createDatabase(databaseId);
      }
      return database;
    }
  }, {
    key: 'createDatabase',
    value: async function createDatabase(databaseId) {
      var databaseResponse = await this.documentClient.createDatabaseAsync({
        id: databaseId
      });
      return databaseResponse.resource;
    }
  }, {
    key: 'getDatabase',
    value: async function getDatabase(databaseId) {
      var result = void 0;
      var querySpec = {
        query: 'SELECT * FROM root r WHERE  r.id = @id',
        parameters: [{
          name: '@id',
          value: databaseId
        }]
      };
      var queryIterator = await this.documentClient.queryDatabases(querySpec);
      var results = await queryIterator.toArrayAsync();
      return results.feed.length !== 0 ? results.feed[0] : null;
    }
  }, {
    key: 'createCollection',
    value: async function createCollection(databaseLink, collectionId) {
      var databaseResponse = await this.documentClient.createCollectionAsync(databaseLink, {
        id: collectionId
      });
      return databaseResponse.response;
    }
  }, {
    key: 'getOrCreateCollection',
    value: async function getOrCreateCollection(databaseId, collectionId) {
      var database = await this.getOrCreateDatabase(databaseId);
      var collection = await this.getCollection(database._self, collectionId);
      if (!collection) {
        collection = this.createCollection(database._self, collectionId);
      }
      return collection;
    }
  }, {
    key: 'getCollection',
    value: async function getCollection(databaseLink, collectionId) {
      var result = void 0;
      var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
          name: '@id',
          value: collectionId
        }]
      };
      var queryIterator = await this.documentClient.queryCollections(databaseLink, querySpec);
      var results = await queryIterator.toArrayAsync();
      return results.feed.length !== 0 ? results.feed[0] : null;
    }
  }, {
    key: 'getAll',
    value: async function getAll() {
      await this.ensureCollectionExists();
      var results = await this.find('SELECT * from c');
      return results;
    }
  }, {
    key: 'find',
    value: async function find(querySpec) {
      await this.ensureCollectionExists();
      var queryIterator = await this.documentClient.queryDocuments(this.collection._self, querySpec);
      var results = await queryIterator.toArrayAsync();
      return results.feed;
    }
  }, {
    key: 'addItem',
    value: async function addItem(item) {
      await this.ensureCollectionExists();
      item.id = uuidv4();
      await this.documentClient.createDocumentAsync(this.collection._self, item);
      return item;
    }
  }, {
    key: 'upsertItem',
    value: async function upsertItem(updatedItem) {
      await this.ensureCollectionExists();
      await this.documentClient.upsertDocumentAsync(this.collection._self, updatedItem);
      return updatedItem;
    }
  }, {
    key: 'getItem',
    value: async function getItem(itemId) {
      await this.ensureCollectionExists();
      var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id = @id',
        parameters: [{ name: '@id', value: itemId }]
      };
      var queryIterator = await this.documentClient.queryDocuments(this.collection._self, querySpec);
      var results = await queryIterator.toArrayAsync();
      return results.feed[0];
    }
  }, {
    key: 'deleteItem',
    value: async function deleteItem(itemId) {
      await this.ensureCollectionExists();
      var currentItem = await this.getItem(itemId);
      if (!currentItem) {
        throw new Error('Cannot delete item ' + itemId + ' because it doesn\'t exist.');
      }
      return await this.documentClient.deleteDocumentAsync(currentItem._self);
    }
  }]);

  return DatabaseCollectionService;
}();
//# sourceMappingURL=database-collection-service.js.map