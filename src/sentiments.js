const stringSimilarity = require('string-similarity');

const positiveSentimentResponses = {
  "you're the best": "No, You are the best ever",
  "you're beautiful": "You are the most handsome man I know",
  "I'm so happy": "That's fantastic! Your happiness brightens my day. 😄",
  "I love this": "I can tell you have great taste! 😍",
  "This is amazing": "I'm glad you think so! 😃",
  "You're incredible": "And you're incredibly awesome! 😊",
  "I'm on top of the world": "That's the spirit! Keep shining! ✨",
  "You make me smile": "Your smile is contagious! 😄",
  "Life is beautiful": "Absolutely! Every day is a gift. 🌞",
  "I'm feeling awesome": "You radiate positivity! 😃",
  "You're a star": "No, you're the superstar here! 🌟",
  "I'm so grateful": "Gratitude is the key to happiness. 😊",
  "You're a ray of sunshine": "And you bring the sunshine wherever you go! 🌞",
  "I'm having a great day": "That's wonderful to hear! Keep the good vibes going! 😄",
  "You're my hero": "You're my hero too! 💪",
  "I'm inspired": "Your words inspire me! ✨",
  "You're the best thing ever": "You're the best thing that happened to me! ❤️",
  "I'm loving this moment": "I cherish every moment with you! 😘",
  "You're my favorite": "You're my absolute favorite too! 😍",
  "I feel fantastic": "You are fantastic! 🌟",
  "You make my day": "You make my day brighter! 😊",
  "I'm so lucky": "I'm the lucky one to have you! 🍀",
  "You're a gem": "And you're the most precious gem of all! 💎",
  "I'm overjoyed": "Your joy is contagious! 😃",
};

const negativeSentimentResponses = {
  "I'm so sad": "I'm here for you. Let's talk it out. ❤️",
  "This is terrible": "I'm sorry to hear that. Sometimes, things don't go as planned. 😔",
  "I hate this": "It's okay to have tough days. I'm here to support you. 🤗",
  "I'm feeling down": "I'm here to lift your spirits. What's on your mind? 😞",
  "Life is hard": "Life has its challenges, but you're strong enough to overcome them. 💪",
  "I'm so disappointed": "I understand how that can feel. Let's work through it together. ❤️",
  "Everything is going wrong": "It's just a phase, and it will get better. Stay positive. 🌈",
  "I can't handle this": "You're stronger than you think. Take one step at a time. 🌟",
  "I'm in a tough spot": "I'm here to support you through tough spots. You're not alone. 🤗",
  "I'm overwhelmed": "Take a deep breath. We'll tackle one thing at a time. 🌬️",
  "I'm feeling stressed": "Stress happens to everyone. Let's find ways to relax. 😌",
  "This is a disaster": "Disasters can be opportunities for growth. We'll get through it. 🌱",
  "I'm in a bad mood": "Bad moods pass. Let's chat and see if we can improve it. 😊",
  "I'm so frustrated": "I understand frustration. Let's find solutions together. 💪",
  "I can't stand this": "I'm here to listen and support you. Share your feelings. ❤️",
  "I'm feeling lost": "You're not alone on this journey. We'll find the way together. 🗺️",
  "I'm disappointed in myself": "Don't be too hard on yourself. We all make mistakes. ❤️",
  "I'm so tired": "Rest is essential. Take a break and recharge. 🛌",
  "I'm in a rough spot": "Rough spots are part of life. We'll navigate through it. ⛵",
  "I'm not in the mood": "That's okay. Let's chat when you're ready. 😊",
  "I'm feeling drained": "Sometimes we need time to recharge. Self-care is important. 🌿",
  "This is a nightmare": "Nightmares end, and brighter days await. 🌅",
  "I'm so upset": "I'm here to listen to what's bothering you. Share your feelings. ❤️",
  "I'm in pain": "I'm sorry to hear that. Your well-being is important to me. 🙏",
};

const neutralSentimentResponses = {
  "It's okay": "Sometimes being neutral is a peaceful place to be. 😌",
  "I don't know": "That's okay. It's perfectly fine not to have all the answers. 🤷‍♂️",
  "Maybe": "Sometimes uncertainty leads to exciting discoveries. 🚀",
  "I'm not sure": "You don't always have to be sure. It's part of learning. 📚",
  "I have no idea": "Exploring the unknown can be an adventure. ⛵",
  "I don't care": "It's okay to have moments when you don't care about things. 🤷‍♀️",
  "Whatever": "Sometimes a 'whatever' attitude can be liberating. 🙌",
  "It doesn't matter": "In the grand scheme of things, some things truly don't matter. 🌍",
  "I'm indifferent": "Indifference can provide clarity in certain situations. 🤨",
  "I'm not interested": "That's okay. We all have our interests and preferences. 😊",
  "I'm just here": "Being present is valuable in itself. What's on your mind? 🌟",
  "I'm here": "I'm here for you, and that's what matters. How can I assist you today? 🤗",
  "I'm listening": "Your words matter, and I'm here to listen. ❤️",
  "I don't mind": "Sometimes not minding can lead to flexibility. 🌈",
  "I'm neutral": "Being neutral allows you to see different perspectives. 🌐",
  "I'm just existing": "Existing is a profound experience in itself. Let's explore it together. 🌌",
  "I'm here for the ride": "Life is a journey, and you're on an incredible ride. Enjoy it! 🎢",
  "I'm neither here nor there": "That's okay. You'll find your way in due time. 🗺️",
  "I'm just going with the flow": "Going with the flow can lead to unexpected adventures. 🌊",
  "I'm in a neutral mood": "Neutral moods can be a time for introspection. What's on your mind? 🤔",
  "I have no strong feelings": "Sometimes neutrality brings peace and clarity. 😌",
  "I'm taking it easy": "Taking it easy can be a form of self-care. How can I assist you today? 🌿",
  "I'm in a balanced state": "Balance is a beautiful state to be in. What would you like to talk about? ⚖️",
  "I'm feeling neutral": "Feeling neutral is a chance to explore different emotions. What's on your mind? 😊",
};

const getPositiveSentimentResponse = (sentiment) => {
  const lowercaseSentiment = sentiment.toLowerCase();
  const keys = Object.keys(positiveSentimentResponses);

  // Calculate similarities and find the best match
  const matches = stringSimilarity.findBestMatch(lowercaseSentiment, keys);
  const bestMatch = matches.bestMatch;

  // Check if the best match has a similarity score above a certain threshold
  if (bestMatch.rating >= 0.8) {
    return positiveSentimentResponses[bestMatch.target] || null;
  } else {
    return null; // No close match found
  }
};

const getNegativeSentimentResponse = (sentiment) => {
  const lowercaseSentiment = sentiment.toLowerCase();
  const keys = Object.keys(negativeSentimentResponses);

  // Calculate similarities and find the best match
  const matches = stringSimilarity.findBestMatch(lowercaseSentiment, keys);
  const bestMatch = matches.bestMatch;

  // Check if the best match has a similarity score above a certain threshold
  if (bestMatch.rating >= 0.8) {
    return negativeSentimentResponses[bestMatch.target] || null;
  } else {
    return null; // No close match found
  }
};

const getNeutralSentimentResponse = (sentiment) => {
  const lowercaseSentiment = sentiment.toLowerCase();
  const keys = Object.keys(neutralSentimentResponses);

  // Calculate similarities and find the best match
  const matches = stringSimilarity.findBestMatch(lowercaseSentiment, keys);
  const bestMatch = matches.bestMatch;

  // Check if the best match has a similarity score above a certain threshold
  if (bestMatch.rating >= 0.8) {
    return neutralSentimentResponses[bestMatch.target] || null;
  } else {
    return null; // No close match found
  }
};

module.exports = {
  getPositiveSentimentResponse,
  getNegativeSentimentResponse,
  getNeutralSentimentResponse,
};
