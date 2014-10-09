var _cropFactory = require("./crop.js");
var _seedFactory = require("./seed.js");

exports.NewField = function(width, height) {
  return new Field(width, height);
};

function Field(width, height) {
  this.Width = width;
  this.Height = height;

  // Fill the field with crops.
  this._field = new Array();
  for (var x = 0; x < width; x ++) {
    this._field[x] = new Array();
    for (var y = 0; y < height; y ++) {
      this._field[x][y] = _cropFactory.NewCrop();
    }
  }
}

Field.prototype.Plant = function Plant(symbol, x, y) {
  var seed = _seedFactory.GetSeed(symbol);
  this._field[x][y].PlantSeed(seed);
};


/**
 * Get the field 2d array of symbols to print on screen.
 */
Field.prototype.GetField = function GetField() {
  var field = new Array();

  for (var x = 0; x < this.Width; x ++) {
    field[x] = new Array();
    for (var y = 0; y < this.Height; y ++) {
      field[x][y] = this._field[x][y].GetSymbol();
    }
  }

  return field;
};