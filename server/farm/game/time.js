exports.NewTime = function(socket, time) {
  return new Time(socket, time);
};

function Time(socket, time) {
  this._socket = socket;
  this._time = time;
  this._currentPhase = -1;
  this.ChangeDayPhase(this);
}

/**
 * Proceed to the next day phase.
 * This function should be treated as static.
 * @param {type} time
 * @returns {undefined}
 */
Time.prototype.ChangeDayPhase = function ChangeDayPhase(time) {
  time._currentPhase ++;
  if (time._currentPhase >= time._time.DayPhases.length) {
    time._currentPhase = 0;
  }

  time._socket.emit('response', "ChangeDayPhase", [time._time.DayPhases[time._currentPhase].Name, time._time.DayPhases[time._currentPhase].Duration]);
  exports.SetTimeout(time.ChangeDayPhase, time._time.DayPhases[time._currentPhase].Duration, time);
};

/**
 * Custom function for setTimeout.
 * use this function for timeout to prevent the server from crashing.
 * @param {type} functionToExecute The function to execute when the time comes.
 * @param {type} seconds The umber of seconds before executinf the function.
 * @param {type} args all args to pass to the function.
 * @returns {undefined}
 */
exports.SetTimeout = function SetTimeout(functionToExecute, seconds, args) {
  setTimeout(
    function setTimeout(functionToExecute, args) {
      try{
        functionToExecute(args);
      }
      catch(e) {
        console.log(e.stack);
      }
    },
    seconds * 1000,
    functionToExecute, args
  );
};