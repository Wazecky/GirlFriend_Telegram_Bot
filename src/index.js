require('dotenv').config();

const { Wit, log } = require('node-wit');
//const { witResponse } = require('./wit'); 
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

bot.on('text', async (ctx) => {
  const msg = ctx.message.text;
  const wit = await witResponse(msg); // Get Wit.ai response

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
