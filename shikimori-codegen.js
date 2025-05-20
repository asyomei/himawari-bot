import { resolvers } from 'graphql-scalars'

const scalars = Object.fromEntries(
  Object.entries(resolvers).map(([name, type]) => [name, type.extensions.codegenScalarType]),
)

/** @type {import('@graphql-codegen/cli').CodegenConfig} */
export default {
  generates: {
    './src/shikimori/gql/_internal/': {
      preset: 'client',
      config: {
        scalars: {
          ...scalars,
          ISO8601DateTime: 'string',
        },
        documentMode: 'string',
      },
      schema: 'https://shikimori.one/api/graphql/',
      documents: ['src/**/shikimori/**/*.ts'],
    },
  },
}
