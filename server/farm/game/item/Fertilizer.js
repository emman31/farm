var Item = require("./Item.js");

function Fertilizer() {};
Fertilizer.prototype = new Item();

module.exports = Fertilizer;