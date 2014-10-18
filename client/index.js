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
          RefreshField(returnValue.field);
          break;
        case "Plant":
          PlantCrop(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "GrowPlant":
          GrowPlant(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "ChangeDayPhase":
          ChangeDayPhase(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "Watered":
          WaterCrop(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "Fertilized":
          FertilizeCrop(returnValue[0], returnValue[1]);
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
        row += CreateCrop(x, y, field[y][x]);
      }
      $("#field").append(row + "<br />");
    }

    $("#field").css("width", x * 24);
    $("#field").css("height", y * 24);

    $(".crop").click(function CropClicked() {
      if (watering) {
        socket.emit('execute', 'WaterCrop', [$(this).attr('x'), $(this).attr('y')]);
      }
      else if(fertilizing) {
        socket.emit('execute', 'FertilizeCrop', ['fert1', $(this).attr('x'), $(this).attr('y')]);
      }
      else {
        socket.emit('execute', 'Plant', ['sample', $(this).attr('x'), $(this).attr('y')]);
      }
    });
  }

  function CreateCrop(x, y, symbol) {
    return "<span class='crop' x=" + x + " y=" + y + ">" + symbol + "</span>";
  }

  function PlantCrop(symbol, x, y) {
    $("[x=" + x + "][y=" + y + "]").html(symbol);
  }

  function GrowPlant(symbol, x, y) {
    $("[x=" + x + "][y=" + y + "]").html(symbol);
  }

  function WaterCrop(timer, x, y) {
    $("[x=" + x + "][y=" + y + "]").css("background-color", "cyan");
  }

  function FertilizeCrop(x, y) {
    $("[x=" + x + "][y=" + y + "]").css("border-color", "chocolate");
  }

  function DryCrop(timer, x, y) {
    $("[x=" + x + "][y=" + y + "]").css("background-color", "white");
  }

  function DieCrop(x, y) {
    $("[x=" + x + "][y=" + y + "]").css("background-color", "white");
    $("[x=" + x + "][y=" + y + "]").html("x");
  }

  function ChangeDayPhase(day, name, duration) {
    $("#time").html("Day " + day + " " + name);
  }

  var watering = false;
  $("#water").click(function OnWaterClick() {
    SetWatering(!watering);
  });

  var fertilizing = false;
  $("#fertilize").click(function OnFertilizeClick() {
    SetFertilizing(!fertilizing);
  });

  function SetWatering(isWatering) {
    watering = isWatering;
    if (watering) {
      $("#water").css("background-color", "cyan");
      SetFertilizing(false);
    }
    else {
      $("#water").css("background-color", "white");
    }
  }
  function SetFertilizing(isFertilizing) {
    fertilizing = isFertilizing;
    if (fertilizing) {
      $("#fertilize").css("background-color", "brown");
      SetWatering(false);
    }
    else {
      $("#fertilize").css("background-color", "white");
    }
  }
});