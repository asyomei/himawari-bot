import { Composer, InlineKeyboard, InlineQueryResultBuilder } from 'grammy'
import { INLINE_MAX_RESULTS } from '~/consts'
import { nextOffset } from '~/utils/next-offset'
import { searchAnimeInline } from './executors'

export const animeInlineSearchHandler = new Composer()

animeInlineSearchHandler.inlineQuery(/^(?:anime|аниме) (.+)$/, async (ctx) => {
  const search = ctx.match[1].trim()
  const page = Number(ctx.inlineQuery.offset || 1)

  const animes = await searchAnimeInline({
    search,
    page,
    limit: INLINE_MAX_RESULTS,
  })

  const results = animes.map((anime) => {
    const name = anime.russian ?? anime.english ?? anime.name
    let description = ''
    if (name !== anime.name) description = anime.name
    return InlineQueryResultBuilder.article(`anime ${anime.id}`, name, {
      description,
      reply_markup: new InlineKeyboard()
        .text('Загрузка...', 'nop'),
      thumbnail_url: !anime.isCensored ? anime.poster?.previewUrl : undefined,
      url: anime.url,
    }).text(name)
  })

  await ctx.answerInlineQuery(results, {
    next_offset: nextOffset(page, results),
  })
})
