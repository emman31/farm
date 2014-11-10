var _field = require("./field.js");
var _inventory = require("./inventory.js");
var _time = require("./time.js");

exports.NewGame = function(socket, time, width, height) {
  return new Game(socket, time, width, height);
};

function Game(socket, time, width, height) {
  this._socket = socket;
  this._time = _time.NewTime(socket, time);
  this._field = _field.NewField(this._socket, width, height);
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
 * @param {seed} seed The seed.
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
Game.prototype.Plant = function Plant(seed, x, y) {
  this._field.Plant(seed, x, y);
};

/**
 * Plant a seed in a free crop.
 * @param {seed} seed The seed.
 */
Game.prototype.PlantAnywhere = function PlantAnywhere(seed) {
  if (this._inventory.ContainsItem(seed)) {
    var planted = this._field.PlantAnywhere(seed);
    if (planted) {
      this._inventory.RemoveItem(seed);
    }
  }
};

Game.prototype.WaterAll = function WaterAll() {
  this._field.WaterAllCrops();
};

Game.prototype.HarvestAll = function HarvestAll() {
  var items = this._field.HarvestAll();
  console.log(items);
  this._inventory.AddItems(items);
};

/**
 * water a crop.
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
Game.prototype.WaterCrop = function WaterCrop(x, y) {
  this._field.WaterCrop(x, y);
};

Game.prototype.FertilizeCrop = function FertilizeCrop(fertilizer, x, y) {
  this._field.FertilizeCrop(fertilizer, x, y);
};

Game.prototype.CreateInventory = function CreateInventory(socket) {
  this._inventory = _inventory.NewInventory(socket);
};