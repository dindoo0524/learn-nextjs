import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <div className="py-10 fixed bg-gradient-to-b from-yellow-400 via-yellow-600 to-yellow-800 w-full">
            <Link className="ml-20 cursor-pointer" href="/">
              GO TO ALL MEMBERS
            </Link>
            <h2 className="text-center text-5xl">
              <span className="text-gray-900">WE ARE</span> BILLIONAIRES 💰
            </h2>
          </div>

          <div className="pt-20">
            <section className="bg-slate-600 p-10 mx-20 my-52">
              {children}
            </section>
          </div>
        </div>
      </body>
    </html>
  );
}
