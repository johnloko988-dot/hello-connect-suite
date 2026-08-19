import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const revealGift = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ boxIndex: z.number().int().min(0).max(3) }).parse(input))
  .handler(async () => {
    const { drawPrize } = await import("./gifts.server");
    return drawPrize();
  });
