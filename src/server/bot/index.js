var builder = require('botbuilder');
var azure = require('botbuilder-azure'); 
import dotenv from 'dotenv';
dotenv.config()
import { DATABASE_NAME, BOT_DATA_COLLECTION_NAME } from '../database/contants'
import { RESERVATION_DIALOG_NAME } from './dialogs/reservation';
import createDialogs from './dialogs';
import { KoaChatConnector } from './koa-chat-connector';

var documentDbOptions = {
    host: process.env.COSMOSDB_HOST, 
    masterKey: process.env.COSMOSDB_KEY, 
    database: DATABASE_NAME,   
    collection: BOT_DATA_COLLECTION_NAME
};

// Configure the connector
export const connector = new KoaChatConnector({
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
.matches('Greeting', (session) => {
    session.send('You reached Greeting intent, you said \'%s\'.', session.message.text);
})
.matches('Order', (session) => {
    session.send('You reached Order intent, you said \'%s\'.', session.message.text);
})
.matches('Booking', (session, args) => {
    session.beginDialog(RESERVATION_DIALOG_NAME, args);
})
.matches('Utilities.StartOver', (session) => {
  session.send('You reached StartOver intent, you said \'%s\'.', session.message.text);
})
.matches('Utilities.Cancel', (session) => {
    session.send('You reached Cancel intent, you said \'%s\'.', session.message.text);
})
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('/', intents); 
createDialogs(bot);  


