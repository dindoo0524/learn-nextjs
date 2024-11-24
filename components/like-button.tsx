"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/(tweet)/tweets/[id]/actions";

export default function LikeButton({
  tweetId,
  isLiked,
  likesCount,
}: {
  tweetId: number;
  isLiked: boolean;
  likesCount: number;
}) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likesCount },
    (previousState) => ({
      isLiked: !previousState.isLiked,
      likesCount: previousState.isLiked
        ? previousState.likesCount - 2
        : previousState.likesCount + 2,
    })
  );

  const handleLikeAction = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(tweetId);
    } else {
      await likePost(tweetId);
    }
  };

  return (
    <form action={handleLikeAction}>
      <button className="flex items-center gap-1.5 group">
        {state.isLiked ? (
          <HeartIconSolid className="w-6 h-6 text-red-500" />
        ) : (
          <HeartIcon className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors" />
        )}
        <span
          className={`font-medium ${
            state.isLiked
              ? "text-red-500"
              : "text-gray-500 group-hover:text-red-500"
          }`}
        >
          {state.likesCount.toLocaleString()}
        </span>
      </button>
    </form>
  );
}
