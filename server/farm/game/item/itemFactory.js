var Item = require('./item.js');
var _fs = require('fs');
var _logger = require("logger");

var classes = {
  'Seed': require("./seed.js"),
  'Consumable': require("./consumable.js"),
  'Fertilizer': require("./fertilizer.js"),
  'Tool': require("./tool.js")
};

var _seedsDefinitions = {};
var _consumablesDefinitions = {};
var _fertilizersDefinitions = {};
var _toolsDefinitions = {};

// These constants are the items type (which is also their class name.)
exports.TYPE_SEED = "Seed";
exports.TYPE_CONSUMABLE = "Consumable";
exports.TYPE_FERTILIZER = "Fertilizer";
exports.TYPE_TOOL = "Tool";

exports.LoadAllItems = function LoadAllItems() {
  _consumablesDefinitions = _loadItemType("consumables");
  _seedsDefinitions = _loadItemType("seeds");
  _fertilizersDefinitions = _loadItemType("fertilizers");
  _toolsDefinitions = _loadItemType("tools");
};

function _loadItemType(subFolder) {
  var dir = "server/farm/configs/items/" + subFolder + "/";

  var files = _fs.readdirSync(dir);
  var items = {};
  for(var i = 0; i < files.length; i++) {
    var item = JSON.parse(_fs.readFileSync(dir + files[i], 'utf8'));
    items[item.Id] = item;
  }
  _logger.Log("Imported " + subFolder, items);
  return items;
}

/**
 * Obtain a seed by it's item id.
 * @param {type} itemId
 * @returns {Seed} The seed that was found, or null if none exist with the given id.
 */
exports.GetSeed = function GetSeed(itemId) {
  var seed = _getItem(_seedsDefinitions, this.TYPE_SEED, itemId);

  // Add the consumable to the seed.
  if (_seedsDefinitions.hasOwnProperty(itemId)) {
    var consumable_id = _seedsDefinitions[itemId].ConsumableId;
    var consumable = this.GetConsumable(consumable_id);
    if (consumable !== null) {
      seed._consumable = consumable;
    }
    else {
      _logger.Log("The consumable '" + consumable_id + "' associated to seed '" + itemId + "' is not valid.");
      return null;
    }
  }
  else {
    return null;
  }

  return seed;
};

/**
 * Obtain a consumable by it's item id.
 * @param {string} itemId
 * @returns {Consumable} The consumable that was found, or null if none exist with the given id.
 */
exports.GetConsumable = function GetConsumable(itemId) {
  return _getItem(_consumablesDefinitions, this.TYPE_CONSUMABLE, itemId);
};

/**
 * Obtain a fertilizer by it's item id.
 * @param {string} itemId The item id
 * @returns {Fertilizer} The fertilizer that was found, or null if none exist with the given id.
 */
exports.GetFertilizer = function GetFertilizer(itemId) {
  return _getItem(_fertilizersDefinitions, this.TYPE_FERTILIZER, itemId);
};

/**
 * Obtain a tool by it's item id.
 * @param {string} itemId The item id
 * @returns {Tool} The tool that was found, or null if none exist with the given id.
 */
exports.GetTool = function GetTool(itemId) {
  return _getItem(_toolsDefinitions, this.TYPE_TOOL, itemId);
};

/**
 * Obtain an item by it's id.
 * @param {Object} definitions The definition list of the item.
 * @param {string} className The class name to instantiate the item.
 * @param {string} itemId The id of the item.
 * @returns {Item}
 */
function _getItem(definitions, className, itemId) {
  if (definitions.hasOwnProperty(itemId)) {
    //var itemBase = new Item(itemId, className, definitions[itemId]);

    var item = new classes[className]();
    Item.call(item, definitions[itemId]);
    item._definition = definitions[itemId];

    return item;
  }
  else {
    _logger.Log("Item with id '" + itemId + "' is not a " + className + ".");
  }
  return null;
};