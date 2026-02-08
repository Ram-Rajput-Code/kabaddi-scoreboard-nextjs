
"use client";

import { useState, useEffect } from "react";
import { Play, Square } from "lucide-react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  // 1. Define your preset messages
  const presets = [
    { label: "स्वागत", message: "कबड्डी मुकाबले में आपका हार्दिक स्वागत है. मैच जल्द ही शुरू होने वाला है. सभी दर्शकों से निवेदन है कि कृपया अपने-अपने निर्धारित स्थान पर बैठ जाएँ" },
    { label: "पहला हाफ समाप्त", message: "पहला हाफ समाप्त" },
    { label: "दूसरा हाफ शुरू", message: "दूसरा हाफ शुरू" },
    { label: "5 मिनट शेष", message: "अंतिम 5 मिनट शेष" },
    { label: "2 मिनट शेष", message: "अंतिम 2 मिनट शेष" },
    { label: "1 मिनट शेष", message: "अंतिम 1 मिनट शेष" },
    { label: "आख़िरी रेड", message: "आख़िरी रेड" },
    { label: "मैच समाप्त, बधाई", message: "मैच समाप्त। विजेता टीम को बधाई। खिलाड़ियों ने शानदार खेल दिखाया। दर्शकों का धन्यवाद।" },
    { label: "1 पॉइंट", message: "सफल रेड, Team को मिला 1 पॉइंट।" },
    { label: "2 पॉइंट", message: "सफल रेड, Team को मिला 2 पॉइंट।" },
    { label: "3 पॉइंट", message: "सफल रेड, Team को मिला 3 पॉइंट।" },
    { label: "रेडर आउट", message: "शानदार टैकल, Raider आउट!" },
    { label: "1 बोनस ", message: "1 बोनस पॉइंट मिला!" },
    { label: "2 बोनस ", message: "2 बोनस पॉइंट मिला!" },
    { label: "3 बोनस ", message: "3 बोनस पॉइंट मिला!" },
    { label: "बोनस + 1", message: "बोनस + 1 पॉइंट मिला!" },
    { label: "बोनस + 2", message: "बोनस + 2 पॉइंट मिला!" },
    // { label: "Timeout", message: "Official timeout taken." },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // 2. Helper function to play specific text
  const speakText = (content: string) => {
    if (!synth || !content) return;

    synth.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = "hi-IN"; // Change to "hi-IN" for Hindi

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  const handlePlay = () => speakText(text);

  const handleStop = () => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  // 3. Play preset and update textarea
  const playPreset = (message: string) => {
    // setText(message); // Update the box so the user sees what is being said
    speakText(message);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-zinc-900 rounded-xl border border-zinc-700 w-full mx-auto">
      <div className="flex text-sm items-center gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here..."
          className="w-full h-12 p-2 bg-zinc-800 text-white rounded-lg border border-zinc-600 outline-none resize-none"
        />

        <div className="flex gap-2">
          {!isSpeaking ? (
            <button
              onClick={handlePlay}
              disabled={!text}
              className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all disabled:opacity-50"
            >
              <Play size={20} fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all"
            >
              <Square size={20} fill="currentColor" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Map through presets to create buttons */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => playPreset(preset.message)}
            className="px-3 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-md border border-zinc-600 transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}