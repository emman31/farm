var _logger = require('logger');

function Time(socketIO, timeConfiguration) {
  this._socketIO = socketIO;
  this._timeConfiguration = timeConfiguration;
  this._day = 1;
  this._currentPhase = -1;
  this.ChangeDayPhase(this);
}

/**
 * Proceed to the next day phase.
 * This function should be treated as static.
 * @param {Time} time
 */
Time.prototype.ChangeDayPhase = function ChangeDayPhase(time) {
  time._currentPhase ++;
  if (time._currentPhase >= time._timeConfiguration.DayPhases.length) {
    time._currentPhase = 0;
    time._day ++;
  }

  // emit to all clients.
  time._socketIO.sockets.emit('response', "RefreshTime",
    [
      time._day,
      time._timeConfiguration.DayPhases[time._currentPhase].Name,
      time._timeConfiguration.DayPhases[time._currentPhase].Duration
    ]
  );
  Time.SetTimeout(time.ChangeDayPhase, time._timeConfiguration.DayPhases[time._currentPhase].Duration, time);
};

/**
 * Emit the current time to a client.
 * @param {Socket} socket
 */
Time.prototype.EmitTime = function EmitTime(socket) {
  socket.emit('response', "RefreshTime",
    [
      this._day,
      this._timeConfiguration.DayPhases[this._currentPhase].Name,
      this._timeConfiguration.DayPhases[this._currentPhase].Duration
    ]
  );
}

/**
 * Custom function for setTimeout.
 * Use this function for timeout to prevent the server from crashing.
 * @param {Function} functionToExecute The function to execute when the time comes.
 * @param {int} seconds The umber of seconds before executing the function.
 * @param {*} args All args to pass to the function.
 * @returns {int} The timeout id.
 */
Time.SetTimeout = function SetTimeout(functionToExecute, seconds, args) {
  return setTimeout(
    function setTimeout(functionToExecute, args) {
      try{
        functionToExecute(args);
      }
      catch(e) {
        _logger.Log(e.stack);
      }
    },
    seconds * 1000,
    functionToExecute, args
  );
};

/**
 * Prevent a timeout from triggering.
 * @param {int} timeoutId The timeout Id as returned from SetTimeout.
 */
Time.ClearTimeout = function ClearTimeout(timeoutId) {
  try{
    clearTimeout(timeoutId);
  }
  catch(e) {
    _logger.Log(e.stack);
  }
};

module.exports = Time;