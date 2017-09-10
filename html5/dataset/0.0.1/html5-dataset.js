/*
@name HTML 5 dataset Support
@version 0.0.1
@home http://code.eligrey.com/html5/dataset/
@author Elijah Grey - eligrey.com
@license http://creativecommons.org/licenses/LGPL/2.1/
*/
Element.prototype.setDataAttribute = function(name, value) {
	if ( typeof(name) == 'undefined' || typeof(value) == 'undefined' ) throw new Error('NOT_ENOUGH_ARGS');
	return this.setAttribute('data-'+name, value);
};
Element.prototype.removeDataAttribute = function(name) {
	if ( typeof(name) == 'undefined' ) throw new Error('NOT_ENOUGH_ARGS');
	return this.removeAttribute('data-'+name);
};
Element.prototype.setDataAttributes = function(items) {
	if ( items instanceof Object ) {
		for (i in items) {
			this.setDataAttribute(i, items[i]);
		}
	}
};
if ( typeof(document.documentElement.dataset) == 'undefined' ) {
	Element.prototype.__defineGetter__("dataset", function() {
	var HTML5_dataset = {};
	function returnValFunc(val) { return function(){return val} };
	function dataSetterFunc(ref_el, attrName) { return function(x){ return ref_el.setDataAttribute(attrName, x) } };
	for ( attr in this.attributes ) {
		if ( this.attributes[attr].name && /^data-[a-z_\-\d]*$/i.test(this.attributes[attr].name) ) {
			var attrName = this.attributes[attr].name.substr(5);
			HTML5_dataset.__defineGetter__(attrName, returnValFunc(this.attributes[attr].value || '') );
			HTML5_dataset.__defineSetter__(attrName, dataSetterFunc(this, attrName) );
		}
	}
	return HTML5_dataset;
	});
}