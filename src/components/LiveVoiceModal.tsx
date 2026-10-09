import React, { useState, useEffect, useRef } from 'react';
import { PlushieHost, Player } from '../types';
import { PlushieAvatar } from './PlushieAvatar';
import { MicRecorder, sound } from '../utils/audio';
import { 
  Radio, 
  Mic, 
  MicOff, 
  Volume2, 
  X, 
  Sparkles, 
  PhoneOff, 
  Send,
  MessageSquare
} from 'lucide-react';

interface LiveVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  host: PlushieHost;
  players: Player[];
}

export const LiveVoiceModal: React.FC<LiveVoiceModalProps> = ({
  isOpen,
  onClose,
  host,
  players,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [serverStatus, setServerStatus] = useState<string>('Connecting to Live Voice Bridge...');
  const [conversation, setConversation] = useState<{ sender: string; text: string; isHost: boolean }[]>([
    {
      sender: host.name,
      text: `Hello there! I'm ${host.name} on the live stage! Speak into your mic to chat with me or ask for trivia tips!`,
      isHost: true,
    },
  ]);
  const [textInput, setTextInput] = useState<string>('');

  const wsRef = useRef<WebSocket | null>(null);
  const micRecorderRef = useRef<MicRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isOpen) {
      cleanupLive();
      return;
    }

    initLiveWebSocket();

    return () => {
      cleanupLive();
    };
  }, [isOpen]);

  const initLiveWebSocket = () => {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setServerStatus('🟢 Live Stage Connected (gemini-3.8-live)');
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'connected') {
            setServerStatus('🟢 Active: Connected to gemini-3.8-live API');
          } else if (msg.type === 'status') {
            setServerStatus(msg.message);
          } else if (msg.type === 'audio' && msg.audio) {
            playRawPCM24k(msg.audio);
          } else if (msg.type === 'text_reply' && msg.text) {
            setConversation((prev) => [
              ...prev,
              { sender: host.name, text: msg.text, isHost: true },
            ]);
          }
        } catch (e) {
          console.error('Error handling live message:', e);
        }
      };

      ws.onerror = () => {
        setServerStatus('Voice simulation mode ready');
      };

      ws.onclose = () => {
        setIsConnected(false);
      };
    } catch (e) {
      console.warn('WebSocket init exception:', e);
    }
  };

  const cleanupLive = () => {
    if (micRecorderRef.current) {
      micRecorderRef.current.stop();
      micRecorderRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsMicActive(false);
    setIsConnected(false);
  };

  // Play 24kHz raw PCM from Live API
  const playRawPCM24k = (base64Audio: string) => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx({ sampleRate: 24000 });
      }

      const binary = atob(base64Audio);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768;
      }

      const buffer = audioContextRef.current.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start();
    } catch (err) {
      console.warn('Playback error:', err);
    }
  };

  // Toggle microphone live streaming
  const toggleMic = async () => {
    if (isMicActive) {
      micRecorderRef.current?.stop();
      micRecorderRef.current = null;
      setIsMicActive(false);
    } else {
      micRecorderRef.current = new MicRecorder();
      const success = await micRecorderRef.current.start((chunkBase64) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'audio', audio: chunkBase64 }));
        }
      });
      if (success) {
        setIsMicActive(true);
      }
    }
  };

  // Text message into stage
  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    setConversation((prev) => [
      ...prev,
      { sender: 'You', text: textInput.trim(), isHost: false },
    ]);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'text', text: textInput.trim() }));
    }

    setTextInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#2b2d31] border-2 border-[#5865F2] rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#35373c]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#57F287]/20 border border-[#57F287]/40 flex items-center justify-center text-[#57F287]">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-1.5 font-arcade">
                Live Voice Stage: <span className="text-[#5865F2]">{host.name}'s Room</span>
              </h3>
              <span className="text-[11px] text-[#949ba4]">{serverStatus}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#949ba4] hover:text-white rounded-lg hover:bg-[#35373c] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage Center Stage Display */}
        <div className="my-5 flex flex-col items-center justify-center py-6 bg-[#1e1f22] rounded-2xl border border-[#35373c] relative overflow-hidden">
          {/* Animated Glowing Ring around Stage Host */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#5865F2] blur-xl opacity-30 animate-ping"></div>
            <div className="p-3 bg-[#2b2d31] rounded-3xl border-2 border-[#5865F2] shadow-xl relative z-10">
              <PlushieAvatar host={host} size="xl" emotion="speaking" />
            </div>
          </div>

          <div className="mt-3 text-center">
            <div className="text-lg font-black text-white font-arcade">{host.name}</div>
            <div className="text-xs text-pink-400 font-semibold">{host.title}</div>
            <span className="inline-block mt-1 text-[10px] bg-[#57F287]/20 text-[#57F287] border border-[#57F287]/30 px-2 py-0.5 rounded-full font-bold">
              🎙️ STAGE SPEAKER
            </span>
          </div>

          {/* Party Audience in the Stage Channel */}
          <div className="w-full mt-6 px-6 pt-4 border-t border-[#2b2d31] flex items-center justify-center gap-4 overflow-x-auto">
            {players.map((p) => (
              <div key={p.id} className="flex flex-col items-center flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#2b2d31] border border-[#35373c] flex items-center justify-center text-lg">
                    {p.avatar}
                  </div>
                  {p.isUser && isMicActive && (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#57F287] border-2 border-[#1e1f22] rounded-full"></span>
                  )}
                </div>
                <span className="text-[10px] text-[#dbdee1] font-semibold mt-1 max-w-[60px] truncate">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Speech Transcript / Banter Log */}
        <div className="flex-1 overflow-y-auto bg-[#1e1f22] rounded-xl p-3 border border-[#35373c] mb-4 space-y-2 max-h-36 text-xs">
          {conversation.map((c, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg ${
                c.isHost
                  ? 'bg-[#2b2d31] border border-pink-500/20 text-[#f2f3f5]'
                  : 'bg-[#5865F2]/20 border border-[#5865F2]/30 text-white ml-6'
              }`}
            >
              <span className="font-bold text-[11px] block text-[#5865F2]">
                {c.sender}:
              </span>
              <p className="mt-0.5">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Chat / Mic Controls */}
        <form onSubmit={handleSendText} className="flex items-center space-x-2">
          {/* Mic Toggle Button */}
          <button
            type="button"
            onClick={toggleMic}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isMicActive
                ? 'bg-[#57F287] text-black shadow-lg shadow-emerald-500/30 animate-pulse'
                : 'bg-[#313338] hover:bg-[#383a40] text-white border border-[#404249]'
            }`}
          >
            {isMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span>{isMicActive ? 'Mic Active' : 'Start Mic'}</span>
          </button>

          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={`Say or type something to ${host.name}...`}
            className="flex-1 bg-[#1e1f22] border border-[#35373c] text-xs text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#5865F2]"
          />

          <button
            type="submit"
            disabled={!textInput.trim()}
            className="p-2.5 bg-[#5865F2] hover:bg-[#4752c4] disabled:opacity-40 text-white rounded-xl cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2.5 bg-[#ed4245] hover:bg-[#c93b3e] text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            title="Leave Stage"
          >
            <PhoneOff className="w-4 h-4" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </form>
      </div>
    </div>
  );
};
