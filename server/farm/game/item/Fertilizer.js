var Item = require("./Item.js");

function Fertilizer() {};
Fertilizer.prototype = Object.create(Item.prototype);

module.exports = Fertilizer;