const TelegramBot = require('node-telegram-bot-api');
const token = '5316988190:AAHMLldZf6GafRq_TXpQ22gddmDQnjE6b3w';
const bot = new TelegramBot(token, {polling: true});
const text = "Tudo funcionando"


bot.sendMessage(957366775, text)