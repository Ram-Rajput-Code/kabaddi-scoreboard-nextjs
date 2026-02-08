"use client";
import { CirclePlay, Minus, Plus } from "lucide-react";
import { useState } from "react";
import Timer from "./Timer";
import ThirtySecondTimer from "./ThirtySecondTimer";

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
    <div className="mt-2 flex justify-center">
        <div className="">
          <div className="">
            <Timer/>
      </div>
      <div className="flex gap-4 text-9xl items-center border-b border-b-gray-400 mb-2">
        <div>
          <input
          placeholder="Team-A"
          className="max-w-170 text-center"
          />
          <span className="flex  items-center justify-center gap-4 text-center text-[200px] font-bold">
           {teamA}
          <span className="flex flex-col">

          {editable && <Plus size={68} className="hover:bg-gray-700 p-1 rounded-full cursor-pointer" onClick={() => setTeamA(teamA + 1)}/>}
          {editable && <Minus size={68} className="hover:bg-gray-700 p-1 rounded-full cursor-pointer" onClick={() => setTeamA(teamA - 1)}/>}
          </span>
          </span>
        </div>
<span className="text-4xl">
 v/s
  
  </span>
        <div>
        <input
          placeholder="Team-B"
          className="max-w-170 text-center"
          />
         <span className="flex  items-center justify-center gap-4 text-center text-[200px] font-bold">
           {teamB}
          <span className="flex flex-col">

          {editable && <Plus size={68} className="hover:bg-gray-700 p-1 rounded-full cursor-pointer" onClick={() => setTeamB(teamB + 1)}/>}
          {editable && <Minus size={68} className="hover:bg-gray-700 p-1 rounded-full cursor-pointer" onClick={() => setTeamB(teamB - 1)}/>}
          </span>
          </span>
        </div>
      </div>
      <div className="text-6xl">
{editable &&(
      <ThirtySecondTimer/>
    )}
      </div>

      {editable && <button onClick={saveScore}>Save</button>}
      </div>
    </div>
  );
}
