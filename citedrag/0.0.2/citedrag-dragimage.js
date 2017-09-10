/*
CiteDrag + Drag Image - v0.0.2 - http://code.eligrey.com/citedrag/
@author Elijah Grey - www.eligrey.com
@license http://creativecommons.org/licenses/LGPL/2.1/
*/

var CiteDrag = {
	dragHandler: function(evt) {
		if ( typeof evt.dataTransfer != 'undefined' ) {
			var dt = evt.dataTransfer, canvas = document.createElement("canvas");
			if ( typeof canvas.getContext != 'undefined' && typeof dt.setDragImage != 'undefined' ) {
				var cutoff = 55,
				cutoffText = dt.getData("text/plain").substr(0,cutoff),
				dragImageText = cutoffText+(dt.getData("text/plain").length <= cutoff?'':'\u2026'),
				ctx = canvas.getContext("2d");
				canvas.height = 50;
				canvas.width = 300;
				ctx.textBaseline = "top";
				ctx.font = "20pt Arial";
				ctx.fillStyle = "black";
				ctx.fillText(dragImageText, 1, 1, canvas.width);
				ctx.fillStyle = "gray";
				ctx.fillText(dragImageText, 0, 0, canvas.width);
				dt.setDragImage(canvas, 0, canvas.height/2);
			}
			var originName = (document.title||location.hostname);
			if (typeof dt.getData("text/uri-list") != 'undefined') {
				var uriList = dt.getData("text/uri-list")+'\n#via '+originName+'\n'+location.href;
				dt.setData('text/uri-list', uriList);
				dt.setData('text/x-moz-url', uriList);
				dt.setData('text/html', dt.getData("text/html")+' via <a href="'+location.href+'" title="'+location.hostname+'">'+originName+'</a>');
				dt.setData('text/plain', dt.getData("text/plain")+' via '+originName+' ( '+location.href+' )');
			} else {
				if (typeof dt.getData("text/html") != 'undefined') dt.setData('text/html', '<blockquote cite="'+location.href+'">'+dt.getData("text/html")+'</blockquote> \u2015 <a title="'+location.host+'" href="'+location.href+'">'+originName+'</a>');
				if (typeof dt.getData("text/plain") != 'undefined') dt.setData('text/plain', '\u201C'+dt.getData("text/plain")+'\u201D \u2015 '+originName+' ( '+location.href+' )');
			}
		}
	},
	addEvent: function( obj, type, fn ) {
		if ( obj.attachEvent ) {
			obj.attachEvent( 'on'+type, fn );
		} else {
			obj.addEventListener( type, fn, false );
		}
	}
};

CiteDrag.addEvent(document, 'dragstart', CiteDrag.dragHandler);