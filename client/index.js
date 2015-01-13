$(window).load(function document_ready() {
  socket = io.connect(window.location.host);
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
        case "AddedItemToInventory":
          RefreshInventory(returnValue[0]);
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

  var selected_item = null;
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
      if (selected_item !== null) {
        // On the click of a crop, we check if an item is selected and make the action depending of the item type.
        switch (selected_item.attr('item_type')) {
          case 'seed':
            if ($(this).attr('planted') !== '1') {
              socket.emit('execute', 'Plant', [selected_item.attr('item_id'), $(this).attr('x'), $(this).attr('y')]);
            }
            break;
          case 'fertilizer':
            socket.emit('execute', 'FertilizeCrop', [selected_item.attr('item_id'), $(this).attr('x'), $(this).attr('y')]);
            break;
        }

      }

//      if (watering) {
//        socket.emit('execute', 'WaterCrop', [$(this).attr('x'), $(this).attr('y')]);
//      }
    });
  }


  function RefreshInventory(inventory) {
    $("#inventory_content").empty();

    for (var i = 0; i < inventory.length; i ++) {
      $("#inventory_content").append("<li item_type='" + inventory[i].Type + "' item_id='" + inventory[i].Id + "'>" + inventory[i].Name + " (" + inventory[i].Number + ")</li>");
    }

    $("#inventory_content li").click(function item_clicked() {
      if ($(this).hasClass('selected')) {
        $("#inventory_content li").removeClass("selected");
        selected_item = null;
      }
      else {
        $("#inventory_content li").removeClass("selected");
        $(this).addClass('selected');
        selected_item = $(this);
      }
    });

    // Keep the selection.
    if (selected_item !== null) {
      selected_item = $("[item_type='" + selected_item.attr('item_type') + "']");
      selected_item.addClass('selected');
    }
  }

  function CreateCrop(x, y, symbol) {
    return "<span class='crop' x=" + x + " y=" + y + ">" + symbol + "</span>";
  }

  function PlantCrop(seed, x, y) {
    $("[x=" + x + "][y=" + y + "]").html(seed.Stages[0].Symbol);
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