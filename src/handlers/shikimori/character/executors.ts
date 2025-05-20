import { execute, graphql } from '~/shikimori/gql'

export const searchCharacter = execute(graphql(`
  query SearchCharacter($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {
    characters(search: $search, limit: $limit, page: $page) {
      id russian name
    }
  }
`), x => x.characters)

export const searchCharacterInline = execute(graphql(`
  query SearchCharacterInline($search: String!, $limit: PositiveInt!, $page: PositiveInt!) {
    characters(search: $search, limit: $limit, page: $page) {
      id russian name url
      poster { previewUrl }
    }
  }
`), x => x.characters)

export const getCharacterInfo = execute(graphql(`
  query GetCharacterInfo($id: [ID!]) {
    characters(ids: $id) {
      name
      russian
      japanese
      synonyms
      descriptionHtml
      descriptionSource
      poster { originalUrl }
      url
    }
  }
`), x => x.characters.at(0))
