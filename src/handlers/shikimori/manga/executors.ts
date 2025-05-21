import { execute, graphql } from '~/shikimori/gql'

export const searchManga = execute(graphql(`
  query SearchManga($search: String!, $limit: PositiveInt!, $page: PositiveInt!, $kind: MangaKindString!) {
    mangas(search: $search, limit: $limit, page: $page, kind: $kind, order: popularity) {
      id russian name isCensored
    }
  }
`), x => x.mangas)

export const searchMangaInline = execute(graphql(`
  query SearchMangaInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!, $kind: MangaKindString!) {
    mangas(search: $search, limit: $limit, page: $page, kind: $kind, order: popularity) {
      id russian english name isCensored url
      poster { previewUrl }
    }
  }
`), x => x.mangas)

export const getMangaInfo = execute(graphql(`
  query GetMangaInfo($id: String!) {
    mangas(ids: $id) {
      name
      russian
      isCensored
      kind
      volumes
      chapters
      status
      airedOn { day month year }
      releasedOn { day month year }
      genres { kind russian }
      score
      licensors
      publishers { name }
      descriptionHtml
      descriptionSource
      poster { originalUrl }
      url
    }
  }
`), x => x.mangas.at(0))

export const getMangaCharacters = execute(graphql(`
  query GetMangaCharacters($id: String!) {
    mangas(ids: $id) {
      characterRoles {
        id
        rolesRu
        character {
          id
          russian
          name
          url
          poster { previewUrl }
        }
      }
    }
  }
`), x => x.mangas.at(0)?.characterRoles?.map(role => ({ ...role.character, isMain: role.rolesRu.includes('Main') })))

export const getMangaScores = execute(graphql(`
  query GetMangaScores($id: String!) {
    mangas(ids: $id) {
      scoresStats { score count }
    }
  }
`), x => x.mangas.at(0))

export const getMangaStatuses = execute(graphql(`
  query GetMangaStatuses($id: String!) {
    mangas(ids: $id) {
      statusesStats { status count }
    }
  }
`), x => x.mangas.at(0))
