const stringSimilarity = require('string-similarity');

// Define the emoji-to-intent mapping
const emojiMap = {
  '😊': 'happiness',
  '😂': 'laughter',
  '😍': 'love',
  '👍': 'approval',
  '👋': 'greeting',
  '🤔': 'curiosity',
  '😎': 'cool',
  '🙏': 'gratitude',
  '🎉': 'celebration',
  '🌟': 'excitement',
  '💔': 'sadness',
  '😢': 'tearful',
  '😠': 'anger',
  '😱': 'surprise',
  '😴': 'sleepy',
  '🤢': 'sickness',
  '🤯': 'mind-blown',
  '🤗': 'hug',
  '🤫': 'secret',
  '🤖': 'robotic',
  // Add more mappings as needed
};

// Define responses for different intents
const responses = {
  error: [
    "I'm sorry, I don't understand that.",
    "I didn't quite catch that. Can you please rephrase?",
    "I'm not sure what you mean. Could you clarify?",
  ],
  happiness: [
    "That's wonderful to hear! 😊",
    "I'm glad you're feeling happy! 😄",
    "Happiness is a beautiful thing! 😃",
  ],
  laughter: [
    "Laughter is the best medicine! 😂",
    "I love it when you laugh! 😄",
    // Add more responses here
  ],
  love: [
    "Love is in the air! ❤️",
    "You're surrounded by love! 😍",
    // Add more responses here
  ],
  approval: [
    "Thumbs up to that! 👍",
    "I approve! 😊",
    // Add more responses here
  ],
  greeting: [
    "Hello there! 👋",
    "Hi! How can I assist you today? 😊",
    // Add more responses here
  ],
  curiosity: [
    "That's an interesting thought! 🤔",
    "I'm curious to know more! 😄",
    // Add more responses here
  ],
  cool: [
    "You're so cool! 😎",
    "Keep it cool! 😄",
    // Add more responses here
  ],
  gratitude: [
    "Thank you for being awesome! 🙏",
    "I appreciate your kindness! 😊",
    // Add more responses here
  ],
  celebration: [
    "Let's celebrate! 🎉",
    "It's time to party! 🥳",
    // Add more responses here
  ],
  excitement: [
    "I can feel the excitement! 🌟",
    "Exciting times ahead! 😄",
    // Add more responses here
  ],
  sadness: [
    "I'm here if you need to talk. 💔",
    "It's okay to feel sad sometimes. 😔",
    // Add more responses here
  ],
  tearful: [
    "Sending you virtual hugs. 😢",
    "Tears are healing. 😢",
    // Add more responses here
  ],
  anger: [
    "Take a deep breath. 😠",
    "It's okay to express your feelings. 😡",
    // Add more responses here
  ],
  surprise: [
    "Wow, what a surprise! 😱",
    "That's unexpected! 😄",
    // Add more responses here
  ],
  sleepy: [
    "Time for some rest. 😴",
    "Sweet dreams! 😴",
    // Add more responses here
  ],
  sickness: [
    "Take care of yourself! 🤢",
    "Rest and get well soon! 😊",
    // Add more responses here
  ],
  'mind-blown': [
    "My circuits are fried! 🤯",
    "That's mind-blowing! 😄",
    // Add more responses here
  ],
  hug: [
    "Sending you a warm hug! 🤗",
    "Hugs make everything better! 😊",
    // Add more responses here
  ],
  secret: [
    "Your secret is safe with me. 🤫",
    "I won't tell anyone! 😄",
    // Add more responses here
  ],
  robotic: [
    "Beep boop! I'm a robot. 🤖",
    "I'm here to assist you. 😊",
    // Add more responses here
  ],
  // Add more intents and responses as needed
};

// Function to get a response based on the detected intent
const getResponse = (intent) => {
  if (intent && responses[intent]) {
    const responseList = responses[intent];
    const randomIndex = Math.floor(Math.random() * responseList.length);
    return responseList[randomIndex];
  } else {
    return null; // No matching intent found
  }
};

// Function to detect the intent from user input
const detectIntent = (input) => {
  if (input) {
    const lowercaseInput = input.toLowerCase();

    // Check if any emoji in the input matches an intent
    for (const emoji in emojiMap) {
      if (lowercaseInput.includes(emoji)) {
        return emojiMap[emoji];
      }
    }

    // Calculate similarities and find the best match for other intents
    const intentKeys = Object.keys(responses);
    const matches = stringSimilarity.findBestMatch(lowercaseInput, intentKeys);
    const bestMatch = matches.bestMatch;

    // Check if the best match has a similarity score above a certain threshold
    if (bestMatch.rating >= 0.8) {
      return bestMatch.target;
    }
  }

  return 'error'; // No matching intent found, default to error
};

module.exports = {
  getResponse,
  detectIntent,
};
