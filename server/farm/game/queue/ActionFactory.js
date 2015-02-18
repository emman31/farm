var Action = require("./Action.js");

exports.GetWaterAction = function GetWaterAction(tool, x, y, field, inventory) {
  var conditionAction = new Action(this, "CanWaterAction", [inventory, tool]);
  var waterAction = new Action(this, "ExecuteWaterAction", [tool, x, y, field], conditionAction);
  return waterAction;
};

/**
 *
 * @param args
 * @param OnCanExecute
 * @returns {boolean}
 */
exports.CanWaterAction = function CanWaterAction(args, OnCanExecute) {
  return args[0].ContainsItem(args[1].GetId(), OnCanExecute);
};

exports.ExecuteWaterAction = function ExecuteWaterAction(args) {
  if (args[0].GetAction() === 'water') {
    args[3].WaterCrop(args[1], args[2]);
  }
};