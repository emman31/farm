var _logger = require("logger");

var Field = require("./field.js");
var Inventory = require("./inventory.js");
var _itemFactory = require("./item/itemFactory.js");

function Game(socket, width, height) {
  this._socket = socket;
  this._field = new Field(this._socket, width, height);
  this._inventory = new Inventory(socket);
}

/**
 *
 * @returns {GetField@pro;_field@call;GetField}
 */
Game.prototype.GetField = function GetField() {
  return this._field.GetField();
};

/**
 * Use the given item on the crop at given coordinates.
 * @param {type} item_id The item id.
 * @param {type} x
 * @param {type} y
 * @returns {undefined}
 */
Game.prototype.UseOnCrop = function UseOnCrop(item_id, x, y) {
  if (this._inventory.ContainsItem(item_id)) {
    var item = this._inventory.GetItem(item_id);
    var mustRemoveItem = true;
    switch(item.GetType()) {
      case _itemFactory.TYPE_SEED:
        this._field.Plant(item, x, y);
        break;
      case _itemFactory.TYPE_FERTILIZER:
        this._field.FertilizeCrop(item, x, y);
        break;
      case _itemFactory.TYPE_TOOL:
        if (item.GetAction() === 'water') {
          this._field.WaterCrop(x, y);
        }
        mustRemoveItem = false;
        break;
      default:
        _logger.Log("Item of type '" + item.GetType() + "' cannot be used on crops");
        mustRemoveItem = false;
        break;
    }
    if (mustRemoveItem) {
      this._inventory.RemoveItem(item);
    }
  }
  else {
    _logger.Log("The inventory does not contain item '" + item_id + "'.");
  }
};

/**
 * Plant a seed in a free crop.
 * @param {seed} seed The seed.
 */
Game.prototype.PlantAnywhere = function PlantAnywhere(seed) {
  if (this._inventory.ContainsItem(seed)) {
    var planted = this._field.PlantAnywhere(seed);
    if (planted) {
      this._inventory.RemoveItem(seed);
    }
  }
};

Game.prototype.HarvestAll = function HarvestAll() {
  var items = this._field.HarvestAll();
  this._inventory.AddItems(items);
};

module.exports = Game;