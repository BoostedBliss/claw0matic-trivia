import React, { useEffect } from 'react';
import { Player, PlushieHost } from '../types';
import { PlushieAvatar } from './PlushieAvatar';
import { sound, playAudioFromBase64 } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Trophy, Medal, Sparkles, RotateCcw, ArrowRight, Volume2, Award } from 'lucide-react';

interface VictoryPodiumProps {
  players: Player[];
  host: PlushieHost;
  onPlayAgain: () => void;
  onReturnToClaw: () => void;
}

export const VictoryPodium: React.FC<VictoryPodiumProps> = ({
  players,
  host,
  onPlayAgain,
  onReturnToClaw,
}) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  useEffect(() => {
    sound.prizeChute();
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: [host.themeColor, '#5865F2', '#FEE75C', '#57F287', '#EB459E'],
    });
  }, [host]);

  const playVictoryTTS = async () => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: host.catchphrases.victory,
          hostId: host.id,
          speakerName: host.name,
        }),
      });
      const data = await res.json();
      if (data.success && data.audio) {
        await playAudioFromBase64(data.audio);
      }
    } catch (e) {
      sound.discordPing();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#2b2d31] border border-[#35373c] rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute inset-0 opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: host.themeColor }}
      ></div>

      <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#fee75c]/15 border border-[#fee75c]/30 text-xs font-black text-[#fee75c] uppercase tracking-wider mb-2">
        <Trophy className="w-4 h-4" />
        CHAMPIONSHIP PODIUM
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-white font-arcade mb-2">
        Party Victory Stage!
      </h1>
      <p className="text-sm text-[#949ba4] mb-8">
        The claw trivia showdown has concluded! All praise the trivia monarch!
      </p>

      {/* Host Congratulating Mascot */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <PlushieAvatar host={host} size="xl" emotion="happy" />
        </div>

        <div className="mt-3 max-w-lg bg-[#1e1f22] p-4 rounded-2xl border border-[#35373c] shadow-inner text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-sm font-bold text-white">{host.name}:</span>
            <button
              onClick={playVictoryTTS}
              className="p-1 hover:bg-[#2b2d31] rounded text-pink-400 cursor-pointer"
              title="Hear victory speech"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-pink-300 italic font-medium">
            "{host.catchphrases.victory}"
          </p>
        </div>
      </div>

      {/* Podium Standings (Top 3) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end max-w-2xl mx-auto mb-8 pt-4">
        {/* 2nd Place */}
        {sortedPlayers[1] && (
          <div className="flex flex-col items-center">
            <div className="text-2xl mb-1">{sortedPlayers[1].avatar}</div>
            <div className="text-xs font-bold text-white truncate max-w-[90px]">
              {sortedPlayers[1].name}
            </div>
            <div className="text-[11px] font-extrabold text-[#949ba4] mb-1">
              {sortedPlayers[1].score} pts
            </div>
            <div className="w-full h-24 bg-gradient-to-t from-[#1e1f22] to-[#35373c] rounded-t-2xl border-t-4 border-neutral-400 flex flex-col items-center justify-center text-white font-black text-lg">
              <Medal className="w-5 h-5 text-neutral-300 mb-0.5" />
              2ND
            </div>
          </div>
        )}

        {/* 1st Place Champion */}
        {winner && (
          <div className="flex flex-col items-center">
            <span className="text-xl animate-bounce">👑</span>
            <div className="text-3xl mb-1">{winner.avatar}</div>
            <div className="text-sm font-black text-white truncate max-w-[110px]">
              {winner.name}
            </div>
            <div className="text-xs font-extrabold text-[#57F287] mb-1">
              {winner.score} pts
            </div>
            <div className="w-full h-36 bg-gradient-to-t from-[#1e1f22] via-[#5865F2]/40 to-[#5865F2] rounded-t-2xl border-t-4 border-[#fee75c] flex flex-col items-center justify-center text-white font-black text-xl shadow-lg">
              <Trophy className="w-7 h-7 text-[#fee75c] mb-1" />
              1ST
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {sortedPlayers[2] && (
          <div className="flex flex-col items-center">
            <div className="text-2xl mb-1">{sortedPlayers[2].avatar}</div>
            <div className="text-xs font-bold text-white truncate max-w-[90px]">
              {sortedPlayers[2].name}
            </div>
            <div className="text-[11px] font-extrabold text-[#949ba4] mb-1">
              {sortedPlayers[2].score} pts
            </div>
            <div className="w-full h-16 bg-gradient-to-t from-[#1e1f22] to-[#35373c] rounded-t-2xl border-t-4 border-amber-700 flex flex-col items-center justify-center text-white font-black text-sm">
              <Award className="w-4 h-4 text-amber-600 mb-0.5" />
              3RD
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white font-extrabold text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Rematch With {host.name}</span>
        </button>

        <button
          onClick={onReturnToClaw}
          className="px-6 py-3 bg-[#35373c] hover:bg-[#3d3f45] text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Pick New Claw Host</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
