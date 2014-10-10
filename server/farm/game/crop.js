exports.NewCrop = function(socket, x, y) {
  var newCrop = new Crop(x, y);
  newCrop._socket = socket;
  return newCrop;
};

function Crop(x, y) {
  this._x = x;
  this._y = y;
  this._plantedSeed = null;
}

Crop.prototype.PlantSeed = function(seed) {
  this._plantedSeed = seed;
  this._currentStage = 0;
  setTimeout(this.GrowPlant, seed.GetStageTimer(this._currentStage) * 1000, this);
};

Crop.prototype.GetPlantName = function() {
  return this._plantedSeed.PlantName;
};

Crop.prototype.GrowPlant = function GrowPlant(crop) {
  if (crop._plantedSeed.StageExists(crop._currentStage + 1)) {
    crop._currentStage++;
    crop._socket.emit('response', "GrowPlant", [crop._plantedSeed.GetSymbol(crop._currentStage), crop._x, crop._y]);
    setTimeout(crop.GrowPlant, crop._plantedSeed.GetStageTimer(crop._currentStage) * 1000, crop);
  }
}

/**
 * Get the symbol that represents whats is currently on the crop.
 * This is to send to client. Don't add unnecessary info.
 */
Crop.prototype.GetSymbol = function GetSymbol() {
  if (this._plantedSeed === null) {
    return ' ';
  }

  return this._plantedSeed.GetSymbol(this._currentStage);
};