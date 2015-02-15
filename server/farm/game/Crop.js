var _logger = require('logger');
var _time = require("./Time.js");

function Crop(socket, x, y) {
  this._x = x;
  this._y = y;
  this._socket = socket;
  this._onCanPlant = null;
  this._resetCrop();
}

Crop.prototype._resetCrop = function _resetCrop() {
  this._clearTimeouts();
  this._watered = false;
  this._plantedSeed = null;
  this._fertilizer = null;
  this._growingTimeoutId = null;
  this._waterTimeoutId = null;
  this._deathTimeoutId = null;

  if (this._onCanPlant !== null) {
    this._onCanPlant.Execute();
  }
};

Crop.prototype._clearTimeouts = function _clearTimeouts() {
  _time.ClearTimeout(this._growingTimeoutId);
  _time.ClearTimeout(this._waterTimeoutId);
  _time.ClearTimeout(this._deathTimeoutId);
};

/**
 * Is it possible to plant a seed?
 * @param {Action} [onCanPlant=null] - The action to execute when it'll be possible to plant on the crop.
 * @returns {Boolean}
 */
Crop.prototype.CanPlant = function CanPlant(onCanPlant) {
  if (onCanPlant !== null) {
    this._onCanPlant = onCanPlant;
  }
  return this._plantedSeed === null;
};

Crop.prototype.PlantSeed = function(seed) {
  this._plantedSeed = seed;
  this._currentStage = 0;
  this._growingTimeoutId = _time.SetTimeout(this.GrowPlant, seed.GetStageTimer(this._currentStage), this);
  this._deathTimeoutId = _time.SetTimeout(this.Die, this._plantedSeed.GetDeathTimer(), this);

  this._socket.emit('response', "Plant", [this._plantedSeed.GetSeedForClient(), this._x, this._y]);
  _logger.Log("Planted seed " + seed.GetId());
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

/**
 * Fertilize a crop.
 * @param {Fertilizer} fertilizer
 * @return {boolean} Fertilization succeeded?
 */
Crop.prototype.Fertilize = function Fertilize(fertilizer) {
  if (this._fertilizer === null) {
    this._fertilizer = fertilizer;
    this._socket.emit('response', "Fertilized", [this._x, this._y]);
    return true;
  }
  else {
    return false;
  }
};

Crop.prototype.Dry = function Dry(crop) {
  crop._watered = false;
  crop._waterTimeoutId = null;
  crop._deathTimeoutId = _time.SetTimeout(crop.Die, crop._plantedSeed.GetDeathTimer(), crop);
  crop._socket.emit('response', "Dried", [crop._plantedSeed.GetDeathTimer(), crop._x, crop._y]);
};

Crop.prototype.Die = function Die(crop) {
  if (crop._watered === false) {
    crop._clearTimeouts();
    crop._dead = true;
    crop._deathTimeoutId = null;
    crop._socket.emit('response', "Died", [crop._x, crop._y]);
  }
};

Crop.prototype.GrowPlant = function GrowPlant(crop) {
  crop._growingTimeoutId = null;
  if (!crop._dead && crop._plantedSeed.StageExists(crop._currentStage + 1)) {
    crop._currentStage++;
    crop._socket.emit('response', "GrowPlant", [crop._plantedSeed.GetSymbol(crop._currentStage), crop._x, crop._y]);
    crop._fullyGrown = crop._plantedSeed.IsLastStage(crop._currentStage);

    var message = "Fully grown";
    if (!crop._fullyGrown) {
      var timer = crop._plantedSeed.GetStageTimer(crop._currentStage);
      crop._growingTimeoutId = _time.SetTimeout(crop.GrowPlant, timer, crop);
      message = "Next in " + timer;
    }

    _logger.Log("Growing: [" + crop._x + "," + crop._y + "] Stage:" + crop._currentStage + " " + message + ".");
  }
};

/**
 *
 * @returns {boolean}
 */
Crop.prototype.IsFullyGrown = function IsFullyGrown() {
  return this._plantedSeed !== null && this._plantedSeed.IsLastStage(this._currentStage);
};

/**
 * @return {Object}
 */
Crop.prototype.GetProduction = function GetProduction() {
  return this._plantedSeed.GetProduction();
};

/**
 * The crop has been harvested, clear it.
 */
Crop.prototype.ClearCrop = function Harvested() {
  this._resetCrop();
  this._socket.emit('response', "RefreshCrop", [this._x, this._y, this.GetSymbol()]);
};

/**
 * Get the symbol that represents whats is currently on the crop.
 * This is to send to client. Don't add unnecessary info.
 * @returns {string}
 */
Crop.prototype.GetSymbol = function GetSymbol() {
  if (this._plantedSeed === null) {
    return ' ';
  }

  return this._plantedSeed.GetSymbol(this._currentStage);
};

module.exports = Crop;