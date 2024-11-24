"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export const likePost = async (tweetId: number) => {
  await new Promise((r) => setTimeout(r, 10000));
  try {
    const session = await getSession();
    if (!session.id) return;

    await db.like.create({
      data: {
        tweet_id: tweetId,
        user_id: session.id!,
      },
    });

    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {
    console.error(error);
  }
};

export const dislikePost = async (tweetId: number) => {
  await new Promise((r) => setTimeout(r, 10000));
  try {
    const session = await getSession();
    if (!session.id) return;

    await db.like.delete({
      where: {
        id: {
          user_id: session.id!,
          tweet_id: tweetId,
        },
      },
    });
    // revalidatePath(`/tweets/${tweetId}`);
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {
    console.error(error);
  }
};
