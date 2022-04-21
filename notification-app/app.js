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

const run = async () => {
  // Consuming
  await consumer.connect()
  
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true })
  console.log('conectou')
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('sim')
      const bot = new TelegramBot(token, {polling: true});

      if (message.action == 'rotate') {
        let action = 'rotacionado'
      } else {
        let action = 'transformado em preto e branco'
      }

      const text = `O arquivo ${message.new_file} foi ${action}`
      bot.sendMessage(957366775, text)
    },
  })
}

run().catch(console.error)





