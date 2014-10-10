var _cropFactory = require("./crop.js");
var _seedFactory = require("./seed.js");

exports.NewField = function(socket, width, height) {
  return new Field(socket, width, height);
};

function Field(socket, width, height) {
  this._socket = socket;
  this.Width = width;
  this.Height = height;

  // Fill the field with crops.
  this._field = new Array();
  for (var y = 0; y < height; y ++) {
    this._field[y] = new Array();
    for (var x = 0; x < width; x ++) {
      this._field[y][x] = _cropFactory.NewCrop(this._socket, x, y);
    }
  }
}

/**
 * Plant a seed in a crop.
 * @param {string} symbol The symbol representing the seed to plant.
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
Field.prototype.Plant = function Plant(seedId, x, y) {
  var seed = _seedFactory.GetSeed(seedId);
  this._field[y][x].PlantSeed(seed);
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