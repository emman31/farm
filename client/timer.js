function SetStatus(element, status, seconds) {
  var status_element = $(element).find('.status');
  if (status_element.length === 0) {
    $(element).append("<span class='status working'><span class='inner'></span></span>");
    status_element = $(element).find('.status');
  }

  status_element.attr('max', seconds);
  status_element.attr('current', seconds);
  status_element.addClass('working');
  status_element.find('.inner').text(status);
  status_element.find('.inner').width("100%");
}

function CreateTimer(element, seconds) {
  $(element).append("<span class='timer working'>" + seconds + "</span>");
}

function InitializeTimers() {
  setInterval(function() {
    $(".timer.working").each(function() {
      var seconds = $(this).text();
      if (!isNaN(seconds)) {
        seconds --;
      }
      $(this).text(seconds);
      if (seconds <= 0) {
        $(this).removeClass('working');
      }
    });

    $(".status.working").each(function() {
      var max = $(this).attr('max');
      var current = $(this).attr('current');
      if (!isNaN(max) && !isNaN(current)) {
        current --;
      }
      var width_percentage = (current / max) * 100;

      $(this).attr('current', current);
      $(this).find('.inner').width("" + width_percentage + "%");
      if (current <= 0) {
        $(this).removeClass('working');
      }
    });
  }, 1000);
}