import { Composer } from 'grammy'
import { viaMe } from '~/filters/via-me'

export const nopHandler = new Composer()

nopHandler.on('callback_query', ctx => ctx.answerCallbackQuery())

nopHandler.on('inline_query', ctx => ctx.answerInlineQuery([], { cache_time: 0 }))

nopHandler.filter(viaMe).hears('del', ctx => ctx.deleteMessage())
