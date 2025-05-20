/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * List of values separated by comma.
   * Add `!` before value to apply negative filter.
   *
   *
   * `movie` - Movies
   *
   * `music` - Music
   *
   * `ona` - ONA
   *
   * `ova/ona` - OVA/ONA
   *
   * `ova` - OVA
   *
   * `special` - Specials
   *
   * `tv` - TV Series
   *
   * `tv_13` - Short TV Series
   *
   * `tv_24` - Average TV Series
   *
   * `tv_48` - Long TV Series
   *
   * `tv_special` - TV Specials
   *
   * `pv` - Promotional Videos
   *
   * `cm` - Commercial Messages
   */
  AnimeKindString: { input: any; output: any; }
  /**
   * List of values separated by comma.
   * Add `!` before value to apply negative filter.
   *
   *
   * `anons` - Planned
   *
   * `ongoing` - Airing
   *
   * `released` - Released
   */
  AnimeStatusString: { input: any; output: any; }
  /**
   * List of values separated by comma.
   * Add `!` before value to apply negative filter.
   *
   *
   * `S` - Less than 10 minutes
   *
   * `D` - Less than 30 minutes
   *
   * `F` - More than 30 minutes
   */
  DurationString: { input: any; output: any; }
  /** An ISO 8601-encoded date */
  ISO8601Date: { input: any; output: any; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: string; output: string; }
  /**
   * List of values separated by comma.
   * Add `!` before value to apply negative filter.
   *
   *
   * `doujin` - Doujin
   *
   * `manga` - Manga
   *
   * `manhua` - Manhua
   *
   * `manhwa` - Manhwa
   *
   * `light_novel` - Light Novels
   *
   * `novel` - Novels
   *
   * `one_shot` - One Shots
   */
  MangaKindString: { input: any; output: any; }
  /**
   * List of values separated by comma.
   * Add `!` before value to apply negative filter.
   *
   *
   * `anons` - Planned
   *
   * `ongoing` - Publishing
   *
   * `released` - Published
   *
   * `paused` - Paused
   *
   * `discontinued` - Discontinued
   */
  MangaStatusString: { input: any; output: any; }
  /**
   * List of values separated by comma.
   * Add `!` before value to apply negative filter.
   *
   *
   * `planned` - Planned to Watch
   *
   * `watching` - Watching
   *
   * `rewatching` - Rewatching
   *
   * `completed` - Completed
   *
   * `on_hold` - On Hold
   *
   * `dropped` - Dropped
   */
  MylistString: { input: any; output: any; }
  /**
   * List of values separated by comma.
   * Add `!` before value to apply negative filter.
   *
   *
   * `card_game` - Card game
   *
   * `novel` - Novel
   *
   * `radio` - Radio
   *
   * `game` - Game
   *
   * `unknown` - Unknown
   *
   * `book` - Book
   *
   * `light_novel` - Light novel
   *
   * `web_novel` - Web novel
   *
   * `original` - Original
   *
   * `picture_book` - Picture book
   *
   * `music` - Music
   *
   * `manga` - Manga
   *
   * `visual_novel` - Visual novel
   *
   * `other` - Other
   *
   * `web_manga` - Web manga
   *
   * `four_koma_manga` - 4-koma manga
   *
   * `mixed_media` - Mixed media
   */
  OriginString: { input: any; output: any; }
  /** A positive integer (>= 1) */
  PositiveInt: { input: number; output: number; }
  /**
   * List of values separated by comma.
   * Add `!` before value to apply negative filter.
   *
   *
   * `none` - No rating
   *
   * `g` - G - All ages
   *
   * `pg` - PG - Children
   *
   * `pg_13` - PG-13 - Teens 13 or older
   *
   * `r` - R - 17+ recommended (violence & profanity)
   *
   * `r_plus` - R+ - Mild Nudity (may also contain violence & profanity)
   *
   * `rx` - Rx - Hentai (extreme sexual content/nudity)
   */
  RatingString: { input: any; output: any; }
  /**
   * List of values separated by comma.
   * Add `!` before value to apply negative filter.
   *
   *
   * **Examples:**
   *
   * `summer_2017`
   *
   * `2016`
   *
   * `2014_2016`
   *
   * `199x`
   *
   */
  SeasonString: { input: any; output: any; }
};

export type Anime = {
  __typename?: 'Anime';
  airedOn?: Maybe<IncompleteDate>;
  characterRoles?: Maybe<Array<CharacterRole>>;
  chronology?: Maybe<Array<Anime>>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  descriptionHtml?: Maybe<Scalars['String']['output']>;
  descriptionSource?: Maybe<Scalars['String']['output']>;
  /** Duration in minutes */
  duration?: Maybe<Scalars['Int']['output']>;
  english?: Maybe<Scalars['String']['output']>;
  episodes: Scalars['Int']['output'];
  episodesAired: Scalars['Int']['output'];
  externalLinks?: Maybe<Array<ExternalLink>>;
  fandubbers: Array<Scalars['String']['output']>;
  fansubbers: Array<Scalars['String']['output']>;
  /** Franchise name */
  franchise?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID']['output'];
  isCensored?: Maybe<Scalars['Boolean']['output']>;
  japanese?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<AnimeKindEnum>;
  licenseNameRu?: Maybe<Scalars['String']['output']>;
  licensors?: Maybe<Array<Scalars['String']['output']>>;
  malId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  nextEpisodeAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  opengraphImageUrl?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<AnimeOriginEnum>;
  personRoles?: Maybe<Array<PersonRole>>;
  poster?: Maybe<Poster>;
  rating?: Maybe<AnimeRatingEnum>;
  related?: Maybe<Array<Related>>;
  releasedOn?: Maybe<IncompleteDate>;
  russian?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  scoresStats?: Maybe<Array<ScoreStat>>;
  screenshots: Array<Screenshot>;
  season?: Maybe<Scalars['String']['output']>;
  status?: Maybe<AnimeStatusEnum>;
  statusesStats?: Maybe<Array<StatusStat>>;
  studios: Array<Studio>;
  synonyms: Array<Scalars['String']['output']>;
  topic?: Maybe<Topic>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  url: Scalars['String']['output'];
  userRate?: Maybe<UserRate>;
  videos: Array<Video>;
};

export enum AnimeKindEnum {
  /** CM */
  Cm = 'cm',
  /** Movie */
  Movie = 'movie',
  /** Music */
  Music = 'music',
  /** ONA */
  Ona = 'ona',
  /** OVA */
  Ova = 'ova',
  /** PV */
  Pv = 'pv',
  /** Special */
  Special = 'special',
  /** TV Series */
  Tv = 'tv',
  /** TV Special */
  TvSpecial = 'tv_special'
}

export enum AnimeOriginEnum {
  /** Book */
  Book = 'book',
  /** Card game */
  CardGame = 'card_game',
  /** 4-koma manga */
  FourKomaManga = 'four_koma_manga',
  /** Game */
  Game = 'game',
  /** Light novel */
  LightNovel = 'light_novel',
  /** Manga */
  Manga = 'manga',
  /** Mixed media */
  MixedMedia = 'mixed_media',
  /** Music */
  Music = 'music',
  /** Novel */
  Novel = 'novel',
  /** Original */
  Original = 'original',
  /** Other */
  Other = 'other',
  /** Picture book */
  PictureBook = 'picture_book',
  /** Radio */
  Radio = 'radio',
  /** Unknown */
  Unknown = 'unknown',
  /** Visual novel */
  VisualNovel = 'visual_novel',
  /** Web manga */
  WebManga = 'web_manga',
  /** Web novel */
  WebNovel = 'web_novel'
}

export enum AnimeRatingEnum {
  /** G */
  G = 'g',
  /** None */
  None = 'none',
  /** PG */
  Pg = 'pg',
  /** PG-13 */
  Pg_13 = 'pg_13',
  /** R-17 */
  R = 'r',
  /** R+ */
  RPlus = 'r_plus',
  /** Rx */
  Rx = 'rx'
}

export enum AnimeStatusEnum {
  /** Planned */
  Anons = 'anons',
  /** Airing */
  Ongoing = 'ongoing',
  /** Released */
  Released = 'released'
}

export type Character = {
  __typename?: 'Character';
  createdAt: Scalars['ISO8601DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  descriptionHtml?: Maybe<Scalars['String']['output']>;
  descriptionSource?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAnime: Scalars['Boolean']['output'];
  isManga: Scalars['Boolean']['output'];
  isRanobe: Scalars['Boolean']['output'];
  japanese?: Maybe<Scalars['String']['output']>;
  malId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  poster?: Maybe<Poster>;
  russian?: Maybe<Scalars['String']['output']>;
  synonyms: Array<Scalars['String']['output']>;
  topic?: Maybe<Topic>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  url: Scalars['String']['output'];
};

export type CharacterRole = {
  __typename?: 'CharacterRole';
  character: Character;
  id: Scalars['ID']['output'];
  rolesEn: Array<Scalars['String']['output']>;
  rolesRu: Array<Scalars['String']['output']>;
};

export type Contest = {
  __typename?: 'Contest';
  description?: Maybe<Scalars['String']['output']>;
  descriptionHtml?: Maybe<Scalars['String']['output']>;
  descriptionSource?: Maybe<Scalars['String']['output']>;
  finishedOn?: Maybe<Scalars['ISO8601Date']['output']>;
  id: Scalars['ID']['output'];
  matchDuration?: Maybe<Scalars['Int']['output']>;
  matchesInterval?: Maybe<Scalars['Int']['output']>;
  matchesPerRound?: Maybe<Scalars['Int']['output']>;
  memberType: ContestMemberTypeEnum;
  name: Scalars['String']['output'];
  rounds: Array<ContestRound>;
  startedOn?: Maybe<Scalars['ISO8601Date']['output']>;
  state: ContestStateEnum;
  strategyType: ContestStrategyTypeEnum;
};

export type ContestMatch = {
  __typename?: 'ContestMatch';
  id: Scalars['ID']['output'];
  leftAnime?: Maybe<Anime>;
  leftCharacter?: Maybe<Character>;
  leftId?: Maybe<Scalars['Int']['output']>;
  leftVotes?: Maybe<Scalars['Int']['output']>;
  rightAnime?: Maybe<Anime>;
  rightCharacter?: Maybe<Character>;
  rightId?: Maybe<Scalars['Int']['output']>;
  rightVotes?: Maybe<Scalars['Int']['output']>;
  state: ContestMatchStateEnum;
  winnerId?: Maybe<Scalars['Int']['output']>;
};

export enum ContestMatchStateEnum {
  /** created */
  Created = 'created',
  /** finished */
  Finished = 'finished',
  /** freezed */
  Freezed = 'freezed',
  /** started */
  Started = 'started'
}

export enum ContestMemberTypeEnum {
  /** Anime */
  Anime = 'anime',
  /** Characters */
  Character = 'character'
}

export type ContestRound = {
  __typename?: 'ContestRound';
  id: Scalars['ID']['output'];
  isAdditional: Scalars['Boolean']['output'];
  matches: Array<ContestMatch>;
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  state: ContestRoundStateEnum;
};

export enum ContestRoundStateEnum {
  /** created */
  Created = 'created',
  /** finished */
  Finished = 'finished',
  /** started */
  Started = 'started'
}

export enum ContestStateEnum {
  /** created */
  Created = 'created',
  /** finished */
  Finished = 'finished',
  /** proposing */
  Proposing = 'proposing',
  /** started */
  Started = 'started'
}

export enum ContestStrategyTypeEnum {
  /** Double elimination */
  DoubleElimination = 'double_elimination',
  /** Olympic system */
  PlayOff = 'play_off',
  /** Swiss system */
  Swiss = 'swiss'
}

export type ExternalLink = {
  __typename?: 'ExternalLink';
  createdAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  kind: ExternalLinkKindEnum;
  updatedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  url: Scalars['String']['output'];
};

export enum ExternalLinkKindEnum {
  /** Amazon */
  Amazon = 'amazon',
  /** Amediateka */
  Amediateka = 'amediateka',
  /** AniDB */
  AnimeDb = 'anime_db',
  /** Anime News Network */
  AnimeNewsNetwork = 'anime_news_network',
  /** Crunchyroll */
  Crunchyroll = 'crunchyroll',
  /** Hidive */
  Hidive = 'hidive',
  /** Hulu */
  Hulu = 'hulu',
  /** Ivi */
  Ivi = 'ivi',
  /** Kage Project */
  KageProject = 'kage_project',
  /** KinoPoisk */
  Kinopoisk = 'kinopoisk',
  /** KinoPoisk HD */
  KinopoiskHd = 'kinopoisk_hd',
  /** Mangachan */
  Mangachan = 'mangachan',
  /** MangaDex */
  Mangadex = 'mangadex',
  /** MangaFox */
  Mangafox = 'mangafox',
  /** Mangahub */
  Mangahub = 'mangahub',
  /** MangaLib */
  Mangalib = 'mangalib',
  /** Baka-Updates */
  Mangaupdates = 'mangaupdates',
  /** MyAnimeList */
  Myanimelist = 'myanimelist',
  /** Netflix */
  Netflix = 'netflix',
  /** Novel.tl */
  NovelTl = 'novel_tl',
  /** Novel Updates */
  Novelupdates = 'novelupdates',
  /** Official Site */
  OfficialSite = 'official_site',
  /** Okko */
  Okko = 'okko',
  /** RanobeLib */
  Ranobelib = 'ranobelib',
  /** ReadManga */
  Readmanga = 'readmanga',
  /** ReManga */
  Remanga = 'remanga',
  /** RuRanobe */
  Ruranobe = 'ruranobe',
  /** Anime 365 */
  SmotretAnime = 'smotret_anime',
  /** Twitter/X */
  Twitter = 'twitter',
  /** Wikipedia */
  Wikipedia = 'wikipedia',
  /** Wink */
  Wink = 'wink',
  /** World Art */
  WorldArt = 'world_art',
  /** Youtube */
  Youtube = 'youtube'
}

export type Genre = {
  __typename?: 'Genre';
  entryType: GenreEntryTypeEnum;
  id: Scalars['ID']['output'];
  kind: GenreKindEnum;
  name: Scalars['String']['output'];
  russian: Scalars['String']['output'];
};

export enum GenreEntryTypeEnum {
  /** Anime */
  Anime = 'Anime',
  /** Manga */
  Manga = 'Manga'
}

export enum GenreKindEnum {
  /** Demographic */
  Demographic = 'demographic',
  /** Genre */
  Genre = 'genre',
  /** Theme */
  Theme = 'theme'
}

export type IncompleteDate = {
  __typename?: 'IncompleteDate';
  date?: Maybe<Scalars['ISO8601Date']['output']>;
  day?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type Manga = {
  __typename?: 'Manga';
  airedOn?: Maybe<IncompleteDate>;
  chapters: Scalars['Int']['output'];
  characterRoles?: Maybe<Array<CharacterRole>>;
  chronology?: Maybe<Array<Manga>>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  descriptionHtml?: Maybe<Scalars['String']['output']>;
  descriptionSource?: Maybe<Scalars['String']['output']>;
  english?: Maybe<Scalars['String']['output']>;
  externalLinks?: Maybe<Array<ExternalLink>>;
  /** Franchise name */
  franchise?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID']['output'];
  isCensored?: Maybe<Scalars['Boolean']['output']>;
  japanese?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<MangaKindEnum>;
  licenseNameRu?: Maybe<Scalars['String']['output']>;
  licensors?: Maybe<Array<Scalars['String']['output']>>;
  malId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  opengraphImageUrl?: Maybe<Scalars['String']['output']>;
  personRoles?: Maybe<Array<PersonRole>>;
  poster?: Maybe<Poster>;
  publishers: Array<Publisher>;
  related?: Maybe<Array<Related>>;
  releasedOn?: Maybe<IncompleteDate>;
  russian?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  scoresStats?: Maybe<Array<ScoreStat>>;
  status?: Maybe<MangaStatusEnum>;
  statusesStats?: Maybe<Array<StatusStat>>;
  synonyms: Array<Scalars['String']['output']>;
  topic?: Maybe<Topic>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  url: Scalars['String']['output'];
  userRate?: Maybe<UserRate>;
  volumes: Scalars['Int']['output'];
};

export enum MangaKindEnum {
  /** Doujin */
  Doujin = 'doujin',
  /** Light Novel */
  LightNovel = 'light_novel',
  /** Manga */
  Manga = 'manga',
  /** Manhua */
  Manhua = 'manhua',
  /** Manhwa */
  Manhwa = 'manhwa',
  /** Novel */
  Novel = 'novel',
  /** One Shot */
  OneShot = 'one_shot'
}

export enum MangaStatusEnum {
  /** Planned */
  Anons = 'anons',
  /** Discontinued */
  Discontinued = 'discontinued',
  /** Publishing */
  Ongoing = 'ongoing',
  /** Paused */
  Paused = 'paused',
  /** Published */
  Released = 'released'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** An example field added by the generator */
  testField: Scalars['String']['output'];
};

export enum OrderEnum {
  /** By release date */
  AiredOn = 'aired_on',
  /** created_at */
  CreatedAt = 'created_at',
  /** created_at_desc */
  CreatedAtDesc = 'created_at_desc',
  /** By number of episodes */
  Episodes = 'episodes',
  /** By ID */
  Id = 'id',
  /** id_desc */
  IdDesc = 'id_desc',
  /** By type */
  Kind = 'kind',
  /** In alphabetical order */
  Name = 'name',
  /** By popularity */
  Popularity = 'popularity',
  /** By random */
  Random = 'random',
  /** By rank */
  Ranked = 'ranked',
  /** By random */
  RankedRandom = 'ranked_random',
  /** By Shikimori ranking */
  RankedShiki = 'ranked_shiki',
  /** By status */
  Status = 'status'
}

export type Person = {
  __typename?: 'Person';
  birthOn?: Maybe<IncompleteDate>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  deceasedOn?: Maybe<IncompleteDate>;
  id: Scalars['ID']['output'];
  isMangaka: Scalars['Boolean']['output'];
  isProducer: Scalars['Boolean']['output'];
  isSeyu: Scalars['Boolean']['output'];
  japanese?: Maybe<Scalars['String']['output']>;
  malId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  poster?: Maybe<Poster>;
  russian?: Maybe<Scalars['String']['output']>;
  synonyms: Array<Scalars['String']['output']>;
  topic?: Maybe<Topic>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  url: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type PersonRole = {
  __typename?: 'PersonRole';
  id: Scalars['ID']['output'];
  person: Person;
  rolesEn: Array<Scalars['String']['output']>;
  rolesRu: Array<Scalars['String']['output']>;
};

export type Poster = {
  __typename?: 'Poster';
  id: Scalars['ID']['output'];
  main2xUrl: Scalars['String']['output'];
  mainAlt2xUrl: Scalars['String']['output'];
  mainAltUrl: Scalars['String']['output'];
  mainUrl: Scalars['String']['output'];
  mini2xUrl: Scalars['String']['output'];
  miniAlt2xUrl: Scalars['String']['output'];
  miniAltUrl: Scalars['String']['output'];
  miniUrl: Scalars['String']['output'];
  originalUrl: Scalars['String']['output'];
  preview2xUrl: Scalars['String']['output'];
  previewAlt2xUrl: Scalars['String']['output'];
  previewAltUrl: Scalars['String']['output'];
  previewUrl: Scalars['String']['output'];
};

export type Publisher = {
  __typename?: 'Publisher';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  animes: Array<Anime>;
  characters: Array<Character>;
  contests: Array<Contest>;
  currentUser?: Maybe<User>;
  genres: Array<Genre>;
  mangas: Array<Manga>;
  people: Array<Person>;
  userRates: Array<UserRate>;
  users: Array<User>;
};


export type QueryAnimesArgs = {
  censored?: InputMaybe<Scalars['Boolean']['input']>;
  duration?: InputMaybe<Scalars['DurationString']['input']>;
  excludeIds?: InputMaybe<Scalars['String']['input']>;
  franchise?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['AnimeKindString']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  mylist?: InputMaybe<Scalars['MylistString']['input']>;
  order?: InputMaybe<OrderEnum>;
  origin?: InputMaybe<Scalars['OriginString']['input']>;
  page?: InputMaybe<Scalars['PositiveInt']['input']>;
  rating?: InputMaybe<Scalars['RatingString']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['SeasonString']['input']>;
  status?: InputMaybe<Scalars['AnimeStatusString']['input']>;
  studio?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCharactersArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  page?: InputMaybe<Scalars['PositiveInt']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryContestsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  page?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QueryGenresArgs = {
  entryType: GenreEntryTypeEnum;
};


export type QueryMangasArgs = {
  censored?: InputMaybe<Scalars['Boolean']['input']>;
  excludeIds?: InputMaybe<Scalars['String']['input']>;
  franchise?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['MangaKindString']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  mylist?: InputMaybe<Scalars['MylistString']['input']>;
  order?: InputMaybe<OrderEnum>;
  page?: InputMaybe<Scalars['PositiveInt']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['SeasonString']['input']>;
  status?: InputMaybe<Scalars['MangaStatusString']['input']>;
};


export type QueryPeopleArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  isMangaka?: InputMaybe<Scalars['Boolean']['input']>;
  isProducer?: InputMaybe<Scalars['Boolean']['input']>;
  isSeyu?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  page?: InputMaybe<Scalars['PositiveInt']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserRatesArgs = {
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  order?: InputMaybe<UserRateOrderInputType>;
  page?: InputMaybe<Scalars['PositiveInt']['input']>;
  status?: InputMaybe<UserRateStatusEnum>;
  targetType?: InputMaybe<UserRateTargetTypeEnum>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  page?: InputMaybe<Scalars['PositiveInt']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Related = {
  __typename?: 'Related';
  anime?: Maybe<Anime>;
  id: Scalars['ID']['output'];
  manga?: Maybe<Manga>;
  /** @deprecated use relation_kind/relation_text instead. This field will be deleted after 2025-01-01 */
  relationEn: Scalars['String']['output'];
  relationKind: RelationKindEnum;
  /** @deprecated use relation_kind/relation_text instead. This field will be deleted after 2025-01-01 */
  relationRu: Scalars['String']['output'];
  relationText: Scalars['String']['output'];
};

export enum RelationKindEnum {
  /** Adaptation */
  Adaptation = 'adaptation',
  /** Alternative Setting */
  AlternativeSetting = 'alternative_setting',
  /** Alternative Version */
  AlternativeVersion = 'alternative_version',
  /** Character */
  Character = 'character',
  /** Full Story */
  FullStory = 'full_story',
  /** Other */
  Other = 'other',
  /** Parent Story */
  ParentStory = 'parent_story',
  /** Prequel */
  Prequel = 'prequel',
  /** Sequel */
  Sequel = 'sequel',
  /** Side Story */
  SideStory = 'side_story',
  /** Spin-off */
  SpinOff = 'spin_off',
  /** Summary */
  Summary = 'summary'
}

export type ScoreStat = {
  __typename?: 'ScoreStat';
  count: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
};

export type Screenshot = {
  __typename?: 'Screenshot';
  id: Scalars['ID']['output'];
  originalUrl: Scalars['String']['output'];
  x166Url: Scalars['String']['output'];
  x332Url: Scalars['String']['output'];
};

export enum SortOrderEnum {
  /** Sort in ascending order */
  Asc = 'asc',
  /** Sort in descending order */
  Desc = 'desc'
}

export type StatusStat = {
  __typename?: 'StatusStat';
  count: Scalars['Int']['output'];
  status: UserRateStatusEnum;
};

export type Studio = {
  __typename?: 'Studio';
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Topic = {
  __typename?: 'Topic';
  body: Scalars['String']['output'];
  commentsCount: Scalars['Int']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  htmlBody: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastOnlineAt: Scalars['ISO8601DateTime']['output'];
  nickname: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UserRate = {
  __typename?: 'UserRate';
  anime?: Maybe<Anime>;
  chapters: Scalars['Int']['output'];
  createdAt: Scalars['ISO8601DateTime']['output'];
  episodes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  manga?: Maybe<Manga>;
  rewatches: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
  status: UserRateStatusEnum;
  text?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  volumes: Scalars['Int']['output'];
};

export enum UserRateOrderFieldEnum {
  /** By id */
  Id = 'id',
  /** By updated_at */
  UpdatedAt = 'updated_at'
}

export type UserRateOrderInputType = {
  field: UserRateOrderFieldEnum;
  order: SortOrderEnum;
};

export enum UserRateStatusEnum {
  /** Completed */
  Completed = 'completed',
  /** Dropped */
  Dropped = 'dropped',
  /** On Hold */
  OnHold = 'on_hold',
  /** Planned to Watch */
  Planned = 'planned',
  /** Rewatching */
  Rewatching = 'rewatching',
  /** Watching */
  Watching = 'watching'
}

export enum UserRateTargetTypeEnum {
  /** Anime */
  Anime = 'Anime',
  /** Manga */
  Manga = 'Manga'
}

export type Video = {
  __typename?: 'Video';
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  kind: VideoKindEnum;
  name?: Maybe<Scalars['String']['output']>;
  playerUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export enum VideoKindEnum {
  /** Character trailer */
  CharacterTrailer = 'character_trailer',
  /** Clip */
  Clip = 'clip',
  /** CM */
  Cm = 'cm',
  /** ED */
  Ed = 'ed',
  /** Episode preview */
  EpisodePreview = 'episode_preview',
  /** OP */
  Op = 'op',
  /** Music */
  OpEdClip = 'op_ed_clip',
  /** Other */
  Other = 'other',
  /** PV */
  Pv = 'pv'
}

export type SearchAnimeQueryVariables = Exact<{
  search: Scalars['String']['input'];
  limit: Scalars['PositiveInt']['input'];
  page: Scalars['PositiveInt']['input'];
}>;


export type SearchAnimeQuery = { __typename?: 'Query', animes: Array<{ __typename?: 'Anime', id: string, russian?: string | null, name: string, isCensored?: boolean | null }> };

export type SearchAnimeInlineQueryVariables = Exact<{
  search: Scalars['String']['input'];
  limit: Scalars['PositiveInt']['input'];
  page: Scalars['PositiveInt']['input'];
}>;


export type SearchAnimeInlineQuery = { __typename?: 'Query', animes: Array<{ __typename?: 'Anime', id: string, russian?: string | null, english?: string | null, name: string, isCensored?: boolean | null, url: string, poster?: { __typename?: 'Poster', previewUrl: string } | null }> };

export type GetAnimeInfoQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAnimeInfoQuery = { __typename?: 'Query', animes: Array<{ __typename?: 'Anime', name: string, russian?: string | null, isCensored?: boolean | null, kind?: AnimeKindEnum | null, status?: AnimeStatusEnum | null, episodes: number, episodesAired: number, nextEpisodeAt?: string | null, duration?: number | null, rating?: AnimeRatingEnum | null, score?: number | null, origin?: AnimeOriginEnum | null, licensors?: Array<string> | null, fandubbers: Array<string>, fansubbers: Array<string>, descriptionHtml?: string | null, descriptionSource?: string | null, url: string, airedOn?: { __typename?: 'IncompleteDate', day?: number | null, month?: number | null, year?: number | null } | null, releasedOn?: { __typename?: 'IncompleteDate', day?: number | null, month?: number | null, year?: number | null } | null, genres?: Array<{ __typename?: 'Genre', kind: GenreKindEnum, russian: string }> | null, studios: Array<{ __typename?: 'Studio', name: string }>, poster?: { __typename?: 'Poster', originalUrl: string } | null }> };

export type GetAnimeCharactersQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAnimeCharactersQuery = { __typename?: 'Query', animes: Array<{ __typename?: 'Anime', characterRoles?: Array<{ __typename?: 'CharacterRole', id: string, rolesRu: Array<string>, character: { __typename?: 'Character', id: string, russian?: string | null, name: string, url: string, poster?: { __typename?: 'Poster', previewUrl: string } | null } }> | null }> };

export type GetAnimeScreenshotsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAnimeScreenshotsQuery = { __typename?: 'Query', animes: Array<{ __typename?: 'Anime', screenshots: Array<{ __typename?: 'Screenshot', id: string, originalUrl: string }> }> };

export type GetAnimeVideosQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAnimeVideosQuery = { __typename?: 'Query', animes: Array<{ __typename?: 'Anime', videos: Array<{ __typename?: 'Video', id: string, kind: VideoKindEnum, name?: string | null, imageUrl: string, url: string }> }> };

export type GetAnimeScoresQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAnimeScoresQuery = { __typename?: 'Query', animes: Array<{ __typename?: 'Anime', scoresStats?: Array<{ __typename?: 'ScoreStat', score: number, count: number }> | null }> };

export type GetAnimeStatusesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAnimeStatusesQuery = { __typename?: 'Query', animes: Array<{ __typename?: 'Anime', statusesStats?: Array<{ __typename?: 'StatusStat', status: UserRateStatusEnum, count: number }> | null }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const SearchAnimeDocument = new TypedDocumentString(`
    query SearchAnime($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {
  animes(search: $search, limit: $limit, page: $page, order: popularity) {
    id
    russian
    name
    isCensored
  }
}
    `) as unknown as TypedDocumentString<SearchAnimeQuery, SearchAnimeQueryVariables>;
export const SearchAnimeInlineDocument = new TypedDocumentString(`
    query SearchAnimeInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {
  animes(search: $search, limit: $limit, page: $page, order: popularity) {
    id
    russian
    english
    name
    isCensored
    url
    poster {
      previewUrl
    }
  }
}
    `) as unknown as TypedDocumentString<SearchAnimeInlineQuery, SearchAnimeInlineQueryVariables>;
export const GetAnimeInfoDocument = new TypedDocumentString(`
    query GetAnimeInfo($id: String!) {
  animes(ids: $id) {
    name
    russian
    isCensored
    kind
    status
    episodes
    episodesAired
    nextEpisodeAt
    duration
    airedOn {
      day
      month
      year
    }
    releasedOn {
      day
      month
      year
    }
    genres {
      kind
      russian
    }
    rating
    score
    origin
    licensors
    studios {
      name
    }
    fandubbers
    fansubbers
    descriptionHtml
    descriptionSource
    poster {
      originalUrl
    }
    url
  }
}
    `) as unknown as TypedDocumentString<GetAnimeInfoQuery, GetAnimeInfoQueryVariables>;
export const GetAnimeCharactersDocument = new TypedDocumentString(`
    query GetAnimeCharacters($id: String!) {
  animes(ids: $id) {
    characterRoles {
      id
      rolesRu
      character {
        id
        russian
        name
        url
        poster {
          previewUrl
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetAnimeCharactersQuery, GetAnimeCharactersQueryVariables>;
export const GetAnimeScreenshotsDocument = new TypedDocumentString(`
    query GetAnimeScreenshots($id: String!) {
  animes(ids: $id) {
    screenshots {
      id
      originalUrl
    }
  }
}
    `) as unknown as TypedDocumentString<GetAnimeScreenshotsQuery, GetAnimeScreenshotsQueryVariables>;
export const GetAnimeVideosDocument = new TypedDocumentString(`
    query GetAnimeVideos($id: String!) {
  animes(ids: $id) {
    videos {
      id
      kind
      name
      imageUrl
      url
    }
  }
}
    `) as unknown as TypedDocumentString<GetAnimeVideosQuery, GetAnimeVideosQueryVariables>;
export const GetAnimeScoresDocument = new TypedDocumentString(`
    query GetAnimeScores($id: String!) {
  animes(ids: $id) {
    scoresStats {
      score
      count
    }
  }
}
    `) as unknown as TypedDocumentString<GetAnimeScoresQuery, GetAnimeScoresQueryVariables>;
export const GetAnimeStatusesDocument = new TypedDocumentString(`
    query GetAnimeStatuses($id: String!) {
  animes(ids: $id) {
    statusesStats {
      status
      count
    }
  }
}
    `) as unknown as TypedDocumentString<GetAnimeStatusesQuery, GetAnimeStatusesQueryVariables>;