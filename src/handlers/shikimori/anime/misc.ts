import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { INLINE_MAX_RESULTS } from '~/consts'
import { nextOffset } from '~/utils/next-offset'
import { score, status, videoKind } from '../consts'
import {
  getAnimeCharacters,
  getAnimeScores,
  getAnimeScreenshots,
  getAnimeStatuses,
  getAnimeVideos,
} from './executors'

export const animeMiscHandler = new Composer()

animeMiscHandler.inlineQuery(/^!anime characters (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const page = Number(ctx.inlineQuery.offset || 1)
  const characters = await getAnimeCharacters({ id })
  if (!characters) {
    await ctx.answerCallbackQuery('Ошибка: аниме не найдено')
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
    return InlineQueryResultBuilder.article(`anime:character ${id} ${char.id}`, title, {
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

animeMiscHandler.inlineQuery(/^!anime screenshots (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const page = Number(ctx.inlineQuery.offset || 1)
  const screenshots = await getAnimeScreenshots({ id })
  if (!screenshots) {
    await ctx.answerCallbackQuery('Ошибка: аниме не найдено')
    return
  }

  const results = screenshots.slice(
    INLINE_MAX_RESULTS * (page - 1),
    INLINE_MAX_RESULTS * page,
  ).map((screenshot) => {
    return InlineQueryResultBuilder.photo(`screenshot ${screenshot.id}`, screenshot.originalUrl)
  })

  await ctx.answerInlineQuery(results, {
    next_offset: nextOffset(page, results),
  })
})

animeMiscHandler.inlineQuery(/^!anime videos (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const page = Number(ctx.inlineQuery.offset || 1)
  const videos = await getAnimeVideos({ id })
  if (!videos) {
    await ctx.answerCallbackQuery('Ошибка: аниме не найдено')
    return
  }

  const results = videos.filter(video => video.kind !== 'episode_preview').slice(
    INLINE_MAX_RESULTS * (page - 1),
    INLINE_MAX_RESULTS * page,
  ).map((video) => {
    const title = video.name ?? videoKind[video.kind]
    const imageUrl = `https:${video.imageUrl}`
    return InlineQueryResultBuilder.videoHtml(`video ${video.id}`, title, video.url, imageUrl)
      .text(`${title}\n${video.url}`)
  })

  await ctx.answerInlineQuery(results, {
    next_offset: nextOffset(page, results),
  })
})

animeMiscHandler.inlineQuery(/^!anime scores (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const anime = await getAnimeScores({ id })
  if (!anime) {
    await ctx.answerCallbackQuery('Ошибка: аниме не найдено')
    return
  }

  if (!anime.scoresStats) {
    await ctx.answerCallbackQuery('Данные не найдены')
    return
  }

  const results = anime.scoresStats.map((stat) => {
    const title = `${stat.score} - ${score[stat.score]}`
    return InlineQueryResultBuilder.article(`anime:scores ${id} ${stat.score}`, title, {
      description: `оценил(и) ${stat.count} чел.`,
    }).text('del')
  })

  await ctx.answerInlineQuery(results)
})

animeMiscHandler.inlineQuery(/^!anime statuses (\w+)$/, async (ctx) => {
  const id = ctx.match[1]
  const anime = await getAnimeStatuses({ id })
  if (!anime) {
    await ctx.answerCallbackQuery('Ошибка: аниме не найдено')
    return
  }

  if (!anime.statusesStats) {
    await ctx.answerCallbackQuery('Данные не найдены')
    return
  }

  const results = anime.statusesStats.map((stat) => {
    const title = `${status[stat.status]}`
    return InlineQueryResultBuilder.article(`anime:statuses ${id} ${stat.status}`, title, {
      description: `${stat.count} чел.`,
    }).text('del')
  })

  await ctx.answerInlineQuery(results)
})
