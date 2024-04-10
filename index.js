import 'dotenv/config';
import { Bot, GrammyError, HttpError } from 'grammy';

// require('dotenv').config();
const bot = new Bot(process.env.BOT_API_KEY);

const handleCommand = async (ctx) => {
  await ctx.reply('Привет, я бот!');
};

// TODO: Добавить обработчики :voice, :photo

const handleText = async (ctx) => {
  const txt = ctx.message.text;
  if (txt === '/future@PredskazBot') {
    ctx.reply('Ненавижу предсказания...');
    return;
  }
  ctx.reply('Клёвое сообщение чувак!)');
};

const handleError = (err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
}

// bot.api.setMyCommands([
//   {
//     command: 'hello',
//     description: 'Выражение протеста',
//   }
// ])

// bot.command() должен распологаться выше(раньше) bot.on()
bot.command('start', handleCommand);
bot.on(':text', handleText);
bot.catch(handleError);
bot.start();