"use client";

import ListResponse from "./list-response";
import AddResponse from "./add-response";
import { useOptimistic, startTransition } from "react";
import { createResponse } from "@/app/(tweet)/tweets/[id]/actions";

type ResponseType = {
  user: {
    username: string;
    email: string | null;
  };
  id: number;
  created_at: Date;
  updated_at: Date;
  response: string;
  tweet_id: number;
};

type UserType = {
  id: number;
  username: string;
  email: string | null;
};

interface ResponseListProps {
  allResponses: ResponseType[];
  tweetId: number;
  me: UserType | null;
}

export default function ResponseList({
  allResponses,
  tweetId,
  me,
}: ResponseListProps) {
  const [optimisticResponses, addOptimisticResponse] = useOptimistic(
    allResponses,
    (state: ResponseType[], newResponse: ResponseType) => {
      return [newResponse, ...state];
    }
  );

  const handleSubmit = async (response: string) => {
    if (!me) return;
    startTransition(() => {
      addOptimisticResponse({
        id: Math.random(),
        response,
        tweet_id: tweetId,
        user: {
          username: me.username,
          email: me.email,
        },
        created_at: new Date(),
        updated_at: new Date(),
      });
    });

    await createResponse(response, tweetId);
  };

  return (
    <div>
      <AddResponse tweetId={tweetId} handleSubmit={handleSubmit} />

      <div className="p-3 flex flex-col gap-3 border border-gray-200 rounded-lg">
        <div className="flex flex-col gap-3">
          {optimisticResponses.map((response) => (
            <ListResponse key={response.id} {...response} />
          ))}
        </div>
      </div>
    </div>
  );
}
