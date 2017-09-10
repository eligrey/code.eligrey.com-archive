"bind" in Function || (Function.bind = function () {
    var args = Array.prototype.slice.call(arguments);
    return Function.prototype.bind.apply(args.shift(), args);
});

"bind" in Function.prototype || (Function.prototype.bind = function () {
	if (arguments.length < 2 && arguments[0] == undefined) {
	    return this;
	}
	var thisObj = this,
	args = Array.prototype.slice.call(arguments),
	obj = args.shift();
	return function () {
	    return thisObj.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
	};
});
