var _time = require("./time.js");

exports.NewCrop = function(socket, x, y) {
  var newCrop = new Crop(x, y);
  newCrop._socket = socket;
  return newCrop;
};

function Crop(x, y) {
  this._x = x;
  this._y = y;
  this._watered = false;
  this._plantedSeed = null;
  this._growingTimeoutId = null;
  this._waterTimeoutId = null;
  this._deathTimeoutId = null;
}

Crop.prototype.PlantSeed = function(seed) {
  this._plantedSeed = seed;
  this._currentStage = 0;
  this._growingTimeoutId = _time.SetTimeout(this.GrowPlant, seed.GetStageTimer(this._currentStage), this);
  this._deathTimeoutId = _time.SetTimeout(this.Die, this._plantedSeed.GetDeathTimer(), this);
  this._socket.emit('response', "Plant", [this._plantedSeed.GetSymbol(this._currentStage), this._x, this._y]);
};

Crop.prototype.Water = function() {
  if (this._plantedSeed !== null) {
    this._watered = true;
    _time.ClearTimeout(this._waterTimeoutId);
    _time.ClearTimeout(this._deathTimeoutId);

    this._waterTimeoutId = _time.SetTimeout(this.Dry, this._plantedSeed.GetWateringDuration(), this);
    this._socket.emit('response', "Watered", [this._plantedSeed.GetWateringDuration(), this._x, this._y]);
  }
};

Crop.prototype.Fertilize = function Fertilize(fertilizer) {
  this._fertilizer = fertilizer;
  this._socket.emit('response', "Fertilized", [this._x, this._y]);
};

Crop.prototype.Dry = function Dry(crop) {
  crop._watered = false;
  crop._waterTimeoutId = null;
  crop._deathTimeoutId = _time.SetTimeout(crop.Die, crop._plantedSeed.GetDeathTimer(), crop);
  crop._socket.emit('response', "Dried", [crop._plantedSeed.GetDeathTimer(), crop._x, crop._y]);
};

Crop.prototype.Die = function Die(crop) {
  if (crop._watered === false) {
    crop._dead = true;
    crop._deathTimeoutId = null;
    crop._socket.emit('response', "Died", [crop._x, crop._y]);
  }
};

Crop.prototype.GetPlantName = function() {
  return this._plantedSeed.PlantName;
};

Crop.prototype.GrowPlant = function GrowPlant(crop) {
  crop._growingTimeoutId = null;
  if (!crop._dead && crop._plantedSeed.StageExists(crop._currentStage + 1)) {
    crop._currentStage++;
    crop._socket.emit('response', "GrowPlant", [crop._plantedSeed.GetSymbol(crop._currentStage), crop._x, crop._y]);
    crop._growingTimeoutId = _time.SetTimeout(crop.GrowPlant, crop._plantedSeed.GetStageTimer(crop._currentStage), crop);
  }
};

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