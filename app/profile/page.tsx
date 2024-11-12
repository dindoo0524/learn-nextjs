import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="p-10">
      <h1 className="text-6xl text-center">Profile🧚</h1>
      <h1 className="text-xl my-5">Welcome! {user?.username}!</h1>
      <div className="bg-blue-200 p-10 rounded-lg">
        <p>Your ID: {user?.id}</p>
        <p>Your Email: {user?.email}</p>
        <p>Created At: {user?.created_at.toLocaleDateString("ko")}</p>
      </div>
      <div>
        <Link
          href="/products"
          className="primary-btn flex h-10 items-center justify-center gap-2 mt-5"
        >
          Go to Market Products
        </Link>
      </div>
      <h3 className="text-center my-5">Are you want to log out? 👇</h3>
      <form action={logOut} className="flex justify-center mt-4">
        <button className="px-10 py-4 bg-blue-400 rounded-lg">Log out</button>
      </form>
    </div>
  );
}
