import AddTweet from "@/components/add-tweet";
import TweetList from "@/components/tweet-list";
import { PAGE_SIZE } from "@/lib/constants";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
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
    },
    take: PAGE_SIZE,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <div className="p-10">
      <AddTweet />
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
