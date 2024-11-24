"use client";

import { addTweet } from "@/actions/add-tweet";
import Button from "@/components/button";
import { useActionState } from "react";
import FormInput from "./form-input";

export default function AddTweet() {
  const [state, action] = useActionState(addTweet, null);

  return (
    <form
      action={action}
      className="p-6 flex flex-col gap-5 bg-white border border-gray-100 shadow-sm mb-10 rounded-xl hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">✏️</span>
        <h2 className="text-lg font-medium text-gray-800">
          오늘 무슨 일이 있었나요?
        </h2>
      </div>

      <div className="space-y-2">
        <FormInput
          name="tweet"
          required
          placeholder="여러분의 이야기를 들려주세요..."
          type="text"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          errors={state?.errors?.tweet ?? []}
        />
      </div>

      <div className="flex justify-end">
        <Button
          text="트윗 작성하기"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        />
      </div>
    </form>
  );
}
