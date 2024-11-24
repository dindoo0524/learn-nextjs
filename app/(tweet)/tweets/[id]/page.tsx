import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import LikeButton from "@/components/like-button";

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();

  const cachedOperation = nextCache(getLikeStatus, ["like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, session.id);
}

async function getLikeStatus(tweetId: number, userId: number | undefined) {
  if (!userId) return { likeCount: 0, isLiked: false };

  const like = await db.like.findUnique({
    where: {
      id: {
        user_id: userId!,
        tweet_id: tweetId,
      },
    },
  });

  const likeCount = await db.like.count({
    where: {
      tweet_id: tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(like),
  };
}

const getCachedTweet = nextCache(getTweet, ["tweet"], {
  tags: ["tweet"],
  revalidate: 60,
});

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          id: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });
  return tweet;
}

type Params = Promise<{ id: string[] }>;

export default async function TweetDetail({ params }: { params: Params }) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return notFound();
  }
  const tweet = await getTweet(numericId);
  if (!tweet) {
    return notFound();
  }

  const { isLiked, likeCount } = await getCachedLikeStatus(numericId);
  // const isOwner = await getIsOwner(tweet.user.id);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        href="/"
      >
        <span>←</span> 트윗 목록으로
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <p className="text-xl text-gray-900 mb-4">{tweet.tweet}</p>

          <div className="flex items-center gap-4 mb-4">
            <LikeButton
              tweetId={tweet.id}
              isLiked={isLiked}
              likesCount={likeCount}
            />
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>작성시간: {formatToTimeAgo(tweet.created_at.toString())}</p>
            <p className="text-xs text-gray-400">
              {tweet.created_at.toString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
