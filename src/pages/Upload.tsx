import { useState, useRef } from "react";
import { musicApi } from "@/lib/api";
import Layout from "@/components/Layout";
import { Upload as UploadIcon, Music, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await musicApi.uploadMusic(title, file);
      setSuccess(true);
      setTitle("");
      setFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">Upload Music</h1>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 border border-border space-y-5">
          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 bg-primary/10 text-primary text-sm px-4 py-2.5 rounded-lg">
              <CheckCircle className="w-4 h-4" /> Track uploaded successfully!
            </motion.div>
          )}
          {error && <div className="bg-destructive/10 text-destructive text-sm px-4 py-2.5 rounded-lg">{error}</div>}

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Track Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full h-11 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="My awesome track"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Audio File</label>
            <input ref={inputRef} type="file" accept="audio/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-full h-32 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            >
              {file ? (
                <>
                  <Music className="w-8 h-8 text-primary" />
                  <span className="text-sm font-medium text-foreground">{file.name}</span>
                  <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                </>
              ) : (
                <>
                  <UploadIcon className="w-8 h-8" />
                  <span className="text-sm">Click to select audio file</span>
                </>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !file || !title}
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadIcon className="w-4 h-4" />}
            Upload Track
          </button>
        </form>
      </div>
    </Layout>
  );
}
