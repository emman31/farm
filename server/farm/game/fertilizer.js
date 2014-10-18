var _fetilizers = {};

/**
 * Initialize all existing fertilizers in the game.
 * @param {array} fetilizers
 */
exports.SetFertilizers = function SetFertilizers(fetilizers) {
  for (var i = 0; i < fetilizers.length; i++) {
    var fetilizer = new Fertilizer();
    fetilizer._definition = fetilizers[i];
    _fetilizers[fetilizers[i].Id] = fetilizer;
  }
};

/**
 * Obtain a fertilizer by it's symbol.
 * @param {type} id
 * @returns {seed} The fertilizer that was found, or null if none exist with the given id.
 */
exports.GetFertilizer = function GetSeed(id) {
  if (_fetilizers.hasOwnProperty(id)) {
    return _fetilizers[id];
  }

  return null;
};

function Fertilizer() {
};