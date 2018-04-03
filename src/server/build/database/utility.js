const DocumentClient = require('documentdb-q-promises').DocumentClientWrapper;

let documentClient;
export const getDocumentClient = (host, key) => {
  if (!documentClient) {
    documentClient = new DocumentClient(host, { masterKey: key });
  }
  return documentClient;
};
//# sourceMappingURL=utility.js.map