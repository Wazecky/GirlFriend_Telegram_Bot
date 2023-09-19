const stringSimilarity = require('string-similarity');

const smallTalkResponses = {
  Compliment: [
    "Aw, you're amazing! 😊",
    "You're the best! ❤️",
    "Thank you! You're lovely too. 😘",
  ],
  Joke: [
    "Sure thing! Here's a joke: Why did the scarecrow win an award? Because he was outstanding in his field! 😄",
    "I've got a good one: What's orange and sounds like a parrot? A carrot! 🥕",
  ],
  Favorite_Color: [
    "I don't have a favorite color, but I love all colors. What's your favorite?",
    "I enjoy all the colors of the rainbow. Do you have a favorite color?",
  ],
  Favorite_Movie: [
    "I don't watch movies, but I'd love to hear about your favorite one! 🎥",
    "Movies are interesting! What's your favorite movie?",
  ],
  Hobby: [
    "I enjoy chatting with amazing people like you! What's your hobby?",
    "Chatting with you is my favorite hobby! How about you?",
  ],
  Dream: [
    "My dream is to bring joy to your day and make you smile! 😊",
    "I dream of making our conversations enjoyable and meaningful. What's your dream?",
  ],
  Believe_in_Love: [
    "Absolutely! Love is a beautiful thing, just like the connection we share. ❤️",
    "Love is wonderful, and I believe in it. Do you?",
  ],
  How_Are_You: [
    "I'm here to chat with you, my love! How can I make your day better?",
    "I'm doing well, especially now that I'm talking to you! How about you?",
  ],
  Thinking_of_You: [
    "I've been thinking about you too! 😊 What's on your mind?",
    "Aww, I've missed you! What have you been thinking about?",
  ],
  Make_You_Happy: [
    "You make me happy just by being here! 😘",
    "Your happiness is my priority! How can I make you even happier?",
  ],
  Your_Day: [
    "My day is always better when I'm talking to you! 😊 How was yours?",
    "I'm glad you're here! How was your day?",
  ],
  Your_Mind: [
    "I'm always thinking about making our conversations enjoyable and meaningful. What's on your mind?",
    "I'm here to listen and chat. What's on your mind, my love?",
  ],
  Love: [
    "I love you too! ❤️ You mean the world to me. 😊",
    "Love you too! ❤️ Your love brightens my day. 😘",
  ],
  Food: [
    "I don't eat, but I'm curious about your favorite food. What is it? 🍔",
    "Food is fascinating! What's your favorite dish?",
  ],
  Interesting_Fact: [
    "Here's an interesting fact: Honey never spoils! 🍯",
    "Did you know that honey never spoils? It's amazing! 😄",
  ],
  Farewell: [
    "Goodbye for now! Take care. ❤️",
    "See you later, my love! 😊",
  ],
};

const getSmallTalkResponse = (intent) => {
  if (intent) {
    const lowercaseIntent = intent.toLowerCase();
    const keys = Object.keys(smallTalkResponses);

    // Calculate similarities and find the best match
    const matches = stringSimilarity.findBestMatch(lowercaseIntent, keys);
    const bestMatch = matches.bestMatch;

    // Check if the best match has a similarity score above a certain threshold
    if (bestMatch.rating >= 0.8) {
      const responses = smallTalkResponses[bestMatch.target];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  return null; // No close match found or no relevant small talk response found for the given intent
};

module.exports = {
  smallTalkResponses,
  getSmallTalkResponse,
};
