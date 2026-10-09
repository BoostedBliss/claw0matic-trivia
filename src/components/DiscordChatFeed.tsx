import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Player, PlushieHost } from '../types';
import { sound } from '../utils/audio';
import { Send, Smile, Sparkles, Hash, MessageSquare } from 'lucide-react';

interface DiscordChatFeedProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  activeHost: PlushieHost;
  players: Player[];
}

export const DiscordChatFeed: React.FC<DiscordChatFeedProps> = ({
  messages,
  onSendMessage,
  activeHost,
  players,
}) => {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
    sound.discordPing();
  };

  const handleQuickReaction = (emoji: string) => {
    onSendMessage(emoji);
    sound.discordPing();
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#2b2d31] rounded-2xl border border-[#35373c] shadow-lg overflow-hidden">
      {/* Discord Channel Header */}
      <div className="px-4 py-3 bg-[#1e1f22] border-b border-[#35373c] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Hash className="w-4 h-4 text-[#949ba4]" />
          <span className="text-xs font-bold text-white tracking-wide">
            party-trivia-chat
          </span>
        </div>
        <span className="text-[10px] text-[#57F287] font-semibold bg-[#57F287]/10 px-2 py-0.5 rounded-full border border-[#57F287]/30">
          Live Party Feed
        </span>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5 max-h-[380px] lg:max-h-[500px]">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-2.5 text-xs group">
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full bg-[#1e1f22] border border-[#35373c] flex items-center justify-center flex-shrink-0 text-sm shadow-sm">
              {msg.avatar}
            </div>

            {/* Content */}
            <div className="flex-1 leading-relaxed">
              <div className="flex items-center space-x-1.5">
                <span
                  className="font-bold text-white hover:underline cursor-pointer"
                  style={{ color: msg.roleColor || '#f2f3f5' }}
                >
                  {msg.sender}
                </span>

                {msg.badge && (
                  <span className="text-[9px] bg-[#5865F2] text-white px-1 rounded font-bold uppercase">
                    {msg.badge}
                  </span>
                )}

                <span className="text-[10px] text-[#949ba4]">
                  {msg.timestamp}
                </span>
              </div>

              <div
                className={`mt-0.5 ${
                  msg.isSystem
                    ? 'text-[#57F287] font-semibold italic'
                    : 'text-[#dbdee1]'
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Reaction Bar */}
      <div className="px-3 py-1.5 bg-[#232428] border-t border-[#35373c] flex items-center space-x-1 overflow-x-auto">
        {['🎉', '💀', '🧠', '🤣', '🔥', '🧋', '👑', '⭐'].map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleQuickReaction(emoji)}
            className="p-1 hover:bg-[#313338] rounded-md text-sm transition-transform active:scale-90 cursor-pointer"
            title={`React with ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Input Message Form */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-[#1e1f22] border-t border-[#35373c] flex items-center space-x-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message #party-trivia-chat...`}
            className="w-full bg-[#383a40] text-xs text-[#dbdee1] placeholder-[#949ba4] rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#5865F2]"
          />
        </div>

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 bg-[#5865F2] hover:bg-[#4752c4] disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
