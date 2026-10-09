import React, { useState } from 'react';
import { Player } from '../types';
import { sound } from '../utils/audio';
import { 
  Users, 
  Copy, 
  Check, 
  UserPlus, 
  Sparkles, 
  Settings2, 
  X, 
  ShieldAlert, 
  Globe
} from 'lucide-react';

interface MultiplayerLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
  players: Player[];
  onAddBotPlayer: () => void;
  onRemovePlayer: (id: string) => void;
  difficulty: 'easy' | 'normal' | 'hardcore';
  onSetDifficulty: (diff: 'easy' | 'normal' | 'hardcore') => void;
}

export const MultiplayerLobbyModal: React.FC<MultiplayerLobbyModalProps> = ({
  isOpen,
  onClose,
  roomCode,
  players,
  onAddBotPlayer,
  onRemovePlayer,
  difficulty,
  onSetDifficulty,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    sound.discordPing();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#2b2d31] border border-[#35373c] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#35373c]">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#5865F2]" />
            <h3 className="text-base font-extrabold text-white font-arcade">
              Arcade Party & Lobby
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#949ba4] hover:text-white rounded-lg hover:bg-[#35373c] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Room Code Card */}
        <div className="my-4 bg-[#1e1f22] p-4 rounded-2xl border border-[#35373c] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#949ba4] font-bold uppercase tracking-wider block">
              Party Activity Room Code
            </span>
            <span className="text-xl font-black text-white font-mono-code tracking-wider">
              #{roomCode}
            </span>
          </div>

          <button
            onClick={copyRoomCode}
            className="px-3 py-2 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Link' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Difficulty Selector */}
        <div className="mb-4">
          <label className="text-xs font-bold text-[#949ba4] uppercase tracking-wider block mb-2">
            Quiz Challenge Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['easy', 'normal', 'hardcore'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => onSetDifficulty(lvl)}
                className={`py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer border ${
                  difficulty === lvl
                    ? 'bg-[#5865F2] text-white border-white/20 shadow-md'
                    : 'bg-[#1e1f22] text-[#949ba4] border-[#35373c] hover:text-white'
                }`}
              >
                {lvl === 'hardcore' ? '🔥 Hardcore' : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Party Members List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#949ba4] uppercase tracking-wider">
              Party Members ({players.length})
            </span>
            <button
              onClick={onAddBotPlayer}
              className="text-xs text-[#5865F2] hover:text-[#7983f5] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Invite Bot Friend</span>
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {players.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-[#1e1f22] p-2.5 rounded-xl border border-[#35373c]"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#2b2d31] border border-[#35373c] flex items-center justify-center text-sm">
                    {p.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{p.name}</span>
                      {p.isUser && (
                        <span className="text-[9px] bg-[#5865F2] text-white font-bold px-1 rounded">
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#949ba4]">{p.tag}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-[#57F287]">{p.score} pts</span>
                  {!p.isUser && players.length > 2 && (
                    <button
                      onClick={() => onRemovePlayer(p.id)}
                      className="text-[#ed4245] hover:bg-[#ed4245]/20 p-1 rounded transition-colors text-xs cursor-pointer"
                      title="Kick from party"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-[#35373c] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Ready to Play
          </button>
        </div>
      </div>
    </div>
  );
};
