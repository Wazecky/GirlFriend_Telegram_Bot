const responses = {
  error: [
    "Sorry, come again, I don't understand that request",
    "I'm afraid I didn't catch that. Can you please rephrase?",
    "My apologies, but I'm not quite sure what you mean.",
    "Hmm, I'm not sure I follow. Could you clarify?",
    "I didn't quite get that. Can you elaborate a bit more?",
    "I'm sorry, I didn't understand. Could you provide more details?",
    "I'm having trouble understanding your request. Can you try again?",
    "It seems like there's a bit of confusion. Can you rephrase that?",
    "I didn't quite catch that. Could you repeat it, please?",
    "I'm sorry, but I couldn't process your request. Can you clarify?",
    "I'm not quite sure what you're asking. Could you provide more context?",
    "I'm sorry, but I couldn't understand your message. Can you try again?",
    "It appears there's been a misunderstanding. Can you rephrase your request?",
    "I'm having trouble making sense of that. Can you explain further?",
    "I'm sorry, but I'm not able to interpret your request. Please try again.",
    "I didn't quite catch that. Could you rephrase it differently?",
    "I'm afraid I didn't understand your message. Can you provide more information?",
    "I'm having difficulty comprehending your request. Can you be more explicit?"
  ],
};
  
  const error = {
    handleMessage: () => {
      const errorResponses = responses["error"];
      return errorResponses[Math.floor(Math.random() * errorResponses.length)];
    },
  };
  
  module.exports = error;
  