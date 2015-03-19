var _logger = require("logger");
var inherits = require('util').inherits;
var Action = require("./Action.js");

/**
 *
 * @param {object} obj - The object on which the Callbacks ar executed.
 * @param {callback} actionCallback - The action callback that will be executed to perform the action.
 * @param {Array} args - The arguments to pass to the condition callback and to the action callback.
 * @param {Action[]} [conditionActions=null] - The condition callback that will be called before executing the action (If not specified, the action has no condition to be executed.)
 * @param {int} [timeout=null] - The number of seconds the action should wait before giving up. (Should be specified if conditionCallback is specified.)
 */
function QueuedAction(obj, actionCallback, args, conditionActions, timeout) {
  Action.call(this, obj, actionCallback, args);
  this._conditionActions = conditionActions;
}
inherits(QueuedAction, Action);

/**
 * Execute the action if it's ready to be executed.
 * @param {Action} fallbackAction - The action to execute when the current one can be executed.
 * @returns {boolean} true if the action has been executed.
 */
QueuedAction.prototype.Execute = function Execute(fallbackAction) {
  var isReady = true;

  if (this._conditionActions && this._conditionActions.constructor === Array) {
    for (var i = 0; i < this._conditionActions.length; i ++) {
      isReady &= this._conditionActions[i].IsReady(fallbackAction);
    }
  }

  if (isReady) {
    return QueuedAction.super_.prototype.Execute.call(this);
  }

  return isReady;
};

QueuedAction.prototype.GetActionForClient = function GetActionForClient() {
  return {
    "Name": this._actionCallback
  };
};

module.exports = QueuedAction;