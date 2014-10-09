var fs = require('fs');
var _gameFactory = require("./game/game.js");
var _seedFactory = require("./game/seed.js");
var games = [];

exports.InitServer = function InitServer() {
  var files = fs.readdirSync("server/farm/seeds/");

  var seeds = new Array();
  for(var i = 0; i < files.length; i++) {
    seeds.push(JSON.parse(fs.readFileSync("server/farm/seeds/" + files[i], 'utf8')));
  }

  _seedFactory.SetSeeds(seeds);
  console.log(seeds);
};

exports.NewGame = function NewGame() {
  this._game = _gameFactory.NewGame();
  return {
    "field": this._game.GetField(),
    "seeds": _seedFactory.GetSeeds()
  };
};

exports.Plant = function Plant(symbol, x, y) {
  this._game.Plant(symbol, x, y);
  return {
    "field": this._game.GetField()
  };
};