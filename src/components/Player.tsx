import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { motion } from "framer-motion";

function formatTime(s: number) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function Player() {
  const { currentSong, isPlaying, togglePlay, progress, duration, volume, setVolume, seek, next, prev } = usePlayer();

  if (!currentSong) return null;

  const artistName = typeof currentSong.artist === "string" ? currentSong.artist : currentSong.artist?.username || "Unknown";

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-20 glass border-t border-border/50 z-50 flex items-center px-4 md:px-6 gap-4"
    >
      {/* Song info */}
      <div className="flex items-center gap-3 w-1/4 min-w-0">
        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
          <div className="w-6 h-6 rounded-full bg-primary/30 animate-pulse-glow" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{currentSong.title}</p>
          <p className="text-xs text-muted-foreground truncate">{artistName}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-1 max-w-lg">
        <div className="flex items-center gap-4">
          <button onClick={prev} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-background" />
            ) : (
              <Play className="w-4 h-4 text-background ml-0.5" />
            )}
          </button>
          <button onClick={next} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-10 text-right">{formatTime(progress)}</span>
          <div className="flex-1 h-1 bg-secondary rounded-full cursor-pointer group relative" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            seek(pct * duration);
          }}>
            <div
              className="h-full bg-foreground rounded-full group-hover:bg-primary transition-colors relative"
              style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden md:flex items-center gap-2 w-1/4 justify-end">
        <button onClick={() => setVolume(volume > 0 ? 0 : 0.7)} className="text-muted-foreground hover:text-foreground transition-colors">
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <div className="w-24 h-1 bg-secondary rounded-full cursor-pointer group" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setVolume(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
        }}>
          <div className="h-full bg-foreground rounded-full group-hover:bg-primary transition-colors" style={{ width: `${volume * 100}%` }} />
        </div>
      </div>
    </motion.div>
  );
}
