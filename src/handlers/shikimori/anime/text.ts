import type { Anime } from '~/shikimori/gql'
import type { PickDeep } from '~/types/pick-deep'
import dayjs from 'dayjs'
import { escapeHTML } from '~/utils/escape-html'
import { score } from '../consts'
import { date, duration, parseDescription, partDate } from '../utils'
import { kind, origin, rating, status } from './consts'

type PickedAnime = PickDeep<
  Anime,
  | 'name'
  | 'russian'
  | 'isCensored'
  | 'kind'
  | 'status'
  | 'episodes'
  | 'episodesAired'
  | 'nextEpisodeAt'
  | 'duration'
  | `airedOn.${'day' | 'month' | 'year'}`
  | `releasedOn.${'day' | 'month' | 'year'}`
  | `genres.${'kind' | 'russian'}`
  | 'rating'
  | 'score'
  | 'origin'
  | 'licensors'
  | 'studios.name'
  | 'fandubbers'
  | 'fansubbers'
  | 'descriptionHtml'
  | 'descriptionSource'
>

export function makeAnimeText(anime: PickedAnime): string {
  let text = ''

  // Names
  if (anime.russian) text += `<b>${escapeHTML(anime.russian)}</b> / `
  text += `<b>${escapeHTML(anime.name)}</b>`
  if (anime.isCensored) text += ` [18+]`
  text += '\n'

  // Kind
  if (anime.kind) {
    text += `<b>Тип:</b> ${kind[anime.kind]}\n`
  }

  // Episodes
  if (anime.kind !== 'movie') {
    if (anime.status === 'ongoing') {
      text += `<b>Эпизоды:</b> ${anime.episodesAired}/${anime.episodes || '?'}\n`
    } else {
      text += `<b>Эпизоды:</b> ${anime.episodes}\n`
    }
  }

  // Next episode
  if (anime.nextEpisodeAt) {
    const nextEpisodeAt = dayjs.utc(anime.nextEpisodeAt).tz('Europe/Moscow')
    text += `<b>След. эпизод:</b> ${date(nextEpisodeAt, true)} МСК\n`
  }

  // Duration
  if (anime.duration) {
    text += `<b>Длительность эпизода:</b> ${duration(anime.duration)}\n`
  }

  // Status and aired/released on
  if (anime.status) {
    text += `<b>Статус:</b> <u>${status[anime.status]}</u> `
    if (anime.status === 'anons') {
      if (anime.airedOn?.year) {
        text += `на ${partDate(anime.airedOn)}`
      }
    } else if (anime.status === 'ongoing' || anime.episodes > 1) {
      if (anime.airedOn?.year) {
        text += `с ${partDate(anime.airedOn)}`
      }
      if (anime.releasedOn?.year) {
        text += ` по ${partDate(anime.releasedOn)}`
      }
    } else {
      if (anime.airedOn?.year) {
        text += `${partDate(anime.airedOn)}`
      } else if (anime.releasedOn?.year) {
        text += `${partDate(anime.releasedOn)}`
      }
    }
    text += '\n'
  }

  // Genres and themes
  if (anime.genres) {
    const genres = anime.genres.filter(x => x.kind !== 'theme').map(x => x.russian)
    if (genres.length > 0) {
      text += `<b>${genres.length > 1 ? 'Жанры' : 'Жанр'}:</b> ${genres.join(', ')}\n`
    }

    const themes = anime.genres.filter(x => x.kind === 'theme').map(x => x.russian)
    if (themes.length > 0) {
      text += `<b>${genres.length > 1 ? 'Темы' : 'Тема'}</b>: ${themes.join(', ')}\n`
    }
  }

  // Rating
  if (anime.rating && anime.rating !== 'none') {
    text += `<b>Рейтинг:</b> ${rating[anime.rating]}\n`
  }

  // Score
  if (anime.score) {
    text += `<b>Оценка:</b> ${anime.score}/10 (${score[anime.score | 0]})\n`
  }

  // Origin
  if (anime.origin) {
    text += `<b>Первоисточник:</b> ${origin[anime.origin]}\n`
  }

  // Licensors
  if (anime.licensors && anime.licensors.length > 0) {
    text += `<b>Лицензировано:</b> ${anime.licensors.join(', ')}\n`
  }

  // Studios
  if (anime.studios.length > 0) {
    const studios = anime.studios.map(x => x.name)
    text += `<b>${studios.length > 1 ? 'Студии' : 'Студия'}:</b> ${studios.join(', ')}\n`
  }

  // Fandubbers, fansubbers
  if (anime.fandubbers.length > 0) {
    text += `<b>Озвучка:</b> ${anime.fandubbers.join(', ')}\n`
  }
  if (anime.fansubbers.length > 0) {
    text += `<b>Субтитры:</b> ${anime.fansubbers.join(', ')}\n`
  }

  // Description
  if (anime.descriptionHtml) {
    text += `\n${parseDescription(anime.descriptionHtml)}`
    if (anime.descriptionSource) {
      text += `\n— <a href="${anime.descriptionSource}">Источник</a>`
    }
  }

  return text
}
