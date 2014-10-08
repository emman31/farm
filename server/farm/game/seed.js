exports.NewSeed = function() {
  return new Seed("Carrot");
};

function Seed(plantName) {
  this._symbol = "P";
  this.PlantName = plantName;
}

Seed.prototype.GetSymbol = function GetSymbol() {
  return this._symbol;
}