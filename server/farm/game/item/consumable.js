var Item = require("./item.js");

function Consumable(){};
Consumable.prototype = Object.create(Item.prototype);

module.exports = Consumable;