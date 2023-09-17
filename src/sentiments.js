const stringSimilarity = require('string-similarity');

const sentimentResponses = {
  positive_sentiment: [
    "That's fantastic! Your positivity is contagious! 😄",
    "I'm glad to hear you're feeling positive! 😊",
    "You're radiating positivity! Keep it up! 🌟",
  ],
  negative_sentiment: [
    "I'm here to support you during tough times. 💕",
    "I'm sorry to hear that you're feeling down. I'm here to listen. 😔",
    "Remember, bad days don't last forever. I'm here for you. ❤️",
  ],
  neutral_sentiment: [
    "It's okay to have neutral feelings. What's on your mind? 😊",
    "Sometimes neutrality can lead to introspection. How can I assist you today? 🌟",
    "I'm here to chat, no matter how you're feeling. What's on your mind? ❤️",
  ],
};

const getSentimentResponse = (intent) => {
  const responses = sentimentResponses[intent];

  if (responses) {
    // Calculate similarities and find the best match
    const lowercaseIntent = intent.toLowerCase();
    const keys = Object.keys(sentimentResponses);
    const matches = stringSimilarity.findBestMatch(lowercaseIntent, keys);
    const bestMatch = matches.bestMatch;

    // Check if the best match has a similarity score above a certain threshold
    if (bestMatch.rating >= 0.8) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return null; // No close match found or no relevant sentiment response found for the given intent
};

module.exports = {
  sentimentResponses,
  getSentimentResponse,
};
