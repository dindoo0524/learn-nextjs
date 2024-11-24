import { z } from "zod";

export const tweetSchema = z.object({
  tweet: z
    .string({
      required_error: "Tweet is required!!!!!",
    })
    .min(5, "트윗은 최소 5자 이상 작성해주세요!")
    .max(140, "트윗은 140자를 넘을 수 없습니다."),
});

export type TweetType = z.infer<typeof tweetSchema>;
