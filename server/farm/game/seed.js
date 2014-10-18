var _seeds = {};

/**
 * Initialize all existing seeds in the game.
 * @param {array} seeds
 */
exports.SetSeeds = function SetSeeds(seeds) {
  for (var i = 0; i < seeds.length; i++) {
    var seed = new Seed();
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

function Seed() {
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

Seed.prototype.GetName = function GetName() {
  return this._name;
};