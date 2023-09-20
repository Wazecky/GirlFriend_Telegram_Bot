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
const { rawsmallTalkResponses, getrawSmallTalkResponse } = require('./rawsmallTalk');
const error = require('./error');
const { getSmallTalkResponse } = require('./smallTalk');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  ctx.reply(
    'Introduce yourself first, let me know who you are! \n\n /reset to reset the conversation \n /topup to top-up credit \n\n Automatic transactions: \n /connect and /disconnect your payment method \n /autocharge to enable or disable autocharge (5€ per voice message) \n /send to automatically gift 10€ \n\n How to get started? \n Type /topup to top-up credit \n Or /connect your payment method and enable /autocharge \n\n By using this chatbot, you confirm that you are 18 or older🔞'
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

const conversationContext = {};
// Define an array of captions for photos
const photoCaptions = [
  'Here is a beautiful picture for you!',
  'Here is another beautiful picture for you!',
  // Add more captions as needed
];

const videoCaptions = [
  'Here is an amazing video for you!',
  'Here is another exciting video for you!',
  'Here is a captivating video just for you!',
  // Add more captions as needed
];


// Define arrays of keywords for photos and videos
const photoKeywords = ['picture', 'image', 'pic', 'foto', 'snapshot', 'visual', 'photo'];
const videoKeywords = ['video', 'clip', 'movie'];


bot.on('text', async (ctx) => {
  const msg = ctx.message.text;
  const lowercaseMsg = msg.toLowerCase();

  // Check if a picture or video has already been sent in this conversation
  if (conversationContext[ctx.chat.id] === 'photo') {
    // If a photo has already been sent, check if the user wants another one
    if (photoKeywords.some(keyword => lowercaseMsg.includes(keyword))) {
      // Send another photo with a different caption
      const captionIndex = conversationContext[`${ctx.chat.id}_photo_counter`] || 0;
      const caption = photoCaptions[captionIndex % photoCaptions.length];
      ctx.replyWithPhoto({
        source: 'B:/Chatbot/Sara Diaz/pic1.jpg', // Replace with your local image path
      }, {
        caption,
      });
      // Update the conversation context to indicate a new photo has been sent
      conversationContext[`${ctx.chat.id}_photo_counter`] = captionIndex + 1;
    } else {
      // Respond to other messages
    }
  } else if (photoKeywords.some(keyword => lowercaseMsg.includes(keyword))) {
    // Send the first photo with the initial caption
    const initialCaption = 'Here is a beautiful picture for you!';
    ctx.replyWithPhoto({
      source: 'B:/Chatbot/Sara Diaz/pic1.jpg', // Replace with your local image path
    }, {
      caption: initialCaption,
    });
    // Set the conversation context to indicate a photo has been sent
    conversationContext[ctx.chat.id] = 'photo';
  } else if (videoKeywords.some(keyword => lowercaseMsg.includes(keyword))) {
    // Send a video with a random caption from the videoCaptions array
    const captionIndex = Math.floor(Math.random() * videoCaptions.length);
    const videoCaption = videoCaptions[captionIndex];
    ctx.reply("Working on your video...");
    ctx.replyWithVideo({
      source: 'B:/Chatbot/Sara Diaz/vid.mp4', // Replace with your local video path
    }, {
      caption: videoCaption,
    });
    // Set the conversation context to indicate a video has been sent
    conversationContext[ctx.chat.id] = 'video';
  } else {

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
          } else {
            // Handle traits simultaneously
            let reply = await greetingsAndResponses.greetings.handleMessage(
              wit.entities,
              wit.traits
            );

            if (!reply) {
              reply = error.handleMessage();
            }

            ctx.reply(reply);
          }
        }
      }
    }
  }
  }
});

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