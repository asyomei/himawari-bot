import type { AnimeKindEnum, AnimeOriginEnum, AnimeRatingEnum, AnimeStatusEnum } from '~/shikimori/gql'

export const kind: Record<AnimeKindEnum, string> = {
  cm: 'Реклама',
  movie: 'Фильм',
  music: 'Клип',
  ona: 'ONA',
  ova: 'OVA',
  pv: 'Проморолик',
  special: 'Спецвыпуск',
  tv: 'TV Сериал',
  tv_special: 'TV Спецвыпуск',
}

export const status: Record<AnimeStatusEnum, string> = {
  anons: 'анонс',
  ongoing: 'онгоинг',
  released: 'вышло',
}

export const rating: Record<AnimeRatingEnum, string> = {
  none: '',
  g: 'G — Нет возрастных ограничений',
  pg: 'PG — Рекомендуется присутствие родителей',
  pg_13: 'PG-13 — Детям до 13 лет просмотр не желателен',
  r: 'R-17 — Лицам до 17 лет обязательно присутствие взрослого',
  r_plus: 'R+ — Лицам до 17 лет просмотр запрещён',
  rx: 'Rx — Хентай',
}

export const origin: Record<AnimeOriginEnum, string> = {
  book: 'Книга',
  card_game: 'Карточная игра',
  four_koma_manga: 'Енкома',
  game: 'Игра',
  light_novel: 'Ранобэ',
  manga: 'Манга',
  mixed_media: 'Более одного',
  music: 'Музыка',
  novel: 'Новелла',
  original: 'Оригинал',
  other: 'Другое',
  picture_book: 'Книга с картинками',
  radio: 'Радио',
  unknown: 'Неизвестен',
  visual_novel: 'Визуальная новелла',
  web_manga: 'Веб-манга',
  web_novel: 'Веб-новелла',
}
