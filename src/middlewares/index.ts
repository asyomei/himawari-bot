import type { Bot } from 'grammy'
import type { MyContext } from '~/types/context'
import { autoRetry } from '@grammyjs/auto-retry'
import { sequentialize } from '@grammyjs/runner'
import { apiThrottler } from '@grammyjs/transformer-throttler'
import { autoThread } from './auto-thread'

export function setupMiddlewares(bot: Bot<MyContext>): void {
  bot.api.config.use(autoRetry(), apiThrottler())
  bot.use(sequentialize(ctx => ctx.from?.id.toString()), autoThread())
}
