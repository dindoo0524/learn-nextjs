import { formatToTimeAgo } from "@/lib/utils";
import { FaceSmileIcon } from "@heroicons/react/24/outline";

interface ListResponseProps {
  response: string;
  created_at: Date;
  updated_at: Date;
  id: number;
  user: {
    username: string;
    email: string | null;
  };
}

export default function ListResponse({
  response,
  created_at,
  user,
}: ListResponseProps) {
  return (
    <div className="flex gap-5 p-4  transition-colors border-b border-gray-700 last:border-b-0">
      {/* 왼쪽 트윗 아이콘 */}
      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center shadow-sm">
        <span className="text-2xl">🕊️</span>
      </div>

      {/* 오른쪽 컨텐츠 영역 */}
      <div className="flex flex-col flex-1 gap-2">
        {/* 트윗 내용 */}
        <p className="text-base text-blue-900 line-clamp-3 hover:line-clamp-none transition-all">
          {response}
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

        <div className="flex items-center gap-6 text-sm">
          <span className="text-sm text-black ml-auto">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
      </div>
    </div>
  );
}
