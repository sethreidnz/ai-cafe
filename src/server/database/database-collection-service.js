class DatabaseCollectionService {
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

  async ensureCollectionExists() {
    if(this.collection) return;
    await this.init();
  }

  async init() {
    try {
      const collection = await this.getOrCreateCollection(
        this.databaseId,
        this.collectionId
      );
      this.collection = collection;
    } catch (error) {
      console.error(
        `Error initializing database collection service for database: '${
          this.databaseId
        }', collectionId: '${this.collectionId}'`
      );
      console.log(error);
    }
  }

  async getOrCreateDatabase(databaseId) {
    let database = await this.getDatabase(databaseId);
    if (!database) {
      database = this.createDatabase(databaseId);
    }
    return database;
  }

  async createDatabase(databaseId) {
    const databaseResponse = await this.documentClient.createDatabaseAsync({
      id: databaseId
    });
    return databaseResponse.resource;
  }

  async getDatabase(databaseId) {
    let result;
    const querySpec = {
      query: "SELECT * FROM root r WHERE  r.id = @id",
      parameters: [
        {
          name: "@id",
          value: databaseId
        }
      ]
    };
    const queryIterator = await this.documentClient.queryDatabases(querySpec);
    const results = await queryIterator.toArrayAsync();
    return results.feed.length !== 0 ? results.feed[0] : null;
  }

  async createCollection(databaseLink, collectionId) {
    const databaseResponse = await this.documentClient.createCollectionAsync(
      databaseLink,
      {
        id: collectionId
      }
    );
    return databaseResponse.response;
  }

  async getOrCreateCollection(databaseId, collectionId) {
    const database = await this.getOrCreateDatabase(databaseId);
    let collection = await this.getCollection(database._self, collectionId);
    if (!collection) {
      collection = this.createCollection(database._self, collectionId);
    }
    return collection;
  }

  async getCollection(databaseLink, collectionId) {
    let result;
    let querySpec = {
      query: "SELECT * FROM root r WHERE r.id=@id",
      parameters: [
        {
          name: "@id",
          value: collectionId
        }
      ]
    };
    const queryIterator = await this.documentClient.queryCollections(
      databaseLink,
      querySpec
    );
    const results = await queryIterator.toArrayAsync();
    return results.feed.length !== 0 ? results.feed[0] : null;
  }

  async getAll(querySpec) {
    await this.ensureCollectionExists();
    const results = await this.find("SELECT * from c");
    return results;
  }
  
  async find(querySpec) {
    await this.ensureCollectionExists();
    const queryIterator = await this.documentClient.queryDocuments(this.collection._self, querySpec);
    const results = await queryIterator.toArrayAsync();
    return results.feed;
  }

  async addItem(item) {
    await this.ensureCollectionExists();
    return await this.documentClient.createDocumentAsync(this.collection._self, item);;
  }

  async upsertItem(updatedItem) {
    await this.ensureCollectionExists();
    return await this.documentClient.upsertDocumentAsync(this.collection._self, updatedItem);;
  }

  async getItem(itemId) {
    await this.ensureCollectionExists();
    let querySpec = {
      query: "SELECT * FROM root r WHERE r.id = @id",
      parameters: [{ name: "@id", value: itemId }]
    };
    const queryIterator = await this.documentClient.queryDocuments(this.collection._self, querySpec);
    const results = await queryIterator.toArrayAsync();
    return results.feed[0];
  }

  async deleteItem(itemId) {
    await this.ensureCollectionExists();
    const currentItem = await this.getItem(itemId);
    if (!currentItem) {
        throw new Error(`Cannot delete item ${itemId} because it doesn't exist.`);
    }
    return await this.documentClient.deleteDocumentAsync(currentItem._self);
  }
}

module.exports = {
 DatabaseCollectionService
}
