import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  created_at: Date;
  updated_at: Date;
  id: number;
}

export default function ListTweet({
  tweet,
  created_at,
  updated_at,
  id,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden bg-yellow-200 flex items-center justify-center">
        TWEET 🕊️
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(updated_at.toString())}
        </span>
        <span className="text-sm text-neutral-500">
          {created_at.toString()}
        </span>
      </div>
    </Link>
  );
}
