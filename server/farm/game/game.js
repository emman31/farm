var _field = require("./field.js");

exports.NewGame = function() {
  return new Game();
};

function Game() {
  this._field = _field.NewField(10, 10);
}

Game.prototype.GetField = function GetField() {
  console.log("getting field");
  console.log(this._field.GetField());
  return this._field.GetField();
};

Game.prototype.Plant = function Plant(symbol, x, y) {
  this._field.Plant(symbol, x, y);
}