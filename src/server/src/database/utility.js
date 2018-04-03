const DocumentClient = require('documentdb-q-promises').DocumentClientWrapper;

let documentClient;
const getDocumentClient = (host, key) => {
  if (!documentClient) {
    documentClient = new DocumentClient(host, { masterKey: key });
  }
  return documentClient;
}

module.exports = {
  getDocumentClient
}