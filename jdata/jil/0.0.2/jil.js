/*
JIL (jData Interface Library) - v0.0.2 - code.eligrey.com/jdata/jil/
@requires json2.js OR native JSON.parse & native JSON.stringify
@desc jData interface library to interact with a jData host
@license http://creativecommons.org/licenses/LGPL/2.1/
@author Elijah Grey - www.eligrey.com
const Contact_Email_Address = ['\x65\x6c\x69\x6a\x61\x68','\x67\x72\x65\x79\x2e\x6e\x61\x6d\x65'].join('\x40');
*/

if ( typeof JSON == "undefined" ) { // load JSON if it doesn't already exist
    document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src = 'json2.js';
}

var JIL = { // The JIL Object
    host: 'http://jdata.eligrey.com', // Host, no forward slash as to be able to use for checking e.origin
    frame: document.createElement('iframe'),
    requestCallbacks: {},
    generateID: function() { // Return Math.random() as a string without the preceding "0."
        return Math.random().toString().substr(2);
    },
    ready: false,
    handleMessage: function(evt) {
        if ( evt.origin == JIL.host ) { // Only handle messages from JIL host
            var message = JSON.parse(evt.data);
            if ( typeof message.id != 'undefined' && typeof message.response != 'undefined' ) {
                // do callback, then delete to free up memory
                if ( JIL.requestCallbacks[message.id] ) {
                    if ( typeof JIL.requestCallbacks[message.id] == 'function' ) JIL.requestCallbacks[message.id](message.response);
                    delete JIL.requestCallbacks[message.id];
                }
            }
        }
    },
    query: function(obj, callback) { // sends a JSON-encoded object to JIL.frame
      if ( JIL.ready == true ) {
        if (callback) {
            var requestID = JIL.generateID();
            JIL.requestCallbacks[requestID] = callback;
        }
        JIL.frame.contentWindow.postMessage(JSON.stringify({id: requestID, request:obj}), JIL.host);
      }
    },
    get: function(item, callback) { // get item from jData localStorage
        if (item && item != '') JIL.query({type: "get", item: item}, callback||false);
    },
    set: function(item, value, callback) { // set item to jData localStorage
        if (item && item != '') JIL.query({type: "set", item: item, value: value}, callback||false);
    },
    remove: function(item, callback) { // remove item
        if (item && item != '') JIL.query({type: "remove", item: item}, callback||false);
    },
    trust: function(callback) { // request to become trusted host
        JIL.query({type: "trust"}, callback||false);
    },
    untrust: function(callback) { // request to become untrusted host
        JIL.query({type: "untrust"}, callback||false);
    },
    length: function(callback) { // get total # of items
        JIL.query({type: "length"}, callback||false);
    },
    list: function(callback) { // get list of all items
        JIL.query({type: "list"}, callback||false);
    },
    addEvent: function( obj, type, fn ) {
        if ( obj.attachEvent ) {
            obj.attachEvent( 'on'+type, fn );
        } else {
            obj.addEventListener( type, fn, false );
        }
    },
    removeEvent: function removeEvent( obj, type, fn ) {
        if ( obj.detachEvent ) {
            obj.detachEvent( 'on'+type, fn );
        } else {
            obj.removeEventListener( type, fn, false );
        }
    },
    init: function() {
        JIL.ready = true;
        JIL.addEvent(window, 'message', JIL.handleMessage);
        JIL.removeEvent(JIL.frame, 'load', JIL.init);
    }
};
JIL.addEvent(window, 'message', JIL.handleMessage);

JIL.frame.setAttribute('src', JIL.host+'/api/postMessage.php');
JIL.frame.setAttribute('style', 'display:none');
document.getElementsByTagName('head')[0].appendChild(JIL.frame);

JIL.addEvent(JIL.frame, 'load', JIL.init);  