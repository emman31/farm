var _seeds = {};

/**
 * Initialize all existing seeds in the game.
 * @param {type} seeds
 * @param {type} consumables The consumables Factory
 */
exports.SetSeeds = function SetSeeds(seeds, consumables) {
  for (var i = 0; i < seeds.length; i++) {
    var consumable = consumables.GetConsumable(seeds[i].ConsumableId);
    var seed = new Seed(consumable);
    seed._definition = seeds[i];
    _seeds[seeds[i].Id] = seed;
  }
};

/**
 * Obtain a seed by it's id.
 * @param {type} seedId
 * @returns {seed} The seed that was found, or null if none exist with the given id.
 */
exports.GetSeed = function GetSeed(seedId) {
  if (_seeds.hasOwnProperty(seedId)) {
    return _seeds[seedId];
  }

  return null;
};

/**
 * Get all the seeds to show on screen.
 * This is to send to client. Don't add unnecessary info.
 */
exports.GetSeeds = function GetSeeds() {
  var seeds = new Array();
  for (var i = 0; i < _seeds.length; i++) {
    seeds.push({
      'symbol': _seeds[i]._symbol,
      'name': _seeds[i]._name
    });
  }

  return seeds;
};

function Seed(consumable) {
  this._consumable = consumable;
};

/**
 * Get the time in seconds until the next stage.
 * @param {int} stageNb
 * @returns {int} Time in seconds
 */
Seed.prototype.GetStageTimer = function GetStageTimer(stageNb) {
  if(this._definition.Stages[stageNb].hasOwnProperty("Time")) {
    return this._definition.Stages[stageNb].Time;
  }
  else {
    return null;
  }
};

/**
 * Get the total number of seconds until the seed is fully grown.
 * @returns {Number}
 */
Seed.prototype.GetFullGrownTimer = function GetFullGrownTimer() {
  var totalSeconds = 0;
  for (var i = 0; i < this._definition.Stages.length; i++) {
    var seconds = this.GetStageTimer(i);
    if (i !== null) {
      totalSeconds += seconds;
    }
  }

  return totalSeconds;
};

Seed.prototype.GetSymbol = function GetSymbol(stageNb) {
  return this._definition.Stages[stageNb].Symbol;
};

Seed.prototype.GetWateringDuration = function GetWateringDuration() {
  return this._definition.WateringDuration;
};

Seed.prototype.GetDeathTimer = function GetDeathTimer() {
  return this._definition.DeathTimer;
};

Seed.prototype.StageExists = function StageExist(stageNb) {
  return stageNb < this._definition.Stages.length;
};

Seed.prototype.IsLastStage = function IsLastStage(stageNb) {
  return stageNb >= (this._definition.Stages.length - 1);
};

Seed.prototype.GetName = function GetName() {
  return this._name;
};

Seed.prototype.GetConsumable = function GetConsumable() {
  return this._consumable;
};

Seed.prototype.GetSeedForClient = function GetSeedForClient() {
  return {
    "Name": this._definition.Name,
    "DeathTimer": this._definition.DeathTimer,
    "Stages": this._definition.Stages,
    "FullGrownTimer": this.GetFullGrownTimer()
  };
};

/**
 * Item
 */

Seed.prototype.GetItemId = function GetItemId() {
  return this._definition.Id;
};

Seed.prototype.GetItemName = function GetItemName() {
  return this._definition.Name;
};