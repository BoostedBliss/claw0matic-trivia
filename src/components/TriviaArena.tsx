import React, { useState, useEffect } from 'react';
import { PlushieHost, TriviaQuestion, Player } from '../types';
import { sound, playAudioFromBase64 } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Timer, 
  Sparkles, 
  Globe, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Flame, 
  Volume2, 
  HelpCircle,
  Award
} from 'lucide-react';

interface TriviaArenaProps {
  host: PlushieHost;
  questions: TriviaQuestion[];
  currentIndex: number;
  players: Player[];
  userScore: number;
  userStreak: number;
  onAnswerSubmitted: (optionIndex: number, isCorrect: boolean, pointsEarned: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export const TriviaArena: React.FC<TriviaArenaProps> = ({
  host,
  questions,
  currentIndex,
  players,
  userScore,
  userStreak,
  onAnswerSubmitted,
  onNextQuestion,
  isLastQuestion,
}) => {
  const currentQ = questions[currentIndex] || questions[0];

  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isPlayingTTS, setIsPlayingTTS] = useState<boolean>(false);

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(15);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentIndex]);

  // Countdown timer
  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 4 && prev > 1) {
          sound.timerTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    sound.wrongAnswer();
    onAnswerSubmitted(-1, false, 0);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctAnswer;

    if (isCorrect) {
      sound.correctAnswer();
      const speedBonus = timeLeft * 10;
      const streakBonus = (userStreak + 1) * 25;
      const totalPoints = 100 + speedBonus + streakBonus;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: [host.themeColor, '#5865F2', '#FEE75C', '#57F287'],
      });

      onAnswerSubmitted(index, true, totalPoints);
    } else {
      sound.wrongAnswer();
      onAnswerSubmitted(index, false, 0);
    }
  };

  // Play host commentary via TTS
  const playHostCommentaryTTS = async () => {
    try {
      setIsPlayingTTS(true);
      const textToSpeak = isAnswered
        ? currentQ.funHostCommentary
        : currentQ.question;

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak,
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
    } finally {
      setIsPlayingTTS(false);
    }
  };

  return (
    <div className="w-full bg-[#2b2d31] border border-[#35373c] rounded-2xl p-5 shadow-2xl relative">
      {/* Top Bar: Progress, Streak & Timer */}
      <div className="flex items-center justify-between pb-4 border-b border-[#35373c]">
        {/* Question Counter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-[#949ba4] uppercase tracking-wider">
            Round
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#1e1f22] text-white text-xs font-black border border-[#35373c]">
            {currentIndex + 1} / {questions.length}
          </span>

          {userStreak > 1 && (
            <span className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold px-2 py-0.5 rounded-full animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {userStreak}x STREAK
            </span>
          )}
        </div>

        {/* Current Score */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[10px] text-[#949ba4] block uppercase font-bold">Party Score</span>
            <span className="text-sm font-extrabold text-[#57F287]">{userScore} pts</span>
          </div>

          {/* Timer Clock */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono-code font-bold text-sm ${
              timeLeft <= 4
                ? 'bg-[#ed4245]/20 text-[#ed4245] border border-[#ed4245]/50 animate-bounce'
                : 'bg-[#1e1f22] text-white border border-[#35373c]'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Timer Progress Bar */}
      <div className="w-full h-1.5 bg-[#1e1f22] rounded-full overflow-hidden mt-3 mb-5">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            timeLeft <= 4 ? 'bg-[#ed4245]' : 'bg-[#5865F2]'
          }`}
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        ></div>
      </div>

      {/* Main Question Box */}
      <div className="bg-[#1e1f22] rounded-2xl p-5 border border-[#35373c] shadow-inner mb-6 relative">
        <div className="flex items-center justify-between text-xs text-[#949ba4] mb-2">
          <span className="flex items-center gap-1 font-bold text-[#f472b6]">
            <span>{host.emoji}</span>
            <span>{host.category} Question</span>
          </span>

          <button
            onClick={playHostCommentaryTTS}
            className="text-xs text-[#5865F2] hover:text-[#7983f5] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Listen to question via Gemini TTS"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isPlayingTTS ? 'Playing audio...' : 'Listen'}</span>
          </button>
        </div>

        <h2 className="text-lg md:text-xl font-bold text-white leading-snug">
          {currentQ.question}
        </h2>
      </div>

      {/* 4 Multiple Choice Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correctAnswer;

          let btnStyle = 'bg-[#2b2d31] hover:bg-[#313338] border-[#383a40] text-[#dbdee1]';

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'bg-[#57F287]/20 border-[#57F287] text-white shadow-md shadow-emerald-500/20';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-[#ed4245]/20 border-[#ed4245] text-white shadow-md shadow-rose-500/20';
            } else {
              btnStyle = 'bg-[#1e1f22]/60 border-[#2b2d31] text-[#949ba4] opacity-50';
            }
          }

          // Simulated co-players who chose this option
          const partyPicks = players.filter(
            (p) => !p.isUser && p.selectedOption === idx
          );

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`p-4 rounded-xl border-2 text-left transition-all relative flex items-start gap-3 cursor-pointer ${btnStyle} ${
                !isAnswered ? 'active:scale-[0.98]' : ''
              }`}
            >
              {/* Option Key Letter A, B, C, D */}
              <div
                className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center flex-shrink-0 border ${
                  isAnswered && isCorrect
                    ? 'bg-[#57F287] text-black border-[#57F287]'
                    : isAnswered && isSelected && !isCorrect
                    ? 'bg-[#ed4245] text-white border-[#ed4245]'
                    : 'bg-[#1e1f22] text-[#949ba4] border-[#35373c]'
                }`}
              >
                {OPTION_LABELS[idx]}
              </div>

              {/* Option text */}
              <div className="flex-1 font-semibold text-sm leading-snug pt-0.5">
                {option}
              </div>

              {/* Status Icons */}
              {isAnswered && isCorrect && (
                <CheckCircle className="w-5 h-5 text-[#57F287] flex-shrink-0 animate-bounce" />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-[#ed4245] flex-shrink-0" />
              )}

              {/* Party Member Co-Picks Badges */}
              {partyPicks.length > 0 && (
                <div className="absolute -top-2.5 right-3 flex -space-x-1.5">
                  {partyPicks.map((coPlayer) => (
                    <div
                      key={coPlayer.id}
                      className="w-5 h-5 rounded-full bg-[#1e1f22] border-2 border-[#5865F2] flex items-center justify-center text-[10px] text-white shadow"
                      title={`${coPlayer.name} picked ${OPTION_LABELS[idx]}`}
                    >
                      {coPlayer.avatar}
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation & Google Search Grounding Citation */}
      {isAnswered && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Explanation Box */}
          <div className="bg-[#1e1f22] rounded-xl p-4 border border-[#35373c] text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#5865F2]" />
                Fact Breakdown
              </span>

              {currentQ.searchGroundingSource && (
                <span className="text-[10px] text-[#5865F2] bg-[#5865F2]/10 border border-[#5865F2]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Verified: {currentQ.searchGroundingSource}
                </span>
              )}
            </div>

            <p className="text-[#dbdee1] leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>

          {/* Host Reaction Quote */}
          {currentQ.funHostCommentary && (
            <div className="bg-[#232428] rounded-xl p-3 border border-pink-500/20 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">{host.emoji}</span>
                <span className="text-pink-300 italic font-medium">
                  "{currentQ.funHostCommentary}"
                </span>
              </div>

              <button
                onClick={playHostCommentaryTTS}
                className="p-1.5 rounded-lg bg-[#313338] hover:bg-[#383a40] text-pink-300 transition-colors flex-shrink-0 cursor-pointer"
                title="Play Host voice line"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Next Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onNextQuestion}
              className="px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{isLastQuestion ? 'View Victory Podium' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
