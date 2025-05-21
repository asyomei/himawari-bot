import type { Dayjs } from 'dayjs'
import type { IncompleteDate } from '~/shikimori/gql'
import { parse as parseHTML } from 'node-html-parser'
import { escapeHTML } from '~/utils/escape-html'

const months = 'янв. фев. мар. апр. мая июня июля авг. сент. окт. ноя. дек.'.split(' ')
export function date(date: Dayjs, time = false): string {
  let fmt = `${date.date()} ${months[date.month()]} ${date.year()} г.`
  if (time) fmt = ` ${date.hour()}:${date.minute()}`
  return fmt
}
export function partDate(date: IncompleteDate): string {
  const day = date.day?.toString().padStart(2, '0')
  const month = date.month != null ? months[date.month] : undefined
  const year = date.year != null ? `${date.year} г.` : undefined
  return [day, month, year].filter(x => x != null).join(' ')
}

export function duration(minutes: number): string {
  const hours = minutes / 60 | 0
  minutes %= 60

  const hoursFormat = new Intl.PluralRules('ru').select(hours)
  const hoursWord = hoursFormat === 'one' ? 'час' : hoursFormat === 'few' ? 'часа' : 'часов'

  return `${hours ? `${hours} ${hoursWord} ` : ''}${minutes} мин.`
}

export function parseDescription(description: string): string {
  const document = parseHTML(description)

  let text = document.textContent

  for (const el of document.querySelectorAll('div[data-dynamic="spoiler_block"]')) {
    const raw = el.textContent
    const spoiler = escapeHTML(raw.replace('спойлер', ''))
    text = text.replace(raw, `\n<b>Спойлер:</b>\n<tg-spoiler>${spoiler}</tg-spoiler>`)
  }

  let offset = 0
  for (const a of document.getElementsByTagName('a')) {
    const name = a.textContent
    const link = `<a href="${a.attributes.href}">${name}</a>`
    const index = text.indexOf(name, offset)
    text = text.slice(0, index) + link + text.slice(index + name.length)
    offset = index + link.length
  }

  return `<blockquote expandable>${text}</blockquote>`
}
