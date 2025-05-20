import { Composer, InlineKeyboard } from 'grammy'
import { getCharacterInfo } from './executors'
import { makeCharacterText } from './text'

export const characterInfoHandler = new Composer()

characterInfoHandler.callbackQuery(/^character (\w+) (\d+)$/, async (ctx) => {
  const id = ctx.match[1]
  const fromId = Number(ctx.match[2])
  if (fromId !== ctx.from.id) {
    await ctx.answerCallbackQuery()
    return
  }

  const character = await getCharacterInfo({ id })
  if (!character) {
    await ctx.answerCallbackQuery('Ошибка: персонаж не найдено')
    return
  }

  const text = makeCharacterText(character)
  await ctx.answerCallbackQuery()
  await ctx.editMessageText(text, {
    parse_mode: 'HTML',
    link_preview_options: {
      url: character.poster?.originalUrl,
      show_above_text: true,
    },
    reply_markup: makeKeyboard(character.url),
  })
})

characterInfoHandler.chosenInlineResult(/^character (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const character = await getCharacterInfo({ id })
  if (!character) {
    await ctx.deleteMessage()
    return
  }

  const text = makeCharacterText(character)
  await ctx.editMessageText(text, {
    parse_mode: 'HTML',
    link_preview_options: {
      url: character.poster?.originalUrl,
      show_above_text: true,
    },
    reply_markup: makeKeyboard(character.url),
  })
})

function makeKeyboard(url: string): InlineKeyboard {
  return new InlineKeyboard()
    .url('Shikimori', url)
}
