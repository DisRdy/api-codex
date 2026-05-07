import "server-only";

import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: async () => {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not configured.");
    }

    return apiKey;
  },
});
