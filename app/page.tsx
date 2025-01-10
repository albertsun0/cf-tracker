'use server'
import Form from "@/components/Form";
import {cookies} from 'next/headers';
import Username from "@/components/Username";


export default async function Home() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('userName')
  
  if (!hasCookie){
    return(
      <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-4xl font-bold mt-8 mb-4">Set Username</h1>
      <Username />
    </main>
    );
  } else{
    const userName = cookieStore.get('userName')
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-4xl font-bold mt-8 mb-4">Codeforces Ladder</h1>
      <Form />
    </main>
  );
}