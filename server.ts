import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality } from '@google/genai';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json({ limit: '10mb' }));

// Setup Gemini AI client with required User-Agent
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Host voice configuration map for gemini-3.8-flash-tts
const HOST_VOICE_MAP: Record<string, { voiceName: string; style: string }> = {
  'boba-bun': {
    voiceName: 'Kore',
    style: 'Bubbly, energetic, cute anime gamer girl voice with playful uwu excitement',
  },
  'prof-pip': {
    voiceName: 'Zephyr',
    style: 'Gentle, curious, nerdy scholarly axolotl voice filled with academic wonder',
  },
  'dj-meow': {
    voiceName: 'Puck',
    style: 'Groovy, cool-cat synthwave DJ with snappy rhythm and playful swagger',
  },
  'sir-reginald': {
    voiceName: 'Fenrir',
    style: 'Pompous, theatrical, aristocratic British teddy bear with dry aristocratic wit',
  },
  'matcha-mochi': {
    voiceName: 'Charon',
    style: 'Relaxed, warm, zen culinary enthusiast frog with savory gourmet delight',
  },
  'sparky-bolt': {
    voiceName: 'Puck',
    style: 'Hyper-speed, electrifying sci-fi cyberpunk fox with futuristic speedrun enthusiasm',
  },
  'chocola-bear': {
    voiceName: 'Kore',
    style: 'Warm, huggable, delightful French pastry chef teddy with sweet confectionery enthusiasm',
  },
  'captain-squid': {
    voiceName: 'Fenrir',
    style: 'Deep, theatrical, boisterous pirate captain squid with salty sea shanty cadence',
  },
  'pixel-pup': {
    voiceName: 'Puck',
    style: 'Snappy, nostalgic, fast-paced 16-bit arcade gamer dog with chiptune excitement',
  },
  'luna-moth': {
    voiceName: 'Zephyr',
    style: 'Ethereal, gentle, whispery celestial fairy moth with dreamy starlight mystique',
  },
  'ninja-panda': {
    voiceName: 'Charon',
    style: 'Calm, disciplined, deep martial arts sensei panda with measured proverbs',
  },
  'dino-nugget': {
    voiceName: 'Puck',
    style: 'Feisty, comedic prehistoric golden T-Rex with punchy roars and fossil pride',
  },
  'neon-shiba': {
    voiceName: 'Puck',
    style: 'Cyberpunk hacker fox with snappy futuristic cyberpunk cadence and cool swagger',
  },
  'marshmallow-seal': {
    voiceName: 'Zephyr',
    style: 'Ultra-gentle, soft, cozy baby harp seal with sweet arctic wonder and cheerful squeaks',
  },
  'spicy-ramen-pig': {
    voiceName: 'Charon',
    style: 'Bubbly, enthusiastic noodle chef pig with savory warmth and dramatic slurping joy',
  },
  'galaxy-cat': {
    voiceName: 'Kore',
    style: 'Ethereal, whimsical starlight cosmic kitten purring with stellar curiosity',
  },
  'wizard-owl': {
    voiceName: 'Fenrir',
    style: 'Theatrical, ancient, dramatic scholarly wizard owl reciting mystical incantations',
  },
  'berry-bunny': {
    voiceName: 'Kore',
    style: 'Pastel, sweet, high-spirited berry princess rabbit with gentle floral cheer',
  },
  'steampunk-otter': {
    voiceName: 'Zephyr',
    style: 'Inquisitive, clever Victorian clockwork tinkerer otter fascinated by gear mechanics',
  },
  'vampire-bat': {
    voiceName: 'Fenrir',
    style: 'Dramatic, aristocratic gothic velvet fruit bat with poetic midnight mystery',
  },
  'boba-dragon': {
    voiceName: 'Charon',
    style: 'Warm, booming, benevolent jade tea dragon snorting playful steam with imperial poise',
  },
  'cactus-pup': {
    voiceName: 'Puck',
    style: 'Sun-drenched, enthusiastic desert bloom pup with bright bouncy barks',
  },
  'detective-duck': {
    voiceName: 'Fenrir',
    style: 'Pompous, intellectual, analytical Victorian sleuth duckling deducing riddles',
  },
  'chibi-kraken': {
    voiceName: 'Zephyr',
    style: 'Bioluminescent abyssal cephalopod with deep oceanic wonder and bubbly echoes',
  },
};

// Fallback curated trivia in case API key is missing or quota reached
const FALLBACK_TRIVIA: Record<string, any[]> = {
  'boba-bun': [
    {
      question: "In the viral gaming phenomenon 'Genshin Impact', what is Paimon's legendary emergency food nickname?",
      options: ["Emergency Snack", "Emergency Food", "Pocket Dumpling", "Travel Rations"],
      correctAnswer: 1,
      explanation: "During their very first conversation in Teyvat, the Traveler jokingly introduces Paimon as 'Emergency Food'!",
      funHostCommentary: "Omg kawaii! Don't look at me like that, boba bunnies are NOT emergency snacks! (>_<)",
      searchGroundingSource: "Genshin Impact Canon Dialogue"
    },
    {
      question: "Which anime film famously overtook 'Spirited Away' at the Japanese box office in 2020?",
      options: ["Your Name", "Demon Slayer: Mugen Train", "Weathering With You", "Suzume"],
      correctAnswer: 1,
      explanation: "Demon Slayer: Kimetsu no Yaiba - The Movie: Mugen Train shattered 19 years of box-office records in Japan!",
      funHostCommentary: "SET YOUR HEART ABLAZE! Rengoku-aniki would be so hyped by this question!",
      searchGroundingSource: "Oricon Box Office Records"
    },
    {
      question: "What is the primary tapioca pearl ingredient that gives Boba its iconic chewy 'QQ' texture?",
      options: ["Rice flour", "Cassava root starch", "Arrowroot", "Potato starch"],
      correctAnswer: 1,
      explanation: "Tapioca balls are made from cassava root starch (manioc), providing that signature chewy elasticity!",
      funHostCommentary: "A question about my sweet lifeblood! Chewy perfection in every sip! *sips tapioca*",
      searchGroundingSource: "Culinary Science & Boba History"
    }
  ],
  'prof-pip': [
    {
      question: "Axolotls have the extraordinary ability to regrow what complex body structures without scarring?",
      options: ["Only tail tips", "Limbs, spinal cords, and parts of their brains", "Just skin tissue", "Gills only"],
      correctAnswer: 1,
      explanation: "Axolotls are scientific marvels capable of regenerating entire limbs, heart tissue, spinal cords, and even brain regions!",
      funHostCommentary: "Fascinating biology! We salamanders are practically mythological superheroes in the laboratory!",
      searchGroundingSource: "Nature Regenerative Biology"
    },
    {
      question: "What celestial phenomenon was confirmed by the James Webb Space Telescope regarding early galaxies?",
      options: ["Galaxies were completely dark", "Galaxies formed much earlier and brighter than previously predicted", "Galaxies spun backwards", "All early stars were green"],
      correctAnswer: 1,
      explanation: "JWST discovered massive, luminous galaxies existing merely a few hundred million years following the Big Bang, defying old cosmological timelines!",
      funHostCommentary: "The cosmos never ceases to delight the inquisitive mind! Simply breathtaking!",
      searchGroundingSource: "NASA & ESA James Webb Discoveries"
    },
    {
      question: "What is the deep ocean layer known as the 'Twilight Zone' where sunlight barely penetrates called?",
      options: ["Epipelagic", "Mesopelagic", "Bathypelagic", "Abyssopelagic"],
      correctAnswer: 1,
      explanation: "The mesopelagic zone spans from 200 to 1,000 meters beneath the sea surface, hosting surreal bioluminescent creatures!",
      funHostCommentary: "Home to our glowing aquatic cousins! Grab your bathysphere, fellow explorer!",
      searchGroundingSource: "NOAA Ocean Exploration"
    }
  ],
  'dj-meow': [
    {
      question: "Which iconic synth sound from the 1980s was produced by the landmark Yamaha DX7 keyboard?",
      options: ["Analog Moog Sawtooth", "FM (Frequency Modulation) Synthesis", "Granular Glitch", "Vocaloid Sampling"],
      correctAnswer: 1,
      explanation: "The 1983 Yamaha DX7 democratized digital FM synthesis, defining the shiny electric pianos and basslines of the 80s!",
      funHostCommentary: "Aww yeah! Drop that digital frequency modulation right into my headphones!",
      searchGroundingSource: "Sound on Sound Synth Archive"
    },
    {
      question: "Da Funk and Around the World were breakthrough tracks by which legendary French robotic electronic duo?",
      options: ["Justice", "Daft Punk", "Air", "Cassius"],
      correctAnswer: 1,
      explanation: "Guy-Manuel and Thomas Bangalter performed as Daft Punk, headlining world stages in iconic chrome helmets!",
      funHostCommentary: "One more time! We're gonna celebrate! Put your paws in the air for French house royalty!",
      searchGroundingSource: "Electronic Dance Music History"
    },
    {
      question: "In vinyl record terminology, what does '45 RPM' stand for?",
      options: ["45 Beats Per Minute", "45 Revolutions Per Minute", "45 Radio Plays Minimum", "45 Radians Per Measure"],
      correctAnswer: 1,
      explanation: "45 RPM specifies 45 revolutions per minute, the standard playback speed for 7-inch single records!",
      funHostCommentary: "Spin that platter round and round, mew-sicians! Keep that needle in the groove!",
      searchGroundingSource: "RIAA Vinyl Standards"
    }
  ]
};

// 1. Trivia Generator using gemini-3.5-flash with googleSearch tool for verified real-time facts
app.post('/api/trivia/generate', async (req: Request, res: Response) => {
  const { hostId, hostName, category, difficulty = 'normal', count = 4 } = req.body;

  if (!ai) {
    const list = FALLBACK_TRIVIA[hostId] || FALLBACK_TRIVIA['boba-bun'];
    return res.json({
      success: true,
      questions: list.slice(0, count),
      grounded: false,
      note: 'Using curated trivia roster (Gemini API key not configured on server).',
    });
  }

  try {
    const prompt = `You are designing trivia for the kawaii arcade trivia game ClawPop!
Host: "${hostName || 'Boba Bun'}" (${hostId})
Category: "${category || 'Pop Culture & Anime'}"
Difficulty: "${difficulty}"

Generate ${count} punchy, super fun, 100% accurate multiple-choice trivia questions.
Use Google Search grounding to ensure up-to-date and accurate facts.
Every question must feature:
- A clear, engaging trivia question suited for live voice and party games.
- Exactly 4 distinct multiple choice options.
- The 0-indexed integer of the correct option (0, 1, 2, or 3).
- A 1-2 sentence fascinating explanation of the fact.
- A 1-sentence lively host commentary quote bursting with the host's kawaii personality (e.g. playful uwu, sassy DJ slang, scholarly nerd excitement, or British sarcasm).
- The factual search citation or source topic name.

Output ONLY a valid JSON array of objects with keys:
"question" (string),
"options" (array of 4 strings),
"correctAnswer" (number 0-3),
"explanation" (string),
"funHostCommentary" (string),
"searchGroundingSource" (string).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '';
    let parsed: any[] = [];
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Clean possible markdown code fences
      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    if (Array.isArray(parsed) && parsed.length > 0) {
      return res.json({
        success: true,
        questions: parsed,
        grounded: true,
        model: 'gemini-3.5-flash',
      });
    }

    throw new Error('Invalid format returned');
  } catch (err: any) {
    console.error('Trivia generation error:', err?.message || err);
    const fallbackList = FALLBACK_TRIVIA[hostId] || FALLBACK_TRIVIA['boba-bun'];
    return res.json({
      success: true,
      questions: fallbackList.slice(0, count),
      grounded: false,
      errorNotice: err?.message,
    });
  }
});

// 2. TTS Voice Generation using gemini-3.8-flash-tts
app.post('/api/tts', async (req: Request, res: Response) => {
  const { text, hostId = 'boba-bun', speakerName = 'Host' } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing text parameter' });
  }

  if (!ai) {
    return res.json({
      success: false,
      audio: null,
      message: 'Server Gemini API key not present for TTS.',
    });
  }

  try {
    const hostVoice = HOST_VOICE_MAP[hostId] || HOST_VOICE_MAP['boba-bun'];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${speakerName}: ${text}`,
              speechMetadata: {
                style: hostVoice.style,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: hostVoice.voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      return res.json({
        success: true,
        audio: base64Audio,
        mimeType: 'audio/wav',
        model: 'gemini-3.8-flash-tts',
      });
    }

    return res.json({
      success: false,
      audio: null,
      message: 'No audio stream returned',
    });
  } catch (err: any) {
    console.error('TTS error:', err?.message || err);
    return res.json({
      success: false,
      audio: null,
      error: err?.message || 'TTS generation failed',
    });
  }
});

// 3. Quick Host Commentary Reaction
app.post('/api/host/commentary', async (req: Request, res: Response) => {
  const { hostId, hostName, eventType, streak = 0, questionText, playerAnswer, correctAnswer } = req.body;

  if (!ai) {
    const quickBanter: Record<string, Record<string, string>> = {
      'boba-bun': {
        correct: streak > 2 ? `Sugoi! Streak x${streak}! You're on absolute fire, senpai!` : 'Yaaay! That was totally correct! Boba high-five!',
        incorrect: 'Awww nooo! Close one! Do not cry, Boba Bun believes in you! (>_<)',
      },
      'prof-pip': {
        correct: streak > 2 ? `Hypothesis confirmed! A consecutive streak of ${streak}! Extraordinary intellect!` : 'Indubitably correct! My gills are fluttering with scientific joy!',
        incorrect: 'An intriguing conjecture, however scientifically inaccurate! We learn through iterations!',
      },
      'dj-meow': {
        correct: streak > 2 ? `BOOM! That is ${streak} in a row! The crowd is going wild on the dancefloor!` : 'Fresh beat! You nailed that drop, cool cat!',
        incorrect: 'Oof, that needle just scratched the record! Shake it off and queue the next track!',
      },
    };
    const hostQuotes = quickBanter[hostId] || quickBanter['boba-bun'];
    const quote = hostQuotes[eventType] || 'Let us keep playing!';
    return res.json({ quote, fallback: true });
  }

  try {
    const prompt = `You are ${hostName} (${hostId}), the kawaii claw machine trivia host!
Event: Player answered a question ${eventType === 'correct' ? 'CORRECTLY' : 'INCORRECTLY'}.
Streak: ${streak}
Question: "${questionText || ''}"
Correct Answer: "${correctAnswer || ''}"

Give a 1-sentence punchy reaction in your authentic kawaii voice persona. Keep it under 20 words, super playful and vibrant.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const quote = response.text?.trim() || 'Awesome job!';
    return res.json({ quote, model: 'gemini-3.8-flash' });
  } catch (err: any) {
    return res.json({ quote: 'Great effort! Next question coming right up!' });
  }
});

// HTTP and WebSocket Server Setup
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/live' });

// 4. Live Voice Conversation Bridge using gemini-3.8-live
wss.on('connection', async (clientWs: WebSocket) => {
  console.log('[Live WebSocket] Client connected to Live Voice Bridge');
  let liveSession: any = null;

  if (ai) {
    try {
      liveSession = await ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: 'You are the playful, super entertaining AI claw machine trivia host in a live party voice channel. Speak briefly, warmly, and playfully to the players.',
        },
        callbacks: {
          onmessage: (message: any) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: 'audio', audio: audioData }));
            }
            if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ type: 'interrupted' }));
            }
          },
        },
      });

      clientWs.send(JSON.stringify({ type: 'connected', ready: true, model: 'gemini-3.8-live' }));
    } catch (e: any) {
      console.warn('[Live WebSocket] Could not start gemini-3.8-live session:', e?.message);
      clientWs.send(JSON.stringify({
        type: 'status',
        ready: false,
        message: 'Live API connection simulated: ' + (e?.message || 'Ready in voice simulation mode')
      }));
    }
  } else {
    clientWs.send(JSON.stringify({
      type: 'status',
      ready: true,
      simulation: true,
      message: 'Simulated Voice Channel connected. Chatting with plushie host!'
    }));
  }

  clientWs.on('message', (raw: any) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg.type === 'audio' && msg.audio && liveSession) {
        liveSession.sendRealtimeInput({
          audio: { data: msg.audio, mimeType: 'audio/pcm;rate=16000' },
        });
      } else if (msg.type === 'text' && msg.text) {
        if (liveSession) {
          liveSession.send({
            clientContent: {
              turns: [{ role: 'user', parts: [{ text: msg.text }] }],
              turnComplete: true,
            },
          });
        } else {
          // Echo simulation response for voice chat
          setTimeout(() => {
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({
                type: 'text_reply',
                text: `Host says: "Mew! I heard that! Let's win that trivia crown together!"`
              }));
            }
          }, 800);
        }
      }
    } catch (err) {
      console.error('[Live WebSocket] error handling message:', err);
    }
  });

  clientWs.on('close', () => {
    console.log('[Live WebSocket] Client disconnected');
  });
});

// Mount Vite in dev mode or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`ClawPop Arcade Trivia server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
