// load all scripts in /loaders/
(function(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "loaders/", true);
  xhr.setRequestHeader("User-Agent", "Gecko/"); // to get application/http-index-format
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200 && this.getResponseHeader("Content-Type") == "application/http-index-format") {
      var files = [];
      this.responseText.replace(/[\s\S]*?201:\s*"([^"]*).js".*/g, function() {
        if (RegExp.$1 != "all")
          files.push(RegExp.$1);
      });
      Shell.shellCommands.load(files);
    }
  }
  xhr.send(null);
})()
