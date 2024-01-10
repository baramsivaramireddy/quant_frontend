import Link from "next/link";
export default function Home() {
  return (
    <main className="flex h-full">
      <div className="w-1/2 h-full hidden md:block">{/* logo */}</div>

      <div className="w-1/2 h-full flex justify-center items-center">
        <div className=" w-24 bg-gradient-to-r from-purple-500 via-red-500 to-yellow-300 hover:underline px-4 py-1 r text-white rounded-full font-semibold">
          <Link href={"/signup"}> Sign up</Link>
        </div>
      </div>
    </main>
  );
}
