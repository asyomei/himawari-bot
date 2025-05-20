import type { MangaKindEnum, MangaStatusEnum } from '~/shikimori/gql'

export const kind: Record<MangaKindEnum, string> = {
  doujin: 'Додзинси',
  light_novel: 'Ранобэ',
  manga: 'Манга',
  manhua: 'Маньхуа',
  manhwa: 'Манхва',
  novel: 'Новелла',
  one_shot: 'Ваншот',
}

export const status: Record<MangaStatusEnum, string> = {
  anons: 'анонс',
  discontinued: 'прекращено',
  ongoing: 'выходит',
  paused: 'приостановлено',
  released: 'издано',
}
