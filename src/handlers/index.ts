import type { Bot } from 'grammy'
import type { MyContext } from '~/types/context'
import { helpHandler } from './help'
import { nopHandler } from './nop'
import { shikimoriHandler } from './shikimori'

export function setupHandlers(bot: Bot<MyContext>): void {
  bot.use(
    helpHandler,
    shikimoriHandler,
    nopHandler,
  )
}
