"use server";

import { PAGE_SIZE } from "@/lib/constants";
import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      updated_at: true,
      id: true,
      user: {
        select: {
          username: true,
          email: true,
        },
      },
      _count: {
        select: {
          likes: true,
          responses: true,
        },
      },
    },
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
