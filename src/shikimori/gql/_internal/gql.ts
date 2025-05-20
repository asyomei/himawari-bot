/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query SearchAnime($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    animes(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian name isCensored\n    }\n  }\n": typeof types.SearchAnimeDocument,
    "\n  query SearchAnimeInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    animes(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian english name isCensored url\n      poster { previewUrl }\n    }\n  }\n": typeof types.SearchAnimeInlineDocument,
    "\n  query GetAnimeInfo($id: String!) {\n    animes(ids: $id) {\n      name\n      russian\n      isCensored\n      kind\n      status\n      episodes\n      episodesAired\n      nextEpisodeAt\n      duration\n      airedOn { day month year }\n      releasedOn { day month year }\n      genres { kind russian }\n      rating\n      score\n      origin\n      licensors\n      studios { name }\n      fandubbers\n      fansubbers\n      descriptionHtml\n      descriptionSource\n      poster { originalUrl }\n      url\n    }\n  }\n": typeof types.GetAnimeInfoDocument,
    "\n  query GetAnimeCharacters($id: String!) {\n    animes(ids: $id) {\n      characterRoles {\n        id\n        rolesRu\n        character {\n          id\n          russian\n          name\n          url\n          poster { previewUrl }\n        }\n      }\n    }\n  }\n": typeof types.GetAnimeCharactersDocument,
    "\n  query GetAnimeScreenshots($id: String!) {\n    animes(ids: $id) {\n      screenshots { id originalUrl }\n    }\n  }\n": typeof types.GetAnimeScreenshotsDocument,
    "\n  query GetAnimeVideos($id: String!) {\n    animes(ids: $id) {\n      videos { id kind name imageUrl url }\n    }\n  }\n": typeof types.GetAnimeVideosDocument,
    "\n  query GetAnimeScores($id: String!) {\n    animes(ids: $id) {\n      scoresStats { score count }\n    }\n  }\n": typeof types.GetAnimeScoresDocument,
    "\n  query GetAnimeStatuses($id: String!) {\n    animes(ids: $id) {\n      statusesStats { status count }\n    }\n  }\n": typeof types.GetAnimeStatusesDocument,
    "\n  query SearchManga($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    mangas(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian name isCensored\n    }\n  }\n": typeof types.SearchMangaDocument,
    "\n  query SearchMangaInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    mangas(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian english name isCensored url\n      poster { previewUrl }\n    }\n  }\n": typeof types.SearchMangaInlineDocument,
    "\n  query GetMangaInfo($id: String!) {\n    mangas(ids: $id) {\n      name\n      russian\n      isCensored\n      kind\n      volumes\n      chapters\n      status\n      airedOn { day month year }\n      releasedOn { day month year }\n      genres { kind russian }\n      score\n      licensors\n      publishers { name }\n      descriptionHtml\n      descriptionSource\n      poster { originalUrl }\n      url\n    }\n  }\n": typeof types.GetMangaInfoDocument,
    "\n  query GetMangaCharacters($id: String!) {\n    mangas(ids: $id) {\n      characterRoles {\n        id\n        rolesRu\n        character {\n          id\n          russian\n          name\n          url\n          poster { previewUrl }\n        }\n      }\n    }\n  }\n": typeof types.GetMangaCharactersDocument,
    "\n  query GetMangaScores($id: String!) {\n    mangas(ids: $id) {\n      scoresStats { score count }\n    }\n  }\n": typeof types.GetMangaScoresDocument,
    "\n  query GetMangaStatuses($id: String!) {\n    mangas(ids: $id) {\n      statusesStats { status count }\n    }\n  }\n": typeof types.GetMangaStatusesDocument,
};
const documents: Documents = {
    "\n  query SearchAnime($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    animes(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian name isCensored\n    }\n  }\n": types.SearchAnimeDocument,
    "\n  query SearchAnimeInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    animes(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian english name isCensored url\n      poster { previewUrl }\n    }\n  }\n": types.SearchAnimeInlineDocument,
    "\n  query GetAnimeInfo($id: String!) {\n    animes(ids: $id) {\n      name\n      russian\n      isCensored\n      kind\n      status\n      episodes\n      episodesAired\n      nextEpisodeAt\n      duration\n      airedOn { day month year }\n      releasedOn { day month year }\n      genres { kind russian }\n      rating\n      score\n      origin\n      licensors\n      studios { name }\n      fandubbers\n      fansubbers\n      descriptionHtml\n      descriptionSource\n      poster { originalUrl }\n      url\n    }\n  }\n": types.GetAnimeInfoDocument,
    "\n  query GetAnimeCharacters($id: String!) {\n    animes(ids: $id) {\n      characterRoles {\n        id\n        rolesRu\n        character {\n          id\n          russian\n          name\n          url\n          poster { previewUrl }\n        }\n      }\n    }\n  }\n": types.GetAnimeCharactersDocument,
    "\n  query GetAnimeScreenshots($id: String!) {\n    animes(ids: $id) {\n      screenshots { id originalUrl }\n    }\n  }\n": types.GetAnimeScreenshotsDocument,
    "\n  query GetAnimeVideos($id: String!) {\n    animes(ids: $id) {\n      videos { id kind name imageUrl url }\n    }\n  }\n": types.GetAnimeVideosDocument,
    "\n  query GetAnimeScores($id: String!) {\n    animes(ids: $id) {\n      scoresStats { score count }\n    }\n  }\n": types.GetAnimeScoresDocument,
    "\n  query GetAnimeStatuses($id: String!) {\n    animes(ids: $id) {\n      statusesStats { status count }\n    }\n  }\n": types.GetAnimeStatusesDocument,
    "\n  query SearchManga($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    mangas(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian name isCensored\n    }\n  }\n": types.SearchMangaDocument,
    "\n  query SearchMangaInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    mangas(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian english name isCensored url\n      poster { previewUrl }\n    }\n  }\n": types.SearchMangaInlineDocument,
    "\n  query GetMangaInfo($id: String!) {\n    mangas(ids: $id) {\n      name\n      russian\n      isCensored\n      kind\n      volumes\n      chapters\n      status\n      airedOn { day month year }\n      releasedOn { day month year }\n      genres { kind russian }\n      score\n      licensors\n      publishers { name }\n      descriptionHtml\n      descriptionSource\n      poster { originalUrl }\n      url\n    }\n  }\n": types.GetMangaInfoDocument,
    "\n  query GetMangaCharacters($id: String!) {\n    mangas(ids: $id) {\n      characterRoles {\n        id\n        rolesRu\n        character {\n          id\n          russian\n          name\n          url\n          poster { previewUrl }\n        }\n      }\n    }\n  }\n": types.GetMangaCharactersDocument,
    "\n  query GetMangaScores($id: String!) {\n    mangas(ids: $id) {\n      scoresStats { score count }\n    }\n  }\n": types.GetMangaScoresDocument,
    "\n  query GetMangaStatuses($id: String!) {\n    mangas(ids: $id) {\n      statusesStats { status count }\n    }\n  }\n": types.GetMangaStatusesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchAnime($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    animes(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian name isCensored\n    }\n  }\n"): typeof import('./graphql').SearchAnimeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchAnimeInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    animes(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian english name isCensored url\n      poster { previewUrl }\n    }\n  }\n"): typeof import('./graphql').SearchAnimeInlineDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnimeInfo($id: String!) {\n    animes(ids: $id) {\n      name\n      russian\n      isCensored\n      kind\n      status\n      episodes\n      episodesAired\n      nextEpisodeAt\n      duration\n      airedOn { day month year }\n      releasedOn { day month year }\n      genres { kind russian }\n      rating\n      score\n      origin\n      licensors\n      studios { name }\n      fandubbers\n      fansubbers\n      descriptionHtml\n      descriptionSource\n      poster { originalUrl }\n      url\n    }\n  }\n"): typeof import('./graphql').GetAnimeInfoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnimeCharacters($id: String!) {\n    animes(ids: $id) {\n      characterRoles {\n        id\n        rolesRu\n        character {\n          id\n          russian\n          name\n          url\n          poster { previewUrl }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetAnimeCharactersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnimeScreenshots($id: String!) {\n    animes(ids: $id) {\n      screenshots { id originalUrl }\n    }\n  }\n"): typeof import('./graphql').GetAnimeScreenshotsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnimeVideos($id: String!) {\n    animes(ids: $id) {\n      videos { id kind name imageUrl url }\n    }\n  }\n"): typeof import('./graphql').GetAnimeVideosDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnimeScores($id: String!) {\n    animes(ids: $id) {\n      scoresStats { score count }\n    }\n  }\n"): typeof import('./graphql').GetAnimeScoresDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnimeStatuses($id: String!) {\n    animes(ids: $id) {\n      statusesStats { status count }\n    }\n  }\n"): typeof import('./graphql').GetAnimeStatusesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchManga($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    mangas(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian name isCensored\n    }\n  }\n"): typeof import('./graphql').SearchMangaDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchMangaInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {\n    mangas(search: $search, limit: $limit, page: $page, order: popularity) {\n      id russian english name isCensored url\n      poster { previewUrl }\n    }\n  }\n"): typeof import('./graphql').SearchMangaInlineDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMangaInfo($id: String!) {\n    mangas(ids: $id) {\n      name\n      russian\n      isCensored\n      kind\n      volumes\n      chapters\n      status\n      airedOn { day month year }\n      releasedOn { day month year }\n      genres { kind russian }\n      score\n      licensors\n      publishers { name }\n      descriptionHtml\n      descriptionSource\n      poster { originalUrl }\n      url\n    }\n  }\n"): typeof import('./graphql').GetMangaInfoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMangaCharacters($id: String!) {\n    mangas(ids: $id) {\n      characterRoles {\n        id\n        rolesRu\n        character {\n          id\n          russian\n          name\n          url\n          poster { previewUrl }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetMangaCharactersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMangaScores($id: String!) {\n    mangas(ids: $id) {\n      scoresStats { score count }\n    }\n  }\n"): typeof import('./graphql').GetMangaScoresDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMangaStatuses($id: String!) {\n    mangas(ids: $id) {\n      statusesStats { status count }\n    }\n  }\n"): typeof import('./graphql').GetMangaStatusesDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
