import dedent from 'dedent'
import { Composer } from 'grammy'
import { escapeHTML } from '~/utils/escape-html'

export const HELP = dedent`
  <b>Himawari</b> - бот для поиска аниме/манги/персонажей из Шикимори

  <b>Использование:</b>
  /anime [запрос] - Поиск аниме
  /manga [запрос] - Поиск манги
  /ranobe [запрос] - Поиск ранобэ
  /character [запрос] - Поиск персонажа
  <i>Инлайн режим</i> (@%s ${escapeHTML('<команда>')}):
  anime ИЛИ аниме [запрос] - Поиск аниме
  manga ИЛИ манга [запрос] - Поиск манга
  ranobe ИЛИ ранобэ [запрос] - Поиск ранобэ
  character ИЛИ персонаж [запрос] - Поиск персонажа

  <a href="https://framagit.org/asyomei/himawari-bot">Исходный код</a>
`

export const helpHandler = new Composer()

helpHandler.on('message:text').command(['start', 'help'], async (ctx) => {
  const text = HELP.replace('%s', ctx.me.username)
  await ctx.reply(text, {
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
  })
})
