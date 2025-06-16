import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { replyTo } from '~/utils/reply-to'
import { getMangaInfo } from './executors'
import { makeMangaText } from './text'

export const mangaInfoHandler = new Composer()

mangaInfoHandler.callbackQuery(/^manga (\w+) (\d+)$/, async (ctx) => {
  const id = ctx.match[1]
  const fromId = Number(ctx.match[2])
  if (fromId !== ctx.from.id) {
    await ctx.answerCallbackQuery()
    return
  }

  const manga = await getMangaInfo({ id })
  if (!manga) {
    await ctx.answerCallbackQuery('Ошибка: манга не найдена')
    return
  }

  const text = makeMangaText(manga)
  await ctx.answerCallbackQuery()
  await ctx.editMessageText(text, {
    parse_mode: 'HTML',
    link_preview_options: {
      url: manga.poster?.originalUrl,
      show_above_text: true,
    },
    reply_markup: makeKeyboard(id, manga.url),
  })
})

mangaInfoHandler.chosenInlineResult(/^manga (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const manga = await getMangaInfo({ id })
  if (!manga) {
    await ctx.deleteMessage()
    return
  }

  const text = makeMangaText(manga)
  await ctx.editMessageText(text, {
    parse_mode: 'HTML',
    link_preview_options: {
      url: manga.poster?.originalUrl,
      show_above_text: true,
    },
    reply_markup: makeKeyboard(id, manga.url),
  })
})

mangaInfoHandler.hears(/shikimori\.one\/(?:ranobe|mangas)\/\D*(\d+)/, async (ctx) => {
  const id = ctx.match[1]
  const manga = await getMangaInfo({ id })
  if (!manga) return

  const text = makeMangaText(manga)
  await ctx.reply(text, {
    reply_parameters: replyTo(ctx),
    parse_mode: 'HTML',
    link_preview_options: {
      url: manga.poster?.originalUrl,
      show_above_text: true,
    },
    reply_markup: makeKeyboard(id, manga.url),
  })
})

mangaInfoHandler.inlineQuery(/shikimori\.one\/(?:ranobe|mangas)\/\D*(\d+)/, async (ctx) => {
  const id = ctx.match[1]
  const manga = await getMangaInfo({ id })
  if (!manga) return

  const text = makeMangaText(manga)

  const name = manga.russian ?? manga.name
  let description = ''
  if (name !== manga.name) description = manga.name

  const result = InlineQueryResultBuilder.article(`manga-url ${id}`, name, {
    description,
    url: manga.url,
    thumbnail_url: manga.poster?.originalUrl,
    reply_markup: makeKeyboard(id, manga.url),
  }).text(text, {
    parse_mode: 'HTML',
    link_preview_options: {
      url: manga.poster?.originalUrl,
      show_above_text: true,
    },
  })

  await ctx.answerInlineQuery([result])
})

function makeKeyboard(mangaId: string, url: string): InlineKeyboard {
  return new InlineKeyboard()
    .switchInlineCurrent('Персонажи', `!manga characters ${mangaId}`)
    .row()
    .switchInlineCurrent('Оценки людей', `!manga scores ${mangaId}`)
    .switchInlineCurrent('В списках у людей', `!manga statuses ${mangaId}`)
    .row()
    .url('Shikimori', url)
}
