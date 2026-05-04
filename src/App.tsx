import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Home } from './components/Home';
import { RadioLevel } from './components/RadioLevel';
import { RadioLofi } from './components/RadioLofi';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'radio-level' | 'radio-lofi'>('home');

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-white/20 flex flex-col">
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <Home key="home" onSelect={setCurrentPage} />}
          {currentPage === 'radio-level' && <RadioLevel key="radio-level" onBack={() => setCurrentPage('home')} />}
          {currentPage === 'radio-lofi' && <RadioLofi key="radio-lofi" onBack={() => setCurrentPage('home')} />}
        </AnimatePresence>
      </div>
      {(currentPage === 'radio-level' || currentPage === 'radio-lofi') && (
        <footer className="py-6 px-4 text-center border-t border-white/5 bg-black/50 text-zinc-500 text-sm mt-auto max-w-7xl mx-auto w-full">
          <p className="mb-1">All rights belong to their respective owners.</p>
          <p>Content is streamed via official platforms (YouTube, Spotify, Apple Music).</p>
        </footer>
      )}
    </div>
  );
}
