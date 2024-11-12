import Link from "next/link";

export default async function Products() {
  return (
    <div className="p-10">
      <h2 className="text-2xl">Products 🧚 🍎 🍏</h2>
      <ul className="*:p-10 *:bg-gray-300 *:m-2">
        <li>Product 1 🍎</li>
        <li>Product 2 🍏</li>
        <li>Product 3 🍎</li>
      </ul>
      <h2 className="text-xl text-center my-10">You are logged in! 🎉</h2>
      <Link
        className="primary-btn flex h-10 items-center justify-center gap-2"
        href="/profile"
      >
        Go to Profile
      </Link>
    </div>
  );
}
