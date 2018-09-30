require('dotenv').load()

console.log(process.env.NODE_ENV)
const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('tweet', (ctx) => {
    ctx.reply('Right away sir!')
})

const Twitter = require('twitter')

const client = new Twitter({
})

bot.startPolling()