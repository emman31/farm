var _logger = require("logger");

var Field = require("./Field.js");
var Inventory = require("./Inventory.js");
var _itemFactory = require("./item/ItemFactory.js");
var Queue = require("./queue/Queue.js");

function Game(socket, width, height) {
  this._socket = socket;
  this._field = new Field(this._socket, width, height);
  this._inventory = new Inventory(socket);
  this._queue = new Queue(socket);
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
        this._queue.QueueAction(this, "Plant", [item, x, y], "CanPlant");
        mustRemoveItem = false;
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

Game.prototype.HarvestCrop = function HarvestCrop(x, y) {
  if (this._field.IsFullyGrown(x, y)) {
    var production = this._field.GetProduction(x, y);
    var stacks = _itemFactory.GetStacksFromProduction(production);
    this._inventory.AddItemStacks(stacks);
    this._field.ClearCrop(x, y);
  }
};

/* Functions called by that action queue.
 * These all receives 'args' as first parameter because I can't figure out how to do it better :(
 * Seed Object Action for more info.
 */

/**
 * Check if it's possible to plant a seed on a certain crop.
 * @param {*[]} args - [seed, x, y]
 * @param {Action} callbackAction - If it's currently impossible to plant a seed, call that action when it is.
 * @returns {Boolean} - true if it's possible to plant a seed.
 */
Game.prototype.CanPlant = function CanPlant(args, callbackAction) {
  return this._field.CanPlant(args[0], args[1], args[2], callbackAction);
};

Game.prototype.Plant = function Plant(args) {
  if (this._field.Plant(args[0], args[1], args[2])) {
    this._inventory.RemoveItem(args[0]);
  }
};

module.exports = Game;