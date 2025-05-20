import type { Anime } from '~/shikimori/gql'
import { Composer, InlineKeyboard } from 'grammy'
import { ITEMS_PER_PAGE } from '~/consts'
import { replyTo } from '~/utils/reply-to'
import { searchAnime } from './executors'

export const animeSearchHandler = new Composer()

animeSearchHandler.on('message:text').command(['anime', 'animes'], async (ctx) => {
  if (!ctx.match) {
    await ctx.reply('Введите запрос: /anime [запрос]')
    return
  }

  const animes = await searchAnime({
    search: ctx.match,
    limit: ITEMS_PER_PAGE,
    page: 1,
  })

  if (animes.length === 0) {
    await ctx.reply('Аниме не найдено', {
      reply_parameters: replyTo(ctx),
    })
    return
  }

  await ctx.reply(`<b>Поиск аниме:</b> ${ctx.match}`, {
    parse_mode: 'HTML',
    reply_markup: makeKeyboard(animes, 1, ctx.from.id),
  })
})

animeSearchHandler.callbackQuery(/^anime search (\d+) (\d+)$/, async (ctx) => {
  const page = Number(ctx.match[1])
  const fromId = Number(ctx.match[2])

  if (page < 1) {
    await ctx.answerCallbackQuery('Достигнуто начало поиска')
    return
  }

  if (!ctx.msg?.text) {
    await Promise.all([
      ctx.answerCallbackQuery('Это сообщение устарело'),
      ctx.deleteMessage(),
    ])
    return
  }

  const { text } = ctx.msg
  const search = text.slice(text.indexOf(': ') + 2)
  const animes = await searchAnime({
    search,
    page,
    limit: ITEMS_PER_PAGE,
  })

  if (animes.length === 0) {
    await ctx.answerCallbackQuery('Достигнут конец поиска')
    return
  }

  await ctx.answerCallbackQuery()
  await ctx.editMessageReplyMarkup({
    reply_markup: makeKeyboard(animes, page, fromId),
  })
})

function makeKeyboard(
  animes: Pick<Anime, 'id' | 'name' | 'russian' | 'isCensored'>[],
  page: number,
  fromId: number,
): InlineKeyboard {
  const kb = new InlineKeyboard()

  for (const anime of animes) {
    let name = anime.russian ?? anime.name
    if (anime.isCensored) name = `[18+] ${name}`
    kb.text(anime.russian ?? anime.name, `anime ${anime.id} ${fromId}`).row()
  }

  kb.text('<< Назад', `anime search ${page - 1} ${fromId}`)
  kb.text(`${page}`, 'nop')
  kb.text('Вперёд >>', `anime search ${page + 1} ${fromId}`)

  return kb
}
