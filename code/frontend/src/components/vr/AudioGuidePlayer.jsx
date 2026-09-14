import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

export default function AudioGuidePlayer({ text, isPlaying, onTogglePlay }) {
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    if (!synthRef.current) return;

    const updateVoices = () => {
      setVoicesLoaded(true);
    };

    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = updateVoices;
    }
    updateVoices();

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Handle Play/Pause change
  useEffect(() => {
    if (!synthRef.current || !text) return;

    if (isPlaying) {
      synthRef.current.cancel(); // Reset any existing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // Clear and measured pace for tour guide
      utterance.pitch = 1.0;

      // Select a natural sounding English voice if available
      const voices = synthRef.current.getVoices();
      const preferredVoice = voices.find(
        (v) => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('English')) && v.lang.startsWith('en')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        onTogglePlay(false);
      };

      utterance.onerror = () => {
        onTogglePlay(false);
      };

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } else {
      synthRef.current.cancel();
    }
  }, [isPlaying, text]);

  return null; // Renders silently; controlled via FloatingVRMenu
}
