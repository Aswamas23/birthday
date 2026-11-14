/**
 * ==============================================================================
 * BIRTHDAY WEBSITE CONFIGURATION (js/config.js)
 * ==============================================================================
 * All editable text, photos, messages, and settings live here!
 *
 * HOW TO EDIT:
 * 1. To change her name or your name: update `names.hers` and `names.yours`.
 * 2. To change photos: place your real photos in:
 *      - images/then/   (for childhood photos)
 *      - images/now/    (for recent photos)
 *      - images/21st/   (for her 21st birthday photo)
 *    and update the `src` paths below (e.g. "images/then/childhood1.jpg").
 * 3. To set a password/birthday gate: set `passwordGate` to e.g. "11/11" or "November 11".
 *    To leave it open without any password, keep it `null`.
 * 4. To add background music: drop an MP3 into the `audio/` folder and make sure
 *    `music.src` matches the filename (e.g. "audio/birthday-song.mp3").
 *
 * NOTE: Use relative paths only (never start with a slash `/`).
 * ==============================================================================
 */

const CONFIG = {
  // Names displayed throughout the site
  names: {
    hers: "Shekinah",
    yours: "Adrian",
  },

  // Birthday details & optional password gate
  birthday: {
    date: "November 11",
    turning: 22,
    previous: 21,
    // Set to a string like "November 11" to enable a birthday lock on the welcome screen.
    // Set to null or "" to disable the gate and let anyone open it immediately.
    passwordGate: null,
  },

  // Background music settings (automatically plays when entering the website)
  music: {
    src: "audio/birthday-song.mp3",
    label: "Play music 🎵",
    autoplay: true,
  },

  // Childhood / "Then" Photos (shown in the polaroid carousel)
  thenPhotos: [
    {
      src: "images/then/WhatsApp Image 2026-11-08 at 21.36.45.jpeg",
      alt: "Little Shekinah smiling",
      caption: "Look at that sweet smile 🌸",
    },
    {
      src: "images/then/WhatsApp Image 2026-11-08 at 21.36.46.jpeg",
      alt: "Little Shekinah playing",
      caption: "Always full of life and laughter 💫",
    },
    {
      src: "images/then/WhatsApp Image 2026-11-08 at 21.36.47.jpeg",
      alt: "Little Shekinah growing up",
      caption: "Even then, you were pure magic ✨",
    },
  ],

  // Recent / "Now" Photos (shown in the masonry grid with lightbox)
  nowPhotos: [
    {
      src: "images/now/WhatsApp Image 2026-10-20 at 19.50.28.jpeg",
      alt: "Shekinah looking beautiful",
      caption: "Still glowing brighter every single day 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.07.jpeg",
      alt: "Shekinah laughing",
      caption: "That laugh heals everything 🩷",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.18.jpeg",
      alt: "Shekinah being herself",
      caption: "Effortlessly stunning in every way ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.19.jpeg",
      alt: "Shekinah posing",
      caption: "Every single moment with you is a masterpiece 💫",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.18 (1).jpeg",
      alt: "Shekinah in recent photo 5",
      caption: "Another moment I'll always treasure 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.19 (1).jpeg",
      alt: "Shekinah in recent photo 6",
      caption: "There's magic in the little moments ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.54 (1).jpeg",
      alt: "Shekinah in recent photo 7",
      caption: "One more reason to celebrate you 🌸",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.54 (2).jpeg",
      alt: "Shekinah in recent photo 8",
      caption: "Simply you, and that's everything 🩷",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.54.jpeg",
      alt: "Shekinah in recent photo 9",
      caption: "Every memory with you is special 💫",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.55 (1).jpeg",
      alt: "Shekinah in recent photo 10",
      caption: "Your light makes every day brighter 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.55 (2).jpeg",
      alt: "Shekinah in recent photo 11",
      caption: "Always my favorite person ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.55 (3).jpeg",
      alt: "Shekinah in recent photo 12",
      caption: "Another moment I'll always treasure 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.55.jpeg",
      alt: "Shekinah in recent photo 13",
      caption: "There's magic in the little moments ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.56 (1).jpeg",
      alt: "Shekinah in recent photo 14",
      caption: "One more reason to celebrate you 🌸",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.56 (2).jpeg",
      alt: "Shekinah in recent photo 15",
      caption: "Simply you, and that's everything 🩷",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.56 (3).jpeg",
      alt: "Shekinah in recent photo 16",
      caption: "Every memory with you is special 💫",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.56.jpeg",
      alt: "Shekinah in recent photo 17",
      caption: "Your light makes every day brighter 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.57 (1).jpeg",
      alt: "Shekinah in recent photo 18",
      caption: "Always my favorite person ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.57 (2).jpeg",
      alt: "Shekinah in recent photo 19",
      caption: "Another moment I'll always treasure 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.57 (3).jpeg",
      alt: "Shekinah in recent photo 20",
      caption: "There's magic in the little moments ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.57.jpeg",
      alt: "Shekinah in recent photo 21",
      caption: "One more reason to celebrate you 🌸",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.58 (1).jpeg",
      alt: "Shekinah in recent photo 22",
      caption: "Simply you, and that's everything 🩷",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.58 (2).jpeg",
      alt: "Shekinah in recent photo 23",
      caption: "Every memory with you is special 💫",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.58 (3).jpeg",
      alt: "Shekinah in recent photo 24",
      caption: "Your light makes every day brighter 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.58.jpeg",
      alt: "Shekinah in recent photo 25",
      caption: "Always my favorite person ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.59 (1).jpeg",
      alt: "Shekinah in recent photo 26",
      caption: "Another moment I'll always treasure 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.59 (2).jpeg",
      alt: "Shekinah in recent photo 27",
      caption: "There's magic in the little moments ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.59 (3).jpeg",
      alt: "Shekinah in recent photo 28",
      caption: "One more reason to celebrate you 🌸",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.54.59.jpeg",
      alt: "Shekinah in recent photo 29",
      caption: "Simply you, and that's everything 🩷",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.55.00.jpeg",
      alt: "Shekinah in recent photo 30",
      caption: "Every memory with you is special 💫",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.55.01 (1).jpeg",
      alt: "Shekinah in recent photo 31",
      caption: "Your light makes every day brighter 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.55.01 (2).jpeg",
      alt: "Shekinah in recent photo 32",
      caption: "Always my favorite person ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.55.01.jpeg",
      alt: "Shekinah in recent photo 33",
      caption: "Another moment I'll always treasure 💙",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.55.02 (1).jpeg",
      alt: "Shekinah in recent photo 34",
      caption: "There's magic in the little moments ✨",
    },
    {
      src: "images/now/WhatsApp Image 2026-11-03 at 07.55.03.jpeg",
      alt: "Shekinah in recent photo 35",
      caption: "One more reason to celebrate you 🌸",
    },
  ],

  // Her 21st Birthday Photo (shown in the 21 to 22 section)
  photo21st: {
    src: "images/21st/WhatsApp Image 2026-11-03 at 07.55.01 (3).jpeg",
    alt: "Shekinah on her 21st birthday",
    caption: "21 and already my entire world 🎂",
    secondSrc: "images/21st/WhatsApp Image 2026-11-03 at 07.55.02.jpeg",
    secondAlt: "Another memory from Shekinah's 21st birthday",
    secondCaption: "A beautiful memory from your 21st 💙",
  },

  // "Reasons I Love You" (6 interactive 3D flip cards)
  loveReasons: [
    "The way your eyes light up with pure warmth when you laugh",
    "How deeply kind, empathetic, and caring you are to everyone",
    "Your inner strength — you carry every challenge with so much grace",
    "The effortless way you make ordinary moments feel like fairy tales",
    "Your laugh is genuinely my favourite sound in the whole universe",
    "Simply because you are uniquely you — and you are everything to me",
  ],

  // Memory Timeline (vertical timeline of your story)
  timeline: [
    {
      date: "The First Chapter",
      title: "The Beginning",
      text: "The day our paths crossed and everything changed for the better. 💙",
      photo: "images/now/WhatsApp Image 2026-11-03 at 07.54.54 (1).jpeg",
    },
    {
      date: "Our Favorite Day",
      title: "Adventures With You",
      text: "No matter where we go or what we do, every journey is magic by your side. 🌸",
      photo: "images/now/WhatsApp Image 2026-11-03 at 07.54.55 (1).jpeg",
    },
    {
      date: "Unforgettable Moment",
      title: "Under the Stars",
      text: "Late-night conversations, endless laughs, and memories I'll treasure forever. ✨",
      photo: "images/now/WhatsApp Image 2026-11-03 at 07.54.56 (1).jpeg",
    },
    {
      date: "Today & Tomorrow",
      title: "Growing Together",
      text: "Standing side by side, building our dreams together hand in hand. 🩷",
      photo: "images/now/WhatsApp Image 2026-11-03 at 07.54.57 (1).jpeg",
    },
  ],

  // Closing Love Letter & Cake Wish Message
  loveLetter: {
    lines: [
    "Dear Shekinah,",
      "",
      "Happy 22nd Birthday to the most beautiful, wonderful soul I know.",
      "This year with you feels like a gift I didn't deserve,",
      "yet somehow, you chose me.",
      "",
      "You make the world softer, kinder, and more colorful",
      "just by being in it.",
      "",
      "On your 22nd trip around the sun, I want you to always remember:",
      "you are loved beyond words,",
      "cherished beyond measure,",
      "and celebrated today and every single day.",
      "",
      "Here is to 22 — and every year after, together.",
      "",
      "All my love, always,",
      "Adrian",
    ],
    // Revealed when all 6 birthday candles are blown out!
    cakeWishMessage: "May every single wish you make today come true. You deserve the entire world. 🌸✨",
  },
};

// Ensure CONFIG is also accessible on window
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}

