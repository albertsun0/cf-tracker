import React from "react";
import Ladder from "@/components/Ladder";
import { completion } from "@/components/ladderTypes";

async function page() {
  let data = await fetch(
    "https://codeforces.com/api/user.status?handle=albertsun0"
  );

  let problems = await data.json();

  let completed: completion[] = problems.result.map((problem: any) => {
    return {
      id: problem.problem.contestId + problem.problem.index,
      status: problem.verdict,
      runtime: problem.timeConsumedMillis,
    };
  });

  console.log(completed);

  return (
    <main className="flex min-h-screen justify-center py-16">
      <div className="max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold">Room</h1>
        <Ladder completed={completed} />
      </div>
    </main>
  );
}

export default page;
