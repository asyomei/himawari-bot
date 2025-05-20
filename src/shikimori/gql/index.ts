import type { TypedDocumentString } from './_internal/graphql'

import { graphql as graphql_ } from './_internal/gql'

export type * from './_internal/graphql'

const API_URL = 'https://shikimori.one/api/graphql/'

export const graphql: typeof graphql_ & ((source: string) => never) = graphql_ as any

interface ExecuteFn {
  <TResult, TVariables>(query: TypedDocumentString<TResult, TVariables>):
  (...[variables]: TVariables extends Record<string, never> ? [] : [TVariables])
  => Promise<TResult>

  <TResult, TVariables, R>(query: TypedDocumentString<TResult, TVariables>, transform: (data: TResult) => R):
  (...[variables]: TVariables extends Record<string, never> ? [] : [TVariables])
  => Promise<R>
}

export const execute: ExecuteFn = ((query: string, transform?: (data: any) => any) => async (variables: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/graphql-response+json',
      'User-Agent': 'himawari-bot/1.0',
    },
    body: JSON.stringify({ query, variables }),
  })

  const result = await res.json()

  if (result.errors) {
    const err = result.errors[0]
    const path = err.path.join('/')
    throw new Error(`${path}: ${err.message}`)
  }

  const { data } = result
  return transform ? transform(data) : data
}) as any
