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
    "Hi hun, how are you doing?"
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
