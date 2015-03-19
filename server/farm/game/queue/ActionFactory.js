var QueuedAction = require("./QueuedAction.js");
var ConditionAction = require("./QueuedAction.js");

exports.GetPlantAction = function GetPlantAction(seed, x, y, field, inventory) {
  var canPlant = new ConditionAction(this, "CanPlant", [seed, x, y, field]);
  var inventoryContains = new ConditionAction(this, "InventoryContains", [inventory, seed]);
  var plantAction = new QueuedAction(this, "ExecutePlantAction", [seed, x, y, field], [canPlant, inventoryContains]);
  return plantAction;
};

exports.CanPlant = function CanWaterAction(args, OnCanExecute) {
  var canPlant = args[4].CanPlant(args[1], args[2], args[3], OnCanExecute);
  return canPlant;
};

exports.ExecuteWaterAction = function ExecuteWaterAction(args) {
  if (args[0].GetAction() === 'water') {
    args[3].WaterCrop(args[1], args[2]);
  }
};

exports.GetWaterAction = function GetWaterAction(tool, x, y, field, inventory) {
  var conditionAction = new ConditionAction(this, "CanWaterAction", [inventory, tool]);
  var waterAction = new QueuedAction(this, "ExecuteWaterAction", [tool, x, y, field], [conditionAction]);
  return waterAction;
};

/**
 *
 * @param args
 * @param OnCanExecute
 * @returns {boolean}
 */


exports.ExecuteWaterAction = function ExecuteWaterAction(args) {
  if (args[0].GetAction() === 'water') {
    args[3].WaterCrop(args[1], args[2]);
  }
};

exports.Inventorycontains = function InventoryContains(args, OnInventoryContains) {
  return args[0].ContainsItem(args[1].GetId(), OnInventoryContains);
};