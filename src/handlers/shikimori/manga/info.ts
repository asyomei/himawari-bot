import { Composer, InlineKeyboard } from 'grammy'
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

function makeKeyboard(mangaId: string, url: string): InlineKeyboard {
  return new InlineKeyboard()
    .switchInlineCurrent('Персонажи', `!manga characters ${mangaId}`)
    .row()
    .switchInlineCurrent('Оценки людей', `!manga scores ${mangaId}`)
    .switchInlineCurrent('В списках у людей', `!manga statuses ${mangaId}`)
    .row()
    .url('Shikimori', url)
}
