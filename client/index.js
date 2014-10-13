$(window).load(function document_ready() {
  socket = io.connect('http://162.248.162.83:8888/');

  socket.emit('execute', 'NewGame', ['patate']);

  socket.on('response', function(executedFunction, returnValue) {
    if (executedFunction === "ERROR") {
      console.log(returnValue);
    }
    else {
      switch (executedFunction) {
        case "NewGame":
        case "Plant":
          RefreshField(returnValue.field);
          break;
        case "GrowPlant":
          GrowPlant(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "ChangeDayPhase":
          ChangeDayPhase(returnValue[0], returnValue[1]);
          break;
      }
    }

  });

  function RefreshField(field) {
    $("#field").empty();
    for (var y = 0; y < field.length; y ++) {
      var row = "";
      for (var x = 0; x < field[y].length; x ++) {
        row += CreateCropButton(x, y, field[y][x]);
      }
      $("#field").append(row + "<br />");
    }

    $(".crop").click(function CropClicked() {
      socket.emit('execute', 'Plant', ['sample', $(this).attr('x'), $(this).attr('y')]);
    });
  }

  function CreateCropButton(x, y, symbol) {
    return "<span class='crop' x=" + x + " y=" + y + ">" + symbol + "</span>";
  }

  function GrowPlant(symbol, x, y) {
    $("[x=" + x + "][y=" + y + "]").html(symbol);
  }

  function ChangeDayPhase(name, duration) {
    $("#time").html(name);
  }
});