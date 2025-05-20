import type { Character } from '~/shikimori/gql'
import type { PickDeep } from '~/types/pick-deep'
import { escapeHTML } from '~/utils/escape-html'
import { parseDescription } from '../utils'

type PickedCharacter = PickDeep<
  Character,
  | 'name'
  | 'russian'
  | 'japanese'
  | 'synonyms'
  | 'descriptionHtml'
  | 'descriptionSource'
>

export function makeCharacterText(character: PickedCharacter): string {
  let text = ''

  // Names
  if (character.russian) text += `<b>${escapeHTML(character.russian)}</b> / `
  text += `<b>${escapeHTML(character.name)}</b>\n`

  // Japanese
  if (character.japanese) {
    text += `<b>По-японски:</b> ${character.japanese}\n`
  }

  // Synonyms
  const synonyms = character.synonyms.map(x => x.trim()).filter(x => x !== character.name)
  if (synonyms.length > 0) {
    text += `<b>Прочие имена:</b> ${synonyms.join(', ')}\n`
  }

  // Description
  if (character.descriptionHtml) {
    text += `\n${parseDescription(character.descriptionHtml)}`
    if (character.descriptionSource) {
      text += `\n— <a href="${character.descriptionSource}">Источник</a>`
    }
  }

  return text
}
