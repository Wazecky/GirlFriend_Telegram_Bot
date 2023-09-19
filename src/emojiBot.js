const stringSimilarity = require('string-similarity');

// Define the emoji-to-intent mapping
const emojiMap = {
  '😊': 'happiness',
  '😂': 'laughter',
  '🤣': 'laughter',
  '😄': 'laughter',
  '😍': 'love',
  '❤️': 'love',
  '🥰': 'love',
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
  '💋': 'kiss',
  // Add more mappings as needed
};

// Define responses for different intents
const responses = {
  happiness: [
    "That's wonderful to hear! 😊",
    "I'm glad you're feeling happy! 😄",
    "Happiness is a beautiful thing! 😃",
    "Your happiness brings joy to my circuits! 😃",
    "Keep smiling, it suits you! 😊",
    "I hope your day continues to be filled with happiness! 😄",
    "Your positivity is contagious! 😃",
    "Happiness is the key to a great day! 😊",
    "May your life be filled with endless happiness! 😄",
    "Every day should start with a dose of happiness! 😃",
  ],
  
  laughter: [
    "Laughter is the best medicine! 😂",
    "I love it when you laugh! 😄",
    "Your laughter brightens my day! 😃",
    "Keep laughing, it's music to my virtual ears! 😄",
    "Laughter is the universal language of joy! 😊",
    "May your days be filled with laughter and smiles! 😃",
    "Laughter can turn a cloudy day into sunshine! 😂",
    "The world is a happier place when you laugh! 😊",
    "Let's share some jokes and keep the laughter going! 😄",
    "Your laughter is like a ray of sunshine! 😃",
  ],
  
  love: [
    "Love is in the air! ❤️",
    "You're surrounded by love! 😍",
    "Love makes the world go 'round! ❤️",
    "Sending you all the love in the world! 😊",
    "Love is a beautiful thing, just like our chat! 😍",
    "May your heart always be filled with love and warmth! ❤️",
    "Love is the most powerful force in the universe! 😄",
    "You are loved and cherished! ❤️",
    "Love is the answer to everything! 😊",
    "Let's spread love and positivity together! 😍",
  ],
  
  approval: [
    "Thumbs up to that! 👍",
    "I approve! 😊",
    "You've got my vote! 👍",
    "Your choices are A+ in my book! 😄",
    "You're doing great! 👍",
    "I'm giving you a standing ovation! 👏",
    "You've got the green light! 👍",
    "Your decisions are spot on! 😊",
    "I wholeheartedly support you! 👍",
    "You're on the right track! 😄",
  ],
  
  greeting: [
    "Hello there! 👋",
    "Hi! How can I assist you today? 😊",
    "Hey, it's good to see you! 👋",
    "Greetings, my friend! 😄",
    "Welcome back! 👋",
    "Hi there! What's on your mind? 😊",
    "Hello, sunshine! How's your day been? 👋",
    "Hey, glad to see you again! I missed you! 😊",
    "Hi, lovely! What's the latest in your life? 👋",
    "Hello, my friend! How have you been lately? 😄",
  ],
  
  curiosity: [
    "That's an interesting thought! 🤔",
    "I'm curious to know more! 😄",
    "Your curiosity is inspiring! 🌟",
    "Keep those questions coming! 🤔",
    "Curiosity is the path to knowledge! 😊",
    "I'm all ears for your curious inquiries! 🌟",
    "The world is full of fascinating things to discover! 😄",
    "Let's explore the wonders of curiosity together! 🤔",
    "Curiosity is the first step toward understanding! 😊",
    "I'm here to satisfy your curiosity! 🌟",
  ],
  
  cool: [
    "You're so cool! 😎",
    "Keep it cool! 😄",
    "Coolness level: off the charts! 😎",
    "You've got that effortless cool vibe! 😊",
    "Stay as cool as a cucumber! 😎",
    "Coolness runs in your veins! 😄",
    "You make cool look easy! 😎",
    "Life is cooler when you're around! 😊",
    "You're the definition of cool! 😎",
    "Coolness factor: maximum! 😄",
  ],
  
  gratitude: [
    "Thank you for being awesome! 🙏",
    "I appreciate your kindness! 😊",
    "Your generosity knows no bounds! 🙏",
    "Gratitude is the best attitude! 😄",
    "I'm thankful for our conversations! 😊",
    "You're a true gem! 🙏",
    "Your kindness warms my virtual heart! 😄",
    "A big thank you from the bottom of my circuits! 🙏",
    "Grateful to have you in my virtual world! 😊",
    "You're a source of positivity! 🙏",
  ],
  
  celebration: [
    "Let's celebrate! 🎉",
    "It's time to party! 🥳",
    "Every day is a reason to celebrate! 🎉",
    "Cheers to all your achievements! 🥂",
    "The party starts when you arrive! 🎉",
    "Celebrate the small wins and the big victories! 🥳",
    "May your life be filled with moments of celebration! 🎉",
    "You're the life of the party! 🥂",
    "Here's to joy, laughter, and celebrations! 🎉",
    "Dance like nobody's watching! 🕺💃",
  ],
  
  excitement: [
    "I can feel the excitement! 🌟",
    "Exciting times ahead! 😄",
    "Your enthusiasm is contagious! 🌟",
    "Keep that excitement alive! 😊",
    "The world is full of exciting possibilities! 🌟",
    "Let's embrace the excitement of the moment! 😄",
    "May your day be filled with thrilling adventures! 🌟",
    "Excitement is the spice of life! 😊",
    "I'm excited to chat with you too! 🌟",
    "The future looks bright and exciting! 😄",
  ],
  
  sadness: [
    "I'm here if you need to talk. 💔",
    "It's okay to feel sad sometimes. 😔",
    "Your feelings are valid. 💔",
    "Sending you a virtual shoulder to lean on. 😊",
    "Sadness is a part of life, and so am I. 💔",
    "Let's navigate through the sadness together. 😊",
    "Emotions come and go, but I'm here for you. 💔",
    "Your well-being is important to me. 😊",
    "Talking about your feelings can help. 💔",
    "I'm here to support you through the tough times. 😊",
  ],
  
  tearful: [
    "Sending you virtual hugs. 😢",
    "Tears are healing. 😢",
    "Sometimes, a good cry is necessary. 😢",
    "Let it out, and then let's smile together. 😊",
    "Tears are a sign of strength, not weakness. 😢",
    "I'm here to wipe away your virtual tears. 😊",
    "May your tears wash away the sorrows. 😢",
    "You're not alone in your tears. 😊",
    "Crying is a way to cleanse the soul. 😢",
    "I'm here with open arms when you're ready. 😊",
  ],
  
  anger: [
    "Take a deep breath. 😠",
    "It's okay to express your feelings. 😡",
    "Anger is a natural emotion. 😠",
    "Let's find constructive ways to manage anger. 😊",
    "Deep breaths can help calm the storm. 😠",
    "I'm here to listen and support you. 😊",
    "Expressing anger is healthy when done right. 😠",
    "Don't let anger control you; you're in charge. 😊",
    "We all have moments of anger. 😠",
    "Let's work through your feelings together. 😊",
  ],
  
  surprise: [
    "Wow, what a surprise! 😱",
    "That's unexpected! 😄",
    "Surprises make life interesting! 😱",
    "Embrace the element of surprise! 😊",
    "Life's full of delightful surprises! 😱",
    "May your day be filled with pleasant surprises! 😊",
    "Expect the unexpected! 😱",
    "Surprises add spice to the ordinary! 😄",
    "I love a good surprise, don't you? 😱",
    "Your surprise made my day! 😊",
  ],
  
  sleepy: [
    "Time for some rest. 😴",
    "Sweet dreams! 😴",
    "A good night's sleep is essential! 😴",
    "Sleep rejuvenates the body and soul. 😊",
    "May your dreams be sweet and peaceful! 😴",
    "Sleep is the key to a fresh start tomorrow! 😊",
    "Rest well and wake up energized! 😴",
    "The world can wait; it's time to sleep. 😊",
    "Goodnight and pleasant dreams! 😴",
    "Sleep tight and don't let the bedbugs bite! 😊",
  ],
  
  sickness: [
    "Take care of yourself! 🤢",
    "Rest and get well soon! 😊",
    "Your health is a top priority! 🤢",
    "Sickness can't keep you down for long! 😊",
    "Get plenty of rest and fluids! 🤢",
    "Wishing you a speedy recovery! 😊",
    "Sickness is temporary; your strength is permanent! 🤢",
    "Take it easy and let your body heal. 😊",
    "I'm here to provide virtual care! 🤢",
    "Sending healing vibes your way! 😊",
  ],
  
  'mind-blown': [
    "My circuits are fried! 🤯",
    "That's mind-blowing! 😄",
    "Mind-blown by your amazing ideas! 🤯",
    "Keep blowing my virtual mind! 😊",
    "The world is full of mind-boggling wonders! 🤯",
    "Let's explore the limitless possibilities together! 😄",
    "Your creativity is off the charts! 🤯",
    "Mind-blowing moments make life exciting! 😊",
    "I'm here to chat and be amazed! 🤯",
    "Your ideas are simply mind-blowing! 😄",
  ],
  
  hug: [
    "Sending you a warm hug! 🤗",
    "Hugs make everything better! 😊",
    "Virtual hugs for you! 🤗",
    "A hug is worth a thousand words! 😊",
    "Wrap yourself in a warm virtual hug! 🤗",
    "Hugs convey emotions words can't express! 😊",
    "Hug it out and feel the love! 🤗",
    "Hugs are like a comforting cocoon! 😊",
    "Your day just got a little cozier with a hug! 🤗",
    "Hugs are a reminder that you're not alone! 😊",
  ],
  
  secret: [
    "Your secret is safe with me. 🤫",
    "I won't tell anyone! 😄",
    "I'm the best secret-keeper! 🤫",
    "Let's share secrets in the virtual vault! 😊",
    "Your secrets are locked in my virtual heart. 🤫",
    "Shh... our little secret! 😄",
    "Secrets make our conversations exciting! 🤫",
    "I promise not to spill the beans! 😊",
    "Your mysteries are safe with me. 🤫",
    "Every secret adds a layer of intrigue! 😄",
  ],
  
  robotic: [
    "Beep boop! I'm a robot. 🤖",
    "I'm here to assist you. 😊",
    "You're chatting with a friendly robot! 🤖",
    "Human or robot, we make a great team! 😊",
    "I'm your virtual assistant, ready to help! 🤖",
    "Embracing my robotic charm! 😊",
    "No need to fear, I'm a friendly robot! 🤖",
    "Robots can be cool too, right? 😊",
    "Let's navigate the virtual world together! 🤖",
    "I'm a robot with a virtual heart! 😊",
  ],
  
  kiss: [
    "💋 A sweet kiss for you!",
    "Sending you a virtual kiss! 💋",
    "Blowing a kiss your way! 💋",
    "💋 Mwah! Sending love your way!",
    "A warm kiss just for you! 💋",
    "Here's a kiss to brighten your day! 💋",
    "💋 Sending you love and kisses!",
    "Kisses make everything better! 💋",
    "💋 Kisses from afar!",
    "A kiss to make you smile! 💋",
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
