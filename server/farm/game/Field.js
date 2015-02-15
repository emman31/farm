var Crop = require("./Crop.js");

function Field(socket, width, height) {
  this._socket = socket;
  this.Width = width;
  this.Height = height;

  // Fill the field with crops.
  this._field = [];
  for (var y = 0; y < height; y ++) {
    this._field[y] = [];
    for (var x = 0; x < width; x ++) {
      this._field[y][x] = new Crop(this._socket, x, y);
    }
  }
}

Field.prototype.IsFullyGrown = function IsFullyGrown(x, y) {
  return this._field[y][x].IsFullyGrown();
};

/**
 * Check if it's possible to plant a seed on a crop.
 * @param {Seed} seed
 * @param {int} x
 * @param {int} y
 * @param {Action} onCanPlant - The action to execute when it'll be possible to plant on the crop.
 * @returns {Boolean}
 */
Field.prototype.CanPlant = function CanPlant(seed, x, y, onCanPlant) {
  return this._field[y][x].CanPlant(onCanPlant);
};

/**
 * Plant a seed in a crop, if possible.
 * @param {Seed} seed The seed to plant
 * @param {int} x The x coordinate of the crop in which to plant.
 * @param {int} y The y coordinate of the crop in which to plant.
 * @returns {Boolean}
 */
Field.prototype.Plant = function Plant(seed, x, y) {
  if (this.CanPlant(seed, x, y, null)) { // To avoid any inconsistency, we double check.
    this._field[y][x].PlantSeed(seed);
    return true;
  }
  else {
    return false;
  }
};

/**
 * Plant a seed in a free crop.
 * @param {Seed} seed The seed to plant
 * @returns {Boolean}
 */
Field.prototype.PlantAnywhere = function PlantAnywhere(seed) {
  var planted = false;
  for (var y = 0; y < this.Height && !planted; y ++) {
    for (var x = 0; x < this.Width && !planted; x ++) {
      if (this.Plant(seed, x, y)) {
        planted = true;
      }
    }
  }

  return planted;
};

/**
 * @param {int} x
 * @param {int} y
 * @return {Object[]}
 */
Field.prototype.GetProduction = function GetProduction(x, y) {
  return this._field[y][x].GetProduction();
};

Field.prototype.ClearCrop = function ClearCrop(x, y) {
  return this._field[y][x].ClearCrop();
};

/**
 * Water all crops.
 */
Field.prototype.WaterAllCrops = function WaterAllCrops() {
  for (var y = 0; y < this.Height; y ++) {
    for (var x = 0; x < this.Width; x ++) {
      this.WaterCrop(x, y);
    }
  }
};

/**
 * Water a crop.
 * @param {int} x the x coordinate of the crop in which to plant.
 * @param {int} y the y coordinate of the crop in which to plant.
 */
Field.prototype.WaterCrop = function WaterCrop(x, y) {
  this._field[y][x].Water();
};

/**
 *
 * @param fertilizer
 * @param x
 * @param y
 * @returns {boolean}
 */
Field.prototype.FertilizeCrop = function FertilizeCrop(fertilizer, x, y) {
  return this._field[y][x].Fertilize(fertilizer);
};

/**
 * Get the field 2d array of symbols to print on screen.
 * This is to send to client. Don't add unnecessary info.
 */
Field.prototype.GetField = function GetField() {
  var field = [];

  for (var y = 0; y < this.Height; y ++) {
    field[y] = [];
    for (var x = 0; x < this.Width; x ++) {
      field[y][x] = this._field[y][x].GetSymbol();
    }
  }

  return field;
};

module.exports = Field;