$(window).load(function document_ready() {
  var socket = io.connect(window.location.host);
  socket.emit('execute', 'NewGame');

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
        case "RefreshTime":
          RefreshTime(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "Watered":
          WaterCrop(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "Fertilized":
          FertilizeCrop(returnValue[0], returnValue[1]);
          break;
        case "RefreshCrop":
          RefreshCrop(returnValue[0], returnValue[1], returnValue[2]);
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
    BindCropClick();
  }

  function RefreshCrop(x, y, symbol) {
    $("[x=" + x + "][y=" + y + "]").replaceWith(CreateCrop(x, y, symbol));
    BindCropClick();
  }

  function BindCropClick() {
    $(".crop").click(function CropClicked() {
      if (selected_item !== null) {
        socket.emit('execute', 'UseOnCrop', [selected_item.attr('item_id'), $(this).attr('x'), $(this).attr('y')]);
      }
      else {
        socket.emit('execute', 'HarvestCrop', [$(this).attr('x'), $(this).attr('y')]);
      }

    });
  }

  var Inventory = {};
  function RefreshInventory(inventory) {
    $("#inventory_content").empty();

    for (var i = 0; i < inventory.length; i ++) {
      Inventory[inventory[i].Id] = inventory[i];
      $("#inventory_content").append("<li item_id='" + inventory[i].Id + "'>" + inventory[i].Name + " (" + inventory[i].Number + ")</li>");
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
      selected_item = $("[item_id='" + selected_item.attr('item_id') + "']");
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

  function RefreshTime(day, name, duration) {
    $("#time").html("Day " + day + " " + name);
  }
});