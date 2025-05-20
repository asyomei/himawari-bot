import { Composer } from 'grammy'
import { animeInfoHandler } from './anime/info'
import { animeInlineSearchHandler } from './anime/inline-search'
import { animeMiscHandler } from './anime/misc'
import { animeSearchHandler } from './anime/search'
import { mangaInfoHandler } from './manga/info'
import { mangaInlineSearchHandler } from './manga/inline-search'
import { mangaMiscHandler } from './manga/misc'
import { mangaSearchHandler } from './manga/search'

export const shikimoriHandler = new Composer(
  animeSearchHandler,
  animeInlineSearchHandler,
  animeInfoHandler,
  animeMiscHandler,
  mangaSearchHandler,
  mangaInlineSearchHandler,
  mangaInfoHandler,
  mangaMiscHandler,
)
