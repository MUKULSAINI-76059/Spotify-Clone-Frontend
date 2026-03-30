import React, { createContext, useContext, useState, useRef, useCallback, ReactNode, useEffect } from "react";

interface Song {
  _id: string;
  title: string;
  uri: string;
  artist: { _id: string; username: string; email: string } | string;
}

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  queue: Song[];
  play: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  seek: (t: number) => void;
  next: () => void;
  prev: () => void;
  setQueue: (songs: Song[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [queue, setQueue] = useState<Song[]>([]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.7;
    }
    const audio = audioRef.current;
    const onTime = () => setProgress(audio.currentTime);
    const onDuration = () => setDuration(audio.duration);
    const onEnded = () => { setIsPlaying(false); next(); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onDuration);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const play = useCallback((song: Song) => {
    const audio = audioRef.current!;
    if (currentSong?._id !== song._id) {
      audio.src = song.uri;
      setCurrentSong(song);
    }
    audio.play();
    setIsPlaying(true);
  }, [currentSong]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current!;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const setVolume = useCallback((v: number) => {
    audioRef.current!.volume = v;
    setVolumeState(v);
  }, []);

  const seek = useCallback((t: number) => {
    audioRef.current!.currentTime = t;
    setProgress(t);
  }, []);

  const next = useCallback(() => {
    if (!currentSong || queue.length === 0) return;
    const idx = queue.findIndex(s => s._id === currentSong._id);
    const nextSong = queue[(idx + 1) % queue.length];
    if (nextSong) play(nextSong);
  }, [currentSong, queue, play]);

  const prev = useCallback(() => {
    if (!currentSong || queue.length === 0) return;
    const idx = queue.findIndex(s => s._id === currentSong._id);
    const prevSong = queue[(idx - 1 + queue.length) % queue.length];
    if (prevSong) play(prevSong);
  }, [currentSong, queue, play]);

  return (
    <PlayerContext.Provider value={{ currentSong, isPlaying, progress, duration, volume, queue, play, togglePlay, setVolume, seek, next, prev, setQueue }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
