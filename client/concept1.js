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
      }
    }
  });
});

function plant(button) {
  socket.emit('execute', 'PlantAnywhere', ['seed_sample']);
}

function RefreshInventory(inventory) {
  $("#inventory_content").empty();

  for (var i = 0; i < inventory.length; i ++) {
    $("#inventory_content").append("<li>" + inventory[i].Name + " " + inventory[i].Number + "</li>");
  }
}

