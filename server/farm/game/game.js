var _field = require("./field.js");

exports.NewGame = function() {
  return new Game();
};

function Game() {
  this._field = _field.NewField(10, 10);
}

/**
 *
 * @returns {GetField@pro;_field@call;GetField}
 */
Game.prototype.GetField = function GetField() {
  console.log("getting field");
  console.log(this._field.GetField());
  return this._field.GetField();
};

/**
 * Plant a seed in a crop.
 * @param {string} symbol The symbol representing the seed to plant.
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
Game.prototype.Plant = function Plant(symbol, x, y) {
  this._field.Plant(symbol, x, y);
}