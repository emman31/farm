var _field = require("./field.js");
var _time = require("./time.js");

exports.NewGame = function(socket, time) {
  return new Game(socket, time);
};

function Game(socket, time) {
  this._socket = socket;
  this._time = _time.NewTime(socket, time);
  this._field = _field.NewField(this._socket, 20, 10);
}

/**
 *
 * @returns {GetField@pro;_field@call;GetField}
 */
Game.prototype.GetField = function GetField() {
  return this._field.GetField();
};

/**
 * Plant a seed in a crop.
 * @param {string} seedId The seed's id.
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
Game.prototype.Plant = function Plant(seedId, x, y) {
  this._field.Plant(seedId, x, y);
};

/**
 * water a crop.
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
Game.prototype.WaterCrop = function WaterCrop(x, y) {
  this._field.WaterCrop(x, y);
};