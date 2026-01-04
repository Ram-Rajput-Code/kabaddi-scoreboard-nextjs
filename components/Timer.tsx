

"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [initialMinutes, setInitialMinutes] = useState(7);
  // This state holds the actual remaining seconds
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [gamePeriod, setGamePeriod] = useState("1st Half");

  const beepRef = useRef(null);

  // 1. Setup Audio
  useEffect(() => {
    beepRef.current = new Audio("/temple-bell.mp3");
    beepRef.current.load();
  }, []);

  // 2. Sync timeLeft ONLY when the user changes the "initialMinutes" setting
  // We check !isRunning to ensure it doesn't snap back while the clock is ticking
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(initialMinutes * 60);
    }
  }, [initialMinutes]); 

  // 3. CORE TIMER LOGIC
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          // Stop at zero
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          
          const nextTime = prev - 1;

          // 🔔 Beep Logic (Final 60 seconds)
          if (nextTime < 60 && beepRef.current) {
            beepRef.current.currentTime = 0;
            beepRef.current.play().catch(() => {});
          }

          return nextTime;
        });
      }, 1000);
    }

    // Cleanup interval on pause or unmount
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]); // ONLY restart the effect if isRunning changes

  // Handlers
  const startTimer = () => {
    setIsRunning(true);
    // Unlock audio for browser
    if (beepRef.current) {
      beepRef.current.play().then(() => {
        beepRef.current.pause();
      }).catch(() => {});
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    // Reset to the current set "initialMinutes" instead of hardcoded 7
    setInitialMinutes(7)
    setTimeLeft(initialMinutes * 60);
  };

  const handleTimerIncrease = () => {
    if (!isRunning) setInitialMinutes((prev) => prev + 1);
  };

  const handleTimerDecrease = () => {
    if (!isRunning && initialMinutes > 1) {
      setInitialMinutes((prev) => prev - 1);
    }
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const isDangerTime = timeLeft <= 59 && isRunning;

  return (
    <div className="flex justify-center items-center gap-6 text-white border-b border-b-gray-400 p-2">
      <input
        value={gamePeriod}
        onChange={(e) => setGamePeriod(e.target.value)}
        className="text-right text-6xl w-60 px-1 bg-transparent outline-none border-none focus:ring-0"
      />

      <div className="flex flex-col items-center text-xs">
        <ChevronUp
          className={isRunning ? "opacity-20 cursor-not-allowed" : "cursor-pointer hover:text-green-400"}
          onClick={handleTimerIncrease}
        />
        <span className="text-sm font-mono">{initialMinutes} min</span>
        <ChevronDown
          className={isRunning ? "opacity-20 cursor-not-allowed" : "cursor-pointer hover:text-red-400"}
          onClick={handleTimerDecrease}
        />
      </div>

      <h2
        className={`text-9xl font-bold text-center transition-all tabular-nums
          ${isDangerTime ? "text-red-600 animate-pulse" : "text-white"}
        `}
      >
        {formatTime(timeLeft)}
      </h2>

      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold min-w-[100px]"
          >
            START
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-bold min-w-[100px]"
          >
            PAUSE
          </button>
        )}

        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold"
        >
          RESET
        </button>
      </div>
    </div>
  );
}