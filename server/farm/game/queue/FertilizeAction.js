var Action = require("./Action.js");

/**
 *
 * @param {Fertilizer} fertilizer - The tool used to water the crop.
 * @param {int} x
 * @param {int} y
 * @param {Field} field
 * @param {Inventory} inventory
 * @constructor
 */
function FertilizeAction(fertilizer, x, y, field, inventory) {
  this._fertilizer = fertilizer;
  this._x = x;
  this._y = y;
  this._field = field;
  this._inventory = inventory;
}
FertilizeAction.prototype = new Action();

/**
 * Check if the current action is ready to be executed.
 * @param {Action} OnCanExecute - The action to execute when the current one will be ready, if it's not ready now.
 * @return {boolean}
 */
FertilizeAction.prototype.CanExecute = function CanExecute(OnCanExecute) {
  return this._inventory.ContainsItem(this._fertilizer.GetId(), OnCanExecute);
};

/**
 * Execute the current action which is to fertilize a crop on the field.
 */
FertilizeAction.prototype.Execute = function Execute() {
  this._field.FertilizeCrop(this._fertilizer, this._x, this._y);
  this._inventory.RemoveItem(this._fertilizer);
};

module.exports = FertilizeAction;