import type { Manga } from '~/shikimori/gql'
import { Composer, InlineKeyboard } from 'grammy'
import { ITEMS_PER_PAGE } from '~/consts'
import { replyTo } from '~/utils/reply-to'
import { searchManga } from './executors'

export const mangaSearchHandler = new Composer()

mangaSearchHandler.on('message:text').command(['manga', 'mangas', 'ranobe'], async (ctx) => {
  const isRanobe = ctx.hasCommand('ranobe')

  if (!ctx.match) {
    const cmd = isRanobe ? '/ranobe' : '/manga'
    await ctx.reply(`Введите запрос: ${cmd} [запрос]`)
    return
  }

  const mangas = await searchManga({
    search: ctx.match,
    limit: ITEMS_PER_PAGE,
    page: 1,
    kind: isRanobe ? 'novel,light_novel' : '!novel,!light_novel',
  })

  if (mangas.length === 0) {
    const msg = isRanobe ? 'Ранобэ не найдено' : 'Манга не найдена'
    await ctx.reply(msg, {
      reply_parameters: replyTo(ctx),
    })
    return
  }

  const msg = isRanobe ? 'Поиск ранобэ' : 'Поиск манги'
  await ctx.reply(`<b>${msg}:</b> ${ctx.match}`, {
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
  const isRanobe = text.startsWith('Поиск ранобэ')
  const search = text.slice(text.indexOf(': ') + 2)
  const mangas = await searchManga({
    search,
    page,
    limit: ITEMS_PER_PAGE,
    kind: isRanobe ? 'novel,light_novel' : '!novel,!light_novel',
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
