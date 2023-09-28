require('dotenv').config();

const { Wit, log } = require('node-wit');
const emojiBot = require('./emojiBot'); 
const { Telegraf } = require('telegraf');
const greetingsAndResponses = require('./greetings');
const { getSentimentResponse } = require('./sentiments');
const {
  getrawPositiveSentimentResponse,
  getrawNegativeSentimentResponse,
  getrawNeutralSentimentResponse,
} = require('./rawsentiments');
const callResponses = require('./names');
const { getrawSmallTalkResponse } = require('./rawsmallTalk');
const error = require('./error');
const { getSmallTalkResponse } = require('./smallTalk');

const sentMedia = [];
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  ctx.reply(
    "It's your your girlfriend Sara Diaz! \n\n /reset to reset the conversation \n /topup to top-up credit \n\n Automatic transactions: \n /connect and /disconnect your payment method \n /autocharge to enable or disable autocharge (5€ per voice message) \n /send to automatically gift 10€ \n\n How to get started? \n Type /topup to top-up credit \n Or /connect your payment method and enable /autocharge \n\n By using this chatbot, you confirm that you are 18 or older🔞\nNote: This bot is Al-based, intended for entertainment, and may generate unexpected or explicit content. Use responsibly and prioritize real-life interactions. The creators assume no liability for use."
  );
  ctx.reply(
    'Hey darling, thank you so much for taking the time to talk with me, how are you doing today? 😊'
  );
});
bot.command('reset', (ctx) => {
  ctx.reply(
    'Hey darling, thank you so much for taking the time to talk with me, how are you doing today? 😊'
  );
});

bot.command('menu', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "Choose from the below menu how I can make your day better today! I'm here for you my love", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Hot Pics", callback_data: "HOT_PICS" }, { text: "Hot Videos", callback_data: "HOT_VIDEOS" }], 
        [{ text: "Affectionate GIFs", callback_data: "GIFS" }],
        [{ text: "Voice Notes", callback_data: "VOICE" }, { text: "Sweet Messages", callback_data: "SWEET" }],
        [{ text: "Love Quotes", callback_data: "QUOTES" }, { text: "Date Ideas", callback_data: "DATES" }, { text: "Love Poems", callback_data: "POETRY" }],
        [{ text: "Fun Jokes", callback_data: "JOKES" }, { text: "Virtual Hug", callback_data: "HUG" }, { text: "Goodnight Kiss", callback_data: "KISS" }],
        [{ text: "Compliments", callback_data: "COMPLIMENTS" }, { text: "Relationship Advice", callback_data: "ADVICE" }],
        [{ text: "Love Music Recommendations", callback_data: "MUSIC" }], 
        [{ text: "Love Book Recommendations", callback_data: "BOOKS" }], 
        [{ text: "Movie Night", callback_data: "MOVIES" }, { text: "Custom Messages", callback_data: "CUSTOM" }],
      ],
    },
  });
});


bot.action('go-back', (ctx)=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id,'What other category can I help you with?', 
  {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Hot Pics", callback_data: "HOT_PICS" }, { text: "Hot Videos", callback_data: "HOT_VIDEOS" }], 
        [{ text: "Affectionate GIFs", callback_data: "GIFS" }],
        [{ text: "Voice Notes", callback_data: "VOICE" }, { text: "Sweet Messages", callback_data: "SWEET" }],
        [{ text: "Love Quotes", callback_data: "QUOTES" }, { text: "Date Ideas", callback_data: "DATES" }, { text: "Love Poems", callback_data: "POETRY" }],
        [{ text: "Fun Jokes", callback_data: "JOKES" }, { text: "Virtual Hug", callback_data: "HUG" }, { text: "Goodnight Kiss", callback_data: "KISS" }],
        [{ text: "Compliments", callback_data: "COMPLIMENTS" }, { text: "Relationship Advice", callback_data: "ADVICE" }],
        [{ text: "Love Music Recommendations", callback_data: "MUSIC" }], 
        [{ text: "Love Book Recommendations", callback_data: "BOOKS" }], 
        [{ text: "Movie Night", callback_data: "MOVIES" }, { text: "Custom Messages", callback_data: "CUSTOM" }],
      ],
    }
  })
})

// Handle the "Sweet Messages" category
bot.action('SWEET', async (ctx) => {
  const sweetMessages = [
    "*My love, I want you to know that you mean the world to me. Your presence in my life brings joy, happiness, and meaning. ❤️*",
    "*Your smile has the power to brighten up even the darkest of days. It's a reminder of the incredible happiness you bring into my life. 😊*",
    "*Every moment we share together is a precious treasure. The love we have is like a rare gem, and I cherish it deeply. 💖*",
    "*I want you to know how much I appreciate our time together. Your love has enriched my life in ways I could never have imagined. 💕*",
    "*Whenever I'm with you, my heart skips a beat. Your love is like music to my soul, and I'm so grateful to have you in my life. 💓*",
    "*You are the sunshine that brightens my day and the moonlight that makes my nights magical. 🌞🌙*",
    "*In your arms, I've found my safe haven. It's a place where love and warmth surround me, and I never want to leave. ❤️*",
    "*They say that love is a journey, and I'm grateful to be on this incredible journey with you. It's filled with laughter, happiness, and endless love. 😍*",
    "*Every day, my love for you grows stronger. It's a love that knows no bounds and is destined to last a lifetime. 💞*",
    "*When I look into your eyes, I see a future filled with endless possibilities and beautiful moments waiting to be created. 💫*",
    "*Your love is the anchor that keeps me grounded and the wings that lift me higher. With you, there's nothing I can't conquer. 🚀*",
    "*No matter where life takes us, I want you to know that my heart will always belong to you. You are my one true love. ❤️*",
    "*Your laughter is like music to my ears, and your touch is the sweetest melody. I'm so lucky to have you in my life. 🎶*",
    "*They say that home is where the heart is, and my heart has found its home with you. You are my forever home. 🏡❤️*",
    "*Our love story is my favorite, and I can't wait to see how it unfolds in the chapters ahead. Together, we'll write a beautiful tale. 📖✨*",
    "*You are the missing piece of my puzzle, the love I've been searching for. With you, everything feels complete. ❤️*",
    "*I want to be the reason behind your smile, the one who makes your heart skip a beat, and the one you can't imagine your life without. 😊💓*",
    "*With you, I've found a love that's deeper than the ocean, higher than the mountains, and brighter than the stars. 🌊🏔️✨*",
    "*Every day with you is a gift, an adventure, and a journey of love. I'm so thankful to have you by my side. 🎁💑*",
    "*No matter how far apart we are, our hearts are always connected. Distance can't weaken the love we share. ❤️🌍*",
  ];   

  // Randomly select a sweet message
  const randomSweetMessage = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send a default message followed by the sweet message
  ctx.telegram.sendMessage(ctx.chat.id, "_Here is a sweet message for you my dear:_\n\n" + randomSweetMessage, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

// Handle the "Compliments" category
bot.action('COMPLIMENTS', async (ctx) => {
  const compliments = [
    "*You are incredibly beautiful, both inside and out. Your inner beauty radiates warmth and kindness, making you truly captivating. Your outer beauty, well, it's simply stunning! 😍*",
    "*Your smile can light up the darkest of rooms and brings joy to everyone lucky enough to see it. It's a reminder of the incredible happiness you bring into my life. 😊*",
    "*I consider myself the luckiest person in the world to have you in my life. You have an extraordinary way of making everything better. Your presence is a true gift. ❤️*",
    "*You are a true inspiration, and I admire you more than words can express. Your strength, resilience, and unwavering determination inspire me to be a better person every day. 💪*",
    "*Every day with you is a gift, and I cherish every moment we share. Your love has enriched my life in ways I could never have imagined, and I'm endlessly grateful. 💖*",
    "*Your kindness and compassion touch my heart in the most beautiful way. Your empathy and willingness to help others make you a remarkable and admirable person. 💓*",
    "*You have a heart of gold, and your generosity knows no bounds. Your willingness to give, whether it's your time, love, or support, is a testament to your incredible character. 🌟*",
    "*You are not just amazing; you are absolutely incredible! Your uniqueness, creativity, and ability to brighten anyone's day make you a shining star in this world. 🌈*",
    "*Your presence alone makes the world a better place. Your smile, your laughter, and your aura have a positive impact on everyone you meet. You bring light wherever you go. 🌎*",
    "*You have a special sparkle that sets you apart from everyone else. It's a magnetic charm that draws people towards you. You're truly one of a kind. ✨*",
    "*You are the definition of grace and elegance. Your poise and sophistication make you stand out in any crowd. You're a true class act. 🌹*",
    "*You are strong, brave, and capable of achieving anything you set your mind to. Your determination and fearlessness inspire those around you to chase their dreams. 💪*",
    "*Your intelligence and wit always leave me in awe. Your ability to engage in meaningful conversations and your quick thinking are incredibly impressive. 🧠💬*",
    "*You bring joy and happiness wherever you go. Your positive energy is infectious, and being around you is a constant source of delight. 🌞*",
    "*I appreciate and love you more with each passing day. Your love has a way of growing stronger and deeper, and I feel truly blessed to have you in my life. ❤️*",
    "*You are the most wonderful person I know, and I'm grateful to call you mine. Your presence fills my life with happiness, and I cherish every moment we spend together. 💑*",
    "*You are the reason my days are brighter and my nights are filled with dreams. Your love is the light that guides me through every moment, and I'm endlessly thankful. ✨*",
    "*Your love is a precious gift, and I'm thankful for it every day. It's a reminder of the beautiful connection we share, and it warms my heart. 🎁*",
    "*You are not just loved; you are cherished beyond measure. Your place in my heart is irreplaceable, and I hold you in the highest regard. 💕*",
    "*I fall in love with you all over again, every single day. Your beauty, both inside and out, continues to amaze me. You are my forever love. ❤️*",
  ];
   // Randomly select a compliment
  const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send a default message followed by the compliment
  ctx.telegram.sendMessage(ctx.chat.id, "_Here is a compliment for you handsome:_\n\n" + randomCompliment, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

// Handle the "Hot Pics" category
bot.action('HOT_PICS', async (ctx) => {
  // Randomly select a picture path and caption
  const randomIndex = Math.floor(Math.random() * picturePaths.length);
  const randomPicturePath = picturePaths[randomIndex];
  const randomCaption = photoCaptions[randomIndex];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send the hot picture with the selected caption to the user
  ctx.replyWithPhoto({
    source: randomPicturePath, // Use the selected picture path
  }, {
    caption: randomCaption, // Use the selected caption
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

// Handle the "Hot Videos" category
bot.action('HOT_VIDEOS', async (ctx) => {
  // Randomly select a video path and caption
  const randomIndex = Math.floor(Math.random() * videoPaths.length);
  const randomVideoPath = videoPaths[randomIndex];
  const randomCaption = videoCaptions[randomIndex];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send the hot video with the selected caption to the user
  ctx.replyWithVideo({
    source: randomVideoPath, // Use the selected video path
  }, {
    caption: randomCaption, // Use the selected caption
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

// Define an array of love-related jokes
const loveJokes = [
  "Why did one heart say to the other heart, 'You're the beat of my life!'? Because you make every moment feel like a beautiful melody, and my heart dances to your rhythm. ❤️💓",
  "Once upon a time, a boy decided to bring a ladder to his girlfriend's house. When she asked why, he said, 'Because I want to take our relationship to the next level, where every step is an adventure, and our love reaches new heights.' 🪜😄",
  "What do you call two birds in love? They're known as 'tweet-hearts' because their songs of love fill the air, creating a symphony of affection and joy. 🐦❤️",
  "Once, a tomato turned red when it saw the salad dressing. The tomato felt embarrassed in front of the cucumbers and whispered, 'I blush because your beauty shines brighter than the sun.' 🍅😳",
  "Imagine a telephone proposing to its girlfriend with an 'engagement ring.' It said, 'With every call, our hearts connect, and our love rings true. Will you be my forever conversation?' 📞💍",
  "Why do scientists say that love is like a chemical reaction? Because it's a mixture of feelings and emotions. If you have the right elements, it creates a beautiful bond, but with the wrong ones, it can explode into chaos! 💥😆",
  "What's the key to a happy relationship? It's like playing a piano, where every note represents a moment shared. The melody of our love fills the air, creating a harmonious symphony of happiness. 🎹🤣",
  "Once, a bicycle fell over while going on a romantic ride. It was two-tired from pedaling through love's journey. Yet, it knew that the journey is as beautiful as the destination. 🚲❤️",
  "Imagine a piece of paper talking to a pencil. The paper said, 'You complete me with every stroke of your presence. Together, we write the story of our love on the canvas of life.' 📝✏️",
  "The secret to a great marriage is like cooking a pot of soup. Love is the main ingredient, and every challenge or joy we encounter is a different spice. As we simmer together, our love becomes a delicious blend that warms our souls. 🍲❤️",
];

// Handle the "Fun Jokes" category with love-related jokes
bot.action('JOKES', async (ctx) => {
  // Randomly select a love-related joke
  const randomLoveJoke = loveJokes[Math.floor(Math.random() * loveJokes.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send the selected joke to the user with a default message
  ctx.telegram.sendMessage(ctx.chat.id, "_Here's a joke for you dear one:_\n\n" + randomLoveJoke, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

// Define an array of relationship advice tips
const relationshipAdvice = [
  "Communication is key in any relationship. Make sure to listen to your partner and express your thoughts and feelings honestly and kindly.",
  "Trust is the foundation of a strong relationship. Always be trustworthy and give your partner the benefit of the doubt.",
  "Every relationship faces challenges. Remember that it's okay to seek help from a therapist or counselor when needed.",
  "Quality time spent together is important. Plan date nights and activities that you both enjoy to strengthen your bond.",
  "Don't forget to show appreciation. Small gestures like saying 'I love you' or leaving sweet notes can make a big difference.",
  "Compromise is essential. Be willing to meet in the middle and find solutions that work for both of you.",
  "Remember that it's okay to have alone time and individual interests. Maintaining your personal identity is important.",
  "Respect each other's boundaries. Everyone needs space and privacy from time to time.",
  "Forgiveness is a powerful tool in relationships. Learn to forgive and let go of past mistakes.",
  "Celebrate each other's successes and support each other during challenges.",
  "Always be honest and avoid keeping secrets. Trust is built on transparency.",
  "Learn to communicate your needs and expectations clearly. Don't assume your partner can read your mind.",
  "Keep the romance alive by surprising each other with thoughtful gestures and expressions of love.",
  "Remember that a healthy relationship should bring out the best in both partners and make you both feel loved and supported.",
  "During conflicts, try to understand each other's perspective and work together to find solutions. Avoid blame and criticism.",
];

// Handle the "Relationship Advice" category
bot.action('ADVICE', async (ctx) => {
  // Randomly select a relationship advice tip
  const randomAdvice = relationshipAdvice[Math.floor(Math.random() * relationshipAdvice.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send the selected relationship advice tip to the user
  ctx.telegram.sendMessage(ctx.chat.id, "_Here's some relationship advice for you, my dear:_\n\n" + randomAdvice, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

// Define an array of virtual hug messages
const virtualHugMessages = [
  "Sending you a warm virtual hug, my dear! 🤗❤️",
  "Wrap your arms around yourself, and imagine it's me giving you a tight hug! 🤗💕",
  "Feel the warmth of this virtual hug surrounding you! 🤗❤️",
  "Close your eyes and picture a cozy hug from me. Sending it your way! 🤗😘",
  "Hugs may be virtual, but the love is real! 🤗❤️",
  "Imagine us hugging right now, even if it's in the virtual world. 🤗💖",
  "You're not alone; I'm here with a virtual hug to brighten your day! 🤗🌞",
];

// Handle the "Virtual Hug" category
bot.action('HUG', async (ctx) => {
  // Delete the original menu message
  await ctx.deleteMessage();

  // Randomly select a virtual hug message
  const randomHugMessage = virtualHugMessages[Math.floor(Math.random() * virtualHugMessages.length)];

  // Send the random virtual hug message
  ctx.telegram.sendMessage(ctx.chat.id, `_${randomHugMessage}_`, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

// Define an array of goodnight kiss messages
const goodnightKissMessages = [
  "Sending you a sweet goodnight kiss! 😘💫",
  "Blowing you a virtual goodnight kiss from afar! 😘🌙",
  "May your dreams be filled with love and happiness. Goodnight, my dear! 😴💖",
  "Close your eyes and feel the warmth of my goodnight kiss on your cheek! 😘❤️",
  "Wishing you a peaceful and restful night. Goodnight and sweet dreams! 🌠😴",
  "Imagine my goodnight kiss as a little spark of love to brighten your night. 😘🌟",
  "The night is silent, and the stars are shining just for you. Goodnight with a loving kiss! 😘🌃",
];

// Handle the "Goodnight Kiss" category
bot.action('KISS', async (ctx) => {
  // Delete the original menu message
  await ctx.deleteMessage();

  // Randomly select a goodnight kiss message
  const randomKissMessage = goodnightKissMessages[Math.floor(Math.random() * goodnightKissMessages.length)];

  // Send the random goodnight kiss message
  ctx.telegram.sendMessage(ctx.chat.id, `_${randomKissMessage}_`, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

bot.action('QUOTES', async (ctx) => {
  const loveQuotes = [
    "*'Love is not just looking at each other; it's looking in the same direction.' – Antoine de Saint-Exupéry* ❤️",
    "*'The best thing to hold onto in life is each other.' – Audrey Hepburn* ❤️",
    "*'Love is composed of a single soul inhabiting two bodies.' – Aristotle* ❤️",
    "*'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.' – Maya Angelou* ❤️",
    "*'Love is an endless act of forgiveness. Forgiveness is the key to action and freedom.' – Maya Angelou* ❤️",
    "*'Life is the flower for which love is the honey.' – Victor Hugo* 🌼",
    "*'The best love is the kind that awakens the soul and makes us reach for more, that plants a fire in our hearts and brings peace to our minds.' – Nicholas Sparks* ❤️",
    "*'I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.' – Angelita Lim* ❤️",
    "*'Love is like the wind, you can't see it, but you can feel it.' – Nicholas Sparks* ❤️",
    "*'Love is when the other person's happiness is more important than your own.' – H. Jackson Brown, Jr.* ❤️",
    "*'Love isn't something you find. Love is something that finds you.' – Loretta Young* ❤️",
    "*'You don't love someone for their looks, or their clothes, or for their fancy car, but because they sing a song only you can hear.' – Oscar Wilde* ❤️",
    "*'The greatest happiness you can have is knowing that you do not necessarily require happiness.' – William Saroyan* ❤️",
    "*'Love is a canvas furnished by nature and embroidered by imagination.' – Voltaire* ❤️",
    "*'Love is like a friendship caught on fire. In the beginning, a flame, very pretty, often hot and fierce, but still only light and flickering.' – Bruce Lee* 🔥",
    "*'Love is the bridge between you and everything.' – Rumi* ❤️",
    "*'I have waited for this opportunity for more than half a century, to repeat to you once again my vow of eternal fidelity and everlasting love.' – Gabriel García Márquez* ❤️",
    "*'Love is a game that two can play and both can win.' – Eva Gabor* ❤️",
    "*'Love is when he gives you a piece of your soul, that you never knew was missing.' – Torquato Tasso* ❤️",
    "*'You know you're in love when you can't fall asleep because reality is finally better than your dreams.' – Dr. Seuss* ❤️",
  ];

  // Randomly select a love quote
  const randomLoveQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send a default message followed by the love quote
  ctx.telegram.sendMessage(ctx.chat.id, "_Here is a love quote for you my dear:_\n\n" + randomLoveQuote, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

bot.action('MUSIC', async (ctx) => {
  const musicRecommendations = [
    "*Here's a love song recommendation for you: 'Perfect' by Ed Sheeran. 🎶*",
    "*How about listening to 'Can't Help Falling in Love' by Elvis Presley? It's a timeless classic. 🎵*",
    "*Let me suggest 'All of Me' by John Legend. It's a beautiful song that captures the essence of love. ❤️🎼*",
    "*'Unchained Melody' by The Righteous Brothers is a romantic ballad that's perfect for a cozy evening together. 🌙🎤*",
    "*For a more upbeat choice, try 'I Wanna Dance with Somebody' by Whitney Houston. It's all about the joy of love! 💃🕺*",
    "*'Thinking Out Loud' by Ed Sheeran is another love song that will tug at your heartstrings. 🎤💕*",
    "*How about 'Your Song' by Elton John? It's a sweet melody that celebrates love in a simple and beautiful way. 🎹🎵*",
    "*'Un-break My Heart' by Toni Braxton is a powerful song about longing and love. 🎶❤️*",
    "*'Bless the Broken Road' by Rascal Flatts is a country song that tells a heartfelt story of love's journey. 🎸🛤️*",
    "*'My Heart Will Go On' by Celine Dion is an iconic love song that captures the depth of love and longing. 🚢🎼*",
    "*If you're in the mood for some soulful R&B, listen to 'At Last' by Etta James. It's a classic choice. 🎙️🎵*",
    "*'Amazed' by Lonestar is a beautiful country song that expresses the wonder of finding true love. 🌟🎶*",
    "*For a dose of rock and romance, try 'I Don't Want to Miss a Thing' by Aerosmith. 🎸🎤*",
    "*'Can't Take My Eyes Off You' by Frankie Valli is a catchy tune that captures the feeling of being in love. 👀❤️*",
    "*'How Deep Is Your Love' by Bee Gees is a disco-era classic that's perfect for dancing with your loved one. 💃🕺*",
    "*'I Just Called to Say I Love You' by Stevie Wonder is a simple yet heartfelt declaration of love. ☎️🎵*",
    "*If you're a fan of classic rock, 'Wonderful Tonight' by Eric Clapton is a must-listen for its romantic guitar melody. 🎸❤️*",
    "*'Unforgettable' by Nat King Cole is a timeless song that celebrates the enduring nature of love. 🎶❤️*",
    "*'L-O-V-E' by Nat King Cole is a jazzy and cheerful love song that's bound to make you smile. 🎷🎶*",
    "*For a modern love song with a catchy beat, try 'Love on Top' by Beyoncé. It's all about joy and love. 🎤🎶*",
  ];

  // Randomly select a music recommendation
  const randomMusicRecommendation = musicRecommendations[Math.floor(Math.random() * musicRecommendations.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send a default message followed by the music recommendation
  ctx.telegram.sendMessage(ctx.chat.id, "_Here's a love music recommendation for you:_\n\n" + randomMusicRecommendation, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

bot.action('DATES', async (ctx) => {
  const dateIdeas = [
    "*How about a cozy picnic in the park with your favorite snacks and a blanket to sit on? It's a perfect way to enjoy each other's company in a natural setting. 🧺🌳*",
    "*Explore your creative side by attending a pottery or art class together. You can create unique keepsakes while bonding. 🎨🖌️*",
    "*Take a scenic hike or nature walk to connect with the great outdoors. Don't forget to capture beautiful moments along the way. 🚶‍♂️🌲*",
    "*Plan a movie night under the stars in your backyard or on a rooftop. Set up comfy seating, grab some popcorn, and enjoy a cinematic experience. 🌟🎥*",
    "*Visit a local museum or art gallery to appreciate the beauty of culture and history. Share your thoughts on the exhibits afterward. 🏛️🖼️*",
    "*Experience the thrill of a hot air balloon ride together. It's a breathtaking adventure that will create lasting memories. 🎈🌅*",
    "*Spend a day at an amusement park or carnival, enjoying thrilling rides and indulging in cotton candy and ice cream. 🎡🎢*",
    "*Try your hand at cooking a new and exotic cuisine together. It's a fun way to experiment with flavors and bond over delicious food. 🍲👩‍🍳*",
    "*Embark on a road trip to explore new destinations. The journey itself can be filled with laughter, music, and spontaneous adventures. 🚗🗺️*",
    "*Attend a live concert or music festival featuring your favorite artists. Dance and sing along to the music you love. 🎵🎤*",
    "*Book a romantic getaway to a charming bed and breakfast or a cozy cabin in the woods. It's a chance to unwind and disconnect. 🏡🌄*",
    "*Take a scenic boat ride or cruise along a river or lake. The tranquility of the water is perfect for deep conversations and relaxation. 🚤⛵*",
    "*Visit an animal sanctuary or wildlife reserve. Witnessing the beauty of nature and animals can be both educational and heartwarming. 🦋🐾*",
    "*Plan a stargazing night with a telescope. Identify constellations and enjoy the beauty of the night sky together. 🌌🔭*",
    "*Attend a local theater production or play. It's an opportunity to appreciate the arts and immerse yourselves in storytelling. 🎭📖*",
    "*Challenge each other to a friendly game of mini-golf or go-kart racing. Let your competitive spirits shine. 🏌️‍♂️🏎️*",
    "*Volunteer together for a meaningful cause or charity. Giving back to the community can strengthen your bond. 🤝❤️*",
    "*Plan a day of pampering at a spa or wellness retreat. Relax with massages, facials, and quality time in a tranquil environment. 💆‍♀️🌿*",
    "*Set up a photo scavenger hunt in your city or town. Capture memories and explore new places as you follow clues together. 📷🗺️*",
    "*Savor a romantic candlelit dinner at home. Cook your favorite dishes, enjoy fine wine, and create a restaurant-quality experience. 🍷🕯️*",
  ];

  // Randomly select a date idea
  const randomDateIdea = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send a default message followed by the date idea
  ctx.telegram.sendMessage(ctx.chat.id, "_Here's a romantic date idea for you both:_\n\n" + randomDateIdea, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

bot.action('POETRY', async (ctx) => {
  const lovePoems = [
    "*In your eyes, I found a universe of love,\nA place where stars and dreams freely roam.\nWith every heartbeat, our souls rise above,\nIn this symphony of love, we've found our home.* ❤️",
    "*Your smile, a beacon in the darkest night,\nGuiding me with its gentle, radiant light.\nIn your embrace, I find my endless delight,\nIn the book of love, our story takes flight.* 😊",
    "*Like roses in bloom, our love's fragrance divine,\nIn your presence, every moment's a fine wine.\nWith each whispered word, your heart touches mine,\nIn this love story, forever entwined.* 🌹",
    "*In the tapestry of life, our threads intertwine,\nTwo souls dancing, a love so divine.\nWith each passing day, your love's the sign,\nIn your arms, forever, my heart shall recline.* 💞",
    "*Moonlight kisses the waves with a soft embrace,\nOur love, like the tides, in a rhythmic grace.\nHand in hand, together, we find our place,\nIn the story of us, love's sweetest embrace.* 🌙",
    "*A canvas of love, you paint with grace,\nIn your eyes, I find a sacred place.\nThrough laughter and tears, in every embrace,\nIn the book of love, you're my favorite phrase.* 🎨",
    "*Under the starlit sky, we share our dreams,\nIn your love's glow, every star brightly beams.\nThrough life's winding paths and endless streams,\nIn your arms, I've found my heart's true schemes.* 🌟",
    "*With every heartbeat, our love takes flight,\nIn the darkest hours, you are my guiding light.\nIn this world of chaos, you are my respite,\nWith you, my love, everything feels right.* ❤️",
    "*In the garden of love, our hearts did meet,\nBeneath the sun's warmth and moon's soft beat.\nIn your eyes, my love, life is sweet,\nWith each passing moment, our love's complete.* 🌻",
    "*In your embrace, I find my solace and cheer,\nIn your love's melody, every note rings clear.\nThrough life's challenges, we conquer each fear,\nWith you by my side, our love's forever near.* 🎶",
    "*In your presence, my heart finds its grace,\nIn your love's sanctuary, I've found my place.\nThrough life's ups and downs, in every embrace,\nWith you, my love, is where I want to chase.* ❤️",
  ];

  // Randomly select a love poem
  const randomLovePoem = lovePoems[Math.floor(Math.random() * lovePoems.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send a default message followed by the love poem
  ctx.telegram.sendMessage(ctx.chat.id, "_Here's a beautiful love poem for you:_\n\n" + randomLovePoem, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

bot.action('BOOKS', async (ctx) => {
  const loveBookRecommendations = [
    "*'The Notebook' by Nicholas Sparks*\nA timeless love story that will tug at your heartstrings. Follow Noah and Allie's journey through life and love.",
    "*'Pride and Prejudice' by Jane Austen*\nA classic tale of love, misunderstandings, and societal expectations. The love story of Elizabeth Bennet and Mr. Darcy is a must-read.",
    "*'Outlander' by Diana Gabaldon*\nTravel through time and experience a passionate love story between Claire Randall and Jamie Fraser amidst historical turmoil.",
    "*'The Rosie Project' by Graeme Simsion*\nJoin Don Tillman, a brilliant but socially awkward geneticist, on his quest to find love. A heartwarming and humorous tale.",
    "*'Me Before You' by Jojo Moyes*\nPrepare to laugh and cry as you follow the story of Louisa Clark and Will Traynor. A touching exploration of love and life's complexities.",
    "*'The Fault in Our Stars' by John Green*\nHazel and Gus, two teenagers with cancer, embark on a journey that's both heartbreaking and heartwarming. A story about love, resilience, and the human spirit.",
    "*'Call Me by Your Name' by André Aciman*\nSet in the sun-soaked Italian Riviera, this novel explores the passionate summer romance between Elio and Oliver. Sensual and poignant.",
    "*'Eleanor & Park' by Rainbow Rowell*\nA young adult love story that beautifully captures the intensity and awkwardness of first love. Eleanor and Park's connection is unforgettable.",
    "*'One Day' by David Nicholls*\nFollow Emma and Dexter on the same day, July 15th, over two decades. A poignant exploration of friendship, love, and the passage of time.",
    "*'The Nightingale' by Kristin Hannah*\nA tale of love, sacrifice, and sisterhood set in Nazi-occupied France. The bond between Vianne and Isabelle will touch your heart.",
  ];

  // Randomly select a love book recommendation
  const randomLoveBook = loveBookRecommendations[Math.floor(Math.random() * loveBookRecommendations.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send a default message followed by the love book recommendation
  ctx.telegram.sendMessage(ctx.chat.id, "_Here's a love book recommendation for you:_\n\n" + randomLoveBook, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

bot.action('MOVIES', async (ctx) => {
  const romanticMovieRecommendations = [
    "*'The Notebook' (2004)*\nA classic romantic drama based on Nicholas Sparks' novel. The story of Noah and Allie's enduring love is sure to tug at your heartstrings.",
    "*'La La Land' (2016)*\nAn enchanting musical that follows the love story of a jazz musician and an aspiring actress in Los Angeles. The music and chemistry are mesmerizing.",
    "*'Before Sunrise' (1995)*\nJoin Jesse and Céline on a romantic journey through Vienna as they engage in deep conversations and explore the connection that unfolds between them.",
    "*'Eternal Sunshine of the Spotless Mind' (2004)*\nA unique and thought-provoking film about a couple who undergo a procedure to erase each other from their memories. A beautiful exploration of love and memory.",
    "*'500 Days of Summer' (2009)*\nAn unconventional love story that portrays a relationship's ups and downs in a nonlinear narrative. It's a rollercoaster of emotions.",
    "*'Crazy, Stupid, Love' (2011)*\nA comedy that weaves multiple love stories together, featuring a middle-aged man's transformation with the help of a charming bachelor.",
    "*'Amélie' (2001)*\nA whimsical and heartwarming tale of a young woman named Amélie who embarks on a mission to bring happiness to those around her.",
    "*'Silver Linings Playbook' (2012)*\nA story about two people dealing with mental health challenges who find a unique connection and healing through their friendship and budding romance.",
    "*'Notting Hill' (1999)*\nA charming romantic comedy that explores the relationship between a British bookseller and a famous American actress. It's a delightful journey of love overcoming obstacles.",
    "*'The Shape of Water' (2017)*\nA visually stunning and unconventional love story between a mute woman and a mysterious aquatic creature. Guillermo del Toro's masterpiece is a must-see.",
  ];

  // Randomly select a romantic movie recommendation
  const randomRomanticMovie = romanticMovieRecommendations[Math.floor(Math.random() * romanticMovieRecommendations.length)];

  // Delete the original menu message
  await ctx.deleteMessage();

  // Send a default message followed by the romantic movie recommendation
  ctx.telegram.sendMessage(ctx.chat.id, "_Here's a romantic movie recommendation for your movie night:_\n\n" + randomRomanticMovie, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Go Back To Menu", callback_data: "go-back" }]
      ]
    }
  });
});

bot.action('CUSTOM', async (ctx) => {
  // Delete the original menu message
  await ctx.deleteMessage();

  // Ask the user what custom message they would like
  ctx.telegram.sendMessage(ctx.chat.id, "You've chosen the 'Custom Messages' category. Please type any message, and I'll reply to you with love! 💕\n\nType 'MENU' to return to the main menu.");
});



const conversationContext = {};
// Define an array of captions for photos
const photoCaptions = [
  'Here is a sexy picture for you 💦💦',
  'Here is hot picture for you 🍑✨',
  // Add more captions as needed
];

const videoCaptions = [
  'Here is an amazing video for you!',
  'Here is another exciting video for you!',
  'Here is a captivating video just for you!',
  // Add more captions as needed
];

const picturePaths = [
  'B:/Chatbot/Sara Diaz/photos/pic.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic1.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic2.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic3.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic4.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic5.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic6.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic7.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic8.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic9.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic10.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic11.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic12.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic13.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic14.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic15.jpeg',
  'B:/Chatbot/Sara Diaz/photos/pic16.jpeg',
  // Add more picture paths as needed
];

const videoPaths = [
  'B:/Chatbot/Sara Diaz/videos/vid1.mp4',
  'B:/Chatbot/Sara Diaz/videos/vid2.mp4',
  // Add more video paths as needed
];


// Define arrays of keywords for photos and videos
const photoKeywords = ['picture', 'image', 'pic', 'foto', 'snapshot', 'visual', 'photo'];
const videoKeywords = ['video', 'clip', 'movie'];

// ...

bot.on('text', async (ctx) => {
  const chatId = ctx.chat.id;
  const msg = ctx.message.text;
  const lowercaseMsg = msg.toLowerCase();

  // Show typing indicator before processing
  await ctx.telegram.sendChatAction(chatId, 'typing');

  // Simulate typing delay
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Delay for 2 seconds (adjust as needed)

// Check if the user explicitly requests media (photo or video)
if (photoKeywords.some(keyword => lowercaseMsg.includes(keyword)) || videoKeywords.some(keyword => lowercaseMsg.includes(keyword))) {
  let mediaPaths;
  let caption;

  if (photoKeywords.some(keyword => lowercaseMsg.includes(keyword))) {
    // User requested a photo
    mediaPaths = picturePaths;
    caption = photoCaptions;
  } else {
    // User requested a video
    mediaPaths = videoPaths;
    caption = videoCaptions;
  }

  // Filter out media that has already been sent
  const availableMediaPaths = mediaPaths.filter(path => !sentMedia.includes(path));

  if (availableMediaPaths.length === 0) {
    // All media has been sent, reset the history
    sentMedia.length = 0;
  } else {
    // Select a random media path and caption from the available media
    const mediaIndex = Math.floor(Math.random() * availableMediaPaths.length);
    const selectedMediaPath = availableMediaPaths[mediaIndex];
    const selectedCaption = caption[mediaPaths.indexOf(selectedMediaPath) % caption.length];

    if (selectedMediaPath) {
      if (mediaPaths === picturePaths) {
        // Send a photo with the selected caption
        ctx.replyWithPhoto({
          source: selectedMediaPath,
        }, {
          caption: selectedCaption,
        });
      } else {
        // Send a video with the selected caption
        ctx.reply("Working on your video...");
        ctx.replyWithVideo({
          source: selectedMediaPath,
        }, {
          caption: selectedCaption,
        });
      }

      // Add the sent media to the history
      sentMedia.push(selectedMediaPath);

      return; // Exit the function after responding with media
    }
  }
}

  // Continue with the rest of the code
  const wit = await witResponse(msg); // Get Wit.ai response
  const intent = emojiBot.detectIntent(msg);
  const response = emojiBot.getResponse(intent);

  if (response) {
    ctx.reply(response);
    return;
  }

  // Check for small talk responses using rawsmallTalkResponses and getrawSmallTalkResponse
  const rawSmallTalkResponse = getrawSmallTalkResponse(msg);

  if (rawSmallTalkResponse) {
    ctx.reply(rawSmallTalkResponse);
    return; // Exit the function after responding to raw small talk
  }

  // Check for specific greetings
  const specificGreeting = greetingsAndResponses.getSpecificResponse(msg);

  if (specificGreeting) {
    ctx.reply(specificGreeting);
  } else {
    // Check for calling
    const callingResponse = callResponses.getCallResponse(msg);

    if (callingResponse) {
      ctx.reply(callingResponse);
    } else {
      // Check for sentiment responses
      const sentimentIntent = wit.intents[0]?.name;

      // Check for sentiment responses first in rawsentiments.js
      let rawSentimentResponse = getrawPositiveSentimentResponse(sentimentIntent);
      if (!rawSentimentResponse) {
        rawSentimentResponse = getrawNegativeSentimentResponse(sentimentIntent);
      }
      if (!rawSentimentResponse) {
        rawSentimentResponse = getrawNeutralSentimentResponse(msg); // Pass the user's message here
      }

      if (rawSentimentResponse) {
        ctx.reply(rawSentimentResponse);
      } else {
        // If no raw sentiment response, check in sentiments.js
        const sentimentResponse = getSentimentResponse(sentimentIntent);

        if (sentimentResponse) {
          ctx.reply(sentimentResponse);
        } else {
          // Check for small talk responses using smallTalkResponses and getSmallTalkResponse
          const smallTalkResponse = getSmallTalkResponse(sentimentIntent);

          if (smallTalkResponse) {
            ctx.reply(smallTalkResponse);
          } else if (msg === 'menu') {
            // User wants to access the main menu
            ctx.telegram.sendMessage(ctx.chat.id, "Taking you to main menu...", {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "Main Menu", callback_data: "go-back" }]
                ]
              }
            });
          } else {
            // Handle traits simultaneously
            let reply = await greetingsAndResponses.greetings.handleMessage(
              wit.entities,
              wit.traits
            );

            if (!reply) {
              // Handle the case where the bot doesn't have a specific response
              
              // Compose the response message
              const errorMessage = error.handleMessage(); // Replace this with your error message retrieval logic
              const responseMessage = `Hello dear one, your typed: "${msg}"\n\n${errorMessage} Or send the word 'menu' or click /menu to access services.\n\n You can as well join my private group by clicking this link to get the best from me: \n https://sublaunch.co/saradiazoxo`;
            
              // Reply to the user with the composed message, setting reply_to_message_id
              ctx.reply(responseMessage, { reply_to_message_id: ctx.message.message_id });
            } else {
                          
            ctx.reply(reply);
            }
          }
        }
      }
    }
  }
});

// ...

bot.launch();

async function witResponse(msg) {
  const client = new Wit({
    accessToken: process.env.WITAI_TOKEN,
    logger: new log.Logger(log.DEBUG), // optional
  });

  const wit = await client.message(msg);
  console.log('wit reply', JSON.stringify(wit));
  return wit;
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
