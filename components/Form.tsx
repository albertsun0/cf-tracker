'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import { completion } from "@/components/ladderTypes";
import Ladder from "../components/Ladder";

function Form() {
    const [completed, changeCompleted] = useState<completion[]>([])
    const [name, setName] = useState<string>("");

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        if (name === "") return;
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
        changeCompleted(current)
        setName("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <input
                type="text"
                id="new-todo-input"
                placeholder="Enter Username"
                className="border border-gray-300 p-2 rounded w-full mb-2 text-black max-w-md"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-md">
                Search User
            </button>

            <main className="flex min-h-screen justify-center py-16">
            <div className="max-w-4xl space-y-8">
                <h1 className="text-4xl font-bold">Room</h1>
                    <Ladder completed={completed} />
            </div>
        </main>
        </form>
    );
}
export default Form;