var Item = require("./Item.js");

function Tool() {};
Tool.prototype = Object.create(Item.prototype);

Tool.prototype.GetAction = function GetAction() {
  return this._definition.Action;
};

module.exports = Tool;