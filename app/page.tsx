import Image from "next/image";

import Form from "@/components/Form";

export default async function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-4xl font-bold mt-8 mb-4">Codeforces Ladder</h1>
      <Form />
    </main>
  );
}
