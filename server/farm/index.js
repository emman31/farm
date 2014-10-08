var _gameFactory = require("./game/game.js");
var games = [];

exports.NewGame = function NewGame() {
  this._game = _gameFactory.NewGame();
  return this._game.GetField();
};