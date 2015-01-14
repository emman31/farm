var _logger = require("logger");

exports.NewInventory = function(socket) {
  return new Inventory(socket);
};

function Inventory(socket) {
  this._socket = socket;
  this._items = {};
}

Inventory.prototype.GetItem = function GetItem(itemId) {
  if (this._items.hasOwnProperty(itemId) && this._items[itemId].Number > 0) {
    return this._items[itemId].Item;
  }
  else {
    _logger.Log("Inventory does not contain item '" + itemId + "'.");
    return null;
  }
}

Inventory.prototype.AddItems = function AddItem(items) {
  for (var i = 0; i < items.length; i++) {
    this.AddItem(items[i], 1);
  }
};

Inventory.prototype.AddItem = function AddItem(item, number) {
  if (this._items.hasOwnProperty(item.Id)) {
    this._items[item.Id].Number += number;
  }
  else {
    this._items[item.Id] = {
      'Item': item,
      'Number': number
    };
  }

  this._socket.emit('response', "AddedItemToInventory", [this._getInventoryForClient()]);
};

Inventory.prototype.ContainsItem = function ContainsItem(itemId) {
  if (this._items.hasOwnProperty(itemId) && this._items[itemId].Number > 0) {
    return true;
  }
  return false;
};

Inventory.prototype.RemoveItem = function RemoveItem(item) {
  if (this._items.hasOwnProperty(item.Id) && this._items[item.Id].Number > 0) {
    this._items[item.Id].Number --;
  }
  this._socket.emit('response', "AddedItemToInventory", [this._getInventoryForClient()]);
};

Inventory.prototype._getInventoryForClient = function _getInventoryForClient() {
  var items = [];
  for (var itemId in this._items) {
    items.push({
      'Id': itemId,
      'Name': this._items[itemId].Item.Name,
      'Type': this._items[itemId].Item.Type,
      'Number': this._items[itemId].Number
    });
  }
  return items;
};