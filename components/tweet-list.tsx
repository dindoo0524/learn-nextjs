"use client";

import { InitialTweets } from "@/app/(tweet)/page";
import ListTweet from "./list-tweet";
import { useState } from "react";
import { getMoreTweets } from "@/app/(tweet)/actions";
import { PAGE_SIZE } from "@/lib/constants";
interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  const onLoadMoreClick = async (direction: "prev" | "next") => {
    setIsLoading(true);

    const newPage = direction === "prev" ? page - 1 : page + 1;

    const newTweets = await getMoreTweets(newPage);
    if (newTweets.length !== 0) {
      setPage(newPage);
      setTweets(newTweets);
      setIsFirstPage(newPage === 0);
      setIsLastPage(false); // 새로운 트윗이 있으면 마지막 페이지가 아님
    }
    if (newTweets.length < PAGE_SIZE) setIsLastPage(true); // 새로운 트윗의 수가 페이지 크기보다 작으면 마지막 페이지로 설정
    setIsLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5 border-2 border-gray-300 rounded-lg">
      <div className="flex flex-col gap-5">
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>

      <div className="flex justify-center">
        {!isFirstPage && (
          <button
            onClick={() => onLoadMoreClick("prev")}
            disabled={isLoading}
            className="text-sm text-white font-semibold bg-blue-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
          >
            {isLoading ? "로딩 중" : "이전"}
          </button>
        )}

        {!isLastPage && (
          <button
            onClick={() => onLoadMoreClick("next")}
            disabled={isLoading}
            className="text-sm text-white font-semibold bg-blue-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
          >
            {isLoading ? "로딩 중" : "다음"}
          </button>
        )}
      </div>
    </div>
  );
}
