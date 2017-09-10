function ErrorConstructor(constructorName) {
  var errorConstructor = function(message, fileName, lineNumber) {
  // don't directly name this function, .name is used by Error.prototype.toString
    if (this == window) return new arguments.callee(message, fileName, lineNumber);
    this.name = errorConstructor.name;
    this.message = message||"";
    this.fileName = fileName||location.href;
    if (!isNaN(+lineNumber)) this.lineNumber = +lineNumber;
    else this.lineNumber = 1;
  }
  errorConstructor.name = constructorName||Error.prototype.name;
  errorConstructor.prototype.toString = Error.prototype.toString;
  
  return errorConstructor;
}
