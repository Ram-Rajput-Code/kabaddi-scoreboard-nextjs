"use client";
import { useState } from "react";
import ScoreBoard from "@/components/ScoreBoard";

export default function Home() {
  const [editable, setEditable] = useState(false);
  const [code, setCode] = useState("");

  async function validateCode() {
    const res = await fetch("/api/code/validate", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    if (res.ok) setEditable(true);
    else alert("Invalid or expired code");
  }

  async function startMatch() {
    const res = await fetch("/api/code/generate", { method: "POST" });
    const data = await res.json();
    alert(`Share this code with admin: ${data.code}`);
  }

  return (
    <div className="p-6">
      {/* <h1 className="text-xs font-bold">Kabaddi Scoreboard</h1> */}
<div className="flex gap-2">
      <button onClick={startMatch} className="btn text-xs bg-green-800 px-1 rounded-md">
        Start Match
      </button>

      <input
        placeholder="Enter access code"
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 text-xs"
      />

      <button className="text-xs  bg-blue-800 px-1 rounded-md" onClick={validateCode}>Validate Code</button>
      </div>
      <ScoreBoard editable={editable} />
    </div>
  );
}
