var Item = require("./item.js");

function Fertilizer() {};
Fertilizer.prototype = Object.create(Item.prototype);

module.exports = Fertilizer;