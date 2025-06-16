import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { replyTo } from '~/utils/reply-to'
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
    await ctx.answerCallbackQuery('Ошибка: персонаж не найден')
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

characterInfoHandler.hears(/shikimori\.one\/characters\/\D*(\d+)/, async (ctx) => {
  const id = ctx.match[1]
  const character = await getCharacterInfo({ id })
  if (!character) return

  const text = makeCharacterText(character)
  await ctx.reply(text, {
    reply_parameters: replyTo(ctx),
    parse_mode: 'HTML',
    link_preview_options: {
      url: character.poster?.originalUrl,
      show_above_text: true,
    },
    reply_markup: makeKeyboard(character.url),
  })
})

characterInfoHandler.inlineQuery(/shikimori\.one\/characters\/\D*(\d+)/, async (ctx) => {
  const id = ctx.match[1]
  const character = await getCharacterInfo({ id })
  if (!character) return

  const text = makeCharacterText(character)

  const name = character.russian ?? character.name
  let description = ''
  if (name !== character.name) description = character.name

  const result = InlineQueryResultBuilder.article(`character-url ${id}`, name, {
    description,
    url: character.url,
    thumbnail_url: character.poster?.originalUrl,
    reply_markup: makeKeyboard(character.url),
  }).text(text, {
    parse_mode: 'HTML',
    link_preview_options: {
      url: character.poster?.originalUrl,
      show_above_text: true,
    },
  })

  await ctx.answerInlineQuery([result])
})

function makeKeyboard(url: string): InlineKeyboard {
  return new InlineKeyboard()
    .url('Shikimori', url)
}
