var _logger = require("logger");

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

/**
 * Add item to the inventory.
 * @param {Item} item The item to add to the inventory
 * @param {int} [number=1] The number of items to add.
 */
Inventory.prototype.AddItem = function AddItem(item, number) {
  if (!number) {
    number = 1;
  }

  if (this._items.hasOwnProperty(item.GetId())) {
    this._items[item.GetId()].Number += number;
  }
  else {
    this._items[item.GetId()] = {
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
  if (this._items.hasOwnProperty(item.GetId()) && this._items[item.GetId()].Number > 0) {
    this._items[item.GetId()].Number --;
  }
  this._socket.emit('response', "AddedItemToInventory", [this._getInventoryForClient()]);
};

Inventory.prototype._getInventoryForClient = function _getInventoryForClient() {
  var items = [];
  for (var itemId in this._items) {
    items.push({
      'Id': itemId,
      'Name': this._items[itemId].Item.GetName(),
      'Type': this._items[itemId].Item.GetType(),
      'Number': this._items[itemId].Number
    });
  }
  return items;
};

module.exports = Inventory;