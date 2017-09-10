if (!Object.getPrototypeOf) {
	if (typeof this.__proto__ === "object")
		Object.getPrototypeOf = function (obj) {
			return obj.__proto__;
		};
	else
		Object.getPrototypeOf = function (obj) {
			var constructor = obj.constructor,
			oldConstructor;
			if (Object.prototype.hasOwnProperty.call(obj, "constructor")) {
				oldConstructor = constructor;
				if (!(delete obj.constructor)) // reset constructor
					return null; // can't delete obj.constructor, return null
				constructor = obj.constructor; // get real constructor
				obj.constructor = oldConstructor; // restore constructor
			}
			return constructor ? constructor.prototype : null; // needed for IE
		};
}
