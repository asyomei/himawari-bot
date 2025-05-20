import type { Context } from 'grammy'
import type { ReplyParameters } from 'grammy/types'

export function replyTo(ctx: Context): ReplyParameters | undefined {
  const message_id = ctx.message?.message_id
  return message_id?.valueOf && {
    message_id,
    allow_sending_without_reply: true,
  }
}
