import type { Composer } from "grammy";
import { AnimalPicService } from "#/services/animal-pic";
import { AnimePicService } from "#/services/anime-pic";
import { ChatService } from "#/services/chat";
import { ShikimoriService } from "#/services/shikimori";
import type { MyContext } from "#/types/context";
import { AnimalHandler } from "./animal";
import { AnimePicHandler } from "./anime-pic";
import { ChatHandler } from "./chat";
import type { HandlerDeps } from "./deps";
import { HelpHandler } from "./help";
import { MemoryUsageHandler } from "./memory-usage";
import { PrivacyHandler } from "./privacy";
import { ShikimoriSearchHandler } from "./shikimori-search";
import { unhandledUpdate } from "./unhandled-update";

export function setupHandlers(comp: Composer<MyContext>, deps: HandlerDeps) {
  const shikimori = new ShikimoriService();
  const chat = new ChatService(deps.redis);
  const animalPic = new AnimalPicService();
  const animePic = new AnimePicService();

  comp.use(
    new HelpHandler(),
    new PrivacyHandler(),
    new MemoryUsageHandler(),
    new ShikimoriSearchHandler(shikimori),
    new ChatHandler(chat),
    new AnimePicHandler(animePic),
    new AnimalHandler(animalPic),
  );

  // handle unused callbacks and inlines lastly
  comp.use(unhandledUpdate);
}
