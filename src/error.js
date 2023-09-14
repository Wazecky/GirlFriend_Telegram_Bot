const responses = {
    error: [
      "I am sorry babe, I don't understand that",
      "Sorry, come again, I don't understand that request",
      "Babe, I don't get your point",
    ],
  };
  
  const error = {
    handleMessage: () => {
      const errorResponses = responses["error"];
      return errorResponses[Math.floor(Math.random() * errorResponses.length)];
    },
  };
  
  module.exports = error;
  