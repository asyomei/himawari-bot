import { Composer } from 'grammy'
import { animeInfoHandler } from './anime/info'
import { animeInlineSearchHandler } from './anime/inline-search'
import { animeMiscHandler } from './anime/misc'
import { animeSearchHandler } from './anime/search'
import { characterInfoHandler } from './character/info'
import { characterInlineSearchHandler } from './character/inline-search'
import { characterSearchHandler } from './character/search'
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
  characterSearchHandler,
  characterInlineSearchHandler,
  characterInfoHandler,
)
