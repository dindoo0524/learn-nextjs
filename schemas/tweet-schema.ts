import { z } from "zod";

export const tweetSchema = z.object({
  tweet: z
    .string({
      required_error: "Tweet is required!!!!!",
    })
    .min(5, "Tweet must be at least 5 characters long"),
});

export type TweetType = z.infer<typeof tweetSchema>;
