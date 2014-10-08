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
          RefreshField(returnValue);
          break;
      }
    }

  });

  function RefreshField(field) {
    $("#field").empty();
    for (var x = 0; x < field.length; x ++) {
      var row = "";
      for (var y = 0; y < field[x].length; y ++) {
        row += CreateCropButton(x, y, field[x][y]);
      }
      $("#field").append(row + "<br />");
    }

    $(".crop").click(function CropClicked() {
      socket.emit('execute', 'Plant', [$(this).attr('x'), $(this).attr('y')]);
    });
  }

  function CreateCropButton(x, y, symbol) {
    return "<button class='crop' x=" + x + " y=" + y + ">" + symbol + "</button>";
  }

});