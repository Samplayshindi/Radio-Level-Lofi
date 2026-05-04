import React, { useState } from "react";
import { motion } from "motion/react";
import { Headphones, Radio } from "lucide-react";

export function Home({ onSelect }: { onSelect: (page: 'radio-level' | 'radio-lofi') => void, key?: React.Key }) {
  const [hovered, setHovered] = useState<'left' | 'right' | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col md:flex-row h-screen w-full"
    >
      {/* Center Text Badge */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-xl px-6 md:px-10 py-3 md:py-4 rounded-full border border-white/10 shadow-2xl flex items-center justify-center">
          <h2 className="text-lg md:text-2xl font-bold tracking-tight text-white whitespace-nowrap drop-shadow-md">
            What are you looking for?
          </h2>
        </div>
      </div>

      {/* Left Panel */}
      <motion.div 
        className="flex-1 relative cursor-pointer overflow-hidden bg-[#0A0A0A] flex flex-col justify-center items-center p-8 group border-b md:border-b-0 md:border-r border-white/5"
        onMouseEnter={() => setHovered('left')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => onSelect('radio-level')}
        animate={{ flex: hovered === 'left' ? 1.4 : hovered === 'right' ? 0.6 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
         <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black opacity-30 group-hover:opacity-80 transition-opacity duration-700" />
         
         <div className="relative z-10 text-center transform group-hover:scale-105 transition-transform duration-500">
           <Radio className="w-12 h-12 md:w-16 md:h-16 mb-6 mx-auto text-zinc-500 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
           <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-md">Radio Level Lo-Fi</h1>
           <p className="text-lg md:text-xl text-zinc-400 font-medium tracking-wide">Remixes • Slowed + Reverb</p>
         </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div 
        className="flex-1 relative cursor-pointer overflow-hidden bg-[#050505] flex flex-col justify-center items-center p-8 group"
        onMouseEnter={() => setHovered('right')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => onSelect('radio-lofi')}
        animate={{ flex: hovered === 'right' ? 1.4 : hovered === 'left' ? 0.6 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
         <div className="absolute inset-0 bg-gradient-to-bl from-zinc-900 to-black opacity-30 group-hover:opacity-80 transition-opacity duration-700" />
         
         <div className="relative z-10 text-center transform group-hover:scale-105 transition-transform duration-500">
           <Headphones className="w-12 h-12 md:w-16 md:h-16 mb-6 mx-auto text-zinc-500 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
           <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-md">Radio Lo-Fi</h1>
           <p className="text-lg md:text-xl text-zinc-400 font-medium tracking-wide">Original Music</p>
         </div>
      </motion.div>
    </motion.div>
  );
}
