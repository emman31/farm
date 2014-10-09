var _seeds = {};

/**
 * Initialize all existing seeds in the game.
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

/**
 * Obtain a seed by it's symbol.
 * @param {type} symbol
 * @returns {seed} The seed that was found, or null if none exist with the given symbol.
 */
exports.GetSeed = function GetSeed(symbol) {
  if (_seeds.hasOwnProperty(symbol)) {
    return _seeds[symbol];
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

Seed.prototype.GetSymbol = function GetSymbol() {
  return this._symbol;
};

Seed.prototype.GetName = function GetName() {
  return this._name;
};