"use client";

import { useState, useEffect, useCallback } from "react";

export function useTypingEffect(
  texts: string[],
  typeSpeed: number = 80,
  deleteSpeed: number = 40,
  pauseDuration: number = 2500
): string {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentText = texts[textIndex];
    if (!isDeleting) {
      if (charIndex < currentText.length) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      if (charIndex > 0) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [textIndex, charIndex, isDeleting, texts, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deleteSpeed, typeSpeed]);

  return displayText;
}
