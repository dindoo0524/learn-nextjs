"use client";

import Button from "@/components/button";
import FormInput from "./form-input";

interface AddResponseProps {
  tweetId: number;
  handleSubmit: (response: string, tweetId: number) => Promise<void>;
}

export default function AddResponse({
  tweetId,
  handleSubmit,
}: AddResponseProps) {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleSubmit(formData.get("response")?.toString() || "", tweetId);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 flex flex-col gap-3 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">💬</span>
        <h2 className="text-md font-medium text-gray-800">댓글 작성하기</h2>
      </div>

      <div className="space-y-2">
        <FormInput
          name="response"
          required
          placeholder="댓글을 입력해주세요..."
          type="text"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          // errors={state?.errors?.response ?? []}
          errors={[]}
        />
      </div>

      <div className="flex justify-end">
        <Button
          text="댓글 작성"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        />
      </div>
    </form>
  );
}
