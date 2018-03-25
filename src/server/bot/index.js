var builder = require('botbuilder');
export const connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

export const bot = new builder.UniversalBot(connector, function (session) {
  session.send("You said: %s", session.message.text);
});