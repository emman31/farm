var fs = require('fs');
var _gameFactory = require("./game/game.js");
var _seedFactory = require("./game/seed.js");
var _fertilizerFactory = require("./game/fertilizer.js");
var games = [];

/**
 * Initialise the server. This is executed only once when the server starts.
 * @returns {undefined}
 */
exports.InitServer = function InitServer(socket) {
  // Loading all seeds from the seeds folder.
  var files = fs.readdirSync("server/farm/configs/seeds/");
  var seeds = new Array();
  for(var i = 0; i < files.length; i++) {
    seeds.push(JSON.parse(fs.readFileSync("server/farm/configs/seeds/" + files[i], 'utf8')));
  }
  _seedFactory.SetSeeds(seeds);
  console.log(seeds);

  // Loading all fertilizers from the fertilizers folder.
  var files = fs.readdirSync("server/farm/configs/fertilizers/");
  var fertilizers = new Array();
  for(var i = 0; i < files.length; i++) {
    fertilizers.push(JSON.parse(fs.readFileSync("server/farm/configs/fertilizers/" + files[i], 'utf8')));
  }
  _fertilizerFactory.SetFertilizers(fertilizers);
  console.log(fertilizers);
};

/**
 * Create a new game.
 */
exports.NewGame = function NewGame(socket) {
  // Loading time configs.
  var time = JSON.parse(fs.readFileSync("server/farm/configs/time", 'utf8'));
  this._game = _gameFactory.NewGame(socket, time, 20, 10);

  return {
    "field": this._game.GetField(),
    "seeds": _seedFactory.GetSeeds()
  };
};

/**
 * Create a new game.
 */
exports.NewGameConcept1 = function NewGameConcept1(socket) {
  // Loading time configs.
  var time = JSON.parse(fs.readFileSync("server/farm/configs/time", 'utf8'));
  this._game = _gameFactory.NewGame(socket, time, 1, 1);
  this._game.CreateInventory();
  this._game._inventory.AddItem("sample_seed", 5);

  return {
    "field": this._game.GetField(),
    "seeds": _seedFactory.GetSeeds()
  };
};

/**
 * Plant a seed in a crop.
 * @param {string} seedId The id of the seed to plant.
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
exports.Plant = function Plant(socket, seedId, x, y) {
  var seed = _seedFactory.GetSeed(seedId);
  this._game.Plant(seed, x, y);
  return {
    "field": this._game.GetField()
  };
};

exports.WaterCrop = function WaterCrop(socket, x, y) {
  this._game.WaterCrop(x, y);
};

exports.FertilizeCrop = function FertilizeCrop(socket, fertilizerId, x, y) {
  var fertilizer = _fertilizerFactory.GetFertilizer(fertilizerId);
  this._game.FertilizeCrop(fertilizer, x, y);
};