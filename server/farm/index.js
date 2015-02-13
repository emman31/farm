var _logger = require("logger");
var _fs = require('fs');

var Game = require("./game/Game.js");
var ItemFactory = require("./game/item/ItemFactory.js");
var ItemStack = require("./game/item/ItemStack.js");
var Time = require("./game/Time.js");

var games = [];

/**
 * Initialise the server. This is executed only once when the server starts.
 * @param {type} socket
 */
exports.InitServer = function(socketIO) {
  ItemFactory.LoadAllItems();

  // Start server time.
  var timeConfigs = JSON.parse(_fs.readFileSync("server/farm/configs/time.json", 'utf8'));
  this._time = new Time(socketIO, timeConfigs);
};

/**
 * Create a new game.
 * @param {type} socket
 * @returns {field: Field}
 */
exports.NewGame = function NewGame(socket) {
  this._game = new Game(socket, 20, 10);

  var startInventory = [
    new ItemStack(ItemFactory.GetItem("seed_sample"), 5),
    new ItemStack(ItemFactory.GetItem("fertilizer_1"), 5),
    new ItemStack(ItemFactory.GetItem("watering_can"), 1)
  ];

  this._game._inventory.AddItemStacks(startInventory);

  this._time.EmitTime(socket);

  return {
    "field": this._game.GetField()
  };
};

/**
 * Use the given item on the crop at given coordinates.
 * @param {type} socket
 * @param {type} item_id The item id.
 * @param {type} x
 * @param {type} y
 * @returns {undefined}
 */
exports.UseOnCrop = function UseOnCrop(socket, item_id, x, y) {
  this._game.UseOnCrop(item_id, x, y);
};

exports.WaterAll = function WaterAll(socket) {
  this._game.WaterAll();
};

exports.HarvestCrop = function HarvestCrop(socket, x, y) {
  this._game.HarvestCrop(x, y);
};

exports.HarvestAll = function HarvestAll(socket) {
  this._game.HarvestAll();
};