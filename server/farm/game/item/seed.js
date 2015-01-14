exports.NewSeed = function NewSeed() {
  return new Seed();
};

function Seed() {
  this._consumable = null;
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