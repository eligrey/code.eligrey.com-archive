/* CiteDrag
@version 0.0.3
@archive http://code.eligrey.com/citedrag/
@desc Adds citations to dragged content.
@license GPL v3 and X11/MIT License
         http://eligrey.com/about/license/
@author Elijah Grey, http://eligrey.com
*/

var CiteDrag = {
  dragHandler: function(evt) {
    if (typeof evt.dataTransfer != "undefined") {
      var dt = evt.dataTransfer,
      originName = (document.title||location.hostname);

      // store original data in case a website wants it
      if (dt.getData("text/html"))
        dt.setData("text/x-original-html", dt.getData("text/html"));
      if (dt.getData("text/plain"))
        dt.setData("text/x-original-plain", dt.getData("text/plain"));

      // for some crazy reason, WebKit thinks a page shouldn't be allowed to access dt.getData of a drag originating FROM THE SAME PAGE
      // https://bugs.webkit.org/show_bug.cgi?id=23695
      
      
      if (dt.getData("text/uri-list")) { // dragged an image or link
        
        if (dt.getData("text/x-moz-url")) { // mozilla link list format; supports #comments
          var uriCitation = "\n#via " + originName + " ( " + location.href + " )",
          uriList = dt.getData("text/x-moz-url")
            .replace(/\n#.*/g, "") // remove comments
            .split(/\n/).join(uriCitation) + uriCitation; // add citations as comments
          dt.setData("text/x-moz-url", uriList);
          /* example:
          http://foo.example/
          http://bar.example/
          
          becomes:
          http://foo.example/
          #via site ( uri )
          http://bar.example/
          #via site ( uri )
          */
        }
        
        if (dt.getData("text/html"))
          dt.setData("text/html", // link via <a href={uri}>site</a>
            dt.getData("text/html") + ' via <a href="' +location.href + '" title="' + location.hostname + '">' + originName + "</a>"
          );

        if (dt.getData("text/plain"))
          dt.setData("text/plain", // uri via site ( uri )
            dt.getData("text/plain") + " via " + originName+' ( '+location.href+' )'
          );
      } else if (dt.getData("text/plain")) { // dragged html or plain text
      
        if (dt.getData("text/html"))
          dt.setData("text/html", // <blockquote.../> - <a href={uri}>site</a>
            '<blockquote cite="'+location.href+'">' + dt.getData("text/html") + '</blockquote> \u2015 <a title="' +location.host + '" href="' + location.href + '">' + originName + "</a>"
          );

        if (dt.getData("text/plain"))
          dt.setData("text/plain", // "content" - site ( uri )
            "\u201C" + dt.getData("text/plain") + "\u201D\n  \u2015 " + originName + " ( " + location.href + " )"
          );
      }
    }
  },

  // the rest is self-explanatory

  enable: function() {
    if (document.addEventListener)
      document.addEventListener("dragstart", CiteDrag.dragHandler, false);
    else if (document.attachEvent)
      document.attachEvent("ondragstart", CiteDrag.dragHandler);
  },

  disable: function() {
    if (document.removeEventListener)
      document.removeEventListener("dragstart", CiteDrag.dragHandler, false);

    else if (document.detachEvent)
      document.detachEvent("ondragstart", CiteDrag.dragHandler);
  }
};

CiteDrag.enable();
