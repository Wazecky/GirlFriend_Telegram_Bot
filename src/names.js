const stringSimilarity = require('string-similarity');

const callResponses = {
  "babe": "Yes babe, I'm here for you. 💖",
  "baby": "Yes baby, what's on your mind? 😘",
  "sweetheart": "Yes sweetheart, you mean the world to me. 🌍❤️",
  "my sweetheart": "Yes sweetie, you light up my life. ✨💫",
  "sweety": "Yes my chocolate, I'm all ears. 🍫😊",
  "honey": "Yes hun, you're the sweetest. 🍯😍",
  "darling": "Yes darling, I adore you. 🥰",
  "my darling": "Yes darling, you're my everything. ❤️",
  "love": "Yes my love, I'm always here for you. ❤️",
  "my love": "Yes love, you complete me. ❤️",
  "my lover": "Yes my lover boy, you make my heart race. 💓",
  "sweetie": "Yes sweetie, you're the sugar in my life. 🍭",
  "dearest": "Yes my dear, your happiness means everything to me. 😊",
  "dear": "Yes dear, I cherish every moment with you. 💑",
  "my dear": "Yes dear, you're my one and only. 💏",
  "angel": "Yes my angel, you're my guiding star. ⭐",
  "my angel": "Yes my angel, your love is a blessing. 😇",
  "beloved": "Yes my lover, you're the song in my heart. 🎶",
  "cupid": "Yes handsome, you've captured my heart. 😘",
  "sugar": "Yes sweetie, you're the sweetness in my life. 🍬",
  "treasure": "Yes my treasure, you're priceless to me. 💎",
  "my treasure": "Yes love, you're my most valuable possession. 💍",
  "cutie": "Yes handsome, you make me smile. 😊",
  "sunshine": "Yes my sunshine, you brighten my day. ☀️",
  "heartthrob": "Yes my heartbeat, you're the rhythm of my life. 💓🎶",
  "my sunshine": "Yes honey, your smile is my sunshine. 😁☀️",
  "my heartbeat": "Yes my everything, you complete me. ❤️",
  "boo": "Yes babe, you're my one and only boo. 👻❤️",
  "pumpkin": "Yes darling, you're the sweetness in my life. 🎃🍭",
  "my soulmate": "Yes my dear, you're my soulmate forever. 💞",
  "my everything": "Yes my all, you mean everything to me. 💖",
  "adore": "Yes love, I adore you with all my heart. ❤️",
};

const getCallResponse = (calling) => {
  const lowercaseCalling = calling.toLowerCase();
  const keys = Object.keys(callResponses);

  // Calculate similarities and find the best match
  const matches = stringSimilarity.findBestMatch(lowercaseCalling, keys);
  const bestMatch = matches.bestMatch;

  // Check if the best match has a similarity score above a certain threshold
  if (bestMatch.rating >= 0.8) {
    return callResponses[bestMatch.target] || null;
  } else {
    return null; // No close match found
  }
};

module.exports = {
  getCallResponse,
};
