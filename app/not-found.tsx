import Link from "next/link";
import { Arvo } from "next/font/google";

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arvo",
});

export default function NotFound() {
  return (
    <section className={`min-h-screen bg-white py-10 ${arvo.className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl text-center">
            <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] h-[400px] bg-center bg-no-repeat w-full">
              <h1 className="text-[80px] font-bold text-center text-black">
                404
              </h1>
            </div>

            <div className="-mt-12 space-y-4">
              <h3 className="text-4xl font-bold text-black">
                Look like you&apos;re lost
              </h3>

              <p className="text-lg text-gray-600">
                the page you are looking for not avaible!
              </p>

              <Link
                href="/"
                className="inline-block px-8 py-3 bg-[#39ac31] text-white rounded hover:bg-[#2d8a26] transition-colors font-medium"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
