var _seeds = {};

/**
 * Initialise all existing seeds in the game.
 * @param {array} seeds
 */
exports.SetSeeds = function SetSeeds(seeds) {
  for (var i = 0; i < seeds.length; i++) {
    var seed = new Seed();

    seed._symbol = seeds[i].symbol;
    seed._name = seeds[i].name;

    _seeds[seeds[i].symbol] = seed;
  }
};

exports.GetSeed = function GetSeed(symbol) {
  if (_seeds.hasOwnProperty(symbol)) {
    return _seeds[symbol];
  }

  return null;
};

/**
 * Get all the seeds to show on screen
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

Seed.prototype.GetSymbol = function GetSymbol() {
  return this._symbol;
};

Seed.prototype.GetName = function GetName() {
  return this._name;
};