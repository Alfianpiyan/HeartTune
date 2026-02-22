import { useState, useRef, useEffect } from "react";

export function useAudioPlayer() {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
    }

    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentId(null);
    };

    const handleError = () => {
      console.error("Audio Error Detail:", audio.error);
      setIsPlaying(false);
      setCurrentId(null);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // --- FUNGSI STOP BARU ---
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset durasi ke awal
    }
    setIsPlaying(false);
    setCurrentId(null);
  };

  const toggle = async (url: string, id: string) => {
    if (!audioRef.current || !url) return;

    if (currentId === id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      if (currentId !== id) {
        audioRef.current.pause();
        audioRef.current.src = url;
        audioRef.current.load();
      }

      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        setCurrentId(id);
      }
    } catch (err) {
      console.error("Gagal memutar audio:", err);
      setIsPlaying(false);
    }
  };

  // Pastikan 'stop' dimasukkan ke return object di bawah ini
  return { toggle, stop, isPlaying, currentId, };
}