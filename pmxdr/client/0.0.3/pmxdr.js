/* pmxdr: postMessage Cross-Domain Request library
@version 0.0.3
@archive http://code.eligrey.com/pmxdr/client/
@desc Simple cross-site HTTP requesting using postMessage API
@license http://www.gnu.org/licenses/lgpl.html
@author Elijah Grey - eligrey.com
*/

(function() {

  if ( typeof window.opera != "undefined" ) { // Opera 9.x postMessage fix (only for http:, not https:)
    if ( parseInt(window.opera.version()) < 10 ) Event.prototype.__defineGetter__("origin", function(){
      return "http://" + this.domain;
    })
  }
  
  function pmxdr(req) {
    
    var
    id = (function safeRandID() { // generate a random key that doesn't collide with any existing keys
      var randID = Math.random().toString().substr(2); // Generate a random number, make it a string, and cut off the "0." to make it look nice
      if (typeof pmxdr.requests[randID] == "undefined") return randID; // key doesn't collide
      else return safeRandID();
    })(),
    origin          = req.uri.replace(/^([\w-]+:\/*\[?[\w\.:-]+\]?(?::\d+)?).*/, "$1"), // extract protocol+host+port from uri for pmxdr api and postMessage verification (the square brackets are for ipv6)
    method          = req.method || pmxdr.defaultRequestMethod,
    timeout         = req.timeout || pmxdr.defaultTimeout,
    contentType_set = req.contentType ? true : false,
    iFrame          = document.createElement("iframe"); // interface frame
    
    method = method.toUpperCase();
    
    if ( typeof req.getHeaders == "string" ) req.getHeaders = [req.getHeaders];
    
    pmxdr.requests[id] = {
      origin: origin,
      remove: function() {
        pmxdr.interfaceFrameParent.removeChild(iFrame);
        delete pmxdr.requests[id];
      },
      callback: function(response) {
        if (typeof req.callback == "function") req.callback(response);
        pmxdr.requests[id].remove();
      }
    };

    function timeoutCallback() { // give callback a TIMEOUT error
      if ( pmxdr.requests[id] && pmxdr.requests[id].callback )
        pmxdr.requests[id].callback({
          pmxdr  : true,
          id     : id,
          error  : "TIMEOUT"
        })
    };
    
    if (req.contentType) {
      if (!req.headers) req.headers = {};
      req.headers["Content-Type"] = req.contentType.toString();
    } else if (method == "POST") // contentType_set is only needed for POST requests to go to default
        if (req.headers) // check to see if contentType or req.headers["Content-Type"] is set
          for (var header in req.headers)
            if (req.headers.hasOwnProperty(header) && header.toLowerCase() == "content-type") {
              contentType_set = true; break;
            }
    
    if (method == "POST" && !contentType_set) {
      if (!req.headers) req.headers = {};
      req.headers["Content-Type"] = "application/x-www-form-urlencoded"; // default for POST
    }
    
    iFrame.src = origin + "/pmxdr/api";
    iFrame.style.display = "none";
    iFrame.onload = function() {
      iFrame.contentWindow.postMessage(JSON.stringify({
        pmxdr     : true,
        method    : method,
        uri       : req.uri,
        data      : req.data,
        headers   : req.headers,
        getHeaders: req.getHeaders,
        id        : id
      }), origin);
      if ( timeout ) setTimeout(timeoutCallback, timeout)
    }
    pmxdr.interfaceFrameParent.appendChild(iFrame);

    return pmxdr.requests[id];
  }

  pmxdr.requests = { // requests cache
    clear: function clear() {
      pmxdr.requests = {clear: clear};
    }
  };
  
  // optional default timeout at which the request is deleted (60000 ms = 1 minute)
  //pmxdr.defaultTimeout = 60000;

  // parent for interface frames
  pmxdr.interfaceFrameParent = document.documentElement||document.getElementsByTagName("head")[0]||document.body||document.getElementsByTagName("body")[0];

  // default request method
  pmxdr.defaultRequestMethod = "GET";

  function handleResponse(evt) {
    var data = JSON.parse(evt.data);
    if ( data.pmxdr == true ) { // only handle pmxdr requests
      if (
        pmxdr.requests[data.id]
        && pmxdr.requests[data.id].origin == evt.origin
        && typeof pmxdr.requests[data.id].callback == "function"
      ) pmxdr.requests[data.id].callback(data);
    }
  }

  if ( window.addEventListener ) window.addEventListener("message", handleResponse, false);
  else if ( window.attachEvent ) window.attachEvent("onmessage", handleResponse);

  this.pmxdr = pmxdr;
})();


if ( typeof JSON == "undefined" ) {
  /* json2.js JSON API if browser does not natively support it
     This code block may look suspicious to you. That's because it's minified with YUI compressor, then /packer/.
     If you don't trust this code block, replace this block with your own minified http://www.json.org/json2.js
  */
  eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3(!l.m){m={}}(5(){5 f(n){7 n<10?"0"+n:n}3(6 V.q.p!=="5"){V.q.p=5(a){7 l.1o()+"-"+f(l.1p()+1)+"-"+f(l.1q())+"T"+f(l.1r())+":"+f(l.1s())+":"+f(l.1t())+"Z"};L.q.p=1u.q.p=1v.q.p=5(a){7 l.1w()}}w e=/[\\1x\\W\\X-\\Y\\11\\12\\13\\14-\\15\\17-\\18\\19-\\1a\\1b\\1c-\\1d]/g,G=/[\\\\\\"\\1y-\\1z\\1A-\\1B\\W\\X-\\Y\\11\\12\\13\\14-\\15\\17-\\18\\19-\\1a\\1b\\1c-\\1d]/g,8,y,1e={"\\b":"\\\\b","\\t":"\\\\t","\\n":"\\\\n","\\f":"\\\\f","\\r":"\\\\r",\'"\':\'\\\\"\',"\\\\":"\\\\\\\\"},o;5 H(b){G.1f=0;7 G.M(b)?\'"\'+b.z(G,5(a){w c=1e[a];7 6 c==="I"?c:"\\\\u"+("1g"+a.1h(0).N(16)).1i(-4)})+\'"\':\'"\'+b+\'"\'}5 A(a,b){w i,k,v,h,B=8,9,2=b[a];3(2&&6 2==="x"&&6 2.p==="5"){2=2.p(a)}3(6 o==="5"){2=o.J(b,a,2)}1C(6 2){C"I":7 H(2);C"O":7 1D(2)?L(2):"D";C"1E":C"D":7 L(2);C"x":3(!2){7"D"}8+=y;9=[];3(P.q.N.1F(2)==="[x 1G]"){h=2.h;E(i=0;i<h;i+=1){9[i]=A(i,2)||"D"}v=9.h===0?"[]":8?"[\\n"+8+9.K(",\\n"+8)+"\\n"+B+"]":"["+9.K(",")+"]";8=B;7 v}3(o&&6 o==="x"){h=o.h;E(i=0;i<h;i+=1){k=o[i];3(6 k==="I"){v=A(k,2);3(v){9.1j(H(k)+(8?": ":":")+v)}}}}Q{E(k 1k 2){3(P.1l.J(2,k)){v=A(k,2);3(v){9.1j(H(k)+(8?": ":":")+v)}}}}v=9.h===0?"{}":8?"{\\n"+8+9.K(",\\n"+8)+"\\n"+B+"}":"{"+9.K(",")+"}";8=B;7 v}}3(6 m.R!=="5"){m.R=5(a,b,c){w i;8="";y="";3(6 c==="O"){E(i=0;i<c;i+=1){y+=" "}}Q{3(6 c==="I"){y=c}}o=b;3(b&&6 b!=="5"&&(6 b!=="x"||6 b.h!=="O")){1m 1n 1H("m.R")}7 A("",{"":a})}}3(6 m.S!=="5"){m.S=5(c,d){w j;5 U(a,b){w k,v,2=a[b];3(2&&6 2==="x"){E(k 1k 2){3(P.1l.J(2,k)){v=U(2,k);3(v!==1I){2[k]=v}Q{1J 2[k]}}}}7 d.J(a,b,2)}e.1f=0;3(e.M(c)){c=c.z(e,5(a){7"\\\\u"+("1g"+a.1h(0).N(16)).1i(-4)})}3(/^[\\],:{}\\s]*$/.M(c.z(/\\\\(?:["\\\\\\/1K]|u[0-1L-1M-F]{4})/g,"@").z(/"[^"\\\\\\n\\r]*"|1N|1O|D|-?\\d+(?:\\.\\d*)?(?:[1P][+\\-]?\\d+)?/g,"]").z(/(?:^|:|,)(?:\\s*\\[)+/g,""))){j=1Q("("+c+")");7 6 d==="5"?U({"":j},""):j}1m 1n 1R("m.S")}}})();',62,116,'||value|if||function|typeof|return|gap|partial||||||||length||||this|JSON||rep|toJSON|prototype||||||var|object|indent|replace|str|mind|case|null|for||escapable|quote|string|call|join|String|test|toString|number|Object|else|stringify|parse||walk|Date|u00ad|u0600|u0604|||u070f|u17b4|u17b5|u200c|u200f||u2028|u202f|u2060|u206f|ufeff|ufff0|uffff|meta|lastIndex|0000|charCodeAt|slice|push|in|hasOwnProperty|throw|new|getUTCFullYear|getUTCMonth|getUTCDate|getUTCHours|getUTCMinutes|getUTCSeconds|Number|Boolean|valueOf|u0000|x00|x1f|x7f|x9f|switch|isFinite|boolean|apply|Array|Error|undefined|delete|bfnrt|9a|fA|true|false|eE|eval|SyntaxError'.split('|'),0,{}));
}
