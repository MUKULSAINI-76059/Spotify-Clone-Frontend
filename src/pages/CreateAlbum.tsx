import { useState, useEffect } from "react";
import { musicApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Plus, Disc3, Loader2, CheckCircle, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function CreateAlbum() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        const res = await musicApi.getAllSongs();
        const data = res.data.music || [];
        // Filter songs where the artist is the current user
        const artistSongs = data.filter((song: any) => {
          const artistId = typeof song.artist === "string" ? song.artist : song.artist?._id;
          return artistId === user?._id;
        });
        setAllSongs(artistSongs);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load your tracks");
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) {
      fetchArtistSongs();
    }
  }, [user]);

  const toggleSongSelection = (id: string) => {
    setSelectedSongs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || selectedSongs.length === 0) {
      setError("Please provide a title and select at least one track.");
      return;
    }
    setSubmitting(true);
    setError("");
    setSuccess(false);
    try {
      await musicApi.createAlbum({ title, music: selectedSongs });
      setSuccess(true);
      setTitle("");
      setSelectedSongs([]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Creation failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">Create Album</h1>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border space-y-6">
          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 bg-primary/10 text-primary text-sm px-4 py-2.5 rounded-lg">
              <CheckCircle className="w-4 h-4" /> Album created successfully!
            </motion.div>
          )}
          {error && <div className="bg-destructive/10 text-destructive text-sm px-4 py-2.5 rounded-lg">{error}</div>}

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Album Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full h-11 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="My brilliant album"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 flex items-center justify-between">
              <span>Select Tracks for Album</span>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">{selectedSongs.length} selected</span>
            </label>
            
            <div className="bg-secondary/50 rounded-xl border border-border max-h-80 overflow-y-auto p-2">
              {loading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : allSongs.length === 0 ? (
                <div className="text-center py-10">
                  <Music className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">You haven't uploaded any tracks yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {allSongs.map((song) => {
                    const isSelected = selectedSongs.includes(song._id);
                    return (
                      <div
                        key={song._id}
                        onClick={() => toggleSongSelection(song._id)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/20 text-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                        </div>
                        <div className="w-10 h-10 rounded bg-card flex items-center justify-center shrink-0">
                          <Disc3 className="w-5 h-5 opacity-50" />
                        </div>
                        <span className="font-medium truncate flex-1">{song.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || selectedSongs.length === 0 || !title}
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Create Album
          </button>
        </form>
      </div>
    </Layout>
  );
}
