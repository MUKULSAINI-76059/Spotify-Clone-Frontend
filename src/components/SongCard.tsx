import { Play, Pause } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { motion } from "framer-motion";

interface Song {
  _id: string;
  title: string;
  uri: string;
  artist: { _id: string; username: string; email: string } | string;
}

export default function SongCard({ song, index }: { song: Song; index: number }) {
  const { currentSong, isPlaying, play, togglePlay } = usePlayer();
  const isActive = currentSong?._id === song._id;
  const artistName = typeof song.artist === "string" ? song.artist : song.artist?.username || "Unknown";

  // Generate a hue from the song title for visual variety
  const hue = (song.title.charCodeAt(0) * 37 + (song.title.charCodeAt(1) || 0) * 13) % 360;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative rounded-xl p-4 transition-all cursor-pointer ${
        isActive ? "bg-secondary ring-1 ring-primary/30" : "bg-card hover:bg-surface-hover"
      }`}
      onClick={() => (isActive ? togglePlay() : play(song))}
    >
      {/* Cover placeholder */}
      <div
        className="aspect-square rounded-lg mb-3 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, hsl(${hue} 50% 25%), hsl(${(hue + 40) % 360} 40% 15%))` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        <span className="text-3xl font-display font-bold text-foreground/40 select-none">
          {song.title.charAt(0).toUpperCase()}
        </span>

        {/* Play overlay */}
        <div className={`absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg transition-all ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        }`}>
          {isActive && isPlaying ? (
            <Pause className="w-4 h-4 text-primary-foreground" />
          ) : (
            <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
          )}
        </div>
      </div>

      <p className="text-sm font-semibold text-foreground truncate">{song.title}</p>
      <p className="text-xs text-muted-foreground truncate mt-0.5">{artistName}</p>
    </motion.div>
  );
}
