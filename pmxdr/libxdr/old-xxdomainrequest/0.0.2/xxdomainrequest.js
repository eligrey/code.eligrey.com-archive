/* XXDomainRequest: Cross-browser XDomainRequest
@version 0.0.2
@requires pmxdr client library, http://code.eligrey.com/pmxdr/client/
@archive http://code.eligrey.com/pmxdr/xdomainrequest/
@desc Implements XDomainRequest using the pmxdr client library
@license http://eligrey.com/about/license/
         GPL 3, LGPL 3, and X11/MIT Licensed
@author Elijah Grey, http://eligrey.com
*/

if (this.XDomainRequest) { // IE, XDR needs extending

  (function(){
  
    function unsupportedFunction(fn) {
      return "XDomainRequest: " + fn + "() is not supported.";
    }
  
    var extensions = { // extend this onto XDomainRequest.prototype
      status     : 200,
      statusText : "OK",
      readyState : 4,
      setRequestHeader : function(/*header, value*/) {
        throw new RangeError(unsupportedFunction("setRequestHeader"));
      },
      getResponseHeader : function(/*header*/) {
        throw new RangeError(unsupportedFunction("getResponseHeader"));
      },
      getAllResponseHeaders : function() {
        throw new RangeError(unsupportedFunction("getAllResponseHeaders"));
      },
    };


    if (Object.defineProperty) { // simulate some XHR features
  
      // make xdr.prototype.onreadystatechange setter
      Object.defineProperty(XDomainRequest.prototype, "onreadystatechange", {
        get : function() {
          return this.onload;
        },
        set : function(fn) {
          return this.onload = fn;
        }
      });
    
      // simulate responseXML
      Object.defineProperty(XDomainRequest.prototype, "responseXML", {get: function() {
        var xmlDocument = null;
        try { // load XML with XMLDOM ActiveX
          xmlDocument = new ActiveXObject("Microsoft.XMLDOM");
          xmlDocument.loadXML(this.responseText);
        } catch (e) {
          try { // in case a standards-compliant browser goes ahead and implements IE8's crippled XDomainRequest
            xmlDocument = (new DOMParser()).parseFromString(this.responseText, "application/xml");
          } catch (e) {}
        }
        if (xmlDocument)
          return xmlDocument
      }})
    
    }
    
    for (var prop in extensions)
      if (extensions.hasOwnProperty(prop))
        XDomainRequest.prototype[prop] = extensions[prop];
  })();

} else if (!this.XDomainRequest) { // normal browser
  
  this.XDomainRequest = new Function();
  
  XDomainRequest.defaultTimeout = 10000; // default timeout; 10000 is IE8's default

  XDomainRequest.prototype = {
  
    open: function (method, uri) {
      this.request = { // request object for pmxdr.request
        method : method,
        uri    : uri,
        headers: {}
      }
    },
      
    setRequestHeader: function(header, value) {
      this.request.headers[header.toLowerCase()] = value;
    },
    
    removeRequestHeader: function(header) {
      delete this.request.headers[header.toLowerCase()];
    },
      
    send: function (data) {
      var instance = this; // for minification & reference to this
      instance.request.data = data;
      instance.request.callback = function(response) {
        instance.readyState = 4; // for onreadystatechange
      
        if (response.error) {
          if (response.error == "DISALLOWED_REQUEST_METHOD") {
            instance.status = 405; // 405 Method Not Allowed
            instance.statusText = "Method Not Allowed";
          }
    
          else if (response.error == "TIMEOUT") {
            instance.status = 408; // 408 Request Timeout
            instance.statusText = "Request Timeout";
          }
          
          else if (response.error == "DISALLOWED_ORIGIN") {
            instance.status = 412; // 412 Precondition Failed (seems right for disallowed origin)
            instance.statusText = "Precondition Failed";
          }
        } else {
          if (response.status)
            instance.status = response.status;
          if (response.statusText)
            instance.statusText = response.statusText;
        }
    
          if (!instance.status)
            instance.status = 200; // pmxdr host wouldn't respond unless the status was 200 so default to it
        
        
        if (typeof instance.onerror == "function" && response.error)
          return instance.onerror();
        
        if (typeof instance.ontimeout == "function" && instance.status == 408)
          return instance.ontimeout();
    
        var xmlDocument = null;
        try { // parse responseText and simulate responseXML
          xmlDocument = (new DOMParser()).parseFromString(response.data, "application/xml");
        } catch(e) {}
          
        instance.responseXML = xmlResponse;
        
        instance.responseText = response.data;
        
        instance.contentType = response.headers["content-type"];
           
        var headers = [];
        for (var header in response.headers) // recreate the getAllResponseHeaders string
          if (response.headers.hasOwnProperty(header))
            headers.push(header + ": " + response.headers[header]);
       
        headers = headers.join("\r\n");
        instance.getAllResponseHeaders = function() {
          return headers;
        }
        
        instance.getResponseHeader = function(header) {
          return response.headers[header.toLowerCase()] || null;
        }
          
          
        if (instance.timeout) instance.request.timeout = instance.timeout;
        else if(XDomainRequest.defaultTimeout) instance.request.timeout = XDomainRequest.defaultTimeout;
          
          
        if (typeof instance.onreadystatechange == "function")
          instance.onreadystatechange();
        if (typeof instance.onprogress == "function")
          instance.onprogress();
        if (typeof instance.onload == "function")
          instance.onload();
         
      };
      
        
      // do the request and get the abort method
      var aborter = pmxdr.request(instance.request).abort;
        
      instance.abort = function() {
        aborter();
      };
    },
  
    abort: function() { // default abort
      delete this.request;
    }
  }
}
