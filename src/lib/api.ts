import axios from "axios";

// Change this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:2545";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // for cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth APIs
export const authApi = {
  register: (data: { username: string; email: string; password: string; role: string }) =>
    api.post("/api/auth/register", data),

  login: (data: { email?: string; username?: string; password: string }) =>
    api.post("/api/auth/login", data),

  logout: () => api.post("/api/auth/logout"),
};

// Music APIs
export const musicApi = {
  getAllSongs: () => api.get("/api/music/"),

  listenSong: (id: string) => api.get(`/api/music/listen/${id}`),

  uploadMusic: (title: string, file: File) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("music", file);
    return api.post("/api/music/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getAlbumsByArtist: (artistId: string) => api.get(`/api/music/de/${artistId}`),

  createAlbum: (data: { title: string; music: string[] }) =>
    api.post("/api/music/album", data),
};

export default api;
