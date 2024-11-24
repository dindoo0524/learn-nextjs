"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { tweetSchema } from "@/schemas/tweet-schema";
import { redirect } from "next/navigation";

export async function addTweet(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);

  if (!result.success) {
    return {
      result: false,
      errors: result.error.flatten().fieldErrors,
    };
  } else {
    const session = await getSession();
    if (session.id) {
      await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      redirect("/");
    }
  }
}
