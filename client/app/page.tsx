"use client";

import { useRouter } from "next/navigation";


export default function Home() {
   
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold animate-in fade-in zoom-in transition-colors duration-300 hover:text-yellow-400">
        Tailwind v4 is locked and loaded ✅
      </h1>
      <p className="mt-4 text-lg text-gray-300 transition-colors duration-300 hover:text-blue-400">
        Reporting for duty, Commander Deepak.
      </p>
      <button className="absolute top-4 right-4 px-4 py-2  bg-gray-700 text-white rounded hover:bg-blue-300 transition-colors duration-300 hover:text-amber-700"
      onClick={()=>router.push('/login')}>Login</button>
    </main>
  );
}



