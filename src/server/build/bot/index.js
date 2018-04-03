'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connector = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _contants = require('../database/contants');

var _constants = require('./constants');

var _dialogs = require('./dialogs');

var _dialogs2 = _interopRequireDefault(_dialogs);

var _koaChatConnector = require('./koa-chat-connector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var builder = require('botbuilder');
var azure = require('botbuilder-azure');

_dotenv2.default.config();


var documentDbOptions = {
    host: process.env.COSMOSDB_HOST,
    masterKey: process.env.COSMOSDB_KEY,
    database: _contants.DATABASE_NAME,
    collection: _contants.BOT_DATA_COLLECTION_NAME
};

// Configure the connector
var connector = exports.connector = new _koaChatConnector.KoaChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Setup the bot with CosmosDB Storage
var bot = new builder.UniversalBot(connector);
var docDbClient = new azure.DocumentDbClient(documentDbOptions);
var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);
bot.set('storage', cosmosStorage);

//configure LUIS
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName;
if (!luisAppId || !luisAPIKey || !luisAPIHostName) {
    throw new Error("Required LUIS settings are not set.");
}

var LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] }).matches(_constants.INTENT_NAMES.GREETING, function (session) {
    session.beginDialog(_constants.DIALOG_NAMES.START);
}).matches(_constants.INTENT_NAMES.ORDER, function (session) {
    session.send('You reached Order intent, you said \'%s\'.', session.message.text);
}).matches(_constants.INTENT_NAMES.RESERVATION, function (session, args) {
    session.beginDialog(_constants.DIALOG_NAMES.RESERVATION, args);
}).matches(_constants.INTENT_NAMES.START_OVER, function (session) {
    session.send("Alright let's start over", session.message.text);
    session.beginDialog(_constants.DIALOG_NAMES.START, args);
}).matches(_constants.INTENT_NAMES.CANCEL, function (session) {
    session.send("Alright I'll cancel your request", session.message.text);
}).onDefault(function (session) {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('/', intents);
(0, _dialogs2.default)(bot);
//# sourceMappingURL=index.js.map