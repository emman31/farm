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
          RefreshField(returnValue);
          break;
      }
    }

  });

  function RefreshField(field) {
    for (var x = 0; x < field.length; x ++) {
      var row = "";
      for (var y = 0; y < field[x].length; y ++) {
        row += "[" + field[x][y] + "]";
      }
      $("#field").append(row + "<br />");
    }
  }
});