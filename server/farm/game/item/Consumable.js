var Item = require("./Item.js");

function Consumable(){};
Consumable.prototype = Object.create(Item.prototype);

module.exports = Consumable;