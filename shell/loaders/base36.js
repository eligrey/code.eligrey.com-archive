base36 = { // U+200B is a zero-width space
  encode: function(str, separator)
    Array.map(""+(str||""), function(c) c.charCodeAt(0).toString(36)).join(separator||"\u200b"),
  decode: function(str, separator)
    (""+(str||"")).split(separator||"\u200b").map(function(s) String.fromCharCode(parseInt(s, 36))).join(""),
  ascii: {
    encode: function(str)
      Array.map(""+(str||""), function(c) {
        var b36 = base36.encode(c, "");
        if (b36.length === 1)
          b36 = "0" + b36;
        return b36;
      }).join(""),
    
    decode: function(str)
      (""+(str||"")).replace(/[a-z0-9]{2}/gi, function(s) base36.decode(s))
  }
};
