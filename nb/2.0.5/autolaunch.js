var host = location.hostname || (window.opener ? window.opener.location.hostname : false) || null,
supported = false,
nbSettings = null;

window.name = 'noteboard_launcher';

if ( typeof(localStorage) != 'undefined' )
{
	supported = true;
	Storage.prototype.itemExists = function itemExists(item) { return (this.getItem(item) !== null && typeof(this.getItem(item)) !== 'undefined' ); }
}

else if ( typeof(globalStorage) != 'undefined' && typeof(localStorage) == 'undefined' && host !== null )
{
	supported = true;
	var localStorage = globalStorage[host];
	Storage.prototype.itemExists = function itemExists(item) { return (this.getItem(item) !== null && typeof(this.getItem(item)) !== 'undefined' ); }
}

if ( supported == false )
{
	document.title = "Noteboard Launcher";
	document.getElementById('doing').innerHTML="Error: Cannot Launch Noteboard";
	alert('Your browser does not support localStorage or globalStorage.\nPlease use a browser that does like Firefox 2+ or Safari 3.1.2 Nightlies');
	self.close();
}
if ( localStorage.itemExists('nb-settings') !== false )
{
	eval('nbSettings = '+localStorage.getItem('nb-settings'));
}

if ( navigator.userAgent.toLowerCase().search('webkit') == -1 && localStorage.itemExists('nb-settings') !== false ) // webkit doesn't even let you accept the popup :( and firefox needs a new popup to change size
{
	window.open('index.html','noteboard','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width='+nbSettings.width+',height='+nbSettings.height);
	self.close();
}

else
{
	window.name = 'noteboard';
	location.href = 'index.html';
	window.resizeTo(nbSettings.width, nbSettings.height);
}