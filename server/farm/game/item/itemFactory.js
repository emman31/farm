var Item = require('./item.js');
var ItemStack = require('./itemStack.js');
var _fs = require('fs');
var _logger = require("logger");

var classes = {
  'Seed': require("./seed.js"),
  'Consumable': require("./consumable.js"),
  'Fertilizer': require("./fertilizer.js"),
  'Tool': require("./tool.js")
};

var _itemDefinitions = {};

// These constants are the items type (which is also their class name.)
exports.TYPE_SEED = "Seed";
exports.TYPE_CONSUMABLE = "Consumable";
exports.TYPE_FERTILIZER = "Fertilizer";
exports.TYPE_TOOL = "Tool";

exports.LoadAllItems = function LoadAllItems() {
  _loadItemType("consumables");
  _loadItemType("seeds");
  _loadItemType("fertilizers");
  _loadItemType("tools");
};

function _loadItemType(subFolder) {
  var dir = "server/farm/configs/items/" + subFolder + "/";

  var files = _fs.readdirSync(dir);
  for(var i = 0; i < files.length; i++) {
    var item = JSON.parse(_fs.readFileSync(dir + files[i], 'utf8'));
    _itemDefinitions[item.Id] = item;
  }
  _logger.Log("Imported " + subFolder);
}

/**
 * Obtain an item by it's id.
 * @param {string} itemId The id of the item.
 * @returns {Item}
 */
exports.GetItem = function GetItem(itemId) {
  if (_itemDefinitions.hasOwnProperty(itemId)) {
    var className = _itemDefinitions[itemId].Type;

    var item = new classes[className]();
    Item.call(item, _itemDefinitions[itemId]);
    item._definition = _itemDefinitions[itemId];

    return item;
  }
  else {
    _logger.Log("Item with id '" + itemId + "' does not exists.");
  }
  return null;
}

/**
 * Get ItemStacks produced from a production.
 * @param {Object[]} production
 */
exports.GetStacksFromProduction = function GetStacksFromProduction(production) {
  var stacks = [];
  production.forEach(function(current) {
    if (current.hasOwnProperty("Id")) {
      var item = exports.GetItem(current.Id);
      var number = 1;
      if (current.hasOwnProperty("Min") && current.hasOwnProperty("Min")) {
        number = Math.floor(Math.random() * (current.Max - current.Min + 1)) + current.Min;
      }
      stacks.push(new ItemStack(item, number));
    }
  });
  return stacks;
};