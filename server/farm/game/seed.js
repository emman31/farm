exports.NewSeed = function() {
  return new Seed("Carrot");
};

function Seed(plantName) {
  this.PlantName = plantName;
}