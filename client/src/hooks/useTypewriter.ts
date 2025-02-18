import { useState, useEffect } from "react";

const phrases = [
  "I need a new website for my business...",
  "Looking for SEO optimization services...",
  "Need help with digital marketing...",
  "Want to redesign my existing website...",
];

export function useTypewriter() {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [currentPhraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhraseIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentPhrase.length < phrase.length) {
          setCurrentPhrase(phrase.slice(0, currentPhrase.length + 1));
        } else {
          setIsDeleting(true);
          setTimeout(() => {}, 1000); // Pause at the end
        }
      } else {
        if (currentPhrase.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        } else {
          setCurrentPhrase(currentPhrase.slice(0, -1));
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timer);
  }, [currentPhrase, currentPhraseIndex, isDeleting]);

  return currentPhrase;
}
