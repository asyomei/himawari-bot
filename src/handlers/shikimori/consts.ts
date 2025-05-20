import type { UserRateStatusEnum, VideoKindEnum } from '~/shikimori/gql'

export const score: Record<number, string> = {
  1: 'Хуже некуда',
  2: 'Ужасно',
  3: 'Очень плохо',
  4: 'Плохо',
  5: 'Более-менее',
  6: 'Нормально',
  7: 'Хорошо',
  8: 'Отлично',
  9: 'Великолепно',
  10: 'Эпик вин!',
}

export const status: Record<UserRateStatusEnum, string> = {
  completed: 'Просмотрено',
  dropped: 'Брошено',
  on_hold: 'Отложено',
  planned: 'Запланировано',
  rewatching: 'Пересматриваю',
  watching: 'Смотрю',
}

export const videoKind: Record<VideoKindEnum, string> = {
  character_trailer: 'Трейлер персонажа',
  clip: 'Клип',
  cm: 'Реклама',
  ed: 'ED',
  episode_preview: '',
  op: 'OP',
  op_ed_clip: 'OP&ED',
  other: 'Другое',
  pv: 'Проморолик',
}
