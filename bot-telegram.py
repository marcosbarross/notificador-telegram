import telegram

api_key = '5316988190:AAHMLldZf6GafRq_TXpQ22gddmDQnjE6b3w'
user_id = '957366775'

bot = telegram.Bot(token=api_key)

bot.send_message(chat_id=user_id, text='Está funcionando')
