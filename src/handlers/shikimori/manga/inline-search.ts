import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { INLINE_MAX_RESULTS } from '~/consts'
import { nextOffset } from '~/utils/next-offset'
import { searchMangaInline } from './executors'

export const mangaInlineSearchHandler = new Composer()

mangaInlineSearchHandler.inlineQuery(/^(manga|манга|ranobe|ранобэ) (.+)$/, async (ctx) => {
  const isRanobe = ctx.match[1] === 'ranobe' || ctx.match[1] === 'ранобэ'
  const search = ctx.match[2].trim()
  const page = Number(ctx.inlineQuery.offset || 1)

  const mangas = await searchMangaInline({
    search,
    page,
    limit: INLINE_MAX_RESULTS,
    kind: isRanobe ? 'novel,light_novel' : '!novel,!light_novel',
  })

  const results = mangas.map((manga) => {
    const name = manga.russian ?? manga.english ?? manga.name
    let description = ''
    if (name !== manga.name) description = manga.name
    return InlineQueryResultBuilder.article(`manga ${manga.id}`, name, {
      description,
      reply_markup: new InlineKeyboard()
        .text('Загрузка...', 'nop'),
      thumbnail_url: !manga.isCensored ? manga.poster?.previewUrl : undefined,
      url: manga.url,
    }).text(name)
  })

  await ctx.answerInlineQuery(results, {
    next_offset: nextOffset(page, results),
  })
})
