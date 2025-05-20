import { Composer, InlineKeyboard } from 'grammy'
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
