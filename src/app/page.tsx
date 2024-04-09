import Image from "next/image";
import Link from "next/link";
import logo from '../Logo.png';

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-white text-center">
      <Image src={logo} width={300} height={300} alt="Madison Timeline Logo" priority />
      
      <h2 className="mt-12 mb-16 text-4xl font-bold" style={{ fontFamily: '"Sansita Swashed", cursive' }}>
        Welcome to Madison Timeline
      </h2>
      
      <div className="mb-16 flex flex-col items-center space-y-1">
        <Link href="/login" passHref className="flex justify-center items-center w-80 h-14 bg-[#D80100] text-white font-bold rounded-3xl">
            LOGIN
        </Link>

        <Link href="/boards" passHref className="flex justify-center items-center w-80 h-14 bg-[#D9D9D9] text-black font-bold rounded-3xl">
            START AS GUEST
        </Link>
      </div>
    </main>
  );
}
