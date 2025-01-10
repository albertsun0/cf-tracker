// 'use server'
// import {cookies} from 'next/headers';
// import { redirect } from 'next/navigation'


// export default async function Page({
//     searchParams,
// }: {
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }) {
//     const userName = (await searchParams).userName as string;
//     const cookieStore = await cookies()
//     cookieStore.set('userName', userName)
//     redirect("/")
// }
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/login/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName }),
    });

    router.push('/');
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-4xl font-bold mt-8 mb-4">Login Page</h1>
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <input
            type="text"
            id="new-todo-input"
            placeholder="Enter Username"
            className="border border-gray-300 p-2 rounded w-full mb-2 text-black max-w-md"
            name="text"
            autoComplete="off"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-md">
                Set Username
        </button>
      </form>
    </main>
  );
}
