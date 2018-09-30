require('dotenv').load()
const Telegraf = require('telegraf')
const Twitter = require('twitter')

const bot = new Telegraf(process.env.BOT_TOKEN)

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

bot.command('lasttweet', (ctx) => {
  ctx.reply('Fetching last tweet..')
  client.get('statuses/user_timeline', { screen_name: 'therealGelBot' }, (err, tweets) => {
    if (!err) {
      ctx.reply(tweets[0].text)
    }
  })
})
bot.command('tweet', (ctx) => {
  const tweetText = ctx.message.text.substring(7)
  if (tweetText) {
    ctx.reply('Tweeting..')
    client.post('statuses/update', { status: tweetText }, (err, tweet) => {
      if (err) throw err;
      ctx.reply(`Success! Tweeted: "${tweet}"`)
    })
  }
})

// comment
bot.startPolling()
