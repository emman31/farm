exports.NewCrop = function() {
  return new Crop();
};

function Crop() {
  this._plantedSeed = null;
}

Crop.prototype.PlantSeed = function(seed) {
  this._plantedSeed = seed;
};

Crop.prototype.GetPlantName = function() {
  return this._plantedSeed.PlantName;
};

/**
 * Get the symbol that represents whats is currently on the crop.
 * This is to send to client. Don't add unnecessary info.
 */
Crop.prototype.GetSymbol = function GetSymnbol() {
  if (this._plantedSeed === null) {
    return 'x';
  }

  return this._plantedSeed.GetSymbol();
};