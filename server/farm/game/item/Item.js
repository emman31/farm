function Item(definition) {
  this._definition = definition;
}

Item.prototype.GetName = function GetName() {
  return this._definition.Name;
};

Item.prototype.GetType = function GetType() {
  return this._definition.Type;
};

Item.prototype.GetId = function GetId() {
  return this._definition.Id;
};

module.exports = Item;