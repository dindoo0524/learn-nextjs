import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  created_at: Date;
  updated_at: Date;
  id: number;
  user: {
    username: string;
    email: string | null;
  };
}

export default function ListTweet({
  tweet,
  created_at,
  updated_at,
  id,
  user,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="relative w-28 rounded-md overflow-hidden bg-yellow-200 flex items-center justify-center">
        TWEET 🕊️
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-lg py-4">{tweet}</span>
        <p className="text-black">
          작성한 유저 정보 : {user.username} / {user.email}
        </p>
        <span className="text-sm text-neutral-200">
          {formatToTimeAgo(updated_at.toString())}
        </span>
        <span className="text-sm text-neutral-500">
          {created_at.toString()}
        </span>
      </div>
    </Link>
  );
}
