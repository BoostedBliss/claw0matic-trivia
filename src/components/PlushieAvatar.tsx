import React from 'react';
import { PlushieHost } from '../types';

interface PlushieAvatarProps {
  host: PlushieHost;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  emotion?: 'idle' | 'speaking' | 'happy' | 'sad';
  showAura?: boolean;
  className?: string;
}

export const PlushieAvatar: React.FC<PlushieAvatarProps> = ({
  host,
  size = 'md',
  emotion = 'idle',
  showAura = true,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20 text-2xl',
    md: 'w-24 h-24 sm:w-28 sm:h-28 text-3xl',
    lg: 'w-36 h-36 sm:w-40 sm:h-40 text-5xl',
    xl: 'w-48 h-48 sm:w-56 sm:h-56 text-6xl',
  };

  const getCustomPlushieSVG = () => {
    switch (host.id) {
      case 'boba-bun':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Bunny Ears */}
            <div className="absolute -top-3 left-3 w-4 h-9 bg-pink-300 rounded-full border-2 border-pink-400 rotate-[-15deg] flex items-center justify-center">
              <div className="w-2 h-6 bg-pink-200 rounded-full"></div>
            </div>
            <div className="absolute -top-3 right-3 w-4 h-9 bg-pink-300 rounded-full border-2 border-pink-400 rotate-[15deg] flex items-center justify-center">
              <div className="w-2 h-6 bg-pink-200 rounded-full"></div>
            </div>
            {/* Round Head */}
            <div className="w-4/5 h-4/5 bg-pink-100 rounded-full border-3 border-pink-400 flex flex-col items-center justify-center shadow-inner relative">
              {/* Eyes */}
              <div className="flex space-x-4 mb-1">
                <div className="w-2.5 h-3 bg-neutral-800 rounded-full relative">
                  <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
                <div className="w-2.5 h-3 bg-neutral-800 rounded-full relative">
                  <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              {/* Cheeks */}
              <div className="flex justify-between w-3/4 absolute px-1 top-1/2">
                <div className="w-2.5 h-1.5 bg-rose-400/60 rounded-full"></div>
                <div className="w-2.5 h-1.5 bg-rose-400/60 rounded-full"></div>
              </div>
              {/* Mouth */}
              <div className={`transition-all ${emotion === 'speaking' ? 'w-3 h-2.5 bg-rose-500 rounded-full' : 'text-neutral-700 text-xs font-bold'}`}>
                {emotion === 'speaking' ? '' : 'ω'}
              </div>
            </div>
            {/* Boba Cup in hands */}
            <div className="absolute -bottom-1 right-1 text-base filter drop-shadow">🧋</div>
          </div>
        );

      case 'prof-pip':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Axolotl Feathery Gills */}
            <div className="absolute -left-2 top-2 flex flex-col space-y-1">
              <div className="w-4 h-2 bg-pink-400 rounded-full rotate-[-20deg]"></div>
              <div className="w-5 h-2 bg-pink-400 rounded-full rotate-[-10deg]"></div>
              <div className="w-4 h-2 bg-pink-400 rounded-full rotate-[10deg]"></div>
            </div>
            <div className="absolute -right-2 top-2 flex flex-col space-y-1">
              <div className="w-4 h-2 bg-pink-400 rounded-full rotate-[20deg]"></div>
              <div className="w-5 h-2 bg-pink-400 rounded-full rotate-[10deg]"></div>
              <div className="w-4 h-2 bg-pink-400 rounded-full rotate-[-10deg]"></div>
            </div>
            {/* Body */}
            <div className="w-4/5 h-4/5 bg-sky-100 rounded-full border-3 border-sky-400 flex flex-col items-center justify-center shadow-inner relative">
              {/* Spectacles */}
              <div className="flex items-center space-x-1 mb-1">
                <div className="w-4 h-4 border-2 border-amber-600 rounded-full flex items-center justify-center bg-sky-200/40">
                  <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full"></div>
                </div>
                <div className="w-1.5 h-0.5 bg-amber-600"></div>
                <div className="w-4 h-4 border-2 border-amber-600 rounded-full flex items-center justify-center bg-sky-200/40">
                  <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full"></div>
                </div>
              </div>
              {/* Axolotl wide smile */}
              <div className={`transition-all ${emotion === 'speaking' ? 'w-3 h-2 bg-rose-400 rounded-full' : 'text-neutral-700 text-xs font-bold'}`}>
                {emotion === 'speaking' ? '' : '‿'}
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">🧪</div>
          </div>
        );

      case 'dj-meow':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Neon Headphones */}
            <div className="absolute top-0 w-full h-8 border-t-4 border-purple-500 rounded-t-full z-10"></div>
            <div className="absolute left-0 top-3 w-3 h-6 bg-purple-600 border border-purple-400 rounded-md z-10 shadow-lg shadow-purple-500/50"></div>
            <div className="absolute right-0 top-3 w-3 h-6 bg-purple-600 border border-purple-400 rounded-md z-10 shadow-lg shadow-purple-500/50"></div>
            {/* Cat Ears */}
            <div className="absolute -top-1 left-3 w-4 h-4 bg-purple-300 border-2 border-purple-500 rotate-45"></div>
            <div className="absolute -top-1 right-3 w-4 h-4 bg-purple-300 border-2 border-purple-500 rotate-45"></div>
            {/* Face */}
            <div className="w-4/5 h-4/5 bg-purple-100 rounded-full border-3 border-purple-400 flex flex-col items-center justify-center relative">
              {/* Neon Sunglasses or Eyes */}
              <div className="w-3/4 h-3 bg-neutral-900 rounded-sm border border-cyan-400 flex items-center justify-around px-1 mb-1 shadow-sm shadow-cyan-400/50">
                <div className="w-2 h-1 bg-cyan-300 rounded-xs"></div>
                <div className="w-2 h-1 bg-pink-400 rounded-xs"></div>
              </div>
              <div className="text-[10px] text-neutral-800 font-bold">
                {emotion === 'speaking' ? 'O' : '3'}
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">💿</div>
          </div>
        );

      case 'sir-reginald':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Bear Ears */}
            <div className="absolute -top-1 left-2 w-5 h-5 bg-amber-700 rounded-full border-2 border-amber-900 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
            </div>
            <div className="absolute -top-1 right-2 w-5 h-5 bg-amber-700 rounded-full border-2 border-amber-900 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
            </div>
            {/* Face */}
            <div className="w-4/5 h-4/5 bg-amber-100 rounded-full border-3 border-amber-600 flex flex-col items-center justify-center relative">
              {/* Monocle on right eye */}
              <div className="flex items-center space-x-3 mb-1">
                <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                <div className="w-4 h-4 border-2 border-yellow-500 rounded-full bg-yellow-200/30 flex items-center justify-center relative">
                  <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                  <div className="absolute -bottom-2 right-1 w-0.5 h-3 bg-yellow-600"></div>
                </div>
              </div>
              {/* Snout */}
              <div className="w-5 h-3.5 bg-amber-200 rounded-full flex flex-col items-center justify-center border border-amber-300">
                <div className="w-2 h-1 bg-neutral-800 rounded-full"></div>
                <div className="text-[9px] leading-none text-neutral-800 font-bold">
                  {emotion === 'speaking' ? 'o' : '人'}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">☕</div>
          </div>
        );

      case 'matcha-mochi':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Lotus Leaf Hat */}
            <div className="absolute -top-3 w-10 h-3 bg-emerald-600 rounded-full border border-emerald-400 z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></div>
            </div>
            {/* Frog Eyes on Top */}
            <div className="absolute -top-1 left-3 w-5 h-5 bg-green-400 rounded-full border-2 border-green-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
            </div>
            <div className="absolute -top-1 right-3 w-5 h-5 bg-green-400 rounded-full border-2 border-green-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
            </div>
            {/* Body */}
            <div className="w-4/5 h-4/5 bg-green-100 rounded-full border-3 border-green-500 flex flex-col items-center justify-center relative">
              <div className="flex space-x-4 mb-1">
                <div className="w-2 h-1 bg-emerald-400 rounded-full"></div>
                <div className="w-2 h-1 bg-emerald-400 rounded-full"></div>
              </div>
              <div className={`transition-all ${emotion === 'speaking' ? 'w-3 h-2 bg-emerald-600 rounded-full' : 'text-neutral-800 text-xs font-semibold'}`}>
                {emotion === 'speaking' ? '' : '‿'}
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">🍡</div>
          </div>
        );

      case 'sparky-bolt':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Fox Ears */}
            <div className="absolute -top-2 left-2 w-5 h-6 bg-orange-500 rounded-tr-xl border-2 border-orange-600 rotate-[-15deg] flex items-center justify-center">
              <div className="w-2 h-3 bg-amber-100 rounded-tr-lg"></div>
            </div>
            <div className="absolute -top-2 right-2 w-5 h-6 bg-orange-500 rounded-tl-xl border-2 border-orange-600 rotate-[15deg] flex items-center justify-center">
              <div className="w-2 h-3 bg-amber-100 rounded-tl-lg"></div>
            </div>
            {/* Body */}
            <div className="w-4/5 h-4/5 bg-orange-100 rounded-full border-3 border-orange-500 flex flex-col items-center justify-center relative">
              {/* Cyber Goggles */}
              <div className="w-4/5 h-4 bg-neutral-900 border-2 border-amber-400 rounded-lg flex items-center justify-around px-1 mb-1 shadow-sm shadow-amber-400/50">
                <div className="w-2.5 h-2 bg-amber-300 rounded-xs animate-pulse"></div>
                <div className="w-2.5 h-2 bg-amber-300 rounded-xs animate-pulse"></div>
              </div>
              {/* Tiny Fox Nose & Mouth */}
              <div className="w-1.5 h-1 bg-neutral-800 rounded-full mb-0.5"></div>
              <div className={`transition-all ${emotion === 'speaking' ? 'w-2.5 h-2 bg-orange-600 rounded-full' : 'text-neutral-800 text-[9px] font-bold'}`}>
                {emotion === 'speaking' ? '' : '∇'}
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">⚡</div>
          </div>
        );

      case 'chocola-bear':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Chef Toque Hat */}
            <div className="absolute -top-3 w-8 h-6 bg-white rounded-t-full border-2 border-amber-300 z-10 flex items-center justify-center shadow-sm">
              <div className="w-1 h-3 bg-amber-100 rounded-full"></div>
            </div>
            {/* Bear Ears */}
            <div className="absolute -top-1 left-2 w-4 h-4 bg-amber-800 rounded-full border-2 border-amber-950 flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            </div>
            <div className="absolute -top-1 right-2 w-4 h-4 bg-amber-800 rounded-full border-2 border-amber-950 flex items-center justify-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            </div>
            {/* Body */}
            <div className="w-4/5 h-4/5 bg-amber-700 rounded-full border-3 border-amber-950 flex flex-col items-center justify-center relative shadow-inner">
              <div className="flex space-x-3 mb-1">
                <div className="w-2 h-2 bg-amber-950 rounded-full"></div>
                <div className="w-2 h-2 bg-amber-950 rounded-full"></div>
              </div>
              <div className="w-5 h-3 bg-amber-400 rounded-full flex flex-col items-center justify-center">
                <div className="w-1.5 h-1 bg-amber-950 rounded-full"></div>
                <div className="text-[8px] leading-none text-amber-950 font-bold">
                  {emotion === 'speaking' ? 'o' : 'w'}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">🧁</div>
          </div>
        );

      case 'captain-squid':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Pirate Tricorn Hat */}
            <div className="absolute -top-3 w-12 h-5 bg-neutral-900 border-2 border-amber-400 rounded-t-lg z-10 flex items-center justify-center">
              <span className="text-[9px] text-amber-300 font-bold">☠️</span>
            </div>
            {/* Squid Head */}
            <div className="w-4/5 h-4/5 bg-cyan-300 rounded-t-full rounded-b-xl border-3 border-cyan-600 flex flex-col items-center justify-center relative">
              <div className="flex space-x-2 mb-1 items-center">
                {/* Pirate Eye Patch */}
                <div className="w-3.5 h-3.5 bg-neutral-900 rounded-sm border border-neutral-700 flex items-center justify-center">
                  <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
                </div>
                {/* Open Eye */}
                <div className="w-3 h-3 bg-neutral-900 rounded-full relative">
                  <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              {/* Tentacles below */}
              <div className="flex space-x-0.5 absolute -bottom-2">
                <div className="w-1.5 h-3 bg-cyan-400 rounded-full rotate-[-15deg]"></div>
                <div className="w-1.5 h-3.5 bg-cyan-400 rounded-full"></div>
                <div className="w-1.5 h-3 bg-cyan-400 rounded-full rotate-[15deg]"></div>
              </div>
              <div className={`transition-all ${emotion === 'speaking' ? 'w-2 h-2 bg-cyan-800 rounded-full' : 'text-neutral-900 text-xs font-bold'}`}>
                {emotion === 'speaking' ? '' : '~'}
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">⚓</div>
          </div>
        );

      case 'pixel-pup':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Shiba Ears */}
            <div className="absolute -top-2 left-2 w-4 h-5 bg-amber-400 border-2 border-amber-600 rotate-[-15deg]"></div>
            <div className="absolute -top-2 right-2 w-4 h-5 bg-amber-400 border-2 border-amber-600 rotate-[15deg]"></div>
            {/* Body */}
            <div className="w-4/5 h-4/5 bg-amber-300 rounded-xl border-3 border-amber-600 flex flex-col items-center justify-center relative">
              {/* 8-bit Pixel Shades */}
              <div className="w-3/4 h-3 bg-neutral-950 border border-neutral-800 flex items-center justify-around px-0.5 mb-1 shadow-sm">
                <div className="w-2 h-1 bg-white"></div>
                <div className="w-2 h-1 bg-white"></div>
              </div>
              {/* White muzzle */}
              <div className="w-5 h-3 bg-amber-100 rounded flex flex-col items-center justify-center">
                <div className="w-1.5 h-1 bg-neutral-900 rounded-xs"></div>
                <div className="text-[8px] font-bold text-neutral-900 leading-none">
                  {emotion === 'speaking' ? 'O' : '▼'}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">💾</div>
          </div>
        );

      case 'luna-moth':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Fairy Wings */}
            <div className="absolute -left-3 top-1 w-6 h-9 bg-indigo-300/80 rounded-full border border-indigo-400 rotate-[-25deg] shadow-sm"></div>
            <div className="absolute -right-3 top-1 w-6 h-9 bg-indigo-300/80 rounded-full border border-indigo-400 rotate-[25deg] shadow-sm"></div>
            {/* Antennae */}
            <div className="absolute -top-3 flex space-x-4">
              <div className="w-0.5 h-3 bg-indigo-400 rotate-[-20deg] flex items-start">
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
              </div>
              <div className="w-0.5 h-3 bg-indigo-400 rotate-[20deg] flex items-start">
                <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
              </div>
            </div>
            {/* Moth Head & Body */}
            <div className="w-3/5 h-4/5 bg-indigo-100 rounded-full border-2 border-indigo-400 flex flex-col items-center justify-center relative z-10">
              <div className="flex space-x-2 mb-1">
                <div className="w-2 h-2.5 bg-indigo-900 rounded-full relative">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
                <div className="w-2 h-2.5 bg-indigo-900 rounded-full relative">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              <div className="text-[9px] text-indigo-700 font-bold">
                {emotion === 'speaking' ? 'o' : 'v'}
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">🌙</div>
          </div>
        );

      case 'ninja-panda':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Panda Ears */}
            <div className="absolute -top-1 left-2 w-4 h-4 bg-neutral-900 rounded-full"></div>
            <div className="absolute -top-1 right-2 w-4 h-4 bg-neutral-900 rounded-full"></div>
            {/* Ninja Headband */}
            <div className="absolute top-1 w-full h-3 bg-rose-600 rounded-sm z-10 flex items-center justify-center">
              <div className="w-2 h-1.5 bg-amber-300 rounded-xs"></div>
            </div>
            {/* Body */}
            <div className="w-4/5 h-4/5 bg-neutral-100 rounded-full border-3 border-neutral-900 flex flex-col items-center justify-center relative shadow-inner">
              <div className="flex space-x-2 mt-2 mb-1">
                {/* Black eye patches */}
                <div className="w-3 h-2.5 bg-neutral-900 rounded-full rotate-[-15deg] flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                <div className="w-3 h-2.5 bg-neutral-900 rounded-full rotate-[15deg] flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="w-1.5 h-1 bg-neutral-900 rounded-full"></div>
              <div className={`transition-all ${emotion === 'speaking' ? 'w-2 h-2 bg-rose-500 rounded-full' : 'text-neutral-900 text-xs font-bold'}`}>
                {emotion === 'speaking' ? '' : '‿'}
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">🎋</div>
          </div>
        );

      case 'dino-nugget':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Ketchup Crown */}
            <div className="absolute -top-2 flex space-x-0.5 z-10">
              <div className="w-2 h-3 bg-rose-600 rounded-t-full"></div>
              <div className="w-2 h-4 bg-rose-600 rounded-t-full"></div>
              <div className="w-2 h-3 bg-rose-600 rounded-t-full"></div>
            </div>
            {/* T-Rex Golden Nugget Body */}
            <div className="w-4/5 h-4/5 bg-amber-400 rounded-2xl border-3 border-amber-600 flex flex-col items-center justify-center relative shadow-inner">
              <div className="flex space-x-3 mb-1">
                <div className="w-2 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
                <div className="w-2 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              {/* Sharp Dino Teeth */}
              <div className="flex space-x-0.5">
                <div className="w-1 h-1.5 bg-white border border-neutral-700"></div>
                <div className="w-1 h-1.5 bg-white border border-neutral-700"></div>
                <div className="w-1 h-1.5 bg-white border border-neutral-700"></div>
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">🦖</div>
          </div>
        );

      case 'neon-shiba':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -top-2 left-2 w-4 h-5 bg-cyan-400 border-2 border-cyan-600 rotate-[-15deg]"></div>
            <div className="absolute -top-2 right-2 w-4 h-5 bg-cyan-400 border-2 border-cyan-600 rotate-[15deg]"></div>
            <div className="w-4/5 h-4/5 bg-slate-900 rounded-xl border-2 border-cyan-400 flex flex-col items-center justify-center relative shadow-[0_0_12px_rgba(6,182,212,0.6)]">
              <div className="w-3/4 h-3 bg-cyan-400/30 border border-cyan-300 flex items-center justify-around px-0.5 mb-1">
                <div className="w-2 h-1 bg-cyan-200"></div>
                <div className="w-2 h-1 bg-pink-400"></div>
              </div>
              <div className="text-[9px] font-bold text-cyan-300">
                {emotion === 'speaking' ? 'O' : '3'}
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">💾</div>
          </div>
        );

      case 'marshmallow-seal':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-5/6 h-4/5 bg-sky-50 rounded-full border-3 border-sky-300 flex flex-col items-center justify-center relative shadow-inner">
              <div className="flex space-x-3 mb-1">
                <div className="w-2 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
                <div className="w-2 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              <div className="flex justify-between w-3/4 absolute px-1 top-1/2">
                <div className="w-2.5 h-1.5 bg-pink-300 rounded-full"></div>
                <div className="w-2.5 h-1.5 bg-pink-300 rounded-full"></div>
              </div>
              <div className="text-[10px] text-neutral-800 font-bold">
                {emotion === 'speaking' ? 'o' : 'ω'}
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">❄️</div>
          </div>
        );

      case 'spicy-ramen-pig':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -top-3 w-10 h-5 bg-red-600 rounded-t-full border border-amber-300 z-10 flex items-center justify-center">
              <span className="text-[8px] text-amber-200 font-bold">🍥</span>
            </div>
            <div className="w-4/5 h-4/5 bg-pink-200 rounded-full border-3 border-pink-400 flex flex-col items-center justify-center relative">
              <div className="flex space-x-3 mb-1 mt-1">
                <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
              </div>
              <div className="w-4 h-2.5 bg-pink-300 rounded-full flex items-center justify-center border border-pink-400">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-neutral-800 rounded-full"></div>
                  <div className="w-1 h-1 bg-neutral-800 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">🥢</div>
          </div>
        );

      case 'galaxy-cat':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute top-1 w-full h-2 border-t-2 border-purple-400 rounded-t-full -rotate-12 z-20"></div>
            <div className="absolute -top-2 left-2 w-4 h-4 bg-purple-600 border border-purple-300 rotate-45"></div>
            <div className="absolute -top-2 right-2 w-4 h-4 bg-purple-600 border border-purple-300 rotate-45"></div>
            <div className="w-4/5 h-4/5 bg-gradient-to-tr from-indigo-900 to-purple-600 rounded-full border-2 border-fuchsia-300 flex flex-col items-center justify-center relative shadow-lg">
              <div className="flex space-x-3 mb-1">
                <div className="w-2.5 h-2.5 bg-yellow-200 rounded-full animate-pulse"></div>
                <div className="w-2.5 h-2.5 bg-yellow-200 rounded-full animate-pulse"></div>
              </div>
              <div className="text-[10px] text-pink-200 font-bold">
                {emotion === 'speaking' ? 'O' : '3'}
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">🪐</div>
          </div>
        );

      case 'wizard-owl':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -top-4 w-8 h-8 bg-indigo-900 border border-amber-400 rotate-45 z-10 flex items-center justify-center">
              <span className="text-[8px] text-yellow-300">⭐</span>
            </div>
            <div className="w-4/5 h-4/5 bg-amber-900 rounded-full border-3 border-amber-700 flex flex-col items-center justify-center relative">
              <div className="flex space-x-2 mb-1">
                <div className="w-4 h-4 rounded-full border-2 border-amber-400 bg-yellow-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-amber-400 bg-yellow-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                </div>
              </div>
              <div className="w-2 h-2 bg-amber-500 rotate-45"></div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">🪄</div>
          </div>
        );

      case 'berry-bunny':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -top-3 w-8 h-4 bg-emerald-600 rounded-full z-10 flex items-center justify-center">
              <div className="w-1 h-2 bg-emerald-300 rounded-full"></div>
            </div>
            <div className="w-4/5 h-4/5 bg-rose-300 rounded-full border-3 border-rose-500 flex flex-col items-center justify-center relative">
              <div className="flex space-x-3 mb-1">
                <div className="w-2 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
                <div className="w-2 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              <div className="text-[9px] text-rose-950 font-bold">
                {emotion === 'speaking' ? 'o' : 'ω'}
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">🍓</div>
          </div>
        );

      case 'steampunk-otter':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -top-1 left-2 w-4 h-4 bg-yellow-600 border border-amber-900 rounded-full"></div>
            <div className="absolute -top-1 right-2 w-4 h-4 bg-yellow-600 border border-amber-900 rounded-full"></div>
            <div className="w-4/5 h-4/5 bg-amber-800 rounded-full border-3 border-yellow-600 flex flex-col items-center justify-center relative">
              <div className="flex space-x-2 mb-1 items-center">
                <div className="w-3 h-3 bg-neutral-900 rounded-full"></div>
                <div className="w-4 h-4 rounded-full border-2 border-yellow-400 bg-yellow-200/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></div>
                </div>
              </div>
              <div className="text-[9px] text-amber-200 font-bold">
                {emotion === 'speaking' ? 'O' : '人'}
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">⚙️</div>
          </div>
        );

      case 'vampire-bat':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -left-2 top-1 w-5 h-8 bg-purple-950 border border-purple-500 rounded-full rotate-[-30deg]"></div>
            <div className="absolute -right-2 top-1 w-5 h-8 bg-purple-950 border border-purple-500 rounded-full rotate-[30deg]"></div>
            <div className="w-4/5 h-4/5 bg-purple-900 rounded-full border-2 border-fuchsia-400 flex flex-col items-center justify-center relative z-10">
              <div className="flex space-x-3 mb-1">
                <div className="w-2 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2.5 bg-red-400 rounded-full"></div>
              </div>
              <div className="flex space-x-1">
                <div className="w-1 h-1.5 bg-white rounded-b"></div>
                <div className="w-1 h-1.5 bg-white rounded-b"></div>
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">🦇</div>
          </div>
        );

      case 'boba-dragon':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -top-3 left-2 w-3 h-4 bg-amber-400 rotate-[-20deg] rounded-t-full"></div>
            <div className="absolute -top-3 right-2 w-3 h-4 bg-amber-400 rotate-[20deg] rounded-t-full"></div>
            <div className="w-4/5 h-4/5 bg-teal-400 rounded-full border-3 border-teal-600 flex flex-col items-center justify-center relative">
              <div className="flex space-x-3 mb-1">
                <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-[10px] text-teal-950 font-bold">
                {emotion === 'speaking' ? 'O' : '∇'}
              </div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">🧋</div>
          </div>
        );

      case 'cactus-pup':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -top-3 w-5 h-4 bg-pink-500 rounded-full z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
            </div>
            <div className="w-4/5 h-4/5 bg-lime-400 rounded-2xl border-3 border-lime-600 flex flex-col items-center justify-center relative">
              <div className="flex space-x-3 mb-1">
                <div className="w-2 h-2.5 bg-neutral-900 rounded-full"></div>
                <div className="w-2 h-2.5 bg-neutral-900 rounded-full"></div>
              </div>
              <div className="text-[9px] text-lime-950 font-bold">
                {emotion === 'speaking' ? 'O' : 'w'}
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">🌵</div>
          </div>
        );

      case 'detective-duck':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute -top-3 w-10 h-5 bg-amber-800 rounded-t-full border border-amber-950 z-10"></div>
            <div className="w-4/5 h-4/5 bg-yellow-300 rounded-full border-3 border-yellow-500 flex flex-col items-center justify-center relative">
              <div className="flex space-x-3 mb-1">
                <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
              </div>
              <div className="w-4 h-2 bg-orange-500 rounded-full"></div>
            </div>
            <div className="absolute -bottom-1 right-0 text-base filter drop-shadow">🔍</div>
          </div>
        );

      case 'chibi-kraken':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-4/5 h-4/5 bg-purple-400 rounded-t-full rounded-b-xl border-3 border-purple-600 flex flex-col items-center justify-center relative">
              <div className="flex space-x-3 mb-1">
                <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full relative">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex space-x-0.5 absolute -bottom-2">
                <div className="w-1.5 h-3 bg-purple-500 rounded-full"></div>
                <div className="w-1.5 h-3.5 bg-purple-500 rounded-full"></div>
                <div className="w-1.5 h-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -bottom-1 -left-1 text-base filter drop-shadow">🌊</div>
          </div>
        );

      default:
        return <div className="text-4xl">{host.emoji}</div>;
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl p-1 transition-transform ${sizeMap[size]} ${className} ${
        emotion === 'speaking'
          ? 'scale-105 animate-plushie-float'
          : emotion === 'happy'
          ? 'scale-110 -rotate-3'
          : emotion === 'sad'
          ? 'scale-95 rotate-3 grayscale-30'
          : 'hover:scale-110'
      }`}
    >
      {/* Dynamic Magical Aura */}
      {showAura && (
        <>
          {/* Luminous Pulsing Glow Aura */}
          <div
            className="absolute inset-[-18%] rounded-full opacity-70 blur-xl pointer-events-none animate-aura-breathe transition-all"
            style={{
              background: `radial-gradient(circle, ${host.themeColor}90 0%, ${host.accentColor}40 55%, transparent 75%)`,
            }}
          ></div>

          {/* Shimmering Halo Ring */}
          <div
            className="absolute inset-[-8%] rounded-full border border-dashed opacity-45 pointer-events-none animate-aura-spin"
            style={{
              borderColor: host.themeColor,
            }}
          ></div>

          {/* Floating Sparkles around the plushie */}
          <span
            className="absolute -top-2.5 -left-1.5 text-xs sm:text-sm pointer-events-none animate-sparkle-float drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] z-20"
            style={{ color: host.accentColor }}
          >
            ✨
          </span>
          <span
            className="absolute -top-2 -right-2 text-xs sm:text-sm pointer-events-none animate-sparkle-float drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] z-20 [animation-delay:0.7s]"
            style={{ color: host.themeColor }}
          >
            ✦
          </span>
          <span
            className="absolute -bottom-1 -right-2 text-[10px] sm:text-xs pointer-events-none animate-sparkle-float drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] z-20 [animation-delay:1.4s]"
          >
            ⭐
          </span>
        </>
      )}

      {/* SVG Plushie Mascot */}
      <div className="relative z-10 w-full h-full filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.4)]">
        {getCustomPlushieSVG()}
      </div>

      {/* Emotion indicator overlay */}
      {emotion === 'happy' && (
        <span className="absolute -top-3 right-0 text-lg animate-bounce z-30">✨</span>
      )}
      {emotion === 'sad' && (
        <span className="absolute -top-2 right-0 text-base animate-pulse z-30">💧</span>
      )}
      {emotion === 'speaking' && (
        <div className="absolute -bottom-2 px-1.5 py-0.5 bg-neutral-900/95 border border-pink-400/60 text-[10px] text-pink-300 font-extrabold rounded-full flex items-center gap-1 shadow-lg z-30">
          <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping"></span>
          TALKING
        </div>
      )}
    </div>
  );
};
