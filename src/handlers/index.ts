import type { Bot } from 'grammy'
import type { MyContext } from '~/types/context'
import { nopHandler } from './nop'
import { shikimoriHandler } from './shikimori'

export function setupHandlers(bot: Bot<MyContext>): void {
  bot.use(
    shikimoriHandler,
    nopHandler,
  )
}
