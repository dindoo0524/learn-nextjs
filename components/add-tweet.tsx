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
      className="p-5 flex flex-col gap-5 bg-blue-100 mb-10 rounded-lg"
    >
      오늘 무슨 일이 있었나요? 오늘의 Tweet을 남겨주세요.
      <FormInput
        name="tweet"
        required
        placeholder="Tweet"
        type="text"
        errors={state?.errors?.tweet ?? []}
      />
      <Button text="등록" />
    </form>
  );
}
