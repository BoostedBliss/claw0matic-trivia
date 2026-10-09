import React, { useState, useEffect, useRef } from 'react';
import { PlushieHost } from '../types';
import { PLUSHIE_HOSTS } from '../data/hosts';
import { PlushieAvatar } from './PlushieAvatar';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Dices, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface ClawMachineProps {
  onHostSelected: (host: PlushieHost) => void;
  selectedHost?: PlushieHost | null;
}

export const ClawMachine: React.FC<ClawMachineProps> = ({
  onHostSelected,
  selectedHost,
}) => {
  // Claw state: horizontal percent (15% to 85%), vertical percent (10% to 75%)
  const [clawX, setClawX] = useState<number>(50);
  const [clawY, setClawY] = useState<number>(10);
  const [isClawOpen, setIsClawOpen] = useState<boolean>(true);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [grabbedHost, setGrabbedHost] = useState<PlushieHost | null>(null);
  const [showPrizeModal, setShowPrizeModal] = useState<boolean>(false);
  const [activePreviewHost, setActivePreviewHost] = useState<PlushieHost>(PLUSHIE_HOSTS[0]);

  // Plushie slot positions inside the machine pit (4 overflowing tiers)
  const plushiePositions = useRef([
    { id: 'boba-bun', x: 14, y: 50 },
    { id: 'chocola-bear', x: 28, y: 52 },
    { id: 'dj-meow', x: 42, y: 49 },
    { id: 'sir-reginald', x: 56, y: 52 },
    { id: 'captain-squid', x: 70, y: 50 },
    { id: 'matcha-mochi', x: 84, y: 52 },
    { id: 'prof-pip', x: 21, y: 64 },
    { id: 'pixel-pup', x: 35, y: 66 },
    { id: 'sparky-bolt', x: 49, y: 63 },
    { id: 'luna-moth', x: 63, y: 65 },
    { id: 'ninja-panda', x: 77, y: 63 },
    { id: 'dino-nugget', x: 89, y: 65 },
    { id: 'neon-shiba', x: 16, y: 76 },
    { id: 'marshmallow-seal', x: 30, y: 78 },
    { id: 'spicy-ramen-pig', x: 44, y: 75 },
    { id: 'galaxy-cat', x: 58, y: 77 },
    { id: 'wizard-owl', x: 72, y: 75 },
    { id: 'berry-bunny', x: 85, y: 77 },
    { id: 'steampunk-otter', x: 23, y: 88 },
    { id: 'vampire-bat', x: 37, y: 90 },
    { id: 'boba-dragon', x: 51, y: 87 },
    { id: 'cactus-pup', x: 65, y: 89 },
    { id: 'detective-duck', x: 79, y: 88 },
    { id: 'chibi-kraken', x: 48, y: 98 },
  ]).current;

  // Manual move left/right
  const moveClaw = (direction: 'left' | 'right') => {
    if (isDropping) return;
    sound.clawMove();
    setClawX((prev) => {
      if (direction === 'left') return Math.max(16, prev - 8);
      return Math.min(84, prev + 8);
    });
  };

  // Keyboard navigation for arrow keys & spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDropping || showPrizeModal) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveClaw('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        moveClaw('right');
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        dropClaw();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDropping, showPrizeModal, clawX]);

  // Drop claw physics animation
  const dropClaw = (targetHostId?: string) => {
    if (isDropping) return;
    setIsDropping(true);
    setGrabbedHost(null);
    sound.clawDrop();

    // If specific target requested (e.g. from random roll)
    let targetX = clawX;
    if (targetHostId) {
      const match = plushiePositions.find((p) => p.id === targetHostId);
      if (match) {
        targetX = match.x;
        setClawX(targetX);
      }
    }

    // Determine which plushie is closest to current X
    let closestHost = PLUSHIE_HOSTS[0];
    let minDistance = 999;
    plushiePositions.forEach((pos) => {
      const dist = Math.abs(pos.x - targetX);
      if (dist < minDistance) {
        minDistance = dist;
        const hostObj = PLUSHIE_HOSTS.find((h) => h.id === pos.id);
        if (hostObj) closestHost = hostObj;
      }
    });

    // 1. Lower the claw
    setIsClawOpen(true);
    const dropDuration = 900;
    const startTime = Date.now();

    const descendInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / dropDuration);
      setClawY(10 + progress * 62); // descend to ~72%

      if (progress >= 1) {
        clearInterval(descendInterval);

        // 2. Clamp claw shut around plushie
        sound.clawGrab();
        setIsClawOpen(false);
        setGrabbedHost(closestHost);

        setTimeout(() => {
          // 3. Lift claw back up with plushie
          const liftStartTime = Date.now();
          const liftInterval = setInterval(() => {
            const liftElapsed = Date.now() - liftStartTime;
            const liftProgress = Math.min(1, liftElapsed / 800);
            setClawY(72 - liftProgress * 60); // back to ~12%

            if (liftProgress >= 1) {
              clearInterval(liftInterval);

              // 4. Move claw towards the left prize chute (X: 12%)
              const moveStartTime = Date.now();
              const currentXBeforeChute = targetX;
              const moveInterval = setInterval(() => {
                const moveElapsed = Date.now() - moveStartTime;
                const moveProgress = Math.min(1, moveElapsed / 700);
                setClawX(currentXBeforeChute - moveProgress * (currentXBeforeChute - 12));

                if (moveProgress >= 1) {
                  clearInterval(moveInterval);

                  // 5. Open claw over chute & trigger win!
                  setIsClawOpen(true);
                  setGrabbedHost(null);
                  sound.prizeChute();

                  // Confetti burst
                  confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#5865F2', '#EB459E', '#FEE75C', '#57F287'],
                  });

                  setTimeout(() => {
                    setActivePreviewHost(closestHost);
                    setShowPrizeModal(true);
                    setIsDropping(false);
                    setClawX(50);
                    setClawY(10);
                  }, 400);
                }
              }, 20);
            }
          }, 20);
        }, 300);
      }
    }, 20);
  };

  // Random instant drop pick
  const triggerRandomDrop = () => {
    if (isDropping) return;
    const randomIndex = Math.floor(Math.random() * PLUSHIE_HOSTS.length);
    const chosen = PLUSHIE_HOSTS[randomIndex];
    dropClaw(chosen.id);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* Top Arcade Marquee Banner */}
      <div className="w-full text-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/30 text-xs font-bold text-[#5865F2] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#fee75c]" />
          Step 1: Pick Your AI Hostess / Host
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide font-arcade">
          Kawaii Plushie <span className="text-[#eb459e]">Claw Machine</span>
        </h1>
        <p className="text-sm text-[#949ba4] max-w-xl mx-auto mt-1">
          Drop the mechanical claw into the prize pit to extract your AI Host! Every plushie has an explosive personality, voice persona, and dedicated trivia categories.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center: Arcade Claw Cabinet (Col 1-8) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Physical Arcade Machine Cabinet Frame */}
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#2b2d31] via-[#1e1f22] to-[#111214] rounded-3xl p-4 border-4 border-[#35373c] shadow-2xl overflow-hidden">
            {/* Top Cabinet Marquee with LED Lights */}
            <div className="w-full bg-[#5865F2] rounded-2xl p-2.5 mb-3 flex items-center justify-between shadow-lg border border-white/20">
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-pulse"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-center font-arcade font-black text-white text-base md:text-lg tracking-wider drop-shadow">
                ⭐ CLAW-O-MATIC TRIVIA ⭐
              </div>
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-pulse"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping"></span>
              </div>
            </div>

            {/* Glass Claw Chamber with Ultra-Realistic Specular Reflections & Sheen */}
            <div 
              className="relative w-full h-[460px] sm:h-[520px] bg-gradient-to-b from-[#141518]/95 via-[#1a1b1e]/90 to-[#202125] rounded-2xl border-2 border-cyan-300/50 shadow-inner overflow-hidden flex flex-col justify-between"
              style={{
                boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.6), inset 0 0 35px rgba(6, 182, 212, 0.22), inset 0 -8px 24px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Pristine Glass Specular Highlight Glare - Diagonal Sheen */}
              <div 
                className="absolute inset-0 pointer-events-none z-25 opacity-90"
                style={{
                  background: 'linear-gradient(130deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 22%, transparent 35%, transparent 52%, rgba(255, 255, 255, 0.14) 60%, transparent 72%)',
                }}
              ></div>

              {/* Sweeping Dynamic Sheen Sweep (glides every 7s) */}
              <div 
                className="absolute -inset-y-16 -left-32 w-40 pointer-events-none z-25 animate-glass-sheen"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)',
                }}
              ></div>

              {/* Top-Left Prismatic Corner Glow */}
              <div 
                className="absolute top-0 left-0 w-48 h-48 pointer-events-none z-25"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.45) 0%, rgba(56, 189, 248, 0.2) 30%, transparent 70%)',
                }}
              ></div>

              {/* Top Edge Beveled Glass Light Highlight */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-30"></div>

              {/* Vertical Bevel Rims */}
              <div className="absolute top-0 bottom-0 left-0 w-[1.5px] bg-gradient-to-b from-white/70 via-cyan-300/40 to-transparent pointer-events-none z-30"></div>
              <div className="absolute top-0 bottom-0 right-0 w-[1.5px] bg-gradient-to-b from-cyan-300/40 via-white/60 to-transparent pointer-events-none z-30"></div>

              {/* Etched Glass Corner Stamp */}
              <div className="absolute bottom-3 right-3 text-[9px] font-mono text-cyan-200/40 uppercase tracking-widest pointer-events-none z-25 flex items-center gap-1 select-none">
                <span>◆</span> TEMPERED ARCADE GLASS // 99.8% CLARITY
              </div>

              {/* Overhead Mechanical Rail */}
              <div className="relative w-full h-6 bg-[#35373c] border-b border-[#4e5058] flex items-center shadow-md z-20">
                <div className="w-full h-1 bg-[#1e1f22] mx-2 rounded"></div>

                {/* Moving Trolley Car */}
                <div
                  className="absolute top-0 h-full w-12 bg-neutral-700 border-2 border-neutral-500 rounded flex items-center justify-center transition-all duration-75 shadow-lg"
                  style={{ left: `calc(${clawX}% - 24px)` }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>
              </div>

              {/* Steel Wire & Mechanical Claw Assembly */}
              <div
                className="absolute z-20 pointer-events-none transition-all duration-75 flex flex-col items-center"
                style={{
                  left: `calc(${clawX}% - 20px)`,
                  top: '24px',
                }}
              >
                {/* Steel Wire extending down to clawY */}
                <div
                  className="w-1 bg-gradient-to-b from-neutral-400 via-neutral-300 to-neutral-500 shadow"
                  style={{ height: `${clawY * 4.6}px` }}
                ></div>

                {/* Claw Motor Housing */}
                <div className="w-10 h-7 bg-neutral-800 border-2 border-amber-400 rounded-md flex flex-col items-center justify-center shadow-md relative">
                  <div className="w-4 h-1.5 bg-neutral-900 rounded"></div>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-0.5 animate-ping"></div>

                  {/* Claw Prongs */}
                  <div className="relative w-12 flex justify-between px-0.5 mt-0.5">
                    {/* Left Prong */}
                    <div
                      className={`w-2 h-7 bg-neutral-400 border border-neutral-600 rounded-b transition-transform duration-200 origin-top ${
                        isClawOpen ? 'rotate-[-35deg]' : 'rotate-[-8deg]'
                      }`}
                    ></div>
                    {/* Center Prong */}
                    <div className="w-2 h-6 bg-neutral-400 border border-neutral-600 rounded-b"></div>
                    {/* Right Prong */}
                    <div
                      className={`w-2 h-7 bg-neutral-400 border border-neutral-600 rounded-b transition-transform duration-200 origin-top ${
                        isClawOpen ? 'rotate-[35deg]' : 'rotate-[8deg]'
                      }`}
                    ></div>
                  </div>

                  {/* Grabbed Plushie attached to claw if lifted */}
                  {grabbedHost && (
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 scale-90 animate-bounce">
                      <PlushieAvatar host={grabbedHost} size="md" emotion="happy" showAura={true} />
                    </div>
                  )}
                </div>
              </div>

              {/* Prize Chute on the Bottom-Left */}
              <div className="absolute bottom-2 left-2 w-20 h-28 bg-[#111214] border-2 border-dashed border-[#5865F2] rounded-xl flex flex-col items-center justify-end p-1 z-10">
                <div className="text-[10px] font-bold text-[#5865F2] mb-1">PRIZE CHUTE</div>
                <div className="w-full h-12 bg-neutral-900 border border-[#35373c] rounded flex items-center justify-center text-xs text-[#949ba4]">
                  ⬇️ WIN
                </div>
              </div>

              {/* Plushie Pit (Floor Bed overflowing with all 12 plushies in full aura) */}
              <div className="relative w-full h-72 sm:h-80 mt-auto pb-4 px-6 z-10 overflow-hidden">
                {plushiePositions.map((pos) => {
                  const host = PLUSHIE_HOSTS.find((h) => h.id === pos.id)!;
                  const isUnderClaw = Math.abs(pos.x - clawX) < 8;
                  const isCurrentTarget = grabbedHost?.id === host.id;

                  if (isCurrentTarget) return null; // currently attached to claw

                  return (
                    <div
                      key={host.id}
                      onClick={() => {
                        if (!isDropping) {
                          setActivePreviewHost(host);
                          setClawX(pos.x);
                        }
                      }}
                      className={`absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 ${
                        isUnderClaw ? 'scale-125 -translate-y-4 z-40' : 'hover:scale-115 z-20'
                      }`}
                      style={{
                        left: `${pos.x}%`,
                        bottom: `${(pos.y - 48) * 2.5}px`,
                      }}
                      title={`${host.name} - ${host.category}`}
                    >
                      <PlushieAvatar
                        host={host}
                        size="md"
                        emotion={isUnderClaw ? 'happy' : 'idle'}
                        showAura={true}
                      />
                      <div className="text-center text-[10px] font-black text-white bg-black/85 rounded-full px-2 py-0.5 mt-0.5 truncate max-w-[85px] border border-white/20 shadow-md">
                        {host.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Glass Bottom Rim with Neon Glow */}
              <div className="w-full h-3 bg-gradient-to-r from-[#eb459e] via-[#5865F2] to-[#57F287] opacity-80"></div>
            </div>

            {/* Arcade Controls Deck */}
            <div className="w-full bg-[#232428] rounded-2xl mt-3 p-4 border border-[#35373c] flex flex-wrap items-center justify-between gap-4">
              {/* Left/Right Directional Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  disabled={isDropping}
                  onClick={() => moveClaw('left')}
                  className="px-4 py-3 bg-[#313338] hover:bg-[#383a40] disabled:opacity-40 text-white font-bold rounded-xl border border-[#404249] flex items-center gap-1.5 shadow active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#5865F2]" />
                  <span className="text-xs">LEFT [A]</span>
                </button>

                <button
                  disabled={isDropping}
                  onClick={() => moveClaw('right')}
                  className="px-4 py-3 bg-[#313338] hover:bg-[#383a40] disabled:opacity-40 text-white font-bold rounded-xl border border-[#404249] flex items-center gap-1.5 shadow active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <span className="text-xs">RIGHT [D]</span>
                  <ArrowRight className="w-4 h-4 text-[#5865F2]" />
                </button>
              </div>

              {/* Big Arcade Drop Button */}
              <div className="flex items-center space-x-3">
                <button
                  disabled={isDropping}
                  onClick={() => dropClaw()}
                  className="relative group px-6 py-3.5 bg-gradient-to-r from-[#eb459e] to-[#f43f5e] hover:from-[#f43f5e] hover:to-[#e11d48] disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-pink-500/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
                  {isDropping ? 'CLAW DESCENDING...' : '⬇️ DROP CLAW [SPACE]'}
                </button>

                <button
                  disabled={isDropping}
                  onClick={triggerRandomDrop}
                  className="px-4 py-3.5 bg-[#5865F2] hover:bg-[#4752c4] disabled:opacity-50 text-white font-bold text-xs rounded-2xl border border-white/20 shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                  title="Randomly drop claw onto a plushie"
                >
                  <Dices className="w-4 h-4" />
                  <span>RANDOM DROP</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Active Plushie Dossier / Quick Shelf (Col 9-12) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          {/* Active Highlight Card */}
          <div className="bg-[#2b2d31] rounded-2xl p-5 border border-[#35373c] shadow-lg relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
              style={{ backgroundColor: activePreviewHost.themeColor }}
            ></div>

            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full text-white border"
                style={{
                  backgroundColor: `${activePreviewHost.themeColor}30`,
                  borderColor: activePreviewHost.themeColor,
                }}
              >
                {activePreviewHost.badge}
              </span>
              <span className="text-xs text-[#949ba4] font-medium">Host Dossier</span>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <PlushieAvatar host={activePreviewHost} size="lg" emotion="idle" />
              <div>
                <h3 className="text-xl font-black text-white font-arcade leading-tight">
                  {activePreviewHost.name}
                </h3>
                <p className="text-xs font-semibold text-[#f472b6]">
                  {activePreviewHost.title}
                </p>
                <div className="flex space-x-1 mt-2">
                  {activePreviewHost.specialtyIcons.map((ico, idx) => (
                    <span key={idx} className="text-xs bg-[#1e1f22] p-1 rounded-md">
                      {ico}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Personality & Trivia Category */}
            <div className="space-y-3 bg-[#1e1f22] p-3.5 rounded-xl border border-[#35373c] text-xs">
              <div>
                <span className="text-[#949ba4] font-semibold block text-[10px] uppercase tracking-wider">
                  Specialized Quiz Realm
                </span>
                <span className="text-[#57F287] font-bold text-sm block mt-0.5">
                  {activePreviewHost.category}
                </span>
                <p className="text-[#dbdee1] text-[11px] mt-0.5">
                  {activePreviewHost.categoryDescription}
                </p>
              </div>

              <div className="border-t border-[#2b2d31] pt-2">
                <span className="text-[#949ba4] font-semibold block text-[10px] uppercase tracking-wider">
                  Personality Vibe
                </span>
                <p className="text-[#dbdee1] text-[11px] mt-0.5 italic">
                  "{activePreviewHost.personality}"
                </p>
              </div>

              <div className="border-t border-[#2b2d31] pt-2">
                <span className="text-[#949ba4] font-semibold block text-[10px] uppercase tracking-wider">
                  Catchphrase
                </span>
                <p className="text-pink-300 text-[11px] mt-0.5 font-medium">
                  "{activePreviewHost.catchphrases.intro}"
                </p>
              </div>
            </div>

            {/* Direct Select Button */}
            <button
              onClick={() => {
                sound.prizeChute();
                onHostSelected(activePreviewHost);
              }}
              className="w-full mt-4 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LOCK IN {activePreviewHost.name.toUpperCase()}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Plushie Roster Grid */}
          <div className="bg-[#2b2d31] rounded-2xl p-4 border border-[#35373c]">
            <h4 className="text-xs font-bold text-[#949ba4] uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>All 24 Claw Plushies</span>
              <span className="text-[10px] text-[#5865F2] font-semibold">24 Unique Categories</span>
            </h4>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 max-h-80 overflow-y-auto pr-1">
              {PLUSHIE_HOSTS.map((h) => {
                const isSelected = activePreviewHost.id === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => {
                      setActivePreviewHost(h);
                      const pos = plushiePositions.find((p) => p.id === h.id);
                      if (pos && !isDropping) setClawX(pos.x);
                    }}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#5865F2]/20 border-[#5865F2] shadow-sm'
                        : 'bg-[#1e1f22] border-[#35373c] hover:border-[#4e5058]'
                    }`}
                  >
                    <PlushieAvatar host={h} size="sm" emotion={isSelected ? 'happy' : 'idle'} />
                    <span className="text-[10px] font-bold text-white mt-1 truncate max-w-full">
                      {h.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Prize Won Announcement Modal */}
      {showPrizeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#2b2d31] border-2 border-[#5865F2] rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="text-xs font-bold uppercase tracking-widest text-[#57F287] mb-1">
              🎉 CLAW PRIZE EXTRACTED!
            </div>
            <h2 className="text-2xl font-black text-white font-arcade mb-4">
              You Caught {activePreviewHost.name}!
            </h2>

            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#1e1f22] rounded-3xl border border-white/10 shadow-inner">
                <PlushieAvatar host={activePreviewHost} size="xl" emotion="happy" />
              </div>
            </div>

            <div className="bg-[#1e1f22] p-4 rounded-2xl border border-[#35373c] text-left mb-6">
              <div className="text-xs text-[#949ba4] font-semibold uppercase">Category</div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span className="text-base">{activePreviewHost.specialtyIcons[0]}</span>
                {activePreviewHost.category}
              </div>
              <p className="text-xs text-pink-300 italic mt-2">
                "{activePreviewHost.catchphrases.intro}"
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowPrizeModal(false)}
                className="flex-1 py-3 bg-[#35373c] hover:bg-[#3d3f45] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Drop Claw Again
              </button>
              <button
                onClick={() => {
                  setShowPrizeModal(false);
                  onHostSelected(activePreviewHost);
                }}
                className="flex-1 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white font-extrabold rounded-xl text-xs shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Start Quiz Arena</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
