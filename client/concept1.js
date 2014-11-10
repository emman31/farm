$(window).load(function document_ready() {
  socket = io.connect('http://162.248.162.83:8888/');
  socket.emit('execute', 'NewGameConcept1');

  $('.action_button').click(function() {
    var action = $(this).attr('action');
    window[action]($(this));
  });

  socket.on('response', function(executedFunction, returnValue) {
    if (executedFunction === "ERROR") {
      console.log(returnValue);
    }
    else {
      switch (executedFunction) {
        case "NewGameConcept1":
          // Nothing to do
          break;
        case "AddedItemToInventory":
          RefreshInventory(returnValue[0]);
          break;
        case "Plant":
          PlantCrop(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "Harvested":
          HarvestedCrop(returnValue[0], returnValue[1]);
          break;
        case "Dried":
          DryCrop(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "Watered":
          WaterCrop(returnValue[0], returnValue[1], returnValue[2]);
          break;
        case "Died":
          DieCrop(returnValue[0], returnValue[1]);
          break;
      }
    }
  });
  InitializeTimers();
});

function plant(button) {
  socket.emit('execute', 'PlantAnywhere', ['seed_sample']);
}

function harvest(button) {
  socket.emit('execute', 'HarvestAll');
}

function water(button) {
  socket.emit('execute', 'WaterAll');
}

function HarvestedCrop(x, y) {
  $("[x=" + x + "][y=" + y + "]").remove();
}

function WaterCrop(timer, x, y) {
  SetStatus($("[x=" + x + "][y=" + y + "]"), 'Watered', timer);
}

function DryCrop(timer, x, y) {
  SetStatus($("[x=" + x + "][y=" + y + "]"), 'Dry', timer);
}

function DieCrop(x, y) {
  SetStatus($("[x=" + x + "][y=" + y + "]"), 'Died', 0);
}

function PlantCrop(seed, x, y) {
  var id = guid();
  $("#field_content").append("<li x='" + x + "' y='" + y + "' id='" + id + "'>" + seed.Name + "</li>");
  CreateTimer($('#' + id), seed.FullGrownTimer);
  SetStatus($('#' + id), 'Dry', seed.DeathTimer);
}

function RefreshInventory(inventory) {
  $("#inventory_content").empty();

  for (var i = 0; i < inventory.length; i ++) {
    $("#inventory_content").append("<li>" + inventory[i].Name + " " + inventory[i].Number + "</li>");
  }
}

