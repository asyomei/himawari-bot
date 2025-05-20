import type { MyContext } from './types/context'
import { run } from '@grammyjs/runner'
import { Bot } from 'grammy'
import { BOT_TOKEN } from './env'
import { setupHandlers } from './handlers'
import { setupMiddlewares } from './middlewares'
import './dayjs'

if (!BOT_TOKEN) {
  throw new Error('Missing BOT_TOKEN')
}

const bot = new Bot<MyContext>(BOT_TOKEN)
setupMiddlewares(bot)
setupHandlers(bot)

run(bot, {
  runner: {
    fetch: {
      allowed_updates: ['message', 'callback_query', 'inline_query', 'chosen_inline_result'],
    },
  },
})

await bot.init()
const { username } = bot.botInfo
console.log(`@${username} started`)
