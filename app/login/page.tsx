"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { handleForm } from "./actions";
import {
  EnvelopeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action] = useActionState(handleForm, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="w-[500px] flex flex-col text-center">
        <h1 className="flex justify-center">
          <FireIcon className="h-10 w-10 text-red-500" aria-hidden="true" />
        </h1>
        <p>Hello Login World!</p>
        <div className="mt-10">
          <form action={action} className="flex flex-col gap-3">
            <FormInput
              name="email"
              type="email"
              placeholder="Email"
              required
              errors={[]}
              icon={<EnvelopeIcon />}
            />
            <FormInput
              name="name"
              type="text"
              placeholder="Username"
              required
              errors={[]}
              icon={<UserIcon />}
            />
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              required
              errors={state?.errors ?? []}
              icon={<KeyIcon />}
            />
            <FormButton text="Log in" />
            {state?.result && (
              <div className="p-4 bg-green-500 rounded-md">Welcome Back!</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
