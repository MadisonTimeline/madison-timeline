import Image from "next/image";
import Navbar from "@/components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome to Madison Timeline</h1>
      <Link href="/boards" className="text-3xl font-bold border b-5 p-2 bg-[#ccc]"> Get Started </Link>
    </main>
  );
}
