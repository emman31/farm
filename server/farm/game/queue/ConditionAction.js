var Action = require("./Action.js");
//var inherits = require('util').inherits;

function ConditionAction(obj, actionCallback, args) {
  this._ready = false;
  Action.call(this, obj, actionCallback, args);
}

//inherits(ConditionAction, Action);
ConditionAction.prototype = new Action();

ConditionAction.prototype.Execute = function Execute(OnIsReady) {
  this._ready = ConditionAction.super_.prototype.Execute.call(this);
};

module.exports = ConditionAction;