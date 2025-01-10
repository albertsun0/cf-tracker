'use server'
import Form from "@/components/Form";
import {cookies} from 'next/headers';
import { redirect } from 'next/navigation';
import { use } from "react";


export default async function Home() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('userName')

  if (!hasCookie){
    redirect("/login")
  }
  const userName = cookieStore.get('userName')?.value || '';

  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-4xl font-bold mt-8 mb-4">Codeforces Ladder</h1>
      <h2 className="text-2xl font-bold mb-4">Welcome {userName}</h2>
      <Form />
    </main>
  );
}