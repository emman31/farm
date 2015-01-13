exports.NewInventory = function(socket) {
  return new Inventory(socket);
};

function Inventory(socket) {
  this._socket = socket;
  this._items = {};
}

Inventory.prototype.AddItems = function AddItem(items) {
  for (var i = 0; i < items.length; i++) {
    this.AddItem(items[i], 1);
  }
};

Inventory.prototype.AddItem = function AddItem(item, number) {
  console.log(item);
  var itemId = item.GetItemId();

  if (this._items.hasOwnProperty(itemId)) {
    this._items[itemId].Number += number;
  }
  else {
    this._items[itemId] = {
      'Item': item,
      'Number': number
    };
  }

  this._socket.emit('response', "AddedItemToInventory", [this._getInventoryForClient()]);
};

Inventory.prototype.ContainsItem = function ContainsItem(item) {
  var itemId = item.GetItemId();
  if (this._items.hasOwnProperty(itemId) && this._items[itemId].Number > 0) {
    return true;
  }
  return false;
};

Inventory.prototype.RemoveItem = function RemoveItem(item) {
  var itemId = item.GetItemId();
  if (this._items.hasOwnProperty(itemId) && this._items[itemId].Number > 0) {
    this._items[itemId].Number --;
  }
  this._socket.emit('response', "AddedItemToInventory", [this._getInventoryForClient()]);
};

Inventory.prototype._getInventoryForClient = function _getInventoryForClient() {
  var items = [];
  for (var itemId in this._items) {
    items.push({
      'Id': itemId,
      'Name': this._items[itemId].Item.GetItemName(),
      'Type': this._items[itemId].Item.GetItemType(),
      'Number': this._items[itemId].Number
    });
  }
  return items;
};