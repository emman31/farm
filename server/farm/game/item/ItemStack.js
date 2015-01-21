/**
 * Create a stack of items.
 * @param {Item} item
 * @param {int} [number=1]
 */
function ItemStack(item, number) {
  if (!number) {
    number = 1;
  }
  this._item = item;
  this._number = number;
}

/**
 * Add items to the stack.
 * @param {int} [number=1]
 */
ItemStack.prototype.Add = function Add(number) {
  if (!number) {
    number = 1;
  }
  this._number += number;
}

/**
 * Combine another stack of item into this one.
 * @param {ItemStack} otherStack The stack to combine.
 */
ItemStack.prototype.CombineStack = function CombineStack(otherStack) {
  if (otherStack.GetItemId() === this.GetItemId()) {
    this.Add(otherStack.GetNumber());
  }
}

/**
 * Remove items from the stack.
 * @param {int} [number=1]
 */
ItemStack.prototype.Remove = function Remove(number) {
  if (!number) {
    number = 1;
  }
  this._number -= number;
}

ItemStack.prototype.GetNumber = function GetNumber() {
  return this._number;
}

ItemStack.prototype.GetItem = function GetItem() {
  return this._item;
}

ItemStack.prototype.GetItemId = function GetItemId() {
  return this._item.GetId();
}

ItemStack.prototype.GetItemName = function GetItemName() {
  return this._item.GetName();
}

ItemStack.prototype.GetItemType= function GetItemType() {
  return this._item.GetType();
}

module.exports = ItemStack;