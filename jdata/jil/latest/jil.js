/*
@name JIL (jData Interface Library)
@version 0.0.4
@home http://code.eligrey.com/jdata/jil/
@requires json2.js OR native JSON.parse & native JSON.stringify
@desc jData interface library to interact with a jData host through it's postMessage API
@license http://www.gnu.org/licenses/lgpl.html
@author Elijah Grey - eligrey.com
*/

if ( typeof JSON == "undefined" ) { // load JSON if it doesn't already exist
	// Apending scripts and frames to document.head due to IE8 having weird behavior with document.documentElement
	document.getElementsByTagName("head")[0].appendChild(document.createElement("script")).src = "json2.js";
}

function JIL () {
	var args = Array.prototype.slice.call(arguments);
	if ( typeof JIL[args[0]] == "function" ) return JIL[args[0]].apply(this, args.slice(1));
	else if ( typeof JIL[args[0]] != "undefined" ) return JIL[args[0]];
	return JIL;
};

JIL.props = ({ // Properties to extend onto JIL, this is temporary and gets deleted
	origin: "http://jdata.eligrey.com", // Host, no forward slash as to be able to use for checking e.origin
	path: "", // Change to path if host does not have jData host at root directory
	frame: document.createElement("iframe"),
	ready: false,
	frameActive: false,
	listening: false,
	requestCallbacks: {
		reset: function(key) {
			if ( typeof key != "undefined" ) delete JIL.requestCallbacks[key];
			else JIL.requestCallbacks = {reset: JIL.requestCallbacks.reset};
			return JIL;
		}
	},
	handleResponse: function(evt) {
		if ( evt.origin == JIL.origin ) { // Only handle messages from JIL host
			var message = JSON.parse(evt.data);
			if ( message.jdata == true && typeof message.id != "undefined" && typeof message.response != "undefined" ) {
				// do callback, then delete to free up memory
				if ( typeof JIL.requestCallbacks[message.id] == "function" ) {
					JIL.requestCallbacks[message.id](message.response);
					delete JIL.requestCallbacks[message.id];
				}
			}
		}
		return JIL;
	},
	query: function(reqObj, callback) { // sends a JSON-encoded object to JIL.frame
		if ( JIL.ready == true ) {
			var requestID = (function safeRandID() { // generate a random key that doesn't collide with any existing keys
				var randID = Math.random().toString().substr(2); // Generate a random number, make it a string, and cut off the "0."
				if (typeof JIL.requestCallbacks[randID] == "undefined") return randID;
				else return safeRandID();
			})();
			if (typeof callback == "function") {
				JIL.requestCallbacks[requestID] = callback;
			}
			if ( typeof reqObj == "string" ) reqObj = {method: reqObj};
			reqObj.id = requestID;
			JIL.frame.contentWindow.postMessage(JSON.stringify(reqObj), JIL.origin);
		}
		return JIL;
	},
	get: function(item, callback) { // get item from jData localStorage
		if (item && item != "") return JIL.query({method: "get", item: item}, callback||false);
	},
	set: function(item, value, callback) { // set item to jData localStorage
		if (item && item != "") return JIL.query({method: "set", item: item, value: value||""}, callback||false);
	},
	remove: function(item, callback) { // remove item
		if (item && item != "") return JIL.query({method: "remove", item: item}, callback||false);
	},
	trust: function(callback) { // request to become trusted host
		return JIL.query("trust", callback||false);
	},
	untrust: function(callback) { // request to become untrusted host
		return JIL.query("untrust", callback||false);
	},
	total: function(callback) { // get total # of items
		return JIL.query("length", callback||false);
	},
	list: function(callback) { // get list of all items
		return JIL.query("list", callback||false);
	},
	addEvent: function(obj, type, fn) { 
		if ( obj.addEventListener ) obj.addEventListener( type, fn, false );
		else if ( obj.attachEvent ) obj.attachEvent( "on"+type, fn );
		return JIL;
	},
	removeEvent: function(obj, type, fn) {
		if ( obj.removeEventListener ) obj.removeEventListener( type, fn, false );
		else if ( obj.detachEvent ) obj.detachEvent( "on"+type, fn );
		return JIL;
	},
	loadFrame: function(readyCallback) {
		if ( JIL.listening ) JIL.removeEvent(window, "message", JIL.handleResponse);		
		JIL.ready = false;
		JIL.listening = false;
		if ( !JIL.frameActive ) {
			JIL.frame.setAttribute("style", "display:none");
			document.getElementsByTagName("head")[0].appendChild(JIL.frame);
			JIL.frameActive = true;
		}
		function init() {
			JIL.removeEvent(JIL.frame, "load", init)
			.addEvent(window, "message", JIL.handleResponse);
			JIL.listening = true;
			JIL.ready = true;
			if ( typeof readyCallback == "function" ) readyCallback(JIL);
		};
		JIL.frame.setAttribute("src", JIL.origin+JIL.path+"/api/postMessage");
		return JIL.addEvent(JIL.frame, "load", init);
	},
	changeHost: function(origin, path, callback) {
		if ( typeof origin == "string" ) JIL.origin = origin;
		if ( typeof path == "string" ) JIL.path = path;
		else JIL.path = "";
		return JIL.loadFrame(callback||false);
	}
});
for (prop in JIL.props) {
	if ( JIL.props.hasOwnProperty(prop) ) JIL[prop] = JIL.props[prop];
}
delete JIL.props;
JIL.loadFrame();
