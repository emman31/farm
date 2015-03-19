var _logger = require("logger");

function Action(obj, actionCallback, args) {
  this._obj = obj;
  this._actionCallback = actionCallback;
  this._args = args;
}

Action.prototype.Execute = function Execute() {
  _logger.Log("Executing action " + this._actionCallback + ".");
  // Since we can't use 'call' or 'apply', there is no way to send the args as a list of parameters. The callback
  // function must receive one argument that is a list of the parameters.
  this._obj[this._actionCallback](this._args);
};

module.exports = Action;