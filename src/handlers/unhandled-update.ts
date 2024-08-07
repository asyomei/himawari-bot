import type { Context } from "grammy";
import { doNothing } from "remeda";

export async function unhandledUpdate(ctx: Context) {
  if (ctx.callbackQuery?.data) {
    const data = ctx.callbackQuery.data;

    if (data !== "nop") {
      console.log(`Callback query with data "${data}" didn't handle`);
    }
    await ctx.answerCallbackQuery().catch(doNothing);
  } else if (ctx.chosenInlineResult) {
    const id = ctx.chosenInlineResult.result_id;
    console.log(`Chosen inline result with id "${id}" didn't handle`);
  }
}
