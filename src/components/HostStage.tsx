import React, { useState } from 'react';
import { PlushieHost } from '../types';
import { PlushieAvatar } from './PlushieAvatar';
import { sound, playAudioFromBase64, stopCurrentAudio } from '../utils/audio';
import { Volume2, Mic, Sparkles, RefreshCw, Radio, Check, Globe } from 'lucide-react';

interface HostStageProps {
  host: PlushieHost;
  currentCommentary?: string;
  isHostSpeaking?: boolean;
  onOpenVoiceModal: () => void;
  onReturnToClaw: () => void;
  isGrounded?: boolean;
}

export const HostStage: React.FC<HostStageProps> = ({
  host,
  currentCommentary,
  onOpenVoiceModal,
  onReturnToClaw,
  isGrounded = true,
}) => {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [ttsError, setTtsError] = useState<string | null>(null);

  const displayText = currentCommentary || host.catchphrases.intro;

  // Trigger Gemini 3.8 Flash TTS for host audio
  const handlePlayTTS = async () => {
    if (isPlayingTTS) {
      stopCurrentAudio();
      setIsPlayingTTS(false);
      return;
    }

    try {
      setIsPlayingTTS(true);
      setTtsError(null);

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: displayText,
          hostId: host.id,
          speakerName: host.name,
        }),
      });

      const data = await res.json();
      if (data.success && data.audio) {
        await playAudioFromBase64(data.audio, data.mimeType || 'audio/wav');
      } else {
        // Fallback tone
        sound.discordPing();
      }
    } catch (e: any) {
      console.warn('TTS request error:', e);
      sound.discordPing();
    } finally {
      setIsPlayingTTS(false);
    }
  };

  return (
    <div className="w-full bg-[#2b2d31] border border-[#35373c] rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute top-0 left-0 w-48 h-full opacity-15 blur-2xl pointer-events-none"
        style={{ backgroundColor: host.themeColor }}
      ></div>

      {/* Plushie Host Stage Avatar */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        <PlushieAvatar
          host={host}
          size="lg"
          emotion={isPlayingTTS ? 'speaking' : 'idle'}
        />

        <div className="mt-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm font-black text-white font-arcade leading-none">
              {host.name}
            </span>
            <span className="text-xs">{host.emoji}</span>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 text-white border"
            style={{
              backgroundColor: `${host.themeColor}30`,
              borderColor: host.themeColor,
            }}
          >
            {host.badge}
          </span>
        </div>
      </div>

      {/* Center: Live Dialogue Speech Bubble & Tags */}
      <div className="flex-1 w-full space-y-2">
        {/* Top Feature Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#1e1f22] text-[#949ba4] border border-[#35373c] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
            <span>Specialty:</span>
            <span className="text-[#57F287]">{host.category}</span>
          </span>

          {isGrounded && (
            <span className="bg-[#5865F2]/15 text-[#5865F2] border border-[#5865F2]/40 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1" title="Questions grounded with Google Search data">
              <Globe className="w-3 h-3 text-[#5865F2]" />
              Search Grounded (gemini-3.5-flash)
            </span>
          )}

          <span className="bg-pink-500/15 text-pink-300 border border-pink-500/40 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            TTS: gemini-3.8-flash-tts ({host.voiceName})
          </span>
        </div>

        {/* Kawaii Speech Bubble */}
        <div className="relative bg-[#1e1f22] rounded-2xl p-3 border border-[#35373c] shadow-inner">
          <div className="text-xs sm:text-sm text-[#f2f3f5] leading-relaxed font-medium">
            "{displayText}"
          </div>

          {/* Equalizer animation when TTS is playing */}
          {isPlayingTTS && (
            <div className="flex items-center space-x-1 mt-2 text-pink-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Voice Streaming:</span>
              <div className="flex items-end space-x-0.5 h-3">
                <span className="w-1 h-3 bg-pink-400 rounded-full animate-bounce"></span>
                <span className="w-1 h-2 bg-pink-400 rounded-full animate-ping"></span>
                <span className="w-1 h-3 bg-pink-400 rounded-full animate-bounce"></span>
                <span className="w-1 h-1.5 bg-pink-400 rounded-full"></span>
              </div>
            </div>
          )}
        </div>

        {/* Host Control Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* TTS Play Button */}
          <button
            onClick={handlePlayTTS}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all cursor-pointer ${
              isPlayingTTS
                ? 'bg-pink-600 text-white animate-pulse'
                : 'bg-[#313338] hover:bg-[#383a40] text-pink-300 border border-pink-500/30'
            }`}
            title="Read commentary using gemini-3.8-flash-tts"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isPlayingTTS ? 'Stop Audio' : '🔊 Host Voice (TTS)'}</span>
          </button>

          {/* Live Voice API Button */}
          <button
            onClick={onOpenVoiceModal}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#5865F2]/20 hover:bg-[#5865F2]/30 text-[#5865F2] border border-[#5865F2]/40 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Open real-time voice session using gemini-3.8-live"
          >
            <Radio className="w-3.5 h-3.5 text-[#5865F2]" />
            <span>🎙️ Talk to Host (Live API)</span>
          </button>

          {/* Return to Claw Machine */}
          <button
            onClick={onReturnToClaw}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#313338] hover:bg-[#383a40] text-[#949ba4] hover:text-white border border-[#404249] flex items-center gap-1 transition-all ml-auto cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Claw Machine</span>
          </button>
        </div>
      </div>
    </div>
  );
};
