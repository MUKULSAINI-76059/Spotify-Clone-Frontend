import { useState, useEffect, useMemo } from "react";
import { musicApi } from "@/lib/api";
import Layout from "@/components/Layout";
import SongCard from "@/components/SongCard";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";

interface Song {
  _id: string;
  title: string;
  uri: string;
  artist: { _id: string; username: string; email: string } | string;
}

export default function Search() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { setQueue } = usePlayer();

  useEffect(() => {
    musicApi.getAllSongs().then(res => {
      const data = res.data.music || [];
      setSongs(data);
      setQueue(data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [setQueue]);

  const filtered = useMemo(() => {
    if (!query.trim()) return songs;
    const q = query.toLowerCase();
    return songs.filter(s => {
      const artist = typeof s.artist === "string" ? s.artist : s.artist?.username || "";
      return s.title.toLowerCase().includes(q) || artist.toLowerCase().includes(q);
    });
  }, [songs, query]);

  return (
    <Layout>
      <div className="p-6 md:p-8">
        <div className="relative max-w-lg mb-8">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs or artists..."
            className="w-full h-12 rounded-full bg-card border border-border pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((s, i) => <SongCard key={s._id} song={s} index={i} />)}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No results found</p>
        )}
      </div>
    </Layout>
  );
}
