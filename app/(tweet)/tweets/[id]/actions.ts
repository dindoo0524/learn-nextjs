"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export const likePost = async (tweetId: number) => {
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
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {
    console.error(error);
  }
};

export async function getResponses(tweetId: number) {
  const responses = await db.response.findMany({
    where: {
      tweet_id: tweetId,
    },
    select: {
      response: true,
      created_at: true,
      updated_at: true,
      id: true,
      user: {
        select: {
          username: true,
          email: true,
        },
      },
      tweet_id: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return responses;
}

export async function createResponse(response: string, tweetId: number) {
  const user = await getSession();
  if (!user.id) return;
  const newResponse = await db.response.create({
    data: {
      response: response,
      user_id: user.id,
      tweet_id: tweetId,
    },
  });
  revalidateTag(`responses-${tweetId}`);
  return newResponse;
}
