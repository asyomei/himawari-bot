import { INLINE_MAX_RESULTS } from '~/consts'

export function nextOffset(page: number, arr: any[]): string {
  return arr.length === INLINE_MAX_RESULTS ? `${page + 1}` : ''
}
