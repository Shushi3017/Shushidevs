'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Eye, 
  ExternalLink, 
  Sparkles, 
  Share2, 
  Check, 
  ChevronRight,
  Code2,
  Users,
  Terminal,
  ShieldCheck,
  Laptop,
  Info
} from 'lucide-react';

const DISCORD_USER_ID = '952890022976176159';
const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
 
function useDiscordAvatar(userId: string) {
  const [avatarUrl, setAvatarUrl] = useState<string>(FALLBACK_AVATAR);
 
  useEffect(() => {
    let isMounted = true;
 
    fetch(`https://api.lanyard.rest/v1/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data?.success && data.data?.discord_user?.avatar) {
          const { id, avatar } = data.data.discord_user;
          const ext = avatar.startsWith("a_") ? "gif" : "png";
          setAvatarUrl(`https://cdn.discordapp.com/avatars/${id}/${avatar}.${ext}?size=512`);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch Discord avatar:", err);
      });
 
    return () => {
      isMounted = false;
    };
  }, [userId]);
 
  return avatarUrl;
}

function useDiscordStatus(userId: string) {
  const [isCoding, setIsCoding] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const checkStatus = () => {
      fetch(`https://api.lanyard.rest/v1/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          if (data?.success && Array.isArray(data.data?.activities)) {
            const codingActivity = data.data.activities.find(
              (act: { name?: string; application_id?: string }) => 
                act.name === "Visual Studio Code" ||
                act.name === "Coding" ||
                act.application_id === "383226320970055681"
            );
            setIsCoding(!!codingActivity);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch Discord status:", err);
        });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [userId]);

  return isCoding;
}

export default function App() {
  const [copied, setCopied] = useState<boolean>(false);
  const [views, setViews] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('links');
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const avatarUrl = useDiscordAvatar(DISCORD_USER_ID);
  const isCoding = useDiscordStatus(DISCORD_USER_ID);

  useEffect(() => {
    const timer = setTimeout(() => setViews((prev: number) => prev + 1), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center bg-[#000000] text-white overflow-hidden p-4 font-sans selection:bg-yellow-400 selection:text-black"
    >
      <div 
        className="absolute pointer-events-none w-[550px] h-[550px] bg-gradient-to-r from-yellow-500/15 via-amber-500/10 to-yellow-600/5 rounded-full blur-[140px] transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />

      <motion.div 
        animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-yellow-500/20 via-amber-600/15 to-black rounded-full blur-[150px] pointer-events-none" 
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(45)].map((_, i) => {
          const size = Math.random() * 2.5 + 1;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-yellow-300 shadow-[0_0_12px_#facc15]"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.15, 1, 0.15],
                scale: [0.8, 1.4, 0.8],
                y: [0, -45, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          );
        })}
      </div>

      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
        style={{ maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 60%, transparent 100%)' }}
      />

      <motion.main 
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-zinc-950/85 backdrop-blur-2xl border border-yellow-500/20 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_25px_rgba(234,179,8,0.1)] overflow-hidden"
      >
        <div className="h-32 w-full bg-gradient-to-r from-yellow-500/35 via-amber-600/30 to-zinc-950 relative border-b border-yellow-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/40 to-zinc-950" />
          
          <div className="absolute top-4 right-4 flex items-center justify-between text-xs font-medium">
            <motion.button 
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-2 rounded-full bg-black/70 border border-yellow-500/30 backdrop-blur-md text-yellow-300 hover:text-white shadow-lg cursor-pointer"
              title="Share profile"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </motion.button>
          </div>
        </div>

        <div className="px-6 pb-8 -mt-16 flex flex-col items-center text-center relative z-10">
          
          <div className="relative group cursor-pointer mb-3">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 opacity-90 blur-lg" 
            />
            
            <motion.div 
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.3 }}
              className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-yellow-400/60 bg-zinc-950 p-1 shadow-2xl"
            >
              <img
                src={avatarUrl}
                alt="shinitchi profile"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>

            <div className="absolute bottom-1 right-1 p-1 bg-yellow-400 border-2 border-zinc-950 rounded-full shadow-lg text-black" title="Verified">
              <ShieldCheck className="w-3.5 h-3.5 fill-black text-yellow-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-yellow-400 drop-shadow-[0_2px_10px_rgba(234,179,8,0.4)]">
              Shinitchi
            </h1>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-bounce" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-950/60 border border-yellow-500/40 text-yellow-300 text-xs font-semibold shadow-[0_0_12px_rgba(234,179,8,0.25)]">
              <Code2 className="w-3.5 h-3.5 text-yellow-400" />
              <span>Developer</span>
              <span className="flex h-2 w-2 relative">
                {isCoding && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isCoding ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} title={isCoding ? "Currently Coding" : "Not Coding"} />
              </span>
            </div>
          </div>

          <div className="relative w-full grid grid-cols-3 gap-1 p-1 bg-black/60 rounded-2xl border border-yellow-500/20 mb-6 text-xs font-medium backdrop-blur-md">
            {['links', 'family', 'about'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-2 rounded-xl transition-colors z-10 capitalize cursor-pointer ${
                  activeTab === tab ? 'text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 border border-yellow-300 rounded-xl -z-10 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="w-full overflow-hidden">
            <AnimatePresence mode="wait">
              
              {activeTab === 'links' && (
                <motion.div
                  key="links"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full flex flex-col gap-3"
                >
                  <motion.a
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-yellow-500/50 hover:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] hover:from-yellow-500/20 hover:via-amber-500/10 hover:to-transparent transition-all shadow-lg overflow-hidden"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="text-left">
                        <div className="text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors">
                          Instagram
                        </div>
                        <div className="text-xs text-zinc-500">Follow me on Instagram</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <InstagramIcon className="w-4 h-4 text-yellow-400 mr-2 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-yellow-500/50 hover:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] hover:from-yellow-500/20 hover:via-amber-500/10 hover:to-transparent transition-all shadow-lg overflow-hidden"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="text-left">
                        <div className="text-sm font-semibold text-white group-hover:text-yellow-300 transition-colors">
                          TikTok
                        </div>
                        <div className="text-xs text-zinc-500">Follow me on TikTok</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <TikTokIcon className="w-4 h-4 text-yellow-400 mr-2 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.a>
                </motion.div>
              )}

              {activeTab === 'family' && (
                <motion.div
                  key="family"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full flex flex-col gap-3 text-left"
                >
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-3 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                      <Users className="w-4 h-4" />
                      <span>Family</span>
                    </div>
                    
                    <div className="space-y-2.5 text-xs text-zinc-300">
                      <motion.div 
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10"
                      >
                        <span className="font-semibold text-white">Chan</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-yellow-500/5 border border-yellow-500/10"
                      >
                        <span className="font-semibold text-white">Celestia</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full flex flex-col gap-3 text-left"
                >
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-yellow-500/20 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                      <Info className="w-4 h-4" />
                      <span>About Shinitchi</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Hey there! I am <span className="text-yellow-400 font-semibold">Shinitchi</span>, a passionate developer and creative builder exploring the realms of code, aesthetics, and web design. Welcome to my digital space!
                    </p>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Status: <strong className="text-yellow-400">Coding & Gaming</strong></span>
                      <span>Location: <strong className="text-white">PH</strong></span>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          <footer className="mt-8 text-[11px] text-zinc-600 flex items-center gap-1.5">
            <Laptop className="w-3.5 h-3.5 text-zinc-500" />
            <span>Designed for</span>
            <span className="font-semibold text-yellow-400">shinitchi</span>
          </footer>

        </div>
      </motion.main>
    </div>
  );
}

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.33 22a6.34 6.34 0 0 0 6.34-6.33V9.28a8.16 8.16 0 0 0 4.92 1.62V7.45a4.86 4.86 0 0 1-1-.76z" />
    </svg>
  );
}