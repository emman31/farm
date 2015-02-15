var Action = require("./Action.js");

/**
 *
 * @param {Tool} item - The tool used to water the crop.
 * @param {int} x
 * @param {int} y
 * @param {Field} field
 * @param {Inventory} inventory
 * @constructor
 */
function WaterAction(tool, x, y, field, inventory) {
  this._tool = tool;
  this._x = x;
  this._y = y;
  this._field = field;
  this._inventory = inventory;
}
WaterAction.prototype = new Action();

/**
 * Check if the current action is ready to be executed.
 * @param {Action} OnCanExecute - The action to execute when the current one will be ready, if it's not ready now.
 */
WaterAction.prototype.CanExecute = function CanExecute(OnCanExecute) {
  return this._inventory.ContainsItem(this._tool.GetId(), OnCanExecute);
};

/**
 * Execute the current action which is to water a crop on the field.
 */
WaterAction.prototype.Execute = function Execute() {
  if (this._tool.GetAction() === 'water') {
    this._field.WaterCrop(this._x, this._y);
  }
};

module.exports = WaterAction;