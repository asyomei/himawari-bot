import type { Manga } from '~/shikimori/gql'
import { Composer, InlineKeyboard } from 'grammy'
import { ITEMS_PER_PAGE } from '~/consts'
import { replyTo } from '~/utils/reply-to'
import { searchManga } from './executors'

export const mangaSearchHandler = new Composer()

mangaSearchHandler.on('message:text').command(['manga', 'mangas'], async (ctx) => {
  if (!ctx.match) {
    await ctx.reply('Введите запрос: /manga [запрос]')
    return
  }

  const mangas = await searchManga({
    search: ctx.match,
    limit: ITEMS_PER_PAGE,
    page: 1,
  })

  if (mangas.length === 0) {
    await ctx.reply('Манга не найдена', {
      reply_parameters: replyTo(ctx),
    })
    return
  }

  await ctx.reply(`<b>Поиск манги:</b> ${ctx.match}`, {
    parse_mode: 'HTML',
    reply_markup: makeKeyboard(mangas, 1, ctx.from.id),
  })
})

mangaSearchHandler.callbackQuery(/manga search (\d+) (\d+)/, async (ctx) => {
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
  const mangas = await searchManga({
    search,
    page,
    limit: ITEMS_PER_PAGE,
  })

  if (mangas.length === 0) {
    await ctx.answerCallbackQuery('Достигнут конец поиска')
    return
  }

  await ctx.answerCallbackQuery()
  await ctx.editMessageReplyMarkup({
    reply_markup: makeKeyboard(mangas, page, fromId),
  })
})

function makeKeyboard(
  mangas: Pick<Manga, 'id' | 'name' | 'russian' | 'isCensored'>[],
  page: number,
  fromId: number,
): InlineKeyboard {
  const kb = new InlineKeyboard()

  for (const manga of mangas) {
    let name = manga.russian ?? manga.name
    if (manga.isCensored) name = `[18+] ${name}`
    kb.text(manga.russian ?? manga.name, `manga ${manga.id} ${fromId}`).row()
  }

  kb.text('<< Назад', `manga search ${page - 1} ${fromId}`)
  kb.text(`${page}`, 'nop')
  kb.text('Вперёд >>', `manga search ${page + 1} ${fromId}`)

  return kb
}
