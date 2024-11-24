import { formatToTimeAgo } from "@/lib/utils";
import {
  FaceSmileIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
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
  _count: {
    likes: number;
    comments: number;
  };
}

export default function ListTweet({
  tweet,
  created_at,
  id,
  user,
  _count: { likes, comments },
}: ListTweetProps) {
  return (
    <Link
      href={`/tweets/${id}`}
      className="flex gap-5 p-4 hover:bg-blue-100 transition-colors border-b border-gray-700 last:border-b-0"
    >
      {/* 왼쪽 트윗 아이콘 */}
      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center shadow-sm">
        <span className="text-2xl">🕊️</span>
      </div>

      {/* 오른쪽 컨텐츠 영역 */}
      <div className="flex flex-col flex-1 gap-2">
        {/* 트윗 내용 */}
        <p className="text-base text-blue-900 line-clamp-3 hover:line-clamp-none transition-all">
          {tweet}
        </p>

        {/* 유저 정보 */}
        <div className="flex items-center gap-2 text-sm">
          <FaceSmileIcon className="w-4 h-4 text-black" />
          <span className="font-semibold text-gray-700">{user.username}</span>
          {user.email && (
            <>
              <span className="text-blue-300">•</span>
              <span className="text-blue-500">{user.email}</span>
            </>
          )}
        </div>

        {/* 인터랙션 정보 */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5 group">
            <HeartIcon className="w-5 h-5 text-black group-hover:text-red-500 transition-colors" />
            <span className="font-medium text-black group-hover:text-red-500 transition-colors">
              {likes.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 group">
            <ChatBubbleOvalLeftIcon className="w-5 h-5 text-black group-hover:text-blue-500 transition-colors" />
            <span className="font-medium text-black group-hover:text-blue-500 transition-colors">
              {comments.toLocaleString()}
            </span>
          </div>

          {/* 작성 시간 */}
          <span className="text-sm text-black ml-auto">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
      </div>
    </Link>
  );
}
