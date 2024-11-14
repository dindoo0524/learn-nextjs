import db from "@/lib/db";
// import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
// import Link from "next/link";
import { notFound } from "next/navigation";

// async function getIsOwner(userId: number) {
//   const session = await getSession();
//   if (session.id) {
//     return session.id === userId;
//   }
//   return false;
// }

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
  // const isOwner = await getIsOwner(tweet.user.id);
  return (
    <div className="p-10">
      <Link className="p-4" href="/">
        👈 Go Back to Tweet List
      </Link>
      <div className="p-5 flex items-center gap-3">
        <div>
          <h3 className="text-3xl">
            <b>👩🏻‍🌾 Writer Username:</b> {tweet.user.username}
          </h3>
        </div>
      </div>
      <div className="p-5 bg-blue-200 rounded-lg">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold">👇Tweet Content</h1>
          <p className="text-3xl text-white">{tweet.tweet}</p>
        </div>
        <p className="text-lg">[Details]</p>
        <p>
          <b>Tweet Id:</b> {tweet.id}
        </p>
        <p>
          <b>Tweet CreatedAt Relative Time:</b>
          {formatToTimeAgo(tweet.created_at.toString())}
        </p>
        <p>
          <b> Tweet CreatedAt Absolute Time:</b> {tweet.created_at.toString()}
        </p>
      </div>
      {/* <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        {isOwner ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete tweet
          </button>
        ) : null}
        <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={``}
        >
          채팅하기
        </Link>
      </div> */}
    </div>
  );
}
