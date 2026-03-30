import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import { usePlayer } from "@/contexts/PlayerContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { currentSong } = usePlayer();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className={`flex-1 overflow-y-auto scrollbar-hide ${currentSong ? "pb-24" : ""}`}>
        {children}
      </main>
      <Player />
    </div>
  );
}
