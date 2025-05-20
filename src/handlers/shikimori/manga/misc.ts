import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { INLINE_MAX_RESULTS } from '~/consts'
import { nextOffset } from '~/utils/next-offset'
import { score, status } from '../consts'
import { getMangaCharacters, getMangaScores, getMangaStatuses } from './executors'

export const mangaMiscHandler = new Composer()

mangaMiscHandler.inlineQuery(/^!manga characters (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const page = Number(ctx.inlineQuery.offset || 1)
  const characters = await getMangaCharacters({ id })
  if (!characters) {
    await ctx.answerCallbackQuery('Ошибка: манга не найдено')
    return
  }

  const results = characters.sort((a, b) => {
    return a.isMain ? b.isMain ? 0 : -1 : b.isMain ? 1 : 0
  }).slice(
    INLINE_MAX_RESULTS * (page - 1),
    INLINE_MAX_RESULTS * page,
  ).map((char) => {
    const title = char.russian ?? char.name
    const desc = title !== char.name ? `${char.name}\n` : ''
    return InlineQueryResultBuilder.article(`manga:character ${id} ${char.id}`, title, {
      url: char.url,
      thumbnail_url: char.poster?.previewUrl,
      description: desc + (char.isMain ? 'Главный герой' : 'Второстепенный герой'),
      reply_markup: new InlineKeyboard()
        .text('Загрузка...', 'nop'),
    }).text(title)
  })

  await ctx.answerInlineQuery(results, {
    next_offset: nextOffset(page, results),
  })
})

mangaMiscHandler.inlineQuery(/^!manga scores (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const manga = await getMangaScores({ id })
  if (!manga) {
    await ctx.answerCallbackQuery('Ошибка: манга не найдено')
    return
  }

  if (!manga.scoresStats) {
    await ctx.answerCallbackQuery('Данные не найдены')
    return
  }

  const results = manga.scoresStats.map((stat) => {
    const title = `${stat.score} - ${score[stat.score]}`
    return InlineQueryResultBuilder.article(`manga:scores ${id} ${stat.score}`, title, {
      description: `оценил(и) ${stat.count} чел.`,
    }).text('del')
  })

  await ctx.answerInlineQuery(results)
})

mangaMiscHandler.inlineQuery(/^!manga statuses (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const manga = await getMangaStatuses({ id })
  if (!manga) {
    await ctx.answerCallbackQuery('Ошибка: манга не найдено')
    return
  }

  if (!manga.statusesStats) {
    await ctx.answerCallbackQuery('Данные не найдены')
    return
  }

  const results = manga.statusesStats.map((stat) => {
    const title = `${status[stat.status]}`
    return InlineQueryResultBuilder.article(`manga:statuses ${id} ${stat.status}`, title, {
      description: `${stat.count} чел.`,
    }).text('del')
  })

  await ctx.answerInlineQuery(results)
})
