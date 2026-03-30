import { useState, useEffect } from "react";
import { musicApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Library as LibraryIcon, Disc3, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayer } from "@/contexts/PlayerContext";

export default function Library() {
  const { user } = useAuth();
  const { play, setQueue } = usePlayer();
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      if (!user?._id) return;
      try {
        const res = await musicApi.getAlbumsByArtist(user._id);
        setAlbums(res.data.albums || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load library");
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, [user]);

  const playAlbum = (album: any) => {
    if (!album.music || album.music.length === 0) return;
    setQueue(album.music);
    play(album.music[0]);
  };

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <LibraryIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Your Library</h1>
            <p className="text-muted-foreground mt-1">
              {user?.role === "artist" ? "Albums you've created" : "Your collection"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive">{error}</div>
        ) : albums.length === 0 ? (
          <div className="text-center py-20">
            <Disc3 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Your library is empty</p>
            {user?.role === "artist" && (
              <p className="text-muted-foreground text-sm mt-1">Go to Create Album to make your first one!</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {albums.map((album) => {
              const trackCount = album.music?.length || 0;
              const hue = (album.title.charCodeAt(0) * 45) % 360;
              return (
                <motion.div
                  key={album._id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-card hover:bg-surface-hover transition-colors rounded-xl p-4 cursor-pointer group"
                  onClick={() => playAlbum(album)}
                >
                  <div 
                    className="w-full aspect-square rounded-md mb-4 shadow-lg flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, hsl(${hue} 40% 40%), hsl(${(hue + 60) % 360} 30% 20%))` }}
                  >
                    <Disc3 className="w-12 h-12 text-foreground/40 group-hover:scale-110 transition-transform duration-300" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground truncate">{album.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Album • {trackCount} track{trackCount !== 1 ? 's' : ''}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
