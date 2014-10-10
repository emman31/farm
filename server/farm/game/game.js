var _field = require("./field.js");

exports.NewGame = function(socket) {
  return new Game(socket);
};

function Game(socket) {
  this._socket = socket;
  this._field = _field.NewField(this._socket, 20, 10);
}

/**
 *
 * @returns {GetField@pro;_field@call;GetField}
 */
Game.prototype.GetField = function GetField() {
  //console.log("getting field");
  //console.log(this._field.GetField());
  return this._field.GetField();
};

/**
 * Plant a seed in a crop.
 * @param {string} symbol The symbol representing the seed to plant.
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
Game.prototype.Plant = function Plant(seedId, x, y) {
  this._field.Plant(seedId, x, y);
}