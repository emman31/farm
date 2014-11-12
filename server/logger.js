exports.Log = function(message) {
  console.log(this._getTime() + ": " + message);
};

/**
 * Get a string representing the current time.
 * @returns {String}
 */
exports._getTime = function _getTime() {
  var date = new Date();

  var year = date.getFullYear(),
      month = this._twoDigits(date.getMonth() + 1),
      day = this._twoDigits(date.getDate()),
      hours = this._twoDigits(date.getHours()),
      minutes = this._twoDigits(date.getMinutes());

  var time = year + "-" + month + "-" + day + " " + date.getHours(hours) + ":" + minutes;
  return time;
};

/**
 * Pad the number so it's always 2 digits long.
 * @param {type} digit
 * @returns {String}
 */
exports._twoDigits = function _twoDigits(digit) {
  digit = digit.toString();
  switch(digit.length) {
    case 1:
      return "0" + digit;
    case 2:
      return digit;
    default:
      return "00";
  }
};