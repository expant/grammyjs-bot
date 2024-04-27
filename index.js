import 'dotenv/config';
import { Bot, GrammyError, HttpError, Keyboard } from 'grammy';
import { words, users } from './src/utils/data.js';

const bot = new Bot(process.env.BOT_API_KEY);

const handleCommand = async (ctx) => {
  await ctx.reply('Привет, я бот!');
};

// TODO: Добавить обработчики :voice, :photo

const handleText = async (ctx) => {
  const ctxUser = ctx.message.from;
  const txt = ctx.message.text;

  if (txt === '/future@PredskazBot') {
    await ctx.reply(`Ненавижу предсказания... ${ctxUser.first_name} ${ctxUser.last_name} не надо так(`);
  }

  const user = users.find((item) => item.id === ctxUser.id);
  if (!user) {
    await tx.reply(`Кто это?`);
    return;
  }

  
  // await ctx.react('🤡');
  // switch (user.id) {
  //   case 452556725: {
  //     ctx.reply(`${ctxUser.first_name} ${ctxUser.last_name}`);
  //     break;
  //   }
  //   case 522807365:
  //     ctx.reply(`чё Ванёк?`);
  //     break;
  //   default:
  //     throw new Error(`Unknown user id: ${user.id}!`);
  // }

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