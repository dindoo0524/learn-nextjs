import { z } from "zod";

export const responseSchema = z.object({
  response: z
    .string({
      required_error: "댓글을 내용을 입력 해 주세요.",
    })
    .min(3, "댓글은 최소 3자 이상 작성해주세요!")
    .max(100, "댓글은 140자를 넘을 수 없습니다."),
});

export type TweetType = z.infer<typeof responseSchema>;
