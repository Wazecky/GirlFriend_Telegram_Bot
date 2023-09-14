const stringSimilarity = require('string-similarity');

const callResponses = {
  "babe": "Yes babe",
  "baby": "Yes baby",
  "sweetheart": "Yes sweetheart",
  "my sweetheart": "Yes sweetie",
  "sweety": "Yes my chocolate",
  "honey": "Yes hun",
  "darling": "Yes darling",
  "my darling": "Yes darling",
  "love": "Yes my love",
  "my love": "Yes love",
  "my lover": "Yes my lover boy",
  "sweetie": "Yes sweetie",
  "dearest": "Yes my dear",
  "dear": "Yes dear",
  "my dear": "Yes dear",
  "angel": "Yes my angel",
  "my angel": "Yes my angel",
  "beloved": "Yes my lover",
  "cupid": "Yes handsome",
  "sugar": "Yes sweetie",
  "treasure": "Yes my treasure",
  "my treasure": "Yes love",
  "cutie": "Yes handsome",
  "sunshine": "Yes my sunshine",
  "heartthrob": "Yes my heartbeat",
  "my sunshine": "Yes honey",
  "my heartbeat": "Yes my everything",
  "boo": "Yes babe",
  "pumpkin": "Yes darling",
  "my soulmate": "Yes my dear",
  "my everything": "Yes my all",
  "adore": "Yes love",
};

const getCallResponse = (calling) => {
  const lowercaseCalling = calling.toLowerCase();
  const keys = Object.keys(callResponses);

  // Calculate similarities and find the best match
  const matches = stringSimilarity.findBestMatch(lowercaseCalling, keys);
  const bestMatch = matches.bestMatch;

  // Check if the best match has a similarity score above a certain threshold
  if (bestMatch.rating >= 0.8) {
    return callResponses[bestMatch.target] || null;
  } else {
    return null; // No close match found
  }
};

module.exports = {
  getCallResponse,
};
