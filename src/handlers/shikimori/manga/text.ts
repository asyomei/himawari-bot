import type { Manga } from '~/shikimori/gql'
import type { PickDeep } from '~/types/pick-deep'
import { escapeHTML } from '~/utils/escape-html'
import { score } from '../consts'
import { parseDescription, partDate } from '../utils'
import { kind, status } from './consts'

type PickedManga = PickDeep<
  Manga,
  | 'name'
  | 'russian'
  | 'isCensored'
  | 'kind'
  | 'volumes'
  | 'chapters'
  | 'status'
  | `airedOn.${'day' | 'month' | 'year'}`
  | `releasedOn.${'day' | 'month' | 'year'}`
  | `genres.${'kind' | 'russian'}`
  | 'score'
  | 'licensors'
  | 'publishers.name'
  | 'descriptionHtml'
  | 'descriptionSource'
>

export function makeMangaText(manga: PickedManga): string {
  let text = ''

  // Names
  if (manga.russian) text += `<b>${escapeHTML(manga.russian)}</b> / `
  text += `<b>${escapeHTML(manga.name)}</b>`
  if (manga.isCensored) text += ` [18+]`
  text += '\n'

  // Kind
  if (manga.kind) {
    text += `<b>Тип:</b> ${kind[manga.kind]}\n`
  }

  // Volumes and chapters
  if (manga.volumes) {
    text += `<b>Тома:</b> ${manga.volumes}\n`
  }
  if (manga.chapters) {
    text += `<b>Главы:</b> ${manga.chapters}\n`
  }

  // Status and aired/released on
  if (manga.status) {
    text += `<b>Статус:</b> <u>${status[manga.status]}</u> `
    if (manga.status === 'anons') {
      if (manga.airedOn?.year) {
        text += `на ${partDate(manga.airedOn)}`
      }
    } else {
      if (manga.airedOn?.year) {
        text += `с ${partDate(manga.airedOn)}`
      }
      if (manga.releasedOn?.year) {
        text += ` по ${partDate(manga.releasedOn)}`
      }
    }
    text += '\n'
  }

  // Genres and themes
  if (manga.genres) {
    const genres = manga.genres.filter(x => x.kind === 'genre').map(x => x.russian)
    if (genres.length > 0) {
      text += `<b>${genres.length > 1 ? 'Жанры' : 'Жанр'}:</b> ${genres.join(', ')}\n`
    }

    const themes = manga.genres.filter(x => x.kind === 'theme').map(x => x.russian)
    if (themes.length > 0) {
      text += `<b>${genres.length > 1 ? 'Темы' : 'Тема'}</b>: ${themes.join(', ')}\n`
    }
  }

  // Score
  if (manga.score) {
    text += `<b>Оценка:</b> ${manga.score}/10 (${score[manga.score | 0]})\n`
  }

  // Licensors
  if (manga.licensors && manga.licensors.length > 0) {
    text += `<b>Лицензировано:</b> ${manga.licensors.join(', ')}\n`
  }

  // Publishers
  if (manga.publishers.length > 0) {
    const publishers = manga.publishers.map(x => x.name)
    text += `<b>${publishers.length > 1 ? 'Издатели' : 'Издатель'}:</b> ${publishers.join(', ')}\n`
  }

  // Description
  if (manga.descriptionHtml) {
    text += `\n${parseDescription(manga.descriptionHtml)}`
    if (manga.descriptionSource) {
      text += `\n— <a href="${manga.descriptionSource}">Источник</a>`
    }
  }

  return text
}
