var Action = require("./Action.js");

/**
 *
 * @param {Seed} seed
 * @param {int} x
 * @param {int} y
 * @param {Field} field
 * @param {Inventory} inventory
 * @constructor
 */
function PlantAction(seed, x, y, field, inventory) {
  this._seed = seed;
  this._x = x;
  this._y = y;
  this._field = field;
  this._inventory = inventory;
}
PlantAction.prototype = new Action();

/**
 * Check if the current action is ready to be executed.
 * @param {Action} OnCanExecute - The action to execute when the current one will be ready,if it's not ready now.
 */
PlantAction.prototype.CanExecute = function CanExecute(OnCanExecute) {
  var canPlant = this._field.CanPlant(this._seed, this._x, this._y, OnCanExecute);
  var hasItem = this._inventory.ContainsItem(this._seed.GetId());

  return canPlant && hasItem;
};

/**
 * Execute the current action which is to plant a seed on the field.
 * It also remove the seed from inventory.
 */
PlantAction.prototype.Execute = function Execute() {
  this._field.Plant(this._seed, this._x, this._y);
  this._inventory.RemoveItem(this._seed);
};

module.exports = PlantAction;