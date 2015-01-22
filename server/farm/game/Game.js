var _logger = require("logger");

var Field = require("./Field.js");
var Inventory = require("./Inventory.js");
var _itemFactory = require("./item/ItemFactory.js");
var Queue = require("./queue/Queue.js");

function Game(socket, width, height) {
  this._socket = socket;
  this._field = new Field(this._socket, width, height);
  this._inventory = new Inventory(socket);
  this._queue = new Queue();
}

/**
 *
 * @returns {Field}
 */
Game.prototype.GetField = function GetField() {
  return this._field.GetField();
};

/**
 * Use the given item on the crop at given coordinates.
 * @param {int} item_id The item id.
 * @param {int} x
 * @param {int} y
 */
Game.prototype.UseOnCrop = function UseOnCrop(item_id, x, y) {
  if (this._inventory.ContainsItem(item_id)) {
    var item = this._inventory.GetItem(item_id);
    var mustRemoveItem = true;
    switch(item.GetType()) {
      case _itemFactory.TYPE_SEED:
        this._queue.QueueAction(Game, this, "CanPlant", "Plant", [item, x, y]);
        //mustRemoveItem = this._field.Plant(item, x, y);
        break;
      case _itemFactory.TYPE_FERTILIZER:
        mustRemoveItem = this._field.FertilizeCrop(item, x, y);
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

Game.prototype.CanPlant = function CanPlant(item, x, y) {

}

Game.prototype.Plant = function Plant(item, x, y) {
  this._field.Plant(item, x, y);
}

Game.prototype.HarvestCrop = function HarvestCrop(x, y) {
  if (this._field.IsFullyGrown(x, y)) {
    var production = this._field.GetProduction(x, y);
    var stacks = _itemFactory.GetStacksFromProduction(production);
    this._inventory.AddItemStacks(stacks);
    this._field.ClearCrop(x, y);
  }


};

module.exports = Game;