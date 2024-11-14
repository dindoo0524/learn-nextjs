"use server";

import { z } from "zod";

const formSchema = z.object({
  // 조건: email 은 @zod.com 으로 끝나야 합니다.
  email: z
    .string()
    .email()
    .refine(
      (email) => email.endsWith("@zod.com"),
      "Only @zod.com emails are allowed."
    ),
  name: z.string().min(5, "Username should be at least 5 characters long."),
  // 조건: 전화번호는 반드시 1개 이상의 숫자를 포함해야 한다.
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .refine(
      (password) => password.match(/\d/),
      "Password should contain at least one number (0123456789)"
    ),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      result: false,
      errors: result.error.flatten().fieldErrors,
    };
  } else {
    return {
      result: true,
    };
  }
}
