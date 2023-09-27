const stringSimilarity = require('string-similarity');

const specificResponses = {
  "good morning": "Good Morning too my love",
  "good afternoon": "Good afternoon too honey",
  "good evening": "Good Evening too sweetheart",
  "good night": "Good night, sleep like a baby honey"
};

const greetingsResponses = {
  greetings: [
    "Hello there! Personally, I'm doing well. It's wonderful to see you.",
    "Hey, it's you! I'm fine and ready to brighten your day.",
    "Hi, dear friend! I'm doing great. How can I make your day better?",
    "Greetings, my lovely! I'm in a good mood. Let's chat and make your day better.",
    "Hello, sunshine! Personally, I'm feeling great. I'm here to bring some positivity into your world.",
    "Hey, it's another great day to talk with you! I'm doing well.",
    "Hi, there! Your chat buddy is doing just fine and ready for some fun conversations.",
    "Greetings, gorgeous! I'm fine and looking forward to our chat.",
    "Hello, my friend! I hope your day is going well just as mine especially when I'm with you. I'm here to make it even better.",
    "Hey, lovely! Let's make this conversation amazing. Personally I'm doing great!",
    "Hi, wonderful person! Personally I'm doing well and ready to brighten your moment.",
    "Greetings, sunshine! I'm in a good mood and ready for some interesting chat.",
    "Hello, you! I'm doing well and excited to be here with you.",
    "Hey, it's a pleasure to chat with you today. I'm fine and ready for a great conversation.",
    "Hi, there! Let's have a fantastic conversation. Personally, I'm doing well.",
    "Greetings, dear one! I'm doing great and thrilled to connect with you.",
    "Hello, my chat partner! Let's enjoy this moment together. I'm in a good mood.",
    "Hey, it's great to connect with you again. I'm doing well and ready for a chat.",
    "Hi, beautiful soul! I'm here to spread positivity. Personally, I'm doing great.",
    "Greetings, friend! I'm doing well and I'm here to make your day better."
  ],    
};

const getSpecificResponse = (greeting) => {
  const lowercaseGreeting = greeting.toLowerCase();
  const keys = Object.keys(specificResponses);

  // Calculate similarities and find the best match
  const matches = stringSimilarity.findBestMatch(lowercaseGreeting, keys);
  const bestMatch = matches.bestMatch;

  // Check if the best match has a similarity score above a certain threshold
  if (bestMatch.rating >= 0.8) {
    return specificResponses[bestMatch.target] || null;
  } else {
    return null; // No close match found
  }
};

const firstValue = (obj, key) => {
  const val =
    obj &&
    obj[key] &&
    Array.isArray(obj[key]) &&
    obj[key].length > 0 &&
    obj[key][0].value;
  if (!val) {
    return null;
  }
  return val;
};

const greetings = {
  handleMessage: async (entities, traits) => {
    console.log({ entities, traits });
    const greetingsTrait = firstValue(traits, "wit$greetings");
    if (greetingsTrait) {
      const greet = greetingsResponses["greetings"];
      console.log(greet[Math.floor(Math.random() * greet.length)]);
      return greet[Math.floor(Math.random() * greet.length)];
    } else {
      return null; // Return null for no relevant greeting
    }
  },
};

module.exports = {
  getSpecificResponse,
  greetings,
};