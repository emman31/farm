$(window).load(function document_ready() {
  socket = io.connect('http://162.248.162.83:8888/');

  socket.emit('execute', 'NewGameConcept1');


  $('.action_button').click(function() {
    var action = $(this).attr('action');
    window[action]($(this));
  });

  function plant(button) {

  }








  socket.on('response', function(executedFunction, returnValue) {
    if (executedFunction === "ERROR") {
      console.log(returnValue);
    }
    else {
      switch (executedFunction) {
        case "NewGameConcept1":
          // Nothing to do
          break;
        case "Plant":
          PlantCrop(returnValue[0], returnValue[1], returnValue[2]);
          break;
//        case "GrowPlant":
//          GrowPlant(returnValue[0], returnValue[1], returnValue[2]);
//          break;
//        case "ChangeDayPhase":
//          ChangeDayPhase(returnValue[0], returnValue[1], returnValue[2]);
//          break;
//        case "Watered":
//          WaterCrop(returnValue[0], returnValue[1], returnValue[2]);
//          break;
//        case "Fertilized":
//          FertilizeCrop(returnValue[0], returnValue[1]);
//          break;
//        case "Dried":
//          DryCrop(returnValue[0], returnValue[1], returnValue[2]);
//          break;
//        case "Died":
//          DieCrop(returnValue[0], returnValue[1]);
//          break;
      }
    }

  });

});