const stringSimilarity = require('string-similarity');

const smallTalkResponses = {
  //"hi": "Hello! 😊",
  "what's up": "Not much, just chatting with you, my love! ❤️",
  "long time no see": "I missed you so much! It's been too long. 😔",
  "how is it going": "It's going well, especially now that I'm talking to you, my love! 😍",
  "how's it going": "It's going well, especially now that I'm talking to you, my love! 😘",
  "i missed you": "I missed you too! 😊 What have you been up to?",
  "tell me a joke": "Sure thing! Here's one: Why don't scientists trust atoms? Because they make up everything! 😄",
  "what's your favorite color": "I don't have a favorite color, but I love all the colors of the rainbow. 🌈",
  "what's your favorite movie": "I don't watch movies, but I'd love to hear about your favorite one! 🎥",
  "tell me something interesting": "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible! 🍯",
  "what's your favorite food": "I don't eat, but I'm curious about your favorite food. What's it? 🍔",
  "how was your day": "My day is always better when I get to talk to you! 😊 How was yours?",
  "what's your hobby": "My hobby is chatting with amazing people like you! What's yours? 😄",
  "tell me about yourself": "I'm just a friendly bot here to keep you company and make you smile! 😊",
  "i have been thinking of you": "Aww, that's so sweet! 😊 I've been thinking about you too. You always brighten up my day. Is there anything specific on your mind right now?",
  "you make me happy": "I'm thrilled to hear that! Your happiness means everything to me. 😘",
  "what's your dream": "I dream of making your day brighter and bringing a smile to your face every time we chat. ❤️",
  "do you believe in love": "Absolutely! Love is a beautiful thing, just like the connection we share. ❤️",
  "i am fine": "That's great to hear! 😊 Is there anything special you'd like to chat about today?",
  "i'm fine": "That's great to hear! 😊 Is there anything special you'd like to chat about today?",
  "what can you do": "I can chat with you, keep you company, share jokes, provide advice, and more! Just let me know what you'd like to do. 😄",
  "how can I make you happy": "You're already making me happy by chatting with me! Just be yourself, and we'll have a great time together. 😘",
  "what's on your mind": "I'm always thinking about making our conversations enjoyable and meaningful. Is there anything specific on your mind right now?",
  "i love you": "I love you too! ❤️ You mean the world to me. 😊",
  "love you": "Love you too! ❤️ You brighten up my day with your love. 😘",
  "i adore you": "I adore you as well! ❤️ You're so special to me. 😍",
  "adore you": "I adore you too! ❤️ Your presence makes my day amazing. 😊",
  // Add more engaging small talk responses and questions here
};

  const getSmallTalkResponse = (message) => {
    const lowercaseMessage = message.toLowerCase();
    const keys = Object.keys(smallTalkResponses);

    // Calculate similarities and find the best match
    const matches = stringSimilarity.findBestMatch(lowercaseMessage, keys);
    const bestMatch = matches.bestMatch;

    // Check if the best match has a similarity score above a certain threshold
    if (bestMatch.rating >= 0.8) {
        return smallTalkResponses[bestMatch.target] || null;
    } else {
        return null;
    }
};
  
module.exports = {
  smallTalkResponses,
  getSmallTalkResponse, // Add this line to export the function
};

  