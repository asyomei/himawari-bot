type Head<T extends string> = T extends `${infer First}.${string}` ? First : T

type Tail<T extends string> = T extends `${string}.${infer Rest}` ? Rest : never

type PartialOnUndefined<T> =
  & { [K in keyof T as undefined extends T[K] ? never : K]: T[K] }
  & { [K in keyof T as undefined extends T[K] ? K : never]?: T[K] }

export type PickDeep<T, K extends string> = PartialOnUndefined<
  T extends object
    ? NonNullable<T> extends readonly unknown[]
      ? PickDeep<NonNullable<T>[number], K>[] | Exclude<T, NonNullable<T>>
      : {
          [P in Head<K> & keyof T]: PickDeep<
            T[P],
            Tail<Extract<K, `${P}.${string}`>>
          >
        }
    : T
>
