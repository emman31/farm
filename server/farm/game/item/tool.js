exports.NewTool = function NewTool() {
  return new Tool();
};

function Tool() {};

Tool.prototype.GetAction = function GetAction() {
  return this._definition.Action;
};