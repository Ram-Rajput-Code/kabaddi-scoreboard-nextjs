// "use client";

// import { useState, useEffect, useRef } from "react";
// import { BellRing, Megaphone, Pause, Play, RotateCcw } from "lucide-react";

// export default function ThirtySecondTimer() {
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [isRunning, setIsRunning] = useState(false);
  
//   const intervalRef = useRef(null);
//   const beepRef = useRef(null);
//   const bellRef = useRef(null);
//   // New Refs for manual sounds
//   const manualBellRef = useRef(null);
//   const whistleRef = useRef(null);

//   // Initialize audio on mount
//   useEffect(() => {
//     beepRef.current = new Audio("/beep.mp3");
//     bellRef.current = new Audio("/whistle.mp3");
//     // Initialize manual sound files
//     manualBellRef.current = new Audio("/bell.mp3"); 
//     whistleRef.current = new Audio("/whistle.mp3");   //manual megaphone click  
//   }, []);

// //   useEffect(() => {
// //     if (isRunning && timeLeft > 0) {
// //       intervalRef.current = setInterval(() => {
// //         setTimeLeft((prev) => {
// //           const nextValue = prev - 1;

// //           // Yellow Blinking Beep logic (10 to 0)
// //           if (nextValue <= 10 && nextValue >= 0) {
// //             if (beepRef.current) {
// //               beepRef.current.currentTime = 0;
// //               beepRef.current.play().catch(() => {});
// //             }
// //           }

// //           return nextValue;
// //         });
// //       }, 1000);
// //     } else if (timeLeft === 0) {
// //       setIsRunning(false);
// //       clearInterval(intervalRef.current);
// //     }

// //     return () => clearInterval(intervalRef.current);
// //   }, [isRunning, timeLeft]);

//   // Manual Sound Triggers
  
//   // Timer Logic
//   useEffect(() => {
//     if (isRunning && timeLeft > 0) {
//       intervalRef.current = setInterval(() => {
//         setTimeLeft((prev) => {
//           const nextValue = prev - 1;
//           if (nextValue <= 10 && nextValue >= 0 && beepRef.current) {
//             beepRef.current.currentTime = 0;
//             beepRef.current.play().catch(() => {});
//           }
//           return nextValue;
//         });
//       }, 1000);
//     } else if (timeLeft === 0) {
//       setIsRunning(false);
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     }
//     return () => clearInterval(intervalRef.current);
//   }, [isRunning, timeLeft]);
  
//   const playManualBell = () => {
//     if (manualBellRef.current) {
//       manualBellRef.current.currentTime = 0;
//       manualBellRef.current.play().catch(e => console.error("Bell error:", e));
//     }
//   };
//   const playWhistle = () => {
//     if (whistleRef.current) {
//       whistleRef.current.currentTime = 0;
//       whistleRef.current.play().catch(e => console.error("Whistle error:", e));
//     }
//   };

//   const toggleTimer = () => {
//     if (!isRunning) {
//       // Starting for the first time or resuming
//       if (timeLeft === 30 && bellRef.current) {
//         bellRef.current.play().catch(() => {});
//       }
//       setIsRunning(true);
//     } else {
//       setIsRunning(false);
//     }
//   };

//   const resetTimer = () => {
//     setIsRunning(false);
//     setTimeLeft(30);
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   // Condition for Yellow Blinking
//   const isWarningZone = timeLeft <= 10 && timeLeft > 0 && isRunning;

//   return (
//     <div className="flex flex-col items-center justify-center  rounded-2xl  w-full max-w-md mx-auto ">
//       <div className="flex flex-col items-center gap-4">
        
//         {/* Timer Display */}
//         <div 
//           className={`text-7xl  transition-all duration-300 bg-gray-700 p-4 rounded-full ${
//             isWarningZone 
//               ? "text-yellow-400 animate-pulse scale-110" 
//               : "text-white"
//           }`}
//         >
//          {timeLeft}
//         </div>

//         {/* Controls */}
//         <div className="flex gap-4">
//             <button 
//             onClick={playManualBell}
//             className="cursor-pointer p-2 rounded-full bg-gray-500 hover:bg-gray-600">
//             <BellRing />
//             </button>
//             <button 
//             onClick={playWhistle}
//             className="cursor-pointer p-2 rounded-full bg-gray-500 hover:bg-gray-600">
//             <Megaphone />
//             </button>
//           <button
//             onClick={toggleTimer}
//             disabled={timeLeft === 0}
//             className={`flex items-center p-2 rounded-full transition-all cursor-pointer ${
//               isRunning 
//                 ? "bg-gray-500 hover:bg-gray-600 text-white" 
//                 : "bg-blue-600 hover:bg-blue-500 text-white "
//             } disabled:opacity-50 disabled:cursor-not-allowed`}
//           >
//             {isRunning ? <><Pause /></> : (
//               <>
//                 <Play /> 
//               </>
//             )}
//           </button>

//           <button
//             onClick={resetTimer}
//             className="cursor-pointer p-2 bg-gray-500 hover:bg-red-900/40 hover:text-red-400  rounded-full transition-all"
//             aria-label="Reset"
//           >
//             <RotateCcw size={24} />
//           </button>
//         </div>

//       </div>
      
      
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { BellRing, Megaphone, Pause, Play, RotateCcw } from "lucide-react";

export default function ThirtySecondTimer() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  
  const intervalRef = useRef(null);
  const beepRef = useRef(null);
  const startBellRef = useRef(null); // Dedicated for timer start
  const manualBellRef = useRef(null); // Dedicated for button click
  const whistleRef = useRef(null);

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
      clearInterval(intervalRef.current);
      if (timeLeft === 0) setIsRunning(false);
    }
    
    return () => clearInterval(intervalRef.current);
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
    <div className="flex flex-col items-center justify-center rounded-2xl w-full max-w-md mx-auto">
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
      </div>
    </div>
  );
}