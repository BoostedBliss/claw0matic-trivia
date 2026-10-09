import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Radio, 
  Sparkles, 
  Gamepad2, 
  Users, 
  Wifi, 
  Headphones,
  Bot
} from 'lucide-react';
import { sound } from '../utils/audio';

interface DiscordHeaderProps {
  onOpenVoiceModal: () => void;
  isVoiceConnected: boolean;
  activePlayersCount: number;
  roomCode: string;
  onOpenLobby: () => void;
}

export const DiscordHeader: React.FC<DiscordHeaderProps> = ({
  onOpenVoiceModal,
  isVoiceConnected,
  activePlayersCount,
  roomCode,
  onOpenLobby,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setIsDeafened(!sound.enabled);
  };

  return (
    <header className="bg-[#1e1f22] border-b border-[#2b2d31] px-4 py-2 flex items-center justify-between shadow-md select-none">
      {/* Left: Discord Server & Activity Info */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5865F2] via-[#7289da] to-[#eb459e] flex items-center justify-center text-white font-black text-xl shadow-inner border border-white/20">
          🎮
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <span className="text-white font-extrabold text-base tracking-wide flex items-center gap-1.5 font-arcade">
              ClawPop <span className="text-[#5865F2]">Arcade</span>
            </span>
            <span className="bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#fee75c]" /> LIVE ACTIVITY
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-[#949ba4]">
            <button 
              onClick={onOpenLobby}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer group"
              title="Party Room Code"
            >
              <span className="text-[#5865F2] font-semibold group-hover:underline">#{roomCode}</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#57F287]">
              <Wifi className="w-3 h-3 animate-pulse" /> 18ms RTC
            </span>
            <span>•</span>
            <button 
              onClick={onOpenLobby}
              className="flex items-center gap-1 hover:text-[#dbdee1] transition-colors"
            >
              <Users className="w-3 h-3 text-[#949ba4]" /> {activePlayersCount} Players
            </button>
          </div>
        </div>
      </div>

      {/* Middle: Voice Channel Status */}
      <div className="hidden md:flex items-center bg-[#2b2d31] px-3 py-1.5 rounded-full border border-[#35373c] space-x-3">
        <button
          onClick={onOpenVoiceModal}
          className={`flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            isVoiceConnected
              ? 'bg-[#57F287]/20 text-[#57F287] border border-[#57F287]/30 hover:bg-[#57F287]/30'
              : 'bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/30'
          }`}
        >
          <Radio className={`w-3.5 h-3.5 ${isVoiceConnected ? 'animate-pulse text-[#57F287]' : ''}`} />
          <span>{isVoiceConnected ? 'Stage Connected (Live Voice)' : 'Join Stage Channel'}</span>
        </button>

        <span className="text-xs text-[#949ba4] flex items-center gap-1">
          <Bot className="w-3.5 h-3.5 text-[#f472b6]" /> Plushie AI Active
        </span>
      </div>

      {/* Right: Audio Controls & User Profile */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-[#2b2d31] rounded-lg p-1 space-x-1 border border-[#35373c]">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-1.5 rounded hover:bg-[#35373c] transition-colors ${
              isMuted ? 'text-[#ed4245]' : 'text-[#dbdee1]'
            }`}
            title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleSound}
            className={`p-1.5 rounded hover:bg-[#35373c] transition-colors ${
              isDeafened ? 'text-[#ed4245]' : 'text-[#dbdee1]'
            }`}
            title={isDeafened ? 'Enable Sound' : 'Deafen Sound'}
          >
            {isDeafened ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Current User Discord Tag */}
        <div className="flex items-center space-x-2 pl-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5865F2] to-[#eb459e] flex items-center justify-center text-sm font-bold text-white shadow">
              👾
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#57F287] border-2 border-[#1e1f22] rounded-full"></span>
          </div>
          <div className="hidden sm:block text-left text-xs">
            <div className="font-bold text-[#f2f3f5] leading-none flex items-center gap-1">
              You <Sparkles className="w-2.5 h-2.5 text-[#fee75c]" />
            </div>
            <span className="text-[#949ba4] text-[10px]">#0001</span>
          </div>
        </div>
      </div>
    </header>
  );
};
