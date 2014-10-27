exports.NewInventory = function(socket) {
  return new Inventory(socket);
};

function Inventory(socket) {
  this._socket = socket;
  this._items = {};
}

function AddItem(itemId, number) {
  if (this._items.hasOwnProperty(itemId)) {
    this._items[itemId] += number;
  }
  else {
    this._items[itemId] = number;
  }
}