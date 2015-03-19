var Action = require("./Action.js");
var inherits = require('util').inherits;

function ConditionAction(obj, actionCallback, args) {
  this._onReadyRegistered = false;
  Action.call(this, obj, actionCallback, args);
}

inherits(ConditionAction, Action);
//ConditionAction.prototype = new Action();

ConditionAction.prototype.IsReady = function IsReady(onIsReady) {
  // We don't want to register 'onIsReady' twice.
  if (!this._onReadyRegistered) {
    this._args.push(onIsReady);
  }

  var ready = ConditionAction.super_.prototype.Execute.call(this);

  // The object on which the action is executed will registered only if the condition is not met.
  if (!ready) {
    this._onReadyRegistered = true;
  }

  return ready;
};

module.exports = ConditionAction;