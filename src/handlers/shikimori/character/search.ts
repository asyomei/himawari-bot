import type { Character } from '~/shikimori/gql'
import { Composer, InlineKeyboard } from 'grammy'
import { ITEMS_PER_PAGE } from '~/consts'
import { replyTo } from '~/utils/reply-to'
import { searchCharacter } from './executors'

export const characterSearchHandler = new Composer()

characterSearchHandler.on('message:text').command(['character', 'characters'], async (ctx) => {
  if (!ctx.match) {
    await ctx.reply('Введите запрос: /character [запрос]')
    return
  }

  const characters = await searchCharacter({
    search: ctx.match,
    limit: ITEMS_PER_PAGE,
    page: 1,
  })

  if (characters.length === 0) {
    await ctx.reply('Персонаж не найден', {
      reply_parameters: replyTo(ctx),
    })
    return
  }

  await ctx.reply(`<b>Поиск персонажа:</b> ${ctx.match}`, {
    parse_mode: 'HTML',
    reply_markup: makeKeyboard(characters, 1, ctx.from.id),
  })
})

characterSearchHandler.callbackQuery(/^character search (\d+) (\d+)$/, async (ctx) => {
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
  const characters = await searchCharacter({
    search,
    page,
    limit: ITEMS_PER_PAGE,
  })

  if (characters.length === 0) {
    await ctx.answerCallbackQuery('Достигнут конец поиска')
    return
  }

  await ctx.answerCallbackQuery()
  await ctx.editMessageReplyMarkup({
    reply_markup: makeKeyboard(characters, page, fromId),
  })
})

function makeKeyboard(
  characters: Pick<Character, 'id' | 'name' | 'russian'>[],
  page: number,
  fromId: number,
): InlineKeyboard {
  const kb = new InlineKeyboard()

  for (const character of characters) {
    const name = character.russian ?? character.name
    kb.text(name, `character ${character.id} ${fromId}`).row()
  }

  kb.text('<< Назад', `character search ${page - 1} ${fromId}`)
  kb.text(`${page}`, 'nop')
  kb.text('Вперёд >>', `character search ${page + 1} ${fromId}`)

  return kb
}
