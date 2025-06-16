import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { replyTo } from '~/utils/reply-to'
import { getAnimeInfo } from './executors'
import { makeAnimeText } from './text'

export const animeInfoHandler = new Composer()

animeInfoHandler.callbackQuery(/^anime (\w+) (\d+)$/, async (ctx) => {
  const id = ctx.match[1]
  const fromId = Number(ctx.match[2])
  if (fromId !== ctx.from.id) {
    await ctx.answerCallbackQuery()
    return
  }

  const anime = await getAnimeInfo({ id })
  if (!anime) {
    await ctx.answerCallbackQuery('Ошибка: аниме не найдено')
    return
  }

  const text = makeAnimeText(anime)
  await ctx.answerCallbackQuery()
  await ctx.editMessageText(text, {
    parse_mode: 'HTML',
    link_preview_options: {
      url: anime.poster?.originalUrl,
      show_above_text: true,
    },
    reply_markup: makeKeyboard(id, anime.url),
  })
})

animeInfoHandler.chosenInlineResult(/^anime (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const anime = await getAnimeInfo({ id })
  if (!anime) {
    await ctx.deleteMessage()
    return
  }

  const text = makeAnimeText(anime)
  await ctx.editMessageText(text, {
    parse_mode: 'HTML',
    link_preview_options: {
      url: anime.poster?.originalUrl,
      show_above_text: true,
    },
    reply_markup: makeKeyboard(id, anime.url),
  })
})

animeInfoHandler.hears(/shikimori\.one\/animes\/\D*(\d+)/, async (ctx) => {
  const id = ctx.match[1]
  const anime = await getAnimeInfo({ id })
  if (!anime) return

  const text = makeAnimeText(anime)
  await ctx.reply(text, {
    reply_parameters: replyTo(ctx),
    parse_mode: 'HTML',
    link_preview_options: {
      url: anime.poster?.originalUrl,
      show_above_text: true,
    },
    reply_markup: makeKeyboard(id, anime.url),
  })
})

animeInfoHandler.inlineQuery(/shikimori\.one\/animes\/\D*(\d+)/, async (ctx) => {
  const id = ctx.match[1]
  const anime = await getAnimeInfo({ id })
  if (!anime) return

  const text = makeAnimeText(anime)

  const name = anime.russian ?? anime.name
  let description = ''
  if (name !== anime.name) description = anime.name

  const result = InlineQueryResultBuilder.article(`anime-url ${id}`, name, {
    description,
    url: anime.url,
    thumbnail_url: anime.poster?.originalUrl,
    reply_markup: makeKeyboard(id, anime.url),
  }).text(text, {
    parse_mode: 'HTML',
    link_preview_options: {
      url: anime.poster?.originalUrl,
      show_above_text: true,
    },
  })

  await ctx.answerInlineQuery([result])
})

function makeKeyboard(animeId: string, url: string): InlineKeyboard {
  return new InlineKeyboard()
    .switchInlineCurrent('Персонажи', `!anime characters ${animeId}`)
    .row()
    .switchInlineCurrent('Скриншоты', `!anime screenshots ${animeId}`)
    .switchInlineCurrent('Видео', `!anime videos ${animeId}`)
    .row()
    .switchInlineCurrent('Оценки людей', `!anime scores ${animeId}`)
    .switchInlineCurrent('В списках у людей', `!anime statuses ${animeId}`)
    .row()
    .url('Shikimori', url)
}
