var fs = require('fs');
var _gameFactory = require("./game/game.js");
var _seedFactory = require("./game/seed.js");
var games = [];

/**
 * Initialise the server. This is executed only once when the server starts.
 * @returns {undefined}
 */
exports.InitServer = function InitServer(socket) {
  var files = fs.readdirSync("server/farm/seeds/");

  // Here we load all seeds found in the 'seeds' folder.
  var seeds = new Array();
  for(var i = 0; i < files.length; i++) {
    seeds.push(JSON.parse(fs.readFileSync("server/farm/seeds/" + files[i], 'utf8')));
  }

  _seedFactory.SetSeeds(seeds);
  console.log(seeds);
};

/**
 * Create a new game.
 */
exports.NewGame = function NewGame(socket) {
  this._game = _gameFactory.NewGame(socket);
  return {
    "field": this._game.GetField(),
    "seeds": _seedFactory.GetSeeds()
  };
};

/**
 * Plant a seed in a crop.
 * @param {string} symbol The symbol representing the seed to plant.
 * @param {int} x the x coordinate of the crop in wich to plant.
 * @param {int} y the y coordinate of the crop in wich to plant.
 */
exports.Plant = function Plant(socket, symbol, x, y) {
  this._game.Plant(symbol, x, y);
  return {
    "field": this._game.GetField()
  };
};