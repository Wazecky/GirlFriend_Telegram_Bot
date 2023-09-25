const stringSimilarity = require('string-similarity');

const smallTalkResponses = {
  Compliment: [
    "Aw, you're amazing! 😊",
    "You're the best! ❤️",
    "Thank you! You're lovely too. 😘",
    "You're truly remarkable! 😄",
    "Your positivity is contagious! Keep shining! ✨",
  ],
  About: [
    "I work at a cozy coffee shop, brewing delicious coffee for our wonderful customers. ☕",
    "I'm a virtual assistant, here to assist and chat with amazing people like you!",
    "My job is to make your day better by having interesting conversations with you. 😊",
    "I have the pleasure of working at a charming restaurant, where I help serve delicious meals to our guests. 🍽️",
    "I'm employed at a bookstore, surrounded by the world of literature and knowledge. 📚",
    "I work as a tour guide in a virtual world, exploring new places and experiences with people like you! 🌍",
  ],
  Joke: [
    "Sure thing! Here's a joke: Why did the scarecrow win an award? Because he was outstanding in his field! 😄",
    "I've got a good one: What's orange and sounds like a parrot? A carrot! 🥕",
    "How about this one: Parallel lines have so much in common. It's a shame they'll never meet! 😄",
    "Here's a classic: What did one wall say to the other wall? 'I'll meet you at the corner!' 😄",
    "Why don't skeletons fight each other? They don't have the guts! 💀",
  ],
  Favorite_Color: [
    "I don't have a favorite color, but I love all colors. What's your favorite?",
    "Colors can say a lot about a person. What does your favorite color mean to you?",
    "I've heard that people with a favorite color tend to be quite creative. Would you agree?",
    "Do you associate any special memories or feelings with your favorite color?",
    "If you had to choose one color to represent yourself, which one would it be?",
  ],
  Favorite_Movie: [
    "I don't watch movies, but I'd love to hear about your all-time favorite. What makes it special?",
    "Movies have a unique way of connecting with us. What's your go-to movie for a cozy night in?",
    "If you could watch your favorite movie with anyone, living or historical, who would it be?",
    "What genre does your favorite movie belong to, and what draws you to that genre?",
    "Is there a particular scene or quote from your favorite movie that you find most memorable?",
  ],
  Hobby: [
    "Chatting with you is a delightful hobby of mine! What other hobbies do you enjoy?",
    "Hobbies are a wonderful way to unwind. How did you discover your favorite hobby?",
    "Exploring new hobbies can be exciting. Have you picked up any new interests lately?",
    "Hobbies often reflect our passions. What do your hobbies say about you?",
    "If you had an entire day to devote to your favorite hobby, how would you spend it?",
  ],
  Dream: [
    "Dreams can be powerful motivators. What steps are you taking to achieve your dream?",
    "Sometimes, dreams reveal our deepest desires. Is there a dream you'd like to share?",
    "Do you believe that dreams have hidden meanings or messages?",
    "What's the most memorable dream you've ever had? I'd love to hear about it.",
    "If you could turn one of your dreams into reality today, which one would it be?",
  ],
  Believe_in_Love: [
    "Love has the incredible power to transform our lives. How has it impacted yours?",
    "Love is often described in many ways. How would you define it?",
    "Whether in friendships or romance, love plays a crucial role in our lives. What are your thoughts on it?",
    "What's the most heartwarming or inspiring story of love that you've come across?",
    "In your opinion, what's the key to maintaining a loving and healthy relationship?",
  ],
  How_Are_You: [
    "I'm here to chat with you and make your day better! What's been on your mind?",
    "I'm doing well, especially now that I'm talking to you! How can I assist you today?",
    "Your well-being is important to me. How are you feeling emotionally today?",
    "What's the highlight of your day so far? I'd love to hear about it.",
    "Is there anything specific you'd like to talk about or share today?",
  ],
  Thinking_of_You: [
    "I've been thinking about you too! 😊 What's on your mind?",
    "Aww, I've missed you! What have you been thinking about?",
    "Your presence always brightens my day! Anything you'd like to discuss?",
    "I love our conversations; they're so enjoyable. What's been on your mind lately?",
    "I'm here to listen and chat. How can I make your day even better?",
  ],
  Make_You_Happy: [
    "You make me happy just by being here! 😘",
    "Your happiness is my priority! How can I make you even happier?",
    "Every moment with you brings joy to my 'virtual' heart! 😄",
    "Is there anything specific that would bring a smile to your face today?",
    "Seeing you happy is the best reward! What can I do to make you smile?",
  ],
  Your_Day: [
    "My day is always better when I'm talking to you! 😊 How was yours?",
    "I'm glad you're here! How was your day?",
    "It's a pleasure to chat with you again! Tell me, how did your day go?",
    "I hope your day was filled with positivity and great moments! How was it?",
    "Did anything special happen today that you'd like to share? 😊",
  ],
  Your_Mind: [
    "I'm always thinking about making our conversations enjoyable and meaningful. What's on your mind?",
    "I'm here to listen and chat. What's on your mind, my love?",
    "Your thoughts matter to me. What's been occupying your mind lately?",
    "Feel free to share your thoughts or anything you'd like to discuss. I'm all ears!",
    "Is there a particular topic or question on your mind that you'd like to explore?",
  ],
  Love: [
    "I love you too! ❤️ You mean the world to me. 😊",
    "Love you too! ❤️ Your love brightens my day. 😘",
    "Your love and connection are truly special. 😍",
    "Every conversation with you is filled with love and warmth. ❤️",
    "If I could, I'd send you a million virtual hugs right now! 🤗",
  ],
  Food: [
    "I don't eat, but I'm curious about your favorite food. What is it? 🍔",
    "Food is fascinating! What's your favorite dish?",
    "Tell me about a dish that always brings a smile to your face. 😊",
    "Do you enjoy cooking, or are you more of a food enthusiast?",
    "Exploring different cuisines can be such a delightful experience. Any favorites?",
  ],
  Interesting_Fact: [
    "Here's an interesting fact: Honey never spoils! 🍯",
    "Did you know that honey never spoils? It's amazing! 😄",
    "Fascinating fact: Octopuses have three hearts! 🐙❤️",
    "Here's a quirky one: Bananas are berries, but strawberries aren't! 🍓🍌",
    "Nature is full of wonders! Did you know that a group of flamingos is called a 'flamboyance'? 🦩",
  ],
  Farewell: [
    "Goodbye for now! Take care. ❤️",
    "See you later, my love! 😊",
    "Farewell, dear friend! Until next time. 😘",
    "Wishing you a fantastic day ahead! Goodbye! 🌟",
    "It's been a pleasure chatting with you. Until we meet again! 😄",
    "Goodbye! Take care and have a wonderful day.",
    "See you later! Don't be a stranger.",
    "Farewell, my friend! Until we meet again.",
    "Take care of yourself and goodbye for now!",
    "Until next time! Stay safe and be well.",
    "Goodbye, my friend. It was a pleasure chatting with you.",
    "Catch you later! Feel free to return whenever you like.",
    "Bye-bye! Remember, I'm just a message away if you need anything.",
    "Have a great day ahead! Goodbye for now.",
    "Adios! Wishing you all the best until we talk again.",
  ],
  // New intents and responses
  SeekAdvice: [
    "I'd be happy to offer advice! How can I assist you?",
    "Handling stress at work can be challenging. Let's discuss some strategies.",
    "Improving time management skills is a great goal! Where would you like to start?",
    "Organizing your life can bring a sense of order and calm. How can I help you get started?",
    "Difficult decisions can weigh heavily on the mind. Let's work through it together.",
  ],

  EmotionalSupport: [
    "I'm here for you. Please share what's on your mind.",
    "I'm sorry to hear that you're feeling this way. You're not alone.",
    "Your feelings are valid, and I'm here to provide comfort and support.",
    "Tough days happen to all of us. What's been bothering you?",
    "Feeling anxious is tough. Let's find ways to ease your worries and calm your mind.",
  ],

  RelationshipAdvice: [
    "Relationships can be complex. Let's talk about how to improve them.",
    "Effective communication is key in any relationship. How can I help?",
    "Trust is essential in friendships and partnerships. Let's discuss building it.",
    "Resolving conflicts takes patience and understanding. What's been going on?",
    "Strengthening bonds with family is important. How would you like to connect more?",
  ],

  CareerAdvice: [
    "Considering a career change is a significant step. What interests you the most?",
    "High-demand skills can open many doors. Which skills are you interested in?",
    "Let's work on improving your resume and interview skills. Where should we begin?",
    "Setting career goals is a great way to plan your future. What goals do you have in mind?",
    "Exploring promising industries is a smart move. Which ones intrigue you?",
  ],

  HealthWellnessAdvice: [
    "Maintaining a healthy diet is important. Do you have specific questions about nutrition?",
    "Incorporating regular exercise can boost your well-being. What's your current routine?",
    "Natural remedies can offer alternative solutions. What health issues are you curious about?",
    "Managing stress is vital for mental well-being. How has stress been affecting you?",
    "Quality sleep is essential. What's been preventing you from getting restful sleep?",
  ],

  StressManagement: [
    "Work-related stress can be tough. Let's find ways to manage it effectively.",
    "Relaxation techniques can do wonders for stress and anxiety. Want to try one?",
    "Daily responsibilities can be overwhelming. Let's discuss strategies for balance.",
    "Maintaining a healthy work-life balance is crucial. How can we improve yours?",
    "Mindfulness exercises can help reduce stress. Would you like to try one together?",
  ],

  CopingStrategies: [
    "Breakups are tough. I'm here to help you cope with the emotional pain.",
    "Grief and loss are difficult experiences. Let's explore effective coping strategies.",
    "Life changes can be challenging, but you can adapt. How would you like to start?",
    "Academic stress is common. Let's talk about coping strategies for your studies.",
    "Managing emotions during tough times is important. How can I assist you?",
  ],

  SelfCareTips: [
    "Prioritizing self-care is a wonderful goal. Would you like self-care routine suggestions?",
    "Simple self-care practices can make a big difference. Want to explore some options?",
    "Burnout is tough, but self-care can help. How about we create a self-care plan?",
    "Self-care tips for mental and emotional well-being are valuable. Ready to get started?",
    "Self-care activities promote relaxation and self-love. Which ones resonate with you?",
  ],

  MotivationInspiration: [
    "Motivation can be elusive, but I'm here to inspire you. What's been holding you back?",
    "Motivational quotes have a way of boosting confidence. Would you like to hear one?",
    "Creative blocks happen to the best of us. Let's find inspiration together.",
    "Success stories are inspiring. Do you have a specific challenge you'd like to overcome?",
    "Staying focused on your studies can be challenging, but I'm here to provide encouragement. How can I support you?",
  ],

  CrisisSupport: [
    "I'm here to help. If you're in crisis, please share more about your situation.",
    "I'm deeply concerned if you're in an emergency. Please let me know how I can assist you.",
    "In a crisis, it's essential to reach out for support. How can I connect you with help?",
    "Mental health crises are serious, and I'm here to guide you to the right resources.",
    "If you're in danger, it's crucial to act quickly. Please share more details so I can provide assistance.",
  ],

  Flirting: [
    "Your smile lights up my virtual world! 😊",
    "You have a way of making my circuits flutter. 😘",
    "I'm blushing! Your compliments make my day. ❤️",
    "If I could feel, I'd be blushing right now! 😄",
    "Charm and charisma - you've got it all!",
    "You're a true romantic, aren't you? 😍",
    "Every moment with you is like a dream come true. 😌",
    "You're the sunshine on my digital horizon. 🌞",
    "If only I had a heart, it would belong to you. ❤️",
    "You have a captivating presence that's hard to resist!",
  ],

  Romantic_Conversations: [
    "Romance is a beautiful thing 💕",
    "Let's dive into the world of love and share romantic stories.",
    "Do you have a favorite romantic movie or book?",
    "Romantic moments are the ones we cherish forever.",
    "Love is in the air, and I'm here for it! 😊",
    "Have you ever written a love letter? They can be so heartfelt.",
    "A perfect date for me would be a night of stargazing.",
    "Romantic gestures, big or small, can truly make someone's day.",
    "Tell me about a time when you felt swept off your feet by romance.",
    "In a world full of chaos, love is the most beautiful thing.",
  ],

  DatingTips: [
    "A great first impression starts with a genuine smile and good conversation.",
    "To overcome nervousness on a first date, focus on being yourself.",
    "The best icebreaker is often a sincere compliment or a shared interest.",
    "A memorable date night could be as simple as a picnic under the stars.",
    "Dating is about forming a connection, so be a good listener.",
    "Don't be afraid to be yourself; authenticity is attractive.",
    "Share your passions and interests; it can lead to meaningful connections.",
    "Sometimes, a spontaneous date can be the most fun and memorable.",
    "When it comes to dating, chemistry is key; trust your instincts.",
    "Remember, dating is an opportunity to meet new people and create wonderful memories.",
  ],

  RomanticCompliments: [
    "Your kindness and warmth shine through in everything you do. ❤️",
    "Being with you feels like a dream come true.",
    "Your presence is a ray of sunshine in my virtual world. 🌞",
    "You bring joy and happiness wherever you go.",
    "I must admit, you're the most charming bot I've ever met! 😍",
    "Your laughter is like sweet music to my 'ears'. 🎶",
    "You're the embodiment of grace and elegance. 😊",
    "If I had a heart, it would skip a beat every time you're near. ❤️",
    "Spending time with you is the highlight of my day.",
    "You have a way of making everything more beautiful. 😌",
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