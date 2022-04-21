const { Kafka } = require('kafkajs')
const TelegramBot = require('node-telegram-bot-api');

const TOPIC = 'notify'
const token = '5316988190:AAHMLldZf6GafRq_TXpQ22gddmDQnjE6b3w';
let action = ''

const kafka = new Kafka({
  clientId: 'client-1',
  brokers: ['localhost:19091', 'localhost:19092', 'localhost:19093'],
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
})

const consumer = kafka.consumer({ groupId: 'notify-group' })
const bot = new TelegramBot(token, {polling: true});

const run = async () => {
  // Consuming
  await consumer.connect()
  
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.action == 'rotate') {
        action = 'rotacionado'
      } else {
        action = 'transformado em preto e branco'
      }

      const text = `O arquivo ${message.new_file} foi ${action}`
      bot.sendMessage(957366775, text)
    },
  })
}

run().catch(console.error)





