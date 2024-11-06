"use server";

interface FormState {
  result?: boolean;
  errors?: string[];
}

export async function handleForm(
  prevState: FormState | null,
  formData: FormData
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const password = formData.get("password");
  if (password === "12345") {
    return {
      result: true,
    };
  } else {
    return {
      result: false,
      errors: ["wrong password"],
    };
  }
}
