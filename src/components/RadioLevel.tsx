/// <reference types="vite/client" />
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";

// Use real data exactly as requested from user
const CHANNEL_ID = "UCMmGRhAb0RRmHjD1B11hT6w";

export function RadioLevel({ onBack }: { onBack: () => void, key?: React.Key }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [embedErrors, setEmbedErrors] = useState<Record<string, boolean>>({});
  const initialFetchDone = useRef(false);

  useEffect(() => {
    async function fetchVideos() {
      if (initialFetchDone.current) return;
      initialFetchDone.current = true;
      try {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        if (!apiKey) {
          console.error("YouTube API Key is missing");
          setError(true);
          return;
        }
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=8&type=video`);
        const data = await res.json();
        if (data.items) {
          setVideos(data.items.filter((item: any) => item.id?.videoId));
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto"
    >
      <button onClick={onBack} className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors mb-12 group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Home</span>
      </button>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight drop-shadow-sm">Radio Level Lo-Fi</h1>
        <p className="text-xl text-zinc-400 mb-6">Punjabi Remixes • Slowed + Reverb • Jukebox</p>
        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 max-w-3xl">
          <p className="text-sm leading-relaxed text-zinc-400">
            <strong className="text-zinc-300">Disclaimer:</strong> All visual and audio content belongs to their respective original creators. This site does not own, host, or distribute any music. Videos are embedded securely via YouTube's official player.
          </p>
        </div>
      </header>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-zinc-900/50 rounded-xl aspect-video w-full border border-zinc-800" />
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl">
          <p>Failed to load latest uploads. Please try again later.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id.videoId} className="flex flex-col group">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-zinc-900/80 ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-300 shadow-xl shadow-black/40">
                {embedErrors[video.id.videoId] ? (
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 group/fallback"
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${video.id.videoId}/hqdefault.jpg`}
                      alt={video.snippet.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px] transition-all duration-500 group-hover/fallback:opacity-30 group-hover/fallback:scale-105"
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="bg-red-600 rounded-full text-white p-3 mb-3 shadow-lg shadow-red-500/20 group-hover/fallback:bg-red-500 transition-colors">
                        <PlayCircle className="w-8 h-8" fill="currentColor" strokeWidth={1} />
                      </div>
                      <span className="text-white font-medium bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md text-sm border border-white/10">Watch on YouTube</span>
                    </div>
                  </a>
                ) : (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id.videoId}?rel=0&origin=${origin}`}
                    title={video.snippet.title}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    onError={() => setEmbedErrors(prev => ({ ...prev, [video.id.videoId]: true }))}
                  />
                )}
              </div>
              <h3 className="font-medium text-zinc-200 line-clamp-2 leading-relaxed group-hover:text-white transition-colors mb-3">
                {video.snippet.title}
              </h3>
              <a 
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider self-start"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Watch on YouTube</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
