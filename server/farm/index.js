var _logger = require("logger");
var _fs = require('fs');

var _gameFactory = require("./game/game.js");
var _itemFactory = require("./game/item/itemFactory.js");
var _time = require("./game/time.js");

var games = [];

/**
 * Initialise the server. This is executed only once when the server starts.
 * @param {type} socket
 */
exports.InitServer = function(socketIO) {
  _itemFactory.LoadAllItems();

  // Start server time.
  var time = JSON.parse(_fs.readFileSync("server/farm/configs/time", 'utf8'));
  this._time = _time.NewTime(socketIO, time);
};

/**
 * Create a new game.
 * @param {type} socket
 * @returns {type}
 */
exports.NewGame = function NewGame(socket) {
  this._game = _gameFactory.NewGame(socket, 20, 10);
  this._game.CreateInventory(socket);

  var seed = _itemFactory.GetSeed("seed_sample");
  this._game._inventory.AddItem(seed, 5);

  var fertilizer = _itemFactory.GetFertilizer("fertilizer_1");
  this._game._inventory.AddItem(fertilizer, 5);

  var watering_can = _itemFactory.GetTool("watering_can");
  this._game._inventory.AddItem(watering_can, 1);

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

exports.HarvestAll = function HarvestAll(socket) {
  this._game.HarvestAll();
};