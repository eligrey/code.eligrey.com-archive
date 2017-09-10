/*
@desc Implements localStorage and Storage.prototype.clear in globalStorage-supporting browsers.
@license http://www.gnu.org/licenses/lgpl.html
@version 0.0.1
@author Elijah Grey - eligrey.com
*/
if ( typeof localStorage == "undefined" && typeof globalStorage == "object" && location.host !== "" ) {
	var localStorage = globalStorage[location.hostname];
}

if ( typeof Storage != "undefined" ) {
	Storage.prototype.clear = function clear() {
		for ( var i=0; i<this.length; i++ ) this.removeItem( this.key(i) );
	}
}
