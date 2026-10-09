/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PlushieHost, TriviaQuestion, Player, ChatMessage, GameState } from './types';
import { PLUSHIE_HOSTS } from './data/hosts';
import { DiscordHeader } from './components/DiscordHeader';
import { ClawMachine } from './components/ClawMachine';
import { HostStage } from './components/HostStage';
import { TriviaArena } from './components/TriviaArena';
import { DiscordChatFeed } from './components/DiscordChatFeed';
import { VictoryPodium } from './components/VictoryPodium';
import { LiveVoiceModal } from './components/LiveVoiceModal';
import { MultiplayerLobbyModal } from './components/MultiplayerLobbyModal';
import { sound, playAudioFromBase64 } from './utils/audio';
import { 
  Sparkles, 
  Gamepad2, 
  RotateCcw, 
  Trophy, 
  Users, 
  MessageSquare, 
  Loader2,
  HelpCircle
} from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('claw_picker');
  const [selectedHost, setSelectedHost] = useState<PlushieHost>(PLUSHIE_HOSTS[0]);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
  const [hostCommentary, setHostCommentary] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hardcore'>('normal');
  const [roomCode, setRoomCode] = useState<string>('CLAW-' + Math.floor(1000 + Math.random() * 9000));

  // Modals
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isLobbyModalOpen, setIsLobbyModalOpen] = useState<boolean>(false);
  const [activeTabMobile, setActiveTabMobile] = useState<'game' | 'chat'>('game');

  // Party players roster
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'p-user',
      name: 'You',
      avatar: '👾',
      score: 0,
      streak: 0,
      isUser: true,
      isHost: false,
      selectedOption: null,
      status: 'online',
      tag: '#0001',
    },
    {
      id: 'p-sakura',
      name: 'SakuraCloud',
      avatar: '🌸',
      score: 0,
      streak: 0,
      isUser: false,
      isHost: false,
      selectedOption: null,
      status: 'online',
      tag: '#8821',
    },
    {
      id: 'p-pixel',
      name: 'PixelKnight',
      avatar: '🛡️',
      score: 0,
      streak: 0,
      isUser: false,
      isHost: false,
      selectedOption: null,
      status: 'idle',
      tag: '#4102',
    },
    {
      id: 'p-hype',
      name: 'HypeBeast99',
      avatar: '⚡',
      score: 0,
      streak: 0,
      isUser: false,
      isHost: false,
      selectedOption: null,
      status: 'online',
      tag: '#9930',
    },
  ]);

  // Live Discord chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ClawPop Bot',
      avatar: '🤖',
      content: 'Welcome to ClawPop Arcade Activity! Grab a plushie host in the claw machine to begin!',
      timestamp: 'Today at 4:20 PM',
      isSystem: true,
    },
    {
      id: 'm2',
      sender: 'SakuraCloud',
      avatar: '🌸',
      content: 'omg the plushies are so kawaii!! I hope we get Boba Bun or Professor Pip! 🥹',
      timestamp: 'Today at 4:21 PM',
      roleColor: '#f472b6',
    },
    {
      id: 'm3',
      sender: 'HypeBeast99',
      avatar: '⚡',
      content: 'DROP THE CLAW LETS GOOO 🕹️',
      timestamp: 'Today at 4:21 PM',
      roleColor: '#f97316',
    },
  ]);

  // When a host is picked from the Claw Machine
  const handleHostSelected = async (host: PlushieHost) => {
    setSelectedHost(host);
    setHostCommentary(host.catchphrases.intro);
    setIsLoadingQuestions(true);
    setGameState('question');
    setCurrentQuestionIndex(0);

    // Add host intro message to chat
    setChatMessages((prev) => [
      ...prev,
      {
        id: `host-intro-${Date.now()}`,
        sender: host.name,
        avatar: host.emoji,
        content: host.catchphrases.intro,
        timestamp: 'Just now',
        roleColor: host.themeColor,
        badge: 'HOST',
      },
    ]);

    try {
      const res = await fetch('/api/trivia/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostId: host.id,
          hostName: host.name,
          category: host.category,
          difficulty: difficulty,
          count: 4,
        }),
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        throw new Error('Fallback to host questions');
      }
    } catch (err) {
      console.warn('Using standard questions due to fetch error:', err);
      // Questions fallback will be handled by server or default
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Simulate co-player answer picks during active question
  useEffect(() => {
    if (gameState !== 'question' || isLoadingQuestions || questions.length === 0) return;

    // Clear previous round picks
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, selectedOption: null }))
    );

    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    // Stagger simulated co-player choices
    const timeouts: NodeJS.Timeout[] = [];
    players.forEach((p) => {
      if (p.isUser) return;

      const delay = Math.floor(1800 + Math.random() * 4500);
      const timer = setTimeout(() => {
        // High chance to pick correct or plausible option
        const shouldBeCorrect = Math.random() > 0.35;
        const pickedOption = shouldBeCorrect
          ? currentQ.correctAnswer
          : Math.floor(Math.random() * 4);

        setPlayers((curr) =>
          curr.map((item) =>
            item.id === p.id ? { ...item, selectedOption: pickedOption } : item
          )
        );

        // Occasional chat banter
        if (Math.random() > 0.6) {
          const banterList = [
            `Locked in! Feeling confident on this one 🧠`,
            `Wait, is that really the answer?! 😭`,
            `Hahaha easy points for me!`,
            `I remember reading this trivia last week!`,
          ];
          const text = banterList[Math.floor(Math.random() * banterList.length)];
          setChatMessages((msgs) => [
            ...msgs,
            {
              id: `banter-${Date.now()}-${p.id}`,
              sender: p.name,
              avatar: p.avatar,
              content: text,
              timestamp: 'Just now',
            },
          ]);
        }
      }, delay);
      timeouts.push(timer);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [currentQuestionIndex, gameState, isLoadingQuestions, questions]);

  // When user submits answer
  const handleAnswerSubmitted = (
    optionIndex: number,
    isCorrect: boolean,
    pointsEarned: number
  ) => {
    // Update user score
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.isUser) {
          return {
            ...p,
            selectedOption: optionIndex,
            score: p.score + pointsEarned,
            streak: isCorrect ? p.streak + 1 : 0,
          };
        }
        // Also award points to simulated players who picked right
        const correctPicks = questions[currentQuestionIndex]?.correctAnswer;
        if (p.selectedOption === correctPicks) {
          return {
            ...p,
            score: p.score + 100 + Math.floor(Math.random() * 50),
            streak: p.streak + 1,
          };
        }
        return p;
      })
    );

    // Pick dynamic host reaction quote
    const currentQ = questions[currentQuestionIndex];
    if (currentQ) {
      if (isCorrect) {
        const pool = selectedHost.catchphrases.correct;
        const quote = pool[Math.floor(Math.random() * pool.length)];
        setHostCommentary(quote);
      } else {
        const pool = selectedHost.catchphrases.wrong;
        const quote = pool[Math.floor(Math.random() * pool.length)];
        setHostCommentary(quote);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      const idlePool = selectedHost.catchphrases.idle;
      setHostCommentary(idlePool[Math.floor(Math.random() * idlePool.length)]);
    } else {
      setGameState('victory_podium');
    }
  };

  // Chat message send handler
  const handleSendMessage = (content: string) => {
    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'You',
      avatar: '👾',
      content,
      timestamp: 'Just now',
      roleColor: '#5865F2',
      badge: 'PRO',
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Host occasionally replies to user chat
    if (content.includes('?') || content.length > 10) {
      setTimeout(() => {
        const replies = [
          `${selectedHost.name} says: "I hear you, senpai! Keep that energy up!"`,
          `${selectedHost.name} says: "Haha yes! Focus your mind, victory awaits!"`,
          `${selectedHost.name} says: "Aww that's so cute! Now let's conquer this quiz!"`,
        ];
        const hostReply: ChatMessage = {
          id: `reply-${Date.now()}`,
          sender: selectedHost.name,
          avatar: selectedHost.emoji,
          content: replies[Math.floor(Math.random() * replies.length)],
          timestamp: 'Just now',
          roleColor: selectedHost.themeColor,
          badge: 'HOST',
        };
        setChatMessages((prev) => [...prev, hostReply]);
        sound.discordPing();
      }, 1000);
    }
  };

  const userPlayer = players.find((p) => p.isUser) || players[0];

  return (
    <div className="min-h-screen bg-[#1e1f22] text-[#dbdee1] flex flex-col justify-between selection:bg-[#5865F2] selection:text-white">
      {/* Top Discord Header */}
      <DiscordHeader
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        isVoiceConnected={isVoiceModalOpen}
        activePlayersCount={players.length}
        roomCode={roomCode}
        onOpenLobby={() => setIsLobbyModalOpen(true)}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-[#2b2d31] bg-[#232428] px-4 py-1.5 justify-around text-xs font-bold">
        <button
          onClick={() => setActiveTabMobile('game')}
          className={`flex items-center gap-1.5 py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            activeTabMobile === 'game' ? 'bg-[#5865F2] text-white' : 'text-[#949ba4]'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Arcade Quiz</span>
        </button>

        <button
          onClick={() => setActiveTabMobile('chat')}
          className={`flex items-center gap-1.5 py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            activeTabMobile === 'chat' ? 'bg-[#5865F2] text-white' : 'text-[#949ba4]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Party Chat ({chatMessages.length})</span>
        </button>
      </div>

      {/* Main Gameplay Shell */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left/Center Game Area (Col 1-8/9) */}
        <div
          className={`lg:col-span-8 xl:col-span-9 w-full flex flex-col items-center ${
            activeTabMobile === 'chat' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* STATE 1: CLAW MACHINE PICKER */}
          {gameState === 'claw_picker' && (
            <ClawMachine
              onHostSelected={handleHostSelected}
              selectedHost={selectedHost}
            />
          )}

          {/* STATE 2: TRIVIA ARENA */}
          {gameState === 'question' && (
            <div className="w-full space-y-4">
              {/* Host Stage Bar */}
              <HostStage
                host={selectedHost}
                currentCommentary={hostCommentary}
                onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
                onReturnToClaw={() => setGameState('claw_picker')}
              />

              {/* Questions Loader */}
              {isLoadingQuestions ? (
                <div className="w-full bg-[#2b2d31] rounded-2xl p-12 border border-[#35373c] text-center flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-8 h-8 text-[#5865F2] animate-spin" />
                  <div className="text-base font-extrabold text-white font-arcade">
                    {selectedHost.name} is Gathering Grounded Trivia...
                  </div>
                  <p className="text-xs text-[#949ba4] max-w-sm">
                    Connecting to Google Search via <code className="text-[#5865F2]">gemini-3.5-flash</code> to fetch fresh, verified facts for {selectedHost.category}!
                  </p>
                </div>
              ) : questions.length > 0 ? (
                <TriviaArena
                  host={selectedHost}
                  questions={questions}
                  currentIndex={currentQuestionIndex}
                  players={players}
                  userScore={userPlayer.score}
                  userStreak={userPlayer.streak}
                  onAnswerSubmitted={handleAnswerSubmitted}
                  onNextQuestion={handleNextQuestion}
                  isLastQuestion={currentQuestionIndex + 1 >= questions.length}
                />
              ) : (
                <div className="p-8 text-center text-xs text-[#949ba4]">
                  No questions loaded. Tap back to Claw Machine to re-roll!
                </div>
              )}
            </div>
          )}

          {/* STATE 3: VICTORY PODIUM */}
          {gameState === 'victory_podium' && (
            <VictoryPodium
              players={players}
              host={selectedHost}
              onPlayAgain={() => {
                setGameState('question');
                setCurrentQuestionIndex(0);
                handleHostSelected(selectedHost);
              }}
              onReturnToClaw={() => setGameState('claw_picker')}
            />
          )}
        </div>

        {/* Right Sidebar: Party Leaderboard & Live Discord Chat Feed (Col 9-12) */}
        <div
          className={`lg:col-span-4 xl:col-span-3 w-full flex flex-col space-y-4 ${
            activeTabMobile === 'game' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Party Leaderboard Card */}
          <div className="bg-[#2b2d31] rounded-2xl p-4 border border-[#35373c] shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#fee75c]" />
                Party Scoreboard
              </span>
              <span className="text-[10px] text-[#949ba4] font-semibold">
                Room #{roomCode}
              </span>
            </div>

            <div className="space-y-2">
              {[...players]
                .sort((a, b) => b.score - a.score)
                .map((p, rank) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs border transition-all ${
                      p.isUser
                        ? 'bg-[#5865F2]/20 border-[#5865F2]/50 text-white font-bold'
                        : 'bg-[#1e1f22] border-[#35373c] text-[#dbdee1]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black w-3 text-[#949ba4]">
                        {rank + 1}
                      </span>
                      <span className="text-base">{p.avatar}</span>
                      <span className="truncate max-w-[90px]">{p.name}</span>
                      {p.streak > 1 && (
                        <span className="text-[9px] text-amber-400 font-extrabold">
                          🔥{p.streak}
                        </span>
                      )}
                    </div>
                    <span className="font-extrabold text-[#57F287]">{p.score} pts</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Discord Text Chat Feed */}
          <div className="h-[420px] lg:h-[480px]">
            <DiscordChatFeed
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              activeHost={selectedHost}
              players={players}
            />
          </div>
        </div>
      </main>

      {/* Footer credits / Discord Activity signature */}
      <footer className="bg-[#18191c] border-t border-[#2b2d31] py-2 px-4 text-center text-[11px] text-[#949ba4] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-arcade font-bold text-white">ClawPop</span>
          <span>• Claw Machine Arcade Trivia</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-pink-400">TTS: gemini-3.8-flash-tts</span>
          <span>•</span>
          <span className="text-[#57F287]">Live API: gemini-3.8-live</span>
          <span>•</span>
          <span className="text-[#5865F2]">Search: gemini-3.5-flash</span>
        </div>
      </footer>

      {/* Live Voice Stage Modal */}
      <LiveVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        host={selectedHost}
        players={players}
      />

      {/* Party Lobby Modal */}
      <MultiplayerLobbyModal
        isOpen={isLobbyModalOpen}
        onClose={() => setIsLobbyModalOpen(false)}
        roomCode={roomCode}
        players={players}
        difficulty={difficulty}
        onSetDifficulty={setDifficulty}
        onAddBotPlayer={() => {
          const botNames = ['NeonViper', 'OtakuSensei', 'ChocoboRider', 'MochiKing'];
          const avatars = ['👾', '🦊', '🐱', '🐸', '🐼'];
          const nextName = botNames[Math.floor(Math.random() * botNames.length)] + Math.floor(Math.random() * 99);
          setPlayers((prev) => [
            ...prev,
            {
              id: `p-${Date.now()}`,
              name: nextName,
              avatar: avatars[Math.floor(Math.random() * avatars.length)],
              score: 0,
              streak: 0,
              isUser: false,
              isHost: false,
              selectedOption: null,
              status: 'online',
              tag: '#' + Math.floor(1000 + Math.random() * 9000),
            },
          ]);
        }}
        onRemovePlayer={(id) => {
          setPlayers((prev) => prev.filter((p) => p.id !== id));
        }}
      />
    </div>
  );
}
