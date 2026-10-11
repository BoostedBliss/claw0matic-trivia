<div align="center">
  <h1>🕹️ ClawPop Arcade Trivia 🌸</h1>
  <p><strong>A kawaii, claw-machine-themed multiplayer trivia experience! ✨</strong></p>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

---

## 🌟 What is ClawPop?

Welcome to **ClawPop Arcade Trivia**, a fun and interactive multiplayer trivia game set in a vibrant Discord-like interface! Grab a cute plushie host from the claw machine and get ready to test your knowledge! 🧠💡

Each plushie host has their own unique personality, voice, and specialized trivia category. Play with friends (or our simulated bot players!), earn points, build streaks, and conquer the leaderboard! 🏆

## ✨ Features

- **🎰 Interactive Claw Machine:** Start by selecting your very own adorable plushie host!
- **🤖 AI-Powered Trivia:** Questions are generated dynamically using Gemini AI (or fallback curated trivia) tailored to your selected host!
- **🎙️ Live Voice Simulation:** Real-time host commentary and interactive voice bridge simulating a live voice channel.
- **💬 Discord-like Interface:** Featuring a robust chat feed, party leaderboard, and multiplayer lobbies!
- **🌸 Kawaii Vibes:** Cute emojis, vibrant colors, and dynamic animations powered by Tailwind and Framer Motion.

## 🚀 Getting Started

Ready to pop some claws and drop some trivia? Let's go! 💨

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed, along with a package manager like `bun` or `npm`.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Configure environment variables (optional but recommended for AI features!):
   Create a `.env` file based on the `.env.example` file and add your Gemini API Key.
   ```bash
   cp .env.example .env
   ```

### Running the App

Start the development server:
```bash
bun run dev
# or
npm run dev
```
Then, open your browser and go to `http://localhost:3000` to start playing! 🎉

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Motion
- **Backend/API:** Express.js, WebSockets (ws), Google GenAI SDK
- **Styling:** Tailwind CSS with custom arcade fonts and animations

---

<div align="center">
  <p>Made with 💖 and a lot of 🧋</p>
</div>
