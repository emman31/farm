var Crop = require("./crop.js");

function Field(socket, width, height) {
  this._socket = socket;
  this.Width = width;
  this.Height = height;

  // Fill the field with crops.
  this._field = new Array();
  for (var y = 0; y < height; y ++) {
    this._field[y] = new Array();
    for (var x = 0; x < width; x ++) {
      this._field[y][x] = new Crop(this._socket, x, y);
    }
  }
}

/**
 * Plant a seed in a crop.
 * @param {seed} seed The seed to plant
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
Field.prototype.Plant = function Plant(seed, x, y) {
  this._field[y][x].PlantSeed(seed);
};

/**
 * Plant a seed in a free crop.
 * @param {seed} seed The seed to plant
 */
Field.prototype.PlantAnywhere = function PlantAnywhere(seed) {
  var planted = false;
  for (var y = 0; y < this.Height && !planted; y ++) {
    for (var x = 0; x < this.Width && !planted; x ++) {
      if (this._field[y][x].CanPlant()) {
        this._field[y][x].PlantSeed(seed);
        planted = true;
      }
    }
  }

  return planted;
};

/**
 * Harvest all fully grown crops and returns the resulting items.
 * @returns {Array|HarvestAll.items}
 */
Field.prototype.HarvestAll = function HarvestAll() {
  var items = [];
  for (var y = 0; y < this.Height; y ++) {
    for (var x = 0; x < this.Width; x ++) {
      if (this._field[y][x].IsFullyGrown()) {
        items.push(this._field[y][x].Harvest());
        this._field[y][x] = new Crop(this._socket, x, y);
      }
    }
  }

  return items;
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

Field.prototype.FertilizeCrop = function FertilizeCrop(fertilizer, x, y) {
  return this._field[y][x].Fertilize(fertilizer);
};

/**
 * Get the field 2d array of symbols to print on screen.
 * This is to send to client. Don't add unnecessary info.
 */
Field.prototype.GetField = function GetField() {
  var field = new Array();

  for (var y = 0; y < this.Height; y ++) {
    field[y] = new Array();
    for (var x = 0; x < this.Width; x ++) {
      field[y][x] = this._field[y][x].GetSymbol();
    }
  }

  return field;
};

module.exports = Field;