"use client";

import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Mic } from "lucide-react";

interface MicButtonProps {
  onTranscriptChange: (text: string) => void;
}

export default function MicButton({ onTranscriptChange }: MicButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Run only on client
  }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript) {
      onTranscriptChange(transcript);
      resetTranscript();
    }
  }, [listening, transcript, onTranscriptChange, resetTranscript]);

  if (!isClient || !browserSupportsSpeechRecognition) {
    return null; // avoid hydration mismatch
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (listening) {
          SpeechRecognition.stopListening();
        } else {
          SpeechRecognition.startListening({ continuous: false });
        }
      }}
      className={`mr-2 p-2 rounded-full transition-colors cursor-pointer`}
    >
      <Mic
        className={`${
          listening ? "text-green-500" : "text-gray-600"
        } hover:scale-105 transition-all ease-in-out`}
        strokeWidth={2.5}
        size={26}
      />
    </button>
  );
}

// ${
//     listening ? "bg-red-500 text-white" : "bg-gray-200 text-black"
//      }
