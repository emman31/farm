// Defines a Cell Factory.
var _maxId = 1;
exports.NewCrop = function() {
  return new Crop();
};

function Crop() {

}

Crop.prototype.PlantSeed = function(seed) {
  this._plantedSeed = seed;
};

Crop.prototype.GetPlantName = function() {
  return this._plantedSeed.PlantName;
};

/**
 * Get the symbol that represents whats is currently on the crop.
 */
Crop.prototype.GetSymbol = function GetSymnbol() {
  return 'x';
};