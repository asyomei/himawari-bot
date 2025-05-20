import type { Context } from 'grammy'

export function viaMe(ctx: Context): boolean {
  return ctx.msg?.via_bot?.id === ctx.me.id
}
