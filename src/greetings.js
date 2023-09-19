const stringSimilarity = require('string-similarity');

const specificResponses = {
  "good morning": "Good Morning too my love",
  "good afternoon": "Good afternoon too honey",
  "good evening": "Good Evening too sweetheart",
  "good night": "Good night, sleep like a baby honey"
};

const greetingsResponses = {
  greetings: [
    "Hey love, how's it going?",
    "Hi honey, What's good with you?",
    "Hello to you too sweetheart?",
    "Hey, glad to see you again! I missed you babe",
    "Hi hun, how are you doing?",
    "Hello there! How's your day been?",
    "Hi dear! What can I assist you with today?",
    "Hey! It's great to chat with you again!",
    "Hello, my friend! How have you been lately?",
    "Hi there! Ready for some interesting conversation?",
    "Hey love! Tell me, what's on your mind?",
    "Hi! How's the weather at your end?",
    "Hello, sunshine! What's new in your world?",
    "Hiya! How has life been treating you lately?",
    "Hey there! Anything exciting happening in your day?",
    "Hi, my friend! How can I brighten your day today?",
    "Hello, gorgeous! What's the latest in your life?",
    "Hi! How's your day shaping up so far?",
    "Hey, it's you! How's everything going on your side?",
    "Hi, lovely! What's the word on the street?"
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