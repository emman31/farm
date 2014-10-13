exports.NewTime = function(socket, time) {
  return new Time(socket, time);
};

function Time(socket, time) {
  this._socket = socket;
  this._time = time;
  this._currentPhase = 0;

  setTimeout(this.ChangeDayPhase, this._time.DayPhases[this._currentPhase].Duration * 1000, this);
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
  setTimeout(time.ChangeDayPhase, time._time.DayPhases[time._currentPhase].Duration * 1000, time);
};