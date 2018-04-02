'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DocumentClient = require('documentdb-q-promises').DocumentClientWrapper;

var documentClient = void 0;
var getDocumentClient = exports.getDocumentClient = function getDocumentClient(host, key) {
  if (!documentClient) {
    documentClient = new DocumentClient(host, { masterKey: key });
  }
  return documentClient;
};
//# sourceMappingURL=utility.js.map