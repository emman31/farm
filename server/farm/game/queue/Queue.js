var _logger = require("logger");
var Action = require("./Action.js");
var Time = require.main.require("./farm/game/Time.js");

function Queue(socket) {
  this._actionsQueue = [];
  this._socket = socket;
  this._running = false;
}

/**
 * Add an action to the end of the Queue.
 * @param {object} obj - The object on which the Callbacks ar executed.
 * @param {string} actionCallback - The action callback that will be executed to perform the action.
 * @param {*[]} args - The arguments to pass to the condition callback and to the action callback.
 * @param {string} [conditionCallback=null] - The condition callback that will be called before executing the action (If not specified, the action has no condition to be executed.)
 * @param {int} [timeout=null] - The number of seconds the action should wait before giving up. (Should be specified if conditionCallback is specified.)
 */
Queue.prototype.QueueAction = function QueueAction(obj, actionCallback, args, conditionCallback, timeout) {
  _logger.Log("Queueing action " + actionCallback + ".");
  var action = new Action(obj, actionCallback, args, conditionCallback, timeout);
  this._actionsQueue.push(action);
  if (!this._running) {
    this.ExecuteNextAction();
  }
};

/**
 * Execute the next action in the queue if it can be executed.
 */
Queue.prototype.ExecuteNextAction = function ExecuteNextAction() {
  if (this._actionsQueue.length > 0) {
    this._running = true;
    var action = this._actionsQueue.shift();
    var fallbackAction = new Action(this, "ExecuteNextAction");
    if (action.CanExecute(fallbackAction)) {
      action.Execute();
      this.ExecuteNextAction();
    }
    else {
      // The action can't be performed, we put it back at the beginning of the queue.
      this._actionsQueue.unshift(action);
    }
  }
  else {
    this._running = false;
  }
};

Queue.prototype.CancelNextAction = function CancelNextAction() {
  
};

Queue.prototype.GetQueueForClient = function GetQueueForClient() {
  var actions = [];
  for (var i = 0; i < this._actionsQueue.length; i ++) {
    actions.push(this._actionsQueue[i].GetActionForClient());
  }
  return actions;
};

module.exports = Queue;