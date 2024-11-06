"use server";

export async function handleForm(prevState: any, formData: FormData) {
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
