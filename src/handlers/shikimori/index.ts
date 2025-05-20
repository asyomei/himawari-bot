import { Composer } from 'grammy'
import { animeInfoHandler } from './anime/info'
import { animeInlineSearchHandler } from './anime/inline-search'
import { animeMiscHandler } from './anime/misc'
import { animeSearchHandler } from './anime/search'

export const shikimoriHandler = new Composer(
  animeSearchHandler,
  animeInlineSearchHandler,
  animeInfoHandler,
  animeMiscHandler,
)
