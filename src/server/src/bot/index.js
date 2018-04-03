var builder = require('botbuilder');
var azure = require('botbuilder-azure'); 
const dotenv = require('dotenv');
dotenv.config()
const { DATABASE_NAME, BOT_DATA_COLLECTION_NAME } = require('../database/contants');
const { INTENT_NAMES, DIALOG_NAMES } = require('./constants');
const createDialogs = require('./dialogs');
const KoaChatConnector = require('./koa-chat-connector');

var documentDbOptions = {
    host: process.env.COSMOSDB_HOST, 
    masterKey: process.env.COSMOSDB_KEY, 
    database: DATABASE_NAME,   
    collection: BOT_DATA_COLLECTION_NAME
};

// Configure the connector
const connector = new KoaChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Setup the bot with CosmosDB Storage
const bot = new builder.UniversalBot(connector);
var docDbClient = new azure.DocumentDbClient(documentDbOptions);
var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);
bot.set('storage', cosmosStorage);

//configure LUIS
const luisAppId = process.env.LuisAppId;
const luisAPIKey = process.env.LuisAPIKey;
const luisAPIHostName = process.env.LuisAPIHostName;
if (!luisAppId || !luisAPIKey || !luisAPIHostName) {
  throw new Error("Required LUIS settings are not set.");
}

const LuisModelUrl = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${luisAppId}?subscription-key=${luisAPIKey}`;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches(INTENT_NAMES.GREETING, (session) => {
    session.beginDialog(DIALOG_NAMES.START);
})
.matches(INTENT_NAMES.ORDER, (session) => {
    session.send('You reached Order intent, you said \'%s\'.', session.message.text);
})
.matches(INTENT_NAMES.RESERVATION, (session, args) => {
    session.beginDialog(DIALOG_NAMES.RESERVATION, args);
})
.matches(INTENT_NAMES.START_OVER, (session) => {
    session.send("Alright let's start over", session.message.text);
    session.beginDialog(DIALOG_NAMES.START, args);
})
.matches(INTENT_NAMES.CANCEL, (session) => {
    session.send("Alright I'll cancel your request", session.message.text);
})
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('/', intents); 
createDialogs(bot);  

module.exports = connector;