/*
Noteboard - v1.0.1 - noteboard.eligrey.com
Creative Commons (CC) License:
Attribution-Noncommercial-Share Alike 3.0 Unported
http://creativecommons.org/licenses/by-nc-sa/3.0/
Author: Elijah Grey - www.eligrey.com
*/
var _host_ = document.domain || location.hostname || (window.opener ? window.opener.document.domain : false) || null, nbArea, textStatsBar, /*statusbar,*/ tab_code = '\t', /*lastKP = null, lastKU = null,*/ isCtrl = false, isAlt = false;
var nb={'version':'1.0.1'};

function getStorageInterface()
{
if ( typeof localStorage != 'undefined' && _host_ !== null )
	{
	return localStorage[_host_];
	}
	
else if ( typeof globalStorage != 'undefined' && _host_ !== null )
	{
	return globalStorage[_host_];
	}
	
else if ( typeof sessionStorage != 'undefined' )
	{
	return sessionStorage;
	}

return null;
}

var storageInterface = getStorageInterface();

/*
function err(err_msg)
{
alert(err_msg);
throw new Error(err);
}
*/
function startInit()
	{
	nbArea = document.getElementById('storedTextBox');
	textStatsBar = document.getElementById('textStatsBar');
	//statusbar = document.getElementById('statusbar');
	window.onresize = resizeTextBox;
	resizeTextBox();
	nbArea.addEventListener('keydown',respondToKP,false);
	nbArea.addEventListener('keyup',respondToKU,false);
	nbArea.addEventListener('keyup', updateStatsBar, false);
	nbArea.focus();
	try
		{
		init();
		}
	catch(e) {}
	}
function init()
	{
	window.onunload = storeData;
	/* // save like crazy
	nbArea.addEventListener('keyup', storeData, false);
	nbArea.addEventListener('mouseup', storeData, false);
	nbArea.addEventListener('blur', storeData, false);
	*/
	if ( storageInterface.getItem('nb_storedText') != null )
		{
		nbArea.value = storageInterface.getItem('nb_storedText');
		textStatsBar.value = storageInterface.getItem('nb_stats');
		}
	else if ( storageInterface.getItem('nb_storedText') == null )
		{
		nbArea.value = '';
		updateStatsBar();
		}
	nbArea.focus();
	}

function updateStatsBar()
{
var textStats = {}, textStatusStr;
var textStr = nbArea.value;
textStats.characters = textStr.length;
textStats.words = 0;
((textStr+' ').replace( /<.[^<>]*?>/g, ' ' ).replace( /&nbsp;/gi, ' ' ).replace( /[0-9.(),;:!?%#$¿'"_+=\\/-]*/g, '' ).replace( /\S\s+/g, function(){textStats.words++;} ));
textStats.lines = textStr.replace(/[^\n]/g,'').length+1;
textStats.whitespace = textStr.replace(/[^\s]/g,'').length;
textStats.spaces = textStr.replace(/[^ ]/g,'').length;
//textStats.tabs = textStr.replace(/[^\t]/g,'').length;
textStats.numbers = textStr.replace(/[^0-9]/g,'').length;
textStatusStr = 'Lines: '+textStats.lines+'; Words: '+textStats.words+'; Characters: '+textStats.characters+'; Spaces: '+textStats.spaces+'; Numbers: '+textStats.numbers+/*'; Tabs: '+textStats.tabs+*/'; All Whitespace: '+textStats.whitespace;
textStatsBar.value = textStatusStr;
//window.status = textStatusStr;
}

function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopped = true;
}


function respondToKP(e)
{
window.onunload = storeData;
if ( e.keyCode == 17 )
	{
	isCtrl = true;
	}

if ( e.keyCode == 18 )
	{
	isAlt = true;
	}

if ( e.keyCode == 83 && isCtrl == true ) // Ctrl + S
	{
	storeData();
	alert('Saved');
	stopEvent(e);
	isCtrl = false;
	}

if ( e.keyCode == 86 && isCtrl == true ) // Ctrl + V; you just pasted, don't want to lose this
	{
	storeData();
	}

if ( e.keyCode == 68 && isAlt == true && isCtrl == true ) // Alt + Ctrl + D; delete all data  w/ confirmation
	{
	var reallyDelete = confirm('You are about to delete all data stored by Noteboard on '+_host_);
	if ( reallyDelete == true )
		{
		deleteAllData();
		alert('All Noteboard data on '+_host_+' deleted.');
		}
	stopEvent(e);
	updateStatsBar();
	isAlt = false;
	isCtrl = false;
	}
	
else if ( e.keyCode == 9 ) // <tab>
	{
	insertIntoTextarea(nbArea, tab_code);
    stopEvent(e);
	}
	
//lastKP = e.keyCode;

}

function respondToKU(e)
{

if ( e.keyCode == 17 )
	{
	isCtrl = false;	
	}

if ( e.keyCode == 18 )
	{
	isAlt = false;
	}

//lastKU = e.keyCode;

}

function insertIntoTextarea(myField, myValue)
{
  if (document.selection)
  {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
  }
  else if (myField.selectionStart || myField.selectionStart == 0.)
  {
    var prev_scroll = myField.scrollTop;
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    myField.selectionEnd = myField.selectionStart = startPos+myValue.length;
    myField.scrollTop = prev_scroll;
  }
}

function resizeTextBox()
{
nbArea.style.height = window.innerHeight-21+'px';
}

function storeData()
{
storageInterface.setItem('nb_storedText', nbArea.value);
updateStatsBar();
storageInterface.setItem('nb_stats', textStatsBar.value);
}

function deleteAllData()
{
storageInterface.removeItem('nb_storedText');
storageInterface.removeItem('nb_stats');
nbArea.value = '';
window.onunload = function(){};
nbArea.focus();
}


if ( typeof document.addEventListener !== undefined ) {
	document.addEventListener("DOMContentLoaded", function() {
	startInit();
 }, false);
}