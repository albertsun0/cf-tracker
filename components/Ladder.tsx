import React from "react";

import ladders from "./ladders.json";
import { completion } from "./ladderTypes";

type ladderPopps = {
  completed: completion[];
};

function Ladder({ completed }: ladderPopps) {
  return (
    <div className="flex flex-col">
      <table className="table-autoborder-gray-900 border border-gray-500/40 text-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className=" px-4 py-2">ID</th>
            <th className=" px-4 py-2">Problem</th>
            <th className=" px-4 py-2">Name</th>
            <th className=" px-4 py-2">Level</th>
            <th className=" px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {ladders[0].problems.map((problem) => {
            let problem_id = problem.idContest + problem.indexProblem;
            let status =
              completed.find((x) => x.id === problem_id)?.status || "-";
            return (
              <tr
                key={problem.id}
                className={`${
                  status === "OK"
                    ? "bg-green-800/60"
                    : status == "-"
                    ? ""
                    : "bg-red-400/20"
                } border border-gray-500/40 [&>*]:p-4 hover:bg-gray-700/60`}
              >
                <td>{problem.id}</td>
                <td>{problem_id}</td>
                <td>
                  <a href={`${problem.url}`} target="_blank">
                    {problem.name}
                  </a>
                </td>
                <td>{problem.level}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Ladder;
