var Item = require("./Item.js");

function Tool() {};
Tool.prototype = new Item();

Tool.prototype.GetAction = function GetAction() {
  return this._definition.Action;
};

module.exports = Tool;