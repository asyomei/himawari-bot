import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { INLINE_MAX_RESULTS } from '~/consts'
import { nextOffset } from '~/utils/next-offset'
import { searchMangaInline } from './executors'

export const mangaInlineSearchHandler = new Composer()

mangaInlineSearchHandler.inlineQuery(/^(?:manga|манга) (.+)$/, async (ctx) => {
  const search = ctx.match[1].trim()
  const page = Number(ctx.inlineQuery.offset || 1)

  const mangas = await searchMangaInline({
    search,
    page,
    limit: INLINE_MAX_RESULTS,
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
