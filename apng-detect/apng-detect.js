/*
 * apng-detect.js
 * 2010-06-13
 * By Elijah Grey, http://eligrey.com
 *
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */
(function() {
	"use strict";
	var apngTest = new Image(),
	ctx = document.createElement("canvas").getContext("2d");
	apngTest.onload = function () {
		ctx.drawImage(apngTest, 0, 0);
		self.apng_supported = ( ctx.getImageData(0, 0, 1, 1).data[3] === 0 );
	};
	apngTest.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==";
	// frame 1 (skipped on apng-supporting browsers): [0, 0, 0, 255]
	// frame 2: [0, 0, 0, 0]
}());
