import { execute, graphql } from '~/shikimori/gql'

export const searchAnime = execute(graphql(`
  query SearchAnime($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {
    animes(search: $search, limit: $limit, page: $page, order: popularity) {
      id russian name isCensored
    }
  }
`), x => x.animes)

export const searchAnimeInline = execute(graphql(`
  query SearchAnimeInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {
    animes(search: $search, limit: $limit, page: $page, order: popularity) {
      id russian english name isCensored url
      poster { previewUrl }
    }
  }
`), x => x.animes)

export const getAnimeInfo = execute(graphql(`
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
      airedOn { day month year }
      releasedOn { day month year }
      genres { kind russian }
      rating
      score
      origin
      licensors
      studios { name }
      fandubbers
      fansubbers
      descriptionHtml
      descriptionSource
      poster { originalUrl }
      url
    }
  }
`), x => x.animes.at(0))

export const getAnimeCharacters = execute(graphql(`
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
          poster { previewUrl }
        }
      }
    }
  }
`), x => x.animes.at(0)?.characterRoles?.map(role => ({ ...role.character, isMain: role.rolesRu.includes('Main') })))

export const getAnimeScreenshots = execute(graphql(`
  query GetAnimeScreenshots($id: String!) {
    animes(ids: $id) {
      screenshots { id originalUrl }
    }
  }
`), x => x.animes.at(0)?.screenshots)

export const getAnimeVideos = execute(graphql(`
  query GetAnimeVideos($id: String!) {
    animes(ids: $id) {
      videos { id kind name imageUrl url }
    }
  }
`), x => x.animes.at(0)?.videos)

export const getAnimeScores = execute(graphql(`
  query GetAnimeScores($id: String!) {
    animes(ids: $id) {
      scoresStats { score count }
    }
  }
`), x => x.animes.at(0))

export const getAnimeStatuses = execute(graphql(`
  query GetAnimeStatuses($id: String!) {
    animes(ids: $id) {
      statusesStats { status count }
    }
  }
`), x => x.animes.at(0))
