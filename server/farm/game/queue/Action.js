
/**
 *
 * @param {object} obj - The object on which the Callbacks ar executed.
 * @param {callback} actionCallback - The action callback that will be executed to perform the action.
 * @param {array} args - The arguments to pass to the condition callback and to the action callback.
 * @param {callback} [conditionCallback=null] - The condition callback that will be called before executing the action (If not specified, the action has no condition to be executed.)
 * @param {int} [timeout=null] - The number of seconds the action should wait before giving up. (Should be specified if conditionCAllback is specified.)
 */
function QueueAction(obj, actionCallback, args, conditionCallback, timeout) {
  this._obj = obj;
  this._conditionCallback = conditionCallback;
  this._actionCallback = actionCallback;
  this._args = args;

};

/**
 * Check if the action can be performed.
 * @param {Action} fallbackAction - If the action can't be performed, the fallback action will be executed when the conditions are met.
 * @returns {boolean} true if the action can be performed.
 */
QueueAction.prototype.CanExecute = function CanExecute(fallbackAction) {
  if (!this._conditionCallback) {
    return true;
  }
  else {
    return this._obj[this._conditionCallback](this._args, fallbackAction);
  }
};

Action.prototype.Execute = function Execute() {
  this._obj[this._actionCallback](this._args);
};

module.exports = QueueAction;