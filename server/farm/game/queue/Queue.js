var Action = require("./Action.js");
var Time = require.main.require("./farm/game/Time.js");

function Queue() {
  this._actionsQueue = [];

};

/**
 * Add an action to the end of the Queue.
 * @param {object} obj - The object on which the Callbacks ar executed.
 * @param {callback} actionCallback - The action callback that will be executed to perform the action.
 * @param {array} args - The arguments to pass to the condition callback and to the action callback.
 * @param {callback} [conditionCallback=null] - The condition callback that will be called before executing the action (If not specified, the action has no condition to be executed.)
 * @param {int} [timeout=null] - The number of seconds the action should wait before giving up. (Should be specified if conditionCAllback is specified.)
 */
Queue.prototype.QueueAction = function QueueAction(obj, actionCallback, args, conditionCallback, timeout) {
  var action = new Action(type, obj, actionCallback, args, conditionCallback, timeout);
  this._actionsQueue.push(action);
}

Queue.prototype.ExecuteNextAction = function ExecuteNextAction() {
  if (this._actionsQueue.count() > 0) {
    var action = this._actionsQueue.shift();
    var fallbackAction = new Action(this, "ExecuteNextAction");
    var cancelAction = new Action(this, "CancelNextAction");
    if (action.CanExecute(fallbackAction)) {

    }

  }
}

Queue.prototype.CancelNextAction = function CancelNextAction() {
  
};

module.exports = Queue;