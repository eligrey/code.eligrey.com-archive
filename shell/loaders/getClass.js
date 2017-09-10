try { // load toStringX if it isn't already loaded
  if (/^function\s+toString\(\)\s*{?\s*\[native code.*\]\s*}?$/.test( uneval(Object.prototype.toString) ))
    shellCommands.load("toStringX", false);
} catch (e) {}

// returns either "undefined", "null", the "Object" in [object Object]
function getClass(obj, useNative) {
  if (typeof obj == "undefined")
    return "undefined";
  if (obj === null)
    return "null";
  return Object.prototype.toString.call(obj, useNative)
    .match(/^\[object\s(.*)\]$/)[1];
}
