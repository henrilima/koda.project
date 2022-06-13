const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });
const { token } = require('./Config/config');
const path = require('path');

const KodaClient = require('./Client/kodabot');
const KodaBot = new KodaClient(client);

KodaBot.start(token).then((koda) => {
	console.log(`[CLIENT]: ${koda} Carregado!`);
});

global.koda = client;

global.koda.commands = new Collection();
global.koda.events = new Collection();
global.koda.aliases = new Collection();

global.koda.color = "#000000";
global.koda.manager = KodaBot;
global.koda.discord = require("discord.js");

KodaBot.loadEvents(path.join(__dirname, "Events"));
KodaBot.loadCommands(path.join(__dirname, "Commands"));

require('./Database/DatabaseConnect');
require('./Utils/KodaFunctions');