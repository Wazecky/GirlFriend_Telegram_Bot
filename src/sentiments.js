const stringSimilarity = require('string-similarity');

const sentimentResponses = {
  positive_sentiment: [
    "That's fantastic! Your positivity is contagious! 😄",
    "I'm glad to hear you're feeling positive! 😊",
    "You're radiating positivity! Keep it up! 🌟",
    "Your positive outlook brightens my day! 😄",
    "Positivity is the key to a joyful life. Keep smiling! 😊",
    "Embrace the positivity within you, my friend! 🌞",
    "Every positive thought is a step towards happiness! 😄",
    "Your positive vibes are like sunshine on a cloudy day! 🌤️",
    "Keep the positivity flowing; it makes the world a better place! 🌈",
    "The world needs more positivity, and you're contributing to it! 🌍✨",
  ],
  negative_sentiment: [
    "I'm here to support you during tough times. 💕",
    "I'm sorry to hear that you're feeling down. I'm here to listen. 😔",
    "Remember, bad days don't last forever. I'm here for you. ❤️",
    "It's okay to have tough moments; I'm here to help you through them. 😌",
    "You're not alone in your feelings; I'm here to provide comfort. ❤️",
    "Even on challenging days, your strength shines through. 💪",
    "If you ever need a virtual shoulder to lean on, I'm here. 🤗",
    "Your resilience during difficult times is truly admirable. ❤️",
    "Together, we'll navigate through the tough times. You're not alone. 🌟",
    "Sending you a virtual hug and support during this moment. 🤗❤️",
  ],
  neutral_sentiment: [
    "It's okay to have neutral feelings. What's on your mind? 😊",
    "Sometimes neutrality can lead to introspection. How can I assist you today? 🌟",
    "I'm here to chat, no matter how you're feeling. What's on your mind? ❤️",
    "Neutral moments can provide a peaceful pause in our busy lives. How can I make your day better? 😌",
    "No matter how you're feeling, our conversations are always meaningful. What would you like to discuss today? 😊",
    "In the calm of neutrality, we find the space to explore new ideas and thoughts. What interests you at the moment? 🌈",
    "Your emotions are valid, whether they're vibrant or tranquil. How can I add some positivity to your day? ✨",
    "Life is a mixture of highs and lows, but our chat is a constant source of connection. What's on your agenda today? 😄",
    "Neutrality is like a blank canvas; you can paint it with any topic or conversation you'd like. What's your palette today? 🎨",
    "Your presence is always a positive influence, no matter how you're feeling. How can I assist you further? 😊",
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
