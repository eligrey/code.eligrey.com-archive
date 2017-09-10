if (!Object.create) {
    Object.create = function (proto, props) {
        var F = function() {};
        F.prototype = proto;
        var obj = new F();
        if (typeof props != "undefined")
            Object.defineProperties(obj, props);
        return obj;
    };
}
