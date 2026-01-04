"use client";
import { useState } from "react";

export default function ScoreBoard({ editable }: { editable: boolean }) {
  const [teamA, setTeamA] = useState(0);
  const [teamB, setTeamB] = useState(0);

  async function saveScore() {
    await fetch("/api/score", {
      method: "POST",
      body: JSON.stringify({ teamA, teamB }),
    });
  }

  return (
    <div className="mt-6 flex justify-center">
        <div className="">
      <h1 className="text-2xl mb-2 text-center">First Half</h1>

      <div className="flex gap-24 text-9xl">
        <div>
          Team A: {teamA}
          <span className="flex items-center justify-center gap-4 text-center">
          {editable && <button onClick={() => setTeamA(teamA + 1)}>+</button>}
          {editable && <button onClick={() => setTeamA(teamA - 1)}>-</button>}
          </span>
        </div>

        <div>
          Team B: {teamB}
          <span className="flex items-center justify-center gap-4 text-center">
          {editable && <button onClick={() => setTeamB(teamB + 1)}>+</button>}
          {editable && <button onClick={() => setTeamB(teamB - 1)}>-</button>}
          </span>
        </div>
      </div>

      {editable && <button onClick={saveScore}>Save</button>}
      </div>
    </div>
  );
}
