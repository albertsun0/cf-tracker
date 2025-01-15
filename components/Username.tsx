'use client'
import { completion } from "@/components/ladderTypes";
import Ladder from "../components/Ladder";


async function Username(name: string) {
    let data = await fetch(
                `https://codeforces.com/api/user.status?handle=${name}`
              );
    let problems = await data.json();
    let current: completion[] = problems.result.map((problem: any) => {
        return {
                id: problem.problem.contestId + problem.problem.index,
                status: problem.verdict,
                runtime: problem.timeConsumedMillis,
        };
        });

    return (
        <Ladder completed={current} />
    );
}
export default Username;