var _logger = require("logger");
var ItemStack = require("./item/ItemStack.js");

function Inventory(socket) {
  this._socket = socket;
  this._items = {};
  this._onContainsItem = {};
}

/**
 *
 * @param {string} itemId
 * @returns {Item|null}
 */
Inventory.prototype.GetItem = function GetItem(itemId) {
  if (this._items.hasOwnProperty(itemId) && this._items[itemId].GetNumber() > 0) {
    return this._items[itemId].GetItem();
  }
  else {
    _logger.Log("Inventory does not contain item '" + itemId + "'.");
    return null;
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
    this._items[item.GetId()].Add(number);
  }
  else {
    this._items[item.GetId()] = new ItemStack(item, number);
  }

  this._executeOnContainsItem(item.GetId());
  this.RefreshClientInventory();
};

/**
 * Add ItemStacks to the inventory.
 * @param {ItemStack[]} stacks
 */
Inventory.prototype.AddItemStacks = function AddItemStacks(stacks) {
  for (var i = 0; i < stacks.length; i++) {
    if (this._items.hasOwnProperty(stacks[i].GetItemId())) {
      this._items[stacks[i].GetItemId()].CombineStack(stacks[i]);
    }
    else {
      this._items[stacks[i].GetItemId()] = stacks[i];
    }
    this._executeOnContainsItem(stacks[i].GetItemId());
  }

  this.RefreshClientInventory();
};

/**
 * Register an action to be executed when the inventory contains a certain item.
 * @param {string} itemId
 * @param {Action} onContainsItem
 */
Inventory.prototype.OnContainsItem = function OnContainsItem(itemId, onContainsItem) {
  // Allows for multiple actions on the same item.
  if (this._onContainsItem.hasOwnProperty(itemId)) {
    this._onContainsItem[itemId].push(onContainsItem);
  }
  else {
    this._onContainsItem[itemId] = [onContainsItem];
  }
};

/**
 * Execute the actions registered on the inventory containing a certain item.
 * @param {string} itemId - The id of the "certain" item.
 * @private
 */
Inventory.prototype._executeOnContainsItem = function _executeOnContainsItem(itemId) {
  if (this._onContainsItem.hasOwnProperty(itemId)) {
    for (var i = 0; i < this._onContainsItem[itemId].length; i ++) {
      this._onContainsItem[itemId][i].Execute();
    }
    delete this._onContainsItem[itemId];
  }
};

/**
 *
 * @param {string} itemId
 * @param {Action} [onContainsItem=null] - An action to execute when the inventory will contains the item.
 * @returns {boolean}
 */
Inventory.prototype.ContainsItem = function ContainsItem(itemId, onContainsItem) {
  if (this._items.hasOwnProperty(itemId) && this._items[itemId].GetNumber() > 0) {
    return true;
  }
  else if(onContainsItem != null) {
    this.OnContainsItem(itemId, onContainsItem);
  }
  return false;
};

Inventory.prototype.RemoveItem = function RemoveItem(item) {
  if (this._items.hasOwnProperty(item.GetId()) && this._items[item.GetId()].GetNumber() > 0) {
    this._items[item.GetId()].Remove();
  }
  this.RefreshClientInventory();
};

/**
 * Sends a command to the socket for the client to refresh the inventory.
 */
Inventory.prototype.RefreshClientInventory = function RefreshClientInventory() {
  var items = [];
  for (var itemId in this._items) {
    items.push({
      'Id': itemId,
      'Name': this._items[itemId].GetItemName(),
      'Type': this._items[itemId].GetItemType(),
      'Number': this._items[itemId].GetNumber()
    });
  }

  this._socket.emit('response', "AddedItemToInventory", [items]);
};

module.exports = Inventory;