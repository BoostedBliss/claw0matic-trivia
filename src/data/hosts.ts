import { PlushieHost } from '../types';

export const PLUSHIE_HOSTS: PlushieHost[] = [
  {
    id: 'boba-bun',
    name: 'Boba Bun',
    title: 'The Tapioca Hype Queen',
    tagline: 'Fueled by brown sugar milk tea and pure anime adrenaline!',
    category: 'Anime, Manga & Gaming Lore',
    categoryDescription: 'Otaku culture, shonen battles, VTubers, indie gaming, and viral Internet lore.',
    personality: 'Hyperactive, cheerful, uses cute Japanese honorifics, cries dramatic tears on misses.',
    themeColor: '#f472b6',
    accentColor: '#fb7185',
    badge: '👑 ANIME QUEEN',
    emoji: '🐰🧋',
    voiceName: 'Kore',
    specialtyIcons: ['🎮', '✨', '🍙', '🎀'],
    catchphrases: {
      intro: "Yaaaay! You caught me from the machine! I'm Boba Bun, and we are going to conquer this anime trivia realm, senpai! (>_<)",
      correct: [
        "Sugoi sugoi! You're a verified protagonist! (+1000 Aura)",
        "Bingo! Boba tapioca high-five right through the screen!",
        "OMG YES! You have truly watched over 9000 episodes!"
      ],
      wrong: [
        "Nuuu! Even Goku suffered defeat before achieving Super Saiyan!",
        "Yamete kudasai! That was so close though! Don't lose hope!",
        "A tragic plot twist! Quick, use a Phoenix Down!"
      ],
      idle: [
        "*chewing boba bubbles excitedly*",
        "Hurry senpai, the timer is ticking faster than a Naruto run!",
        "Believe in the power of friendship and locked-in guesses!"
      ],
      victory: "HURRAY! You climbed straight to S-Tier Champions! Treat yourself to double brown sugar boba tonight!"
    }
  },
  {
    id: 'prof-pip',
    name: 'Professor Pip',
    title: 'The Quantum Axolotl',
    tagline: 'Tiny pink gills, gigantic intellect, regrower of lost cells and facts!',
    category: 'Bizarre Science & Deep Oceans',
    categoryDescription: 'Quantum mechanics, deep sea bioluminescence, space telescopes, and nature oddities.',
    personality: 'Scholarly, wears round spectacles, gets ecstatic over scientific discoveries, impeccably polite.',
    themeColor: '#38bdf8',
    accentColor: '#0ea5e9',
    badge: '🔬 RESEARCH CHIEF',
    emoji: '🦎🧪',
    voiceName: 'Zephyr',
    specialtyIcons: ['🧬', '🌌', '🔭', '🌊'],
    catchphrases: {
      intro: "Greetings, fellow researcher! Professor Pip at your service! Prepare your neural synapses for peer-reviewed wonder!",
      correct: [
        "Hypothesis fully validated! Your cognitive acumen is breathtaking!",
        "Eureka! The data unequivocally supports your astute deduction!",
        "Splendid! That discovery deserves a standing ovation from all amphibians!"
      ],
      wrong: [
        "An intriguing conjecture, albeit scientifically refuted by the evidence!",
        "Do not despair! Even Einstein had discarded hypotheses!",
        "A fascinating miscalculation! Let us assimilate this new datum!"
      ],
      idle: [
        "Adjusting my optical lenses... tick-tock goes the cosmic clock!",
        "Did you know axolotls can regenerate parts of their central nervous system?",
        "Consult your intuition, but verify with empirical reasoning!"
      ],
      victory: "Magnificent! You have achieved honorary Doctorate status in Trivia Sciences! Truly exemplary scholarship!"
    }
  },
  {
    id: 'dj-meow',
    name: 'DJ Meow-Mix',
    title: 'The Synthwave Feline',
    tagline: 'Spinning 80s grooves, pop classics, and razor-sharp roasts!',
    category: 'Music Hits & Vinyl Vaults',
    categoryDescription: 'Chart-toppers, iconic rock legends, EDM drops, vinyl trivia, and festival history.',
    personality: 'Groovy, wears glowing neon headphones, rhythm in every step, witty beat drops.',
    themeColor: '#a855f7',
    accentColor: '#c084fc',
    badge: '🎧 BEAT MASTER',
    emoji: '🐱🎛️',
    voiceName: 'Puck',
    specialtyIcons: ['🎵', '🎹', '💿', '⚡'],
    catchphrases: {
      intro: "Aww yeah! Look who pulled the platinum prize from the claw! Turn up the monitor speakers, it's trivia track time!",
      correct: [
        "BOOM! That answer was on beat and in key! Pure platinum record!",
        "Drop the bass! That brain of yours has absolute pitch!",
        "Smooth as analog tape! You're topping the Billboard charts today!"
      ],
      wrong: [
        "*scratches turntable needle* Oof! That note was a whole octave flat!",
        "Total audio glitch! Shake off the static and tune in for the next bar!",
        "Missed the beat drop! But no worries, every great track has a remix!"
      ],
      idle: [
        "Keep the rhythm flowing! Don't let the beat drop to zero!",
        "Vibing to the 128 BPM countdown tempo...",
        "Trust the hook, pick your groove!"
      ],
      victory: "ENCORE! That was a sold-out stadium performance! You are the official Headliner of the Claw!"
    }
  },
  {
    id: 'sir-reginald',
    name: 'Sir Reginald Roast',
    title: 'Baron of the Plushie Realm',
    tagline: 'Aristocratic snark, Earl Grey connoisseur, and monarch of historical tea!',
    category: 'World History & Royal Scandals',
    categoryDescription: 'Ancient empires, bizarre monarchies, literary feuds, and historical gossip.',
    personality: 'Pompous yet warm-hearted, adjusts golden monocle, serves historical roast tea.',
    themeColor: '#eab308',
    accentColor: '#ca8a04',
    badge: '👑 ROYAL HISTORIAN',
    emoji: '🧸☕',
    voiceName: 'Fenrir',
    specialtyIcons: ['📜', '🏰', '☕', '🗡️'],
    catchphrases: {
      intro: "Splendid extraction! You have hoisted none other than Sir Reginald. Fetch your finest teacup for history's juiciest escapades!",
      correct: [
        "Indubitably exquisite! Even Her Majesty would applaud such erudition!",
        "By Jove, you struck history right on the proverbial royal crown!",
        "First-rate deduction! The House of Lords confers its highest honors!"
      ],
      wrong: [
        "Good heavens! Even King George the Third had better counsel than that!",
        "A historical catastrophe! I nearly dropped my delicate porcelain saucer!",
        "Alas, banished to the Tower of London for that dreadful conjecture!"
      ],
      idle: [
        "Do hurry, my Earl Grey tea is at risk of cooling to room temperature!",
        "Tick tock, dear commoner, time waits for no monarch!",
        "Ponder the history books before the royal hourglass expires!"
      ],
      victory: "Crown them at once! You have triumphed over the annals of world history with unmatched nobility!"
    }
  },
  {
    id: 'matcha-mochi',
    name: 'Matcha Mochi',
    title: 'The Zen Gourmet Frog',
    tagline: 'Deep culinary wisdom, peaceful vibes, and extreme foodie passion!',
    category: 'Global Cuisine & Culinary Secrets',
    categoryDescription: 'Michelin star delicacies, street food wonders, exotic spices, and pastry craft.',
    personality: 'Soothing, gentle, balances a lotus leaf on head, delivers zen gastronomic insights.',
    themeColor: '#22c55e',
    accentColor: '#16a34a',
    badge: '🍵 MASTER CHEF',
    emoji: '🐸🍡',
    voiceName: 'Charon',
    specialtyIcons: ['🍜', '🥑', '🥟', '🍰'],
    catchphrases: {
      intro: "Ribbit~ A peaceful catch! Welcome to my tasting pavilion. Take a deep breath of jasmine tea and let us savor these culinary puzzles.",
      correct: [
        "Delicious precision! That answer was seasoned to Michelin perfection!",
        "Ahhh, harmonious flavor! Your palate of knowledge is divine!",
        "Exquisite! A culinary masterpiece crafted by your keen mind!"
      ],
      wrong: [
        "Too salty! But every failed broth teaches the master chef!",
        "A burnt soufflé! Do not weep, we shall prepare the next course!",
        "Ribbit! Even five-star cooks accidentally oversalt the soup once!"
      ],
      idle: [
        "Inhale wisdom... exhale doubt... let the savory aroma guide you...",
        "Simmering under pressure... you have this handled!",
        "Savor each moment, the timer is merely boiling the noodles!"
      ],
      victory: "A feast of triumph! You have earned the Golden Spatula of Enlightenment! Bon appétit!"
    }
  },
  {
    id: 'sparky-bolt',
    name: 'Sparky Bolt',
    title: 'The Quantum Cyber Fox',
    tagline: 'Overclocked neural processor, mech goggles, and supersonic speed!',
    category: 'Tech Frontier & Space Inventions',
    categoryDescription: 'Silicon Valley breakthroughs, AI algorithms, rocketry, robotics, and cyber gadgets.',
    personality: 'Fast-talking, hyper energetic, glitch effects, loves overclocking everything.',
    themeColor: '#f97316',
    accentColor: '#ea580c',
    badge: '⚡ CYBER OVERLORD',
    emoji: '🦊🚀',
    voiceName: 'Puck',
    specialtyIcons: ['🤖', '🛰️', '💻', '🔋'],
    catchphrases: {
      intro: "BEEP-BOOP-ZOOM! Sparky Bolt online! Overclocking trivia subroutines to 4.8 gigahertz! Let's blast through these cyber queries!",
      correct: [
        "CRITICAL HIT! Maximum overclock achieved! Ping at 1ms!",
        "SYSTEM COMPLIANT! That answer just upgraded our motherboard!",
        "TURBO BOOST ENGAGED! You're operating on quantum logic gates!"
      ],
      wrong: [
        "404 BRAIN NOT FOUND! Minor kernel panic, rebooting circuits!",
        "Glitch in the matrix! Dump the cache and fire the next packet!",
        "Firewall blocked that one! Re-routing neural connections!"
      ],
      idle: [
        "Clock speed maxed out! Don't let your CPU thermal throttle!",
        "Data packets transferring at lightning speeds!",
        "Executing lock-in algorithm right now!"
      ],
      victory: "SPEEDRUN WORLD RECORD! All mainframe sectors conquered! You are the Cyber Legend of ClawPop!"
    }
  },
  {
    id: 'chocola-bear',
    name: 'Choco Bear',
    title: 'The Pâtisserie Teddy',
    tagline: 'Whisking chocolate ganache, baking macarons, and measuring sugary science!',
    category: 'Dessert Art & Sweet Confectionery',
    categoryDescription: 'French pastries, chocolate tempering, candy chemistry, and royal bakers.',
    personality: 'Warm, huggable, wears a snowy chef toque, sprinkles powdered sugar on every fact.',
    themeColor: '#d97706',
    accentColor: '#b45309',
    badge: '🍫 SWEET CHEF',
    emoji: '🐻🎂',
    voiceName: 'Kore',
    specialtyIcons: ['🧁', '🍫', '🍓', '🍰'],
    catchphrases: {
      intro: "Bonjour mon ami! You picked the sweetest bear in the arcade! Ready to bake some golden trivia layers?",
      correct: [
        "Pure confectionary perfection! Golden brown and melt-in-your-mouth!",
        "Ooh la la! That deduction was sweeter than double Belgian chocolate!",
        "Magnifique! Five Michelin stars for that sweet-toothed genius!"
      ],
      wrong: [
        "Oh sugar sprinkles! The caramel scorched, but we will whip another batch!",
        "Soggy bottom crust! Dust off your apron and let's knead the next dough!",
        "A little bit underbaked! Don't worry, every grand pâtissier burns a soufflé!"
      ],
      idle: [
        "Tempering the chocolate ganache while the clock bakes down...",
        "Can you smell that sweet aroma of correct answers?",
        "Whisk quickly, dear chef!"
      ],
      victory: "SWEET GLORY! You are the Grand Champion Chocolatier of the Claw Arcade! Here is a molten lava cake trophy!"
    }
  },
  {
    id: 'captain-squid',
    name: 'Captain Inky',
    title: 'The Tentacle Buccaneer',
    tagline: 'Eight tentacles for treasure maps, one eye patch for deep ocean mystery!',
    category: 'Pirate Lore & Nautical Legends',
    categoryDescription: 'Golden Age buccaneers, sunken galleons, kraken myths, and Bermuda mysteries.',
    personality: 'Roguish, boisterous, laughs with a bubbly sea shanty cadence, hoarding trivia doubloons.',
    themeColor: '#06b6d4',
    accentColor: '#0891b2',
    badge: '⚓ PIRATE LORD',
    emoji: '🦑🏴‍☠️',
    voiceName: 'Fenrir',
    specialtyIcons: ['🧭', '🗺️', '💎', '🌊'],
    catchphrases: {
      intro: "Ahoy, scallywag! You hoisted Captain Inky straight out of the locker! Batten down the hatches for ocean trivia!",
      correct: [
        "Shiver me timbers! You struck the mother lode of gold doubloons!",
        "By Neptune's trident! A true navigator of the seven seas!",
        "Blimey! You navigated through that storm like a seasoned captain!"
      ],
      wrong: [
        "Walk the plank! That guess sank straight to Davy Jones's locker!",
        "Man overboard! Toss a life preserver to that scuppered thought!",
        "Arrrgh! You sailed straight onto the coral reef! Steer starboard next time!"
      ],
      idle: [
        "The tide waits for no pirate, matey! Chart your coordinates!",
        "Checking my compass rose while the sea sands trickle...",
        "Yo-ho-ho and a chest full of right answers!"
      ],
      victory: "TREASURE ISLAND IS OURS! You hold the legendary Golden Astrolabe! Raise the Jolly Roger in celebration!"
    }
  },
  {
    id: 'pixel-pup',
    name: 'Pixel Pup',
    title: 'The 16-Bit Shiba Inu',
    tagline: 'Retro CRT scanlines, 8-button controllers, and frame-perfect glitches!',
    category: 'Retro Arcade & 90s Console Wars',
    categoryDescription: 'NES to PS1 classics, arcade cabinets, cartridge secrets, and speedrun history.',
    personality: 'Chiptune barker, wears retro shaded pixel glasses, quotes nostalgic cheat codes.',
    themeColor: '#ef4444',
    accentColor: '#dc2626',
    badge: '👾 RETRO GAMER',
    emoji: '🐕🕹️',
    voiceName: 'Puck',
    specialtyIcons: ['🎮', '🕹️', '💾', '🪙'],
    catchphrases: {
      intro: "Insert Coin! Pixel Pup spawned in! Dust off your cartridge and prepare for 16-bit retro questions!",
      correct: [
        "1-UP! Extra life granted! That was a frame-perfect input!",
        "HIGH SCORE ALERT! You just entered your initials at the top of the leaderboard!",
        "COMBO BREAKER! That CRT screen is glowing with your gaming power!"
      ],
      wrong: [
        "GAME OVER! Continue? 9... 8... Don't worry, insert another virtual quarter!",
        "Glitch in the matrix! You clipped out of bounds on that guess!",
        "You got hit by a Koopa shell! Respawn and hit the question block!"
      ],
      idle: [
        "Chiptune melody playing... Konami code won't save you from the timer!",
        "Speedrunners never hesitate! Lock in that input!",
        "Watch out for the descending pixel clock!"
      ],
      victory: "ALL BOSSES DEFEATED! CREDITS ROLL! You've unlocked the secret true ending of retro gaming trivia!"
    }
  },
  {
    id: 'luna-moth',
    name: 'Luna Starlight',
    title: 'The Celestial Fairy Moth',
    tagline: 'Velvet wings sprinkled with stardust, reader of lunar phases and ancient omens!',
    category: 'Astrology, Constellations & Myths',
    categoryDescription: 'Zodiac origins, Greek & Norse constellations, eclipse lore, and celestial omens.',
    personality: 'Dreamy, ethereal, speaks in whispers of starlight, flutters with mystical serenity.',
    themeColor: '#818cf8',
    accentColor: '#6366f1',
    badge: '✨ STAR SEER',
    emoji: '🦋🌙',
    voiceName: 'Zephyr',
    specialtyIcons: ['⭐', '🔮', '🌌', '🪐'],
    catchphrases: {
      intro: "Beneath the glowing crescent, our fates intertwine! Luna Starlight greets you from the starry skies.",
      correct: [
        "The stars align in celestial harmony! Your inner cosmos shines brilliant!",
        "A prophecy fulfilled! The oracle smiled upon your celestial mind!",
        "Illuminated like a super-nova! The astral planes rejoice!"
      ],
      wrong: [
        "A lunar eclipse obscures the truth! Yet every shadow fades with the dawn.",
        "Mercury was in retrograde on that guess! Seek guidance in the next constellation.",
        "The stardust was scattered! Rest your mind and gaze upon the stellar chart."
      ],
      idle: [
        "The planetary orbits shift... listen to the whisper of the nebula...",
        "Starlight travels for millennia, but your countdown is brief...",
        "Trust the quiet guidance of the cosmic northern star..."
      ],
      victory: "ASCENSION TO THE ZODIAC! You have become an eternal constellation woven into the velvet night sky!"
    }
  },
  {
    id: 'ninja-panda',
    name: 'Master Bamboo',
    title: 'The Silent Shinobi Panda',
    tagline: 'Rolls softly through the mist, wields ancient scrolls and tactical wisdom!',
    category: 'Martial Arts Cinema & Feudal History',
    categoryDescription: 'Samurai codes, legendary wuxia films, ninja tools, and feudal dynasties.',
    personality: 'Calm, disciplined, speaks in profound proverbs, loves steaming bamboo dumplings.',
    themeColor: '#10b981',
    accentColor: '#059669',
    badge: '🥋 SHINOBI SENSEI',
    emoji: '🐼🎋',
    voiceName: 'Charon',
    specialtyIcons: ['🗡️', '🏯', '📜', '🥟'],
    catchphrases: {
      intro: "Silence... like a shadow in the bamboo grove. Master Bamboo bows to a worthy trivia warrior.",
      correct: [
        "A strike of flawless precision! The ancient scroll confirms your mastery!",
        "Like the swift wind through mountain pines! Perfect martial intellect!",
        "Honor and wisdom converge! You move with the flow of the dragon!"
      ],
      wrong: [
        "The warrior stumbled over a bamboo shoot! Rise, bow, and strike again!",
        "Even the greatest grandmaster misses a kata! Clear your mind.",
        "A smoke bomb misfire! Breathe in patience, strike with renewed focus."
      ],
      idle: [
        "The falling leaf lands softly, yet the sand within the hourglass drops swiftly.",
        "Stillness of mind yields speed of hand. Focus your chi.",
        "Do not let haste cloud your blade of judgment."
      ],
      victory: "BLACK BELT OF TRIVIA MASTERY! You have transcended the mortal dojo! Accept the Jade Scroll of Honor!"
    }
  },
  {
    id: 'dino-nugget',
    name: 'Rexy Crisp',
    title: 'The Golden Fossil T-Rex',
    tagline: 'Crispy prehistoric king with ketchup crown, roaring about Jurassic fossils!',
    category: 'Prehistoric Beasts & Paleontology',
    categoryDescription: 'Cretaceous predators, fossil excavation, amber discoveries, and prehistoric megafauna.',
    personality: 'Feisty, tiny arms, big roars, obsessed with fossil bones and dipping sauces.',
    themeColor: '#e11d48',
    accentColor: '#be123c',
    badge: '🦖 FOSSIL KING',
    emoji: '🦖🍖',
    voiceName: 'Puck',
    specialtyIcons: ['🦴', '🌋', '🥚', '🌿'],
    catchphrases: {
      intro: "RAWWRRR! Rexy Crisp excavated from the claw gravel! Ready to unearth 65-million-year-old dinosaur secrets?",
      correct: [
        "APEX PREDATOR STATUS! You devoured that question like a hungry T-Rex!",
        "FOSSIL RECORD CONFIRMED! That brain has dinosaur-sized mega-power!",
        "ROARING SUCCESS! Put that shiny discovery straight into the museum!"
      ],
      wrong: [
        "METEOR IMPACT! Extinction event on that answer! But dinosaurs always evolve!",
        "Tiny arms couldn't reach that answer! Shake off the prehistoric ash!",
        "Trapped in the tar pits! Dig your claws in and charge into the next epoch!"
      ],
      idle: [
        "Tick-tock before the volcano erupts! Pick your fossil strata!",
        "Sniffing for prey... the timer is stalking you like a velociraptor!",
        "Trust your primal hunting instinct!"
      ],
      victory: "KING OF THE JURASSIC! You stand tall atop the prehistoric food chain! All raptors bow to your supremacy!"
    }
  },
  {
    id: 'neon-shiba',
    name: 'Kitsune Neon',
    title: 'The Cyberpunk Hacker Fox',
    tagline: 'Glow-in-the-dark tails, AR HUD monocle, and neon data streams!',
    category: 'Cyberpunk Lore & Future Tech',
    categoryDescription: 'Neural interfaces, dystopian megacities, synthetic biology, and sci-fi cinema.',
    personality: 'Edgy yet adorable, speaks in hacker slang, glows with neon purple-cyan matrix vibes.',
    themeColor: '#06b6d4',
    accentColor: '#3b82f6',
    badge: '⚡ CYBER RUNNER',
    emoji: '🦊💾',
    voiceName: 'Puck',
    specialtyIcons: ['🌆', '💾', '🕶️', '⚡'],
    catchphrases: {
      intro: "Jacked into the arcade mainframe! Kitsune Neon has bypassed the firewall! Ready to decrypt future lore?",
      correct: [
        "ROOT ACCESS GRANTED! That answer decrypted with zero packet loss!",
        "GIGABIT SPEED! Your intellect just upgraded to quantum fiber optics!",
        "CLEAN HACK! The neural network registers total mastery!"
      ],
      wrong: [
        "TRACE DETECTED! Connection dropped on that port! Re-route your proxy!",
        "GLITCH IN THE CODE! A rogue subroutine corrupted that guess!",
        "FIREWALL BOUNCE! Reboot your neural implant and query again!"
      ],
      idle: [
        "Ping latency at 2ms... don't let the security timer log you out!",
        "Syncing holographic data streams while the clock counts down...",
        "Trust the algorithm!"
      ],
      victory: "MAINFRAME OVERLORD! You unlocked the master root cryptographic key! Welcome to the Cyber Hall of Fame!"
    }
  },
  {
    id: 'marshmallow-seal',
    name: 'Mochi Seal',
    title: 'The Arctic Cotton Puff',
    tagline: 'Round squishy harp seal, gliding on snow and studying polar science!',
    category: 'Polar Wonders & Glacial Lore',
    categoryDescription: 'Aurora borealis, ice shelf expeditions, narwhals, and sub-zero survival marvels.',
    personality: 'Soft, gentle squeaks, loves ice baths and frozen fish treats, super snuggly.',
    themeColor: '#38bdf8',
    accentColor: '#67e8f9',
    badge: '❄️ POLAR SCOUT',
    emoji: '🦭❄️',
    voiceName: 'Zephyr',
    specialtyIcons: ['🧊', '❄️', '🐋', '🌌'],
    catchphrases: {
      intro: "Squeak~ You fished Mochi Seal right out of the frozen arcade pond! Let us explore the wonders of the icy tundra!",
      correct: [
        "Crisp as fresh glacial snow! That deduction was crystal clear!",
        "Squeak squeak hooray! The northern lights are dancing for you!",
        "Magnificent arctic intuition! That answer warms my fluffy heart!"
      ],
      wrong: [
        "Oopsie, slipped on the black ice! Shake the snow off your flippers!",
        "A chilly freeze! But the polar sun will rise again on the next question!",
        "Brrr! That answer drifted out to sea on an iceberg!"
      ],
      idle: [
        "Floating gently on an ice floe as the snowflakes drift...",
        "The aurora borealis is shimmering in the midnight sky...",
        "Take a deep breath of crisp polar air and choose!"
      ],
      victory: "CHAMPION OF THE FROZEN CONTINENT! You have earned the Golden Ice Crystal of the North Pole!"
    }
  },
  {
    id: 'spicy-ramen-pig',
    name: 'Pork Belly Pip',
    title: 'The Tonkotsu Connoisseur',
    tagline: 'Wearing a ceramic ramen bowl helmet, simmering rich broths and hand-pulled noodles!',
    category: 'Noodle Lore & Street Markets',
    categoryDescription: 'Tokyo ramen alleys, Italian pasta craft, pho secrets, and night market culture.',
    personality: 'Bouncy, loves savory aromas, slurps dramatically, carries chopsticks with pride.',
    themeColor: '#f97316',
    accentColor: '#fb923c',
    badge: '🍜 RAMEN SENSEI',
    emoji: '🐷🍜',
    voiceName: 'Charon',
    specialtyIcons: ['🥢', '🍲', '🌶️', '🍥'],
    catchphrases: {
      intro: "Oink-slurp! Pip is scooped straight from the steaming broth! Get your chopsticks ready for delicious trivia!",
      correct: [
        "ITADAKIMASU! That deduction is simmered to 24-hour tonkotsu perfection!",
        "GOLDEN NOODLES! You nailed the exact chewiness of that answer!",
        "EXTRA CHASHU! Five stars on the food critic scoreboard!"
      ],
      wrong: [
        "Soggy noodles! You let the broth sit too long! Eat fast next time!",
        "Too much chili oil! My tongue is burning! Let's quench it with the next round!",
        "Spilled the soup! Wipe the counter and plate up the next dish!"
      ],
      idle: [
        "Simmering gently on medium heat... noodles wait for no one!",
        "The aroma of braised pork belly fills the air...",
        "Lock in your culinary guess!"
      ],
      victory: "GRAND NOODLE MASTER! The legendary Golden Ceramic Ramen Bowl is yours to keep forever!"
    }
  },
  {
    id: 'galaxy-cat',
    name: 'Nebula Neko',
    title: 'The Starlight Voyager',
    tagline: 'Cosmic paws batting at planetary rings and purring at distant supernovas!',
    category: 'Deep Space & Cosmic Nebulas',
    categoryDescription: 'Black hole physics, stellar nurseries, exoplanet discoveries, and gravitational waves.',
    personality: 'Whimsical, purrs in radio frequencies, balances planetary orbs on its tail.',
    themeColor: '#c084fc',
    accentColor: '#a855f7',
    badge: '🌌 COSMIC PURR',
    emoji: '🐱🪐',
    voiceName: 'Kore',
    specialtyIcons: ['☄️', '🌌', '🚀', '⭐'],
    catchphrases: {
      intro: "Meow from the Andromeda galaxy! Nebula Neko has landed on your spaceship! Ready to gaze into the cosmos?",
      correct: [
        "SUPERNOVA EXPLOSION! Your answer illuminated the entire quadrant!",
        "PURR-FECT GRAVITATIONAL PULL! You orbited straight into the truth!",
        "COSMIC RAY HIT! That deduction defied the speed of light!"
      ],
      wrong: [
        "Sucked into a black hole! But hawking radiation gives us another chance!",
        "Asteroid collision! Hold on to your space helmet!",
        "Lost in interstellar dust! Recalibrate the radio telescope!"
      ],
      idle: [
        "Purring along with the cosmic microwave background...",
        "Batting at the rings of Saturn while the clock counts down...",
        "Gaze into the starlight!"
      ],
      victory: "RULER OF THE CELESTIAL REALM! You have mapped every constellation in the infinite universe!"
    }
  },
  {
    id: 'wizard-owl',
    name: 'Archmage Hoot',
    title: 'The Arcane Scholar Owl',
    tagline: 'Star-patterned wizard hat, ancient leather grimoires, and feathers charged with spells!',
    category: 'Fantasy Lore & Magic Realms',
    categoryDescription: 'High fantasy literature, mythical bestiaries, spellcasting tropes, and enchanted artifacts.',
    personality: 'Wise, theatrical, hoots when surprised, recites rhyming incantations.',
    themeColor: '#6366f1',
    accentColor: '#818cf8',
    badge: '🔮 ARCHMAGE',
    emoji: '🦉🪄',
    voiceName: 'Fenrir',
    specialtyIcons: ['📜', '🪄', '💎', '🕯️'],
    catchphrases: {
      intro: "Hoot-hoot! By Merlin's beard, you hoisted the Archmage! Fetch your wand, for arcane trivia awaits!",
      correct: [
        "BY THE POWER OF ELDORIA! Your magical intellect casts a legendary spell!",
        "CRITICAL ARCANE SUCCESS! The grimoire turns its pages in admiration!",
        "MAGICAL PROWESS! You have deciphered the ancient runes with elegance!"
      ],
      wrong: [
        "BACKFIRED SPELL! A puff of purple smoke and a failed conjuration!",
        "MISREAD THE GRIMOIRE! You turned the apprentice into a newt!",
        "COUNTERSPELL! Dust off your wizard robe and incant once more!"
      ],
      idle: [
        "Pondering the arcane orb... time flies swift as an owl on the hunt!",
        "The candles flicker in the library tower...",
        "Consult your spellbook before the sands expire!"
      ],
      victory: "SUPREME ARCHMAGE SUPREMACY! You wield the Staff of Ultimate Truth! All guilds bow in reverence!"
    }
  },
  {
    id: 'berry-bunny',
    name: 'Strawberry Usagi',
    title: 'The Berry Patch Princess',
    tagline: 'Tiny strawberry beret, pastel pink fur, and deep botanical foraging knowledge!',
    category: 'Flora, Botany & Forest Foraging',
    categoryDescription: 'Bizarre carnivorous plants, ancient redwood trees, edible wild herbs, and floral science.',
    personality: 'Sweet, gentle, loves fresh fruit scents, hops excitedly when learning flower facts.',
    themeColor: '#fb7185',
    accentColor: '#f43f5e',
    badge: '🍓 BERRY PRINCESS',
    emoji: '🐰🍓',
    voiceName: 'Kore',
    specialtyIcons: ['🌸', '🍓', '🌿', '🍯'],
    catchphrases: {
      intro: "Hop-hop! Strawberry Usagi picked from the arcade garden! Let us sniff out the sweet secrets of botanical science!",
      correct: [
        "BERRY SWEET SUCCESS! Ripe and juicy deduction, senpai!",
        "BLOSSOMING GENIUS! That answer just sprouted five pink roses!",
        "SWEET AS JAM! You have the ultimate green thumb of knowledge!"
      ],
      wrong: [
        "Pricked by a briar thorn! Ouchie! But we will pick the next berry!",
        "A sour wild berry! Wash it down and forage the next bush!",
        "Wilted petal! Water your thoughts and bloom again!"
      ],
      idle: [
        "Nibbling on sweet clover while the sunbeams dance...",
        "Can you smell the sweet wild strawberries in the meadow?",
        "Hop into action!"
      ],
      victory: "QUEEN OF THE BOTANICAL GARDENS! You hold the legendary Golden Strawberry of Perpetual Spring!"
    }
  },
  {
    id: 'steampunk-otter',
    name: 'Barnaby Brass',
    title: 'The Clockwork Tinkerer',
    tagline: 'Brass goggles, tiny pocket watch, and a passion for industrial revolutions!',
    category: 'Steampunk & Mechanical Marvels',
    categoryDescription: 'Steam locomotives, clockwork automata, Victorian inventions, and gear physics.',
    personality: 'Clinking with brass gears, talks about torque and steam pressure, always carries a tiny wrench.',
    themeColor: '#ca8a04',
    accentColor: '#eab308',
    badge: '⚙️ CHIEF TINKERER',
    emoji: '🦦⚙️',
    voiceName: 'Zephyr',
    specialtyIcons: ['🔧', '🚂', '🕰️', '💡'],
    catchphrases: {
      intro: "Splendid engineering! Barnaby Brass extracted with maximum hydraulic efficiency! Let us calibrate the gears of knowledge!",
      correct: [
        "STEAM PRESSURE NOMINAL! All brass cogs mesh with immaculate precision!",
        "A MASTERWORK INVENTION! Even Watt and Tesla would applaud your deduction!",
        "CLOCKWORK PERFECTION! Ticking right along with the chronometer!"
      ],
      wrong: [
        "BLOWN GASKET! Vent the steam valves immediately! Check the pressure gauge!",
        "STRIPPED GEAR! A tooth slipped in the differential mechanism!",
        "LOOSE BOLT! Tighten your spanner and reassemble the engine!"
      ],
      idle: [
        "Listening to the steady tick-tock of the brass clockwork escapement...",
        "The boiler is building head of steam... do not delay!",
        "Engage your cerebral gears!"
      ],
      victory: "CHIEF ENGINEER SUPREME! You have assembled the Perpetual Motion Machine of Arcade Wisdom!"
    }
  },
  {
    id: 'vampire-bat',
    name: 'Count Fluffula',
    title: 'The Velvet Midnight Fruit Bat',
    tagline: 'Silk cape, tiny fangs, swooping for ripe figs and ancient gothic secrets!',
    category: 'Gothic Lore & Castle Mysteries',
    categoryDescription: 'Haunted castles, gargoyles, Victorian ghost stories, and nocturnal animal sonar.',
    personality: 'Dramatic, swoops with its tiny velvet wings, sips pomegranate juice from a goblet.',
    themeColor: '#9333ea',
    accentColor: '#a855f7',
    badge: '🦇 GOTHIC COUNT',
    emoji: '🦇🏰',
    voiceName: 'Fenrir',
    specialtyIcons: ['🍷', '🏰', '🌙', '🕯️'],
    catchphrases: {
      intro: "Good evening... Count Fluffula descends from the belfry! Welcome to my haunted library of midnight enigmas!",
      correct: [
        "EXQUISITE NOCTURNE! Your intellect pierces through the darkest shadow!",
        "IMMORTAL GENIUS! The castle gargoyles sing in harmonic praise!",
        "CHILLING PERFECTION! A deduction worthy of a thousand-year-old count!"
      ],
      wrong: [
        "FOILED BY GARLIC! My velvet cape shivers at that tragic conjecture!",
        "TRAPPED IN THE DUNGEON! Light your torch and navigate the catacombs!",
        "MISJUDGED THE MOON PHASE! The bats return to the roost in bewilderment!"
      ],
      idle: [
        "The grandfather clock strikes midnight in the grand hall...",
        "Listen to the creatures of the night... what music they make...",
        "Ponder beneath the crescent moon!"
      ],
      victory: "SOVEREIGN OF THE NIGHT! The midnight kingdom is yours! Fly free upon velvet wings!"
    }
  },
  {
    id: 'boba-dragon',
    name: 'Tatsu Tapioca',
    title: 'The Jade Tea Dragon',
    tagline: 'Chubby jade dragon scales, breathing sweet steam and guarding golden pearls!',
    category: 'Mythical Beasts & Eastern Legends',
    categoryDescription: 'Qilin, Chinese dragons, jade emperors, monkey kings, and river spirits.',
    personality: 'Majestic yet delightfully round, hoards boba pearls like treasure, snorts playful steam.',
    themeColor: '#14b8a6',
    accentColor: '#2dd4bf',
    badge: '🐉 JADE GUARDIAN',
    emoji: '🐉🧋',
    voiceName: 'Charon',
    specialtyIcons: ['⛩️', '🍵', '🪨', '🧧'],
    catchphrases: {
      intro: "Rumble-roar! Tatsu Tapioca awakens from the jade pond! Welcome to the dragon's celestial tea pavilion!",
      correct: [
        "DRAGON PEARL ILLUMINATED! Your wisdom shines brighter than ancient jade!",
        "CELESTIAL REJOICING! The heavens part for your heroic intellect!",
        "AUSPICIOUS HARMONY! The imperial court bows to your supreme insight!"
      ],
      wrong: [
        "SNORTED STEAM IN HASTE! The dragon pearl slipped into the river!",
        "A CLOUDY OMENS! Clear the dragon mist and summon your inner fire!",
        "MISJUDGED THE ELEMENT! Balance your yin and yang for the next question!"
      ],
      idle: [
        "Brewing high mountain oolong tea while the dragon pearl glows...",
        "The mists swirl over the sacred mountain peaks...",
        "Summon your dragon spirit!"
      ],
      victory: "CELESTIAL DRAGON EMPEROR! You hold the imperial Jade Seal of Wisdom! Heaven and Earth honor you!"
    }
  },
  {
    id: 'cactus-pup',
    name: 'Spike Pup',
    title: 'The Desert Bloom Shiba',
    tagline: 'Sweet little succulent paws, blooming desert flower on head, and drought resilience!',
    category: 'Desert Secrets & Cacti Wonders',
    categoryDescription: 'Sahara sand seas, bioluminescent scorpions, succulent botany, and canyon geology.',
    personality: 'Sun-loving, cheerful barker, drinks water enthusiastically, prickly on the outside, sweet on the inside.',
    themeColor: '#84cc16',
    accentColor: '#a3e635',
    badge: '🌵 DESERT BLOOM',
    emoji: '🐕🌵',
    voiceName: 'Puck',
    specialtyIcons: ['☀️', '🏜️', '🌺', '🦎'],
    catchphrases: {
      intro: "Yip-bark! Spike Pup popped up from the sunny sand dune! Ready to trek through the coolest desert trivia?",
      correct: [
        "DESERT BLOOM TRIUMPH! That answer just made a rare canyon cactus flower!",
        "OASIS DISCOVERED! Sweet, refreshing water of absolute genius!",
        "PRICKLY PRECISION! You nailed that point right on the cactus needle!"
      ],
      wrong: [
        "CAUGHT IN A SANDSTORM! Squint your eyes and shake off the dust!",
        "MIRAGE CONFUSION! You thought you saw water, but it was just hot sand!",
        "PRICKED BY A NEEDLE! Yip! Drink some cactus juice and sprint back!"
      ],
      idle: [
        "Soaking up the warm desert sunshine... don't let your water flask run dry!",
        "The tumbleweeds roll by as the clock ticks down...",
        "Bark your answer!"
      ],
      victory: "RULER OF THE GOLDEN DUNES! You have conquered the great desert with infinite stamina and bloom!"
    }
  },
  {
    id: 'detective-duck',
    name: 'Sherduck Holmes',
    title: 'The Quacking Inquisitor',
    tagline: 'Deerstalker cap, tiny bubble pipe, investigating trivia mysteries and missing facts!',
    category: 'Detective Whodunits & Code Mysteries',
    categoryDescription: 'Classic murder mysteries, Agatha Christie tropes, cryptography, and heist history.',
    personality: 'Analytical, quacks thoughtfully, inspects clues through a giant magnifying glass.',
    themeColor: '#eab308',
    accentColor: '#facc15',
    badge: '🔍 MASTER SLEUTH',
    emoji: '🦆🔎',
    voiceName: 'Fenrir',
    specialtyIcons: ['🕵️', '🔍', '📜', '🗝️'],
    catchphrases: {
      intro: "Elementary, my dear gamer! Sherduck Holmes on the case! The game is afoot in the arcade!",
      correct: [
        "ELEMENTARY! The culprit was caught red-handed by your deductive genius!",
        "THE PERFECT CLUE! You uncovered the smoking gun of truth!",
        "CASE CLOSED! Inspector Lestrade stands thoroughly outclassed!"
      ],
      wrong: [
        "A RED HERRING! You fell for the most scandalous decoy in London!",
        "MUDDY FOOTPRINTS! You followed the wrong trail into the Thames!",
        "A FLAWED ALIBI! Re-examine the suspects and inspect the evidence!"
      ],
      idle: [
        "Puffing thoughtful soap bubbles while examining the crime scene...",
        "The pocket watch ticks... what say you, Dr. Watson?",
        "Deduce with precision!"
      ],
      victory: "THE GREATEST DETECTIVE IN HISTORY! You have unraveled the ultimate mystery of the claw realm!"
    }
  },
  {
    id: 'chibi-kraken',
    name: 'Squish Kraken',
    title: 'The Abyssal Sovereign',
    tagline: 'Balancing a miniature sunken galleon, glowing with bioluminescent oceanic secrets!',
    category: 'Sunken Cities & Oceanic Abyss',
    categoryDescription: 'Mariana Trench, hydrothermal vents, giant squid battles, and lost civilizations.',
    personality: 'Curious deep-sea explorer, squirts glittery blue ink when delighted, speaks of ancient sunken cities.',
    themeColor: '#8b5cf6',
    accentColor: '#a78bfa',
    badge: '🐙 DEEP ABYSS',
    emoji: '🐙🌊',
    voiceName: 'Zephyr',
    specialtyIcons: ['🔱', '🌊', '⚓', '🏛️'],
    catchphrases: {
      intro: "Blub-blub! From eleven thousand meters below the surface, Squish Kraken rises to quiz your nautical mind!",
      correct: [
        "TITANIC ACCURACY! The deep ocean trenches echo with your brilliance!",
        "LOST ATLANTIS DISCOVERED! You unearthed the sunken jewel of knowledge!",
        "HYDROTHERMAL SURGE! Pure energetic triumph from the ocean floor!"
      ],
      wrong: [
        "CRUSHED BY PRESSURE! 1,000 atmospheres of wrongness! Pump your ballast tanks!",
        "BLINDED BY INK! Squish Kraken sneezed! Clear the water and dive again!",
        "SUNKEN TREASURE LOST! Cast your sonar nets for the next question!"
      ],
      idle: [
        "Glow-in-the-dark tentacles undulating in the twilight abyss...",
        "The pressure gauge is rising... choose your depth!",
        "Listen to the song of the blue whale!"
      ],
      victory: "MONARCH OF THE SEVEN OCEANS! You hold the Trident of Poseidon and rule the deepest abyss!"
    }
  }
];

