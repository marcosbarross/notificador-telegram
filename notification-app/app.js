const { Kafka } = require('kafkajs')

const TOPIC = 'notify'

const kafka = new Kafka({
  clientId: 'client-1',
  brokers: ['kafka1:19091', 'kafka2:19092', 'kafka3:19093']
})

const consumer = kafka.consumer({ groupId: 'notify-group' })

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

run().catch(console.error)