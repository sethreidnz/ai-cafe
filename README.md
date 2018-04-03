## AI Cafe Bot

This repository contains an example application that uses Microsoft's [Bot Builder SDK](https://github.com/Microsoft/BotBuilder) to make a bot for interacting with a fictional cafe called A.I. cafe.

## Pre-requisites

You will need the following:

- [NodeJS](https://nodejs.org/en/download/) >= 8
- [Azure CosmosDB Account](https://docs.microsoft.com/en-us/azure/cosmos-db/)
- [A LUIS Account and key](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-get-started-create-app)
- [Bot Framework Emulator](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-debug-emulator)

## Setting up

There are a few things you'll have to do to get started...

### Getting your keys and setting up your environemnt

In order to run the backend you will need to create a file at `src/server/.env` that looks like this:

```
COSMOSDB_HOST=YOUR_COSMOSDB_ENDPOINT
COSMOSDB_KEY=YOUR_COSMOSDB_KEY
LuisAppId=LUIS_APP_ID
LuisAPIKey=LUIS_API_KEY
LuisAPIHostName=LUIS_HOSTNAME
```

> Note: The `LUIS_HOSTNAME` is the part of the url like this `westus.api.cognitive.microsoft.com`

To get the LUIS app id go to the luis **My Apps** section [here](https://www.luis.ai/applications), click **Import new app** and upload the file found `src/luis.json`. Then you can click on that item and click settings to get the **Application ID**.


### Install packages

To install the client packages:

```
cd src/client
npm install
```

To install the server packages:

```
cd src/server
npm install
```

### Run the apps

To run the client:

```
cd src/client
npm start
```

To run the server:

```
cd src/server
npm run serve
```

### Run the emulator

Open the Bot Framework emulator and then use the endpoint `https://localhost:5000/api/messages` and press connect.

Now you should be able to follow the prompts in the app and then refresh the pages in the app at `http://localhost:3000` and the reservations and orders come in.