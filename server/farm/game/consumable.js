var _consumables = {};

/**
 * Initialize all existing consumables in the game.
 * @param {array} consumables
 */
exports.SetConsumables = function SetConsumables(consumables) {
  for (var i = 0; i < consumables.length; i++) {
    var consumable = new Consumable();
    consumable._definition = consumables[i];
    _consumables[consumables[i].Id] = consumable;
  }
};

/**
 * Obtain a consumable by it's id.
 * @param {type} itemId
 * @returns {consumable} The consumable that was found, or null if none exist with the given id.
 */
exports.GetConsumable = function GetConsumable(itemId) {
  if (_consumables.hasOwnProperty(itemId)) {
    return _consumables[itemId];
  }
  return null;
};

function Consumable(){};

/**
 * Item
 */

Consumable.prototype.GetItemId = function GetItemId() {
  return this._definition.Id;
};

Consumable.prototype.GetItemName = function GetItemName() {
  return this._definition.Name;
};