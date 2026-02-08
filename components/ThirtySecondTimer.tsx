
"use client";

import { useState, useEffect, useRef } from "react";
import { BellRing, Megaphone, Pause, Play, RotateCcw } from "lucide-react";
import TextToSpeech from "./TextToSpeech";

export default function ThirtySecondTimer() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const beepRef = useRef<HTMLAudioElement | null>(null);
const startBellRef = useRef<HTMLAudioElement | null>(null);
const manualBellRef = useRef<HTMLAudioElement | null>(null);
const whistleRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Initialize all audio objects
    beepRef.current = new Audio("/beep.mp3");
    startBellRef.current = new Audio("/whistle.mp3"); // Start sound
    manualBellRef.current = new Audio("/schoolbell.mp3");   // Manual bell
    whistleRef.current = new Audio("/whistle.mp3");  // Manual whistle

    // 2. Preload sounds to prevent delay on first click
    [beepRef, startBellRef, manualBellRef, whistleRef].forEach(ref => {
      if (ref.current) ref.current.load();
    });
  }, []);

  // Timer Logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const nextValue = prev - 1;
          
          // Yellow Blinking Beep (10 down to 1)
          if (nextValue < 10 && nextValue >= 0 && beepRef.current) {
            beepRef.current.currentTime = 0;
            beepRef.current.play().catch(() => {});
          }
          
          return nextValue;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeLeft === 0) setIsRunning(false);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);
  
  // Handlers for Manual Buttons
  const playManualBell = () => {
    if (manualBellRef.current) {
      manualBellRef.current.pause(); // Stop if already playing
      manualBellRef.current.currentTime = 0; // Reset to start
      manualBellRef.current.play().catch(e => console.error("Bell sound failed:", e));
    }
  };

  const playWhistle = () => {
    if (whistleRef.current) {
      whistleRef.current.pause();
      whistleRef.current.currentTime = 0;
      whistleRef.current.play().catch(e => console.error("Whistle sound failed:", e));
    }
  };

  const toggleTimer = () => {
    if (!isRunning) {
      // Play start sound only if starting from the beginning
      if (timeLeft === 30 && startBellRef.current) {
        startBellRef.current.currentTime = 0;
        startBellRef.current.play().catch(() => {});
      }
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(30);
  };

  const isWarningZone = timeLeft <= 10 && timeLeft > 0 && isRunning;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl w-full  mx-auto">
      <div className="flex flex-col items-center gap-4">
        
        {/* Timer Display */}
        <div 
          className={`text-7xl transition-all duration-300 bg-gray-700 p-4 px-8 rounded-full tabular-nums ${
            isWarningZone ? "text-yellow-400 animate-pulse scale-110" : "text-white"
          }`}
        >
         {timeLeft}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button 
            onClick={playManualBell}
            className="cursor-pointer p-3 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors"
          >
            <BellRing size={24} />
          </button>

          <button 
            onClick={playWhistle}
            className="cursor-pointer p-3 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors"
          >
            <Megaphone size={24} />
          </button>

          <button
            onClick={toggleTimer}
            disabled={timeLeft === 0}
            className={`flex items-center p-3 rounded-full transition-all cursor-pointer ${
              isRunning ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-500"
            } text-white disabled:opacity-50`}
          >
            {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>

          <button
            onClick={resetTimer}
            className="cursor-pointer p-3 bg-gray-500 hover:bg-red-600 text-white rounded-full transition-all"
          >
            <RotateCcw size={24} />
          </button>
        </div>
          <TextToSpeech/>
      </div>
    </div>
  );
}