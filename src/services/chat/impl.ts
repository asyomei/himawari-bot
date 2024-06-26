import type { Redis } from "ioredis";
import { trim } from "lodash-es";
import { z } from "zod";
import type { IChatService } from "./interface";

export type History = z.infer<typeof history>;
const history = z.array(
  z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  }),
);

export class ChatService implements IChatService {
  constructor(private redis: Redis) {}

  async gpt4(id: string, message: string): Promise<string> {
    const history = (await this.load(id)) ?? [];

    const res = await fetch("https://nexra.aryahcr.cc/api/chat/gpt", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-4",
        messages: history,
        prompt: message,
        markdown: false,
      }),
    });
    const obj = JSON.parse(trim(await res.text(), "_"));

    history.push(
      { role: "user", content: message },
      { role: "assistant", content: obj.original ?? obj.gpt },
    );
    await this.save(id, history);

    return obj.gpt;
  }

  async clear(id: string): Promise<void> {
    await this.redis.del(`chatbot-gpt4:${id}`);
  }

  private async load(id: string): Promise<History | undefined> {
    const rawData = await this.redis.get(`chatbot-gpt4:${id}`);
    if (!rawData) return;

    const data = JSON.parse(rawData) as [string, string][];
    return history.parse(data.map(([r, m]) => ({ role: r, content: m })));
  }

  private async save(id: string, history: History): Promise<void> {
    const data = history.map(Object.values);
    await this.redis.set(`chatbot-gpt4:${id}`, JSON.stringify(data));
  }
}
