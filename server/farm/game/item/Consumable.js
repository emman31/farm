var Item = require("./Item.js");

function Consumable(){};
Consumable.prototype = new Item();

module.exports = Consumable;