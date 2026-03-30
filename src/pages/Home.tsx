import { useEffect, useState } from "react";
import { musicApi } from "@/lib/api";
import { usePlayer } from "@/contexts/PlayerContext";
import { useAuth } from "@/contexts/AuthContext";
import SongCard from "@/components/SongCard";
import Layout from "@/components/Layout";
import { Music, TrendingUp, Disc3, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Song {
  _id: string;
  title: string;
  uri: string;
  artist: { _id: string; username: string; email: string } | string;
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setQueue } = usePlayer();
  const { user } = useAuth();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await musicApi.getAllSongs();
        const data = res.data.music || [];
        setSongs(data);
        setQueue(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load songs");
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [setQueue]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Layout>
      <div className="p-6 md:p-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {greeting()}{user ? `, ${user.username}` : ""}
          </h1>
          <p className="text-muted-foreground mt-1">Discover your next favorite track</p>
        </motion.div>

        {/* Quick picks */}
        {songs.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-display font-semibold text-foreground">Quick Picks</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {songs.slice(0, 6).map((song) => {
                const artistName = typeof song.artist === "string" ? song.artist : song.artist?.username || "Unknown";
                const hue = (song.title.charCodeAt(0) * 37) % 360;
                return (
                  <QuickPickCard key={song._id} song={song} artistName={artistName} hue={hue} />
                );
              })}
            </div>
          </section>
        )}

        {/* All songs */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Disc3 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-display font-semibold text-foreground">All Tracks</h2>
            <span className="text-xs text-muted-foreground ml-1">({songs.length})</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive">{error}</p>
            </div>
          ) : songs.length === 0 ? (
            <div className="text-center py-20">
              <Music className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No tracks yet</p>
              <p className="text-muted-foreground text-sm mt-1">Be the first artist to upload!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {songs.map((song, i) => (
                <SongCard key={song._id} song={song} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

function QuickPickCard({ song, artistName, hue }: { song: any; artistName: string; hue: number }) {
  const { currentSong, isPlaying, play, togglePlay } = usePlayer();
  const isActive = currentSong?._id === song._id;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => (isActive ? togglePlay() : play(song))}
      className={`flex items-center gap-3 rounded-lg p-2 pr-4 transition-colors text-left ${
        isActive ? "bg-primary/15" : "bg-card hover:bg-surface-hover"
      }`}
    >
      <div
        className="w-12 h-12 rounded-md flex items-center justify-center shrink-0"
        style={{ background: `linear-gradient(135deg, hsl(${hue} 50% 30%), hsl(${(hue + 50) % 360} 40% 18%))` }}
      >
        <span className="text-lg font-bold text-foreground/50">{song.title.charAt(0).toUpperCase()}</span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{song.title}</p>
        <p className="text-xs text-muted-foreground truncate">{artistName}</p>
      </div>
    </motion.button>
  );
}
