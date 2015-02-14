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
 * @param {Action} action - The action to queue
 */
Queue.prototype.QueueAction = function QueueAction(action) {
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