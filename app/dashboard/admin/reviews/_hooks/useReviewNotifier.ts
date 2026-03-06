"use client";

import { useRef } from "react";

export function useReviewNotifier() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playNewReviewSound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/review-notification.mp3");
        audioRef.current.volume = 0.35;
      }

      audioRef.current.currentTime = 0;
      void audioRef.current.play();
    } catch {
      // ignorăm dacă browserul blochează autoplay
    }
  };

  return { playNewReviewSound };
}