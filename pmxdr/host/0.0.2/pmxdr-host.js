/* pmxdr host: postMessage Cross-Domain Request host library
@version 0.0.2
@archive http://code.eligrey.com/pmxdr/host/
@desc Simple cross-site HTTP requesting using the postMessage API
@license http://www.gnu.org/licenses/lgpl.html
@author Elijah Grey - eligrey.com
*/

/* example alwaysTrustedOrigins settings:

var alwaysTrustedOrigins = [
    /^[\w-]+:(?:\/\/)?([\w\.-]+\.)?eligrey\.com(?::\d+)?$/, // any origin on any protocol that has a domain that ends in eligrey.com
    "http://www.google.com", // only http://www.google.com is allowed, not http://foo.google.com:30 or http://google.com
    /^https?:\/\/([\w\.-]+\.)?example\.com$/ // these will all be allowed: https://example.com, http://example.com, https://*.example.com, http://*.example.com
  ];

*/

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array();
    for (var i = 0; i < len; i++) {
      if (i in this) {
        if (fun(this[i], i, this))
          res.push(val);
      }
    }
    return res;
  };
}


(function() {
  var alwaysTrustedOrigins = [ // always trusted origins, can be exact strings or regular expressions
    
  ];

  if ( typeof window.opera != "undefined" ) { // Opera 9.x postMessage fix (only for http:, not https:)
    if ( parseInt(window.opera.version()) == 9 ) Event.prototype.__defineGetter__("origin", function(){
      return "http://" + this.domain;
    })
  }

  function handlePmxdrReq(evt) {
    var alwaysTrusted = false, origin = evt.origin, data = JSON.parse(evt.data), headers = [], contentType_set = false;
    
    if ( data.pmxdr == true ) { // only handle pmxdr requests
    
      function err(errorCode/*, errorMessage*/) {
        var errorResponse = {pmxdr: true, error: errorCode};
        if ( data.id ) errorResponse.id = data.id;
        //if ( errorMessage ) errorResponse.errorMessage = errorMessage;
        evt.source.postMessage(JSON.stringify(errorResponse), origin);
      }
      
      if (alwaysTrustedOrigins.length >= 1) alwaysTrustedOrigins.forEach(function(pattern) {
        if (pattern instanceof RegExp) alwaysTrusted = pattern.test(evt.origin);
        else if (typeof pattern == "string") alwaysTrusted = (origin == pattern);
      });
      
      if (typeof data.method == "string") data.method = data.method.toUpperCase();
      
      var req = new XMLHttpRequest();
      req.open(data.method, data.uri, false); // synchronous request because iframes usually have their own threads
      
      if (data.headers)
        for ( var header in data.headers ) if (data.headers.hasOwnProperty(header)) {
          req.setRequestHeader(header, data.headers[header]);
          headers.push(header.toLowerCase());
        }
      
      if ( typeof data.data == "string" ) req.send(data.data)
      else req.send(null);

      if(req.status == 200) {
        function getResponseHeader(header) {
          return req.getResponseHeader(header)
        }
        
        var ac = { // access controls
          origin : (getResponseHeader("Access-Control-Allow-Origin")||"").replace(/\s/g, ""),
          methods: (getResponseHeader("Access-Control-Allow-Methods")||"").replace(/\s/g, ""),
          headers: (getResponseHeader("Access-Control-Allow-Headers")||"").replace(/\s/g, "")
        };
        
        if ( // determine if origin is trusted
             alwaysTrusted == true
             || ac.origin == "*"
             || ac.origin.indexOf(origin) != -1 )
        {
          if ( // determine if request method was allowed (shouldn't need to be done on Firefox 3.5+ and IE8+)
              !ac.methods
              || ac.methods == "*"
              || (typeof ac.methods == "string" && ac.methods.indexOf(data.method) != -1) )
          {
            var headersAllowed = true;
            if (data.headers && ac.headers) { // verify that only allowed custom headers are specified
              var allowedHeaders = ac.headers.toLowerCase().split(","); // extract allowed headers
              headers.filter(function(header) {
                return header.substr(0,2) == "x-";
              }).forEach(function(header){
                headersAllowed = (allowedHeaders.indexOf(header) != -1);
              })
            }

            if (headersAllowed) {
              var response = {
                pmxdr       : true, // signify that this is the response of a pmxdr request
                contentType : getResponseHeader("Content-Type"),
                lastModified: getResponseHeader("Last-Modified"),
                expires     : getResponseHeader("Expires"),
                data        : req.responseText,
                headers     : {} // send this object even if there are no requested headers in case client tries to check response.headers[header]
              }; if ( typeof data.id != "undefined" ) response.id = data.id;
              
              if (Object.prototype.toString.call(data.getHeaders) == "[object Array]") // get headers requested
                data.getHeaders.forEach(function(header) {
                  response.headers[header.toLowerCase()] = getResponseHeader(header)
                });
                
              return evt.source.postMessage(JSON.stringify(response), origin)
            } else return err("DISALLOWED_HEADERS"/*, "At least one header was not allowed"*/);
          } else return err("DISALLOWED_REQUEST_METHOD"/*, "The request method was not allowed"*/);
        } else return err("DISALLOWED_ORIGIN"/*, "The host was not allowed to request the resource"*/);
      } else return err("LOAD_ERROR"/*, "Error loading the requested resource"*/);
      return err("UNKNOWN"/*, "Unknown Error"*/)
    }
  }
  
  if (window.addEventListener) window.addEventListener("message", handlePmxdrReq, false); // normal browsers
  else if (window.attachEvent) window.attachEvent("onmessage", handlePmxdrReq); // IE
})();

if ( typeof JSON == "undefined" ) {
  /* json2.js JSON API if browser does not natively support it
     This code block may look suspicious to you. That's because it's minified with YUI compressor, then /packer/.
     If you don't trust this code block, replace this block with your own minified http://www.json.org/json2.js
  */
  eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3(!l.m){m={}}(5(){5 f(n){7 n<10?"0"+n:n}3(6 V.q.p!=="5"){V.q.p=5(a){7 l.1o()+"-"+f(l.1p()+1)+"-"+f(l.1q())+"T"+f(l.1r())+":"+f(l.1s())+":"+f(l.1t())+"Z"};L.q.p=1u.q.p=1v.q.p=5(a){7 l.1w()}}w e=/[\\1x\\W\\X-\\Y\\11\\12\\13\\14-\\15\\17-\\18\\19-\\1a\\1b\\1c-\\1d]/g,G=/[\\\\\\"\\1y-\\1z\\1A-\\1B\\W\\X-\\Y\\11\\12\\13\\14-\\15\\17-\\18\\19-\\1a\\1b\\1c-\\1d]/g,8,y,1e={"\\b":"\\\\b","\\t":"\\\\t","\\n":"\\\\n","\\f":"\\\\f","\\r":"\\\\r",\'"\':\'\\\\"\',"\\\\":"\\\\\\\\"},o;5 H(b){G.1f=0;7 G.M(b)?\'"\'+b.z(G,5(a){w c=1e[a];7 6 c==="I"?c:"\\\\u"+("1g"+a.1h(0).N(16)).1i(-4)})+\'"\':\'"\'+b+\'"\'}5 A(a,b){w i,k,v,h,B=8,9,2=b[a];3(2&&6 2==="x"&&6 2.p==="5"){2=2.p(a)}3(6 o==="5"){2=o.J(b,a,2)}1C(6 2){C"I":7 H(2);C"O":7 1D(2)?L(2):"D";C"1E":C"D":7 L(2);C"x":3(!2){7"D"}8+=y;9=[];3(P.q.N.1F(2)==="[x 1G]"){h=2.h;E(i=0;i<h;i+=1){9[i]=A(i,2)||"D"}v=9.h===0?"[]":8?"[\\n"+8+9.K(",\\n"+8)+"\\n"+B+"]":"["+9.K(",")+"]";8=B;7 v}3(o&&6 o==="x"){h=o.h;E(i=0;i<h;i+=1){k=o[i];3(6 k==="I"){v=A(k,2);3(v){9.1j(H(k)+(8?": ":":")+v)}}}}Q{E(k 1k 2){3(P.1l.J(2,k)){v=A(k,2);3(v){9.1j(H(k)+(8?": ":":")+v)}}}}v=9.h===0?"{}":8?"{\\n"+8+9.K(",\\n"+8)+"\\n"+B+"}":"{"+9.K(",")+"}";8=B;7 v}}3(6 m.R!=="5"){m.R=5(a,b,c){w i;8="";y="";3(6 c==="O"){E(i=0;i<c;i+=1){y+=" "}}Q{3(6 c==="I"){y=c}}o=b;3(b&&6 b!=="5"&&(6 b!=="x"||6 b.h!=="O")){1m 1n 1H("m.R")}7 A("",{"":a})}}3(6 m.S!=="5"){m.S=5(c,d){w j;5 U(a,b){w k,v,2=a[b];3(2&&6 2==="x"){E(k 1k 2){3(P.1l.J(2,k)){v=U(2,k);3(v!==1I){2[k]=v}Q{1J 2[k]}}}}7 d.J(a,b,2)}e.1f=0;3(e.M(c)){c=c.z(e,5(a){7"\\\\u"+("1g"+a.1h(0).N(16)).1i(-4)})}3(/^[\\],:{}\\s]*$/.M(c.z(/\\\\(?:["\\\\\\/1K]|u[0-1L-1M-F]{4})/g,"@").z(/"[^"\\\\\\n\\r]*"|1N|1O|D|-?\\d+(?:\\.\\d*)?(?:[1P][+\\-]?\\d+)?/g,"]").z(/(?:^|:|,)(?:\\s*\\[)+/g,""))){j=1Q("("+c+")");7 6 d==="5"?U({"":j},""):j}1m 1n 1R("m.S")}}})();',62,116,'||value|if||function|typeof|return|gap|partial||||||||length||||this|JSON||rep|toJSON|prototype||||||var|object|indent|replace|str|mind|case|null|for||escapable|quote|string|call|join|String|test|toString|number|Object|else|stringify|parse||walk|Date|u00ad|u0600|u0604|||u070f|u17b4|u17b5|u200c|u200f||u2028|u202f|u2060|u206f|ufeff|ufff0|uffff|meta|lastIndex|0000|charCodeAt|slice|push|in|hasOwnProperty|throw|new|getUTCFullYear|getUTCMonth|getUTCDate|getUTCHours|getUTCMinutes|getUTCSeconds|Number|Boolean|valueOf|u0000|x00|x1f|x7f|x9f|switch|isFinite|boolean|apply|Array|Error|undefined|delete|bfnrt|9a|fA|true|false|eE|eval|SyntaxError'.split('|'),0,{}));
}
