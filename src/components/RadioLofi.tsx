import React from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

// Use real data exactly as provided
const spotifyTracks = [
  "https://open.spotify.com/track/42dJYld6hF2bftwo75llsY",
  "https://open.spotify.com/track/1bxn4j4lLsMUFQsPRYw0ZM"
];

const appleTracks = [
  "https://music.apple.com/us/song/coffee-vinyl/1884141297",
  "https://music.apple.com/us/song/echo-rain/1842445489"
];

export function RadioLofi({ onBack }: { onBack: () => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto"
    >
      <button onClick={onBack} className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors mb-12 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </button>

      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight drop-shadow-sm">Radio Lo-Fi</h1>
        <p className="text-xl text-zinc-400">Original Tracks • Chill Vibes</p>
      </header>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-3 text-zinc-200">
            <span className="w-8 h-[2px] bg-[#1DB954] rounded-full" />
            <span>Spotify</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spotifyTracks.map((link, i) => (
              <div key={i} className="bg-zinc-900/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-2xl shadow-black/50">
                <iframe
                  src={link.replace("open.spotify.com/track", "open.spotify.com/embed/track")}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl bg-zinc-950"
                  style={{ border: "none" }}
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-3 text-zinc-200">
            <span className="w-8 h-[2px] bg-[#FA243C] rounded-full" />
            <span>Apple Music</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appleTracks.map((link, i) => (
              <div key={i} className="bg-zinc-900/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors shadow-2xl shadow-black/50">
                <iframe
                  src={link.replace("music.apple.com", "embed.music.apple.com")}
                  width="100%"
                  height="175"
                  frameBorder="0"
                  allow="autoplay *; encrypted-media *; fullscreen *"
                  loading="lazy"
                  className="rounded-xl bg-zinc-950 shadow-inner"
                  style={{ border: "none" }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
