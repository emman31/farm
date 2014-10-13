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
        case "Watered":
          WaterCrop(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "Dried":
          DryCrop(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "Died":
          DieCrop(returnValue[0], returnValue[1]);
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

    $("#field").css("width", x * 24);
    $("#field").css("height", y * 24);

    $(".crop").click(function CropClicked() {
      if (watering) {
        socket.emit('execute', 'WaterCrop', [$(this).attr('x'), $(this).attr('y')]);
      }
      else {
        socket.emit('execute', 'Plant', ['sample', $(this).attr('x'), $(this).attr('y')]);
      }
    });
  }

  function CreateCropButton(x, y, symbol) {
    return "<span class='crop' x=" + x + " y=" + y + ">" + symbol + "</span>";
  }

  function GrowPlant(symbol, x, y) {
    $("[x=" + x + "][y=" + y + "]").html(symbol);
  }

  function WaterCrop(timer, x, y) {
    $("[x=" + x + "][y=" + y + "]").css("background-color", "cyan");
  }

  function DryCrop(timer, x, y) {
    $("[x=" + x + "][y=" + y + "]").css("background-color", "white");
  }

  function DieCrop(x, y) {
    $("[x=" + x + "][y=" + y + "]").css("background-color", "white");
    $("[x=" + x + "][y=" + y + "]").html("x");
  }

  function ChangeDayPhase(name, duration) {
    $("#time").html(name);
  }

  var watering = false;
  $("#water").click(function OnWaterClick() {
    watering = !watering;

    if (watering) {
      $(this).css("background-color", "cyan");
    }
    else {
      $(this).css("background-color", "white");
    }
  });
});