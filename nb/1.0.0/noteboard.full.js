/*
Creative Commons (CC) License:
Attribution-Noncommercial-Share Alike 3.0 Unported
http://creativecommons.org/licenses/by-nc-sa/3.0/
Author: Elijah Grey - www.eligrey.com
noteboard.eligrey.com
*/

var _host_ = document.domain || location.hostname || (window.opener ? window.opener.document.domain : false) || null, textBox, textStatsBar, /*statusbar,*/ tab_code = '\t';
/*
function error_alert(err_msg)
{
alert(err_msg);
throw new Error(err);
}
*/
function startInit()
	{
	textBox = document.getElementById('storedTextBox');
	textStatsBar = document.getElementById('textStatsBar');
	//statusbar = document.getElementById('statusbar');
	window.onresize=resizeTextBox;
	resizeTextBox();
	textBox.addEventListener('keydown', respondToKp, false);
	textBox.addEventListener('keydown', updatetextStatsBar, false);
	textBox.addEventListener('keyup', updatetextStatsBar, false);
	textBox.focus();
	try
		{
		init();
		}
	catch(e) {}
	}
function init()
	{
	window.onunload=storeText;
	/*
	textBox.addEventListener('keyup', storeText, false);
	textBox.addEventListener('mouseup', storeText, false);
	textBox.addEventListener('blur', storeText, false);
	*/
	if ('storedText' in globalStorage[_host_])
		{
		textBox.value = globalStorage[_host_].storedText;
		updatetextStatsBar();
		}
	textBox.focus();
	}

function updatetextStatsBar()
{
var textStats = {}, textStatusStr;
var textStr = textBox.value;
textStats.characters = textStr.length;
textStats.words = 0;
((textStr+' ').replace( /<.[^<>]*?>/g, ' ' ).replace( /&nbsp;/gi, ' ' ).replace( /[0-9.(),;:!?%#$¿'"_+=\\/-]*/g, '' ).replace( /\S\s+/g, function(){textStats.words++;} ));
textStats.lines = textStr.replace(/[^\n]/g,'').length+1;
textStats.whitespace = textStr.replace(/[^\s]/g,'').length;
textStats.spaces = textStr.replace(/[^ ]/g,'').length;
textStats.tabs = textStr.replace(/[^\t]/g,'').length;
textStats.numbers = textStr.replace(/[^0-9]/g,'').length;
textStatusStr = 'Lines: '+textStats.lines+'; Words: '+textStats.words+'; Characters: '+textStats.characters+'; Spaces: '+textStats.spaces+'; Numbers: '+textStats.numbers+'; Tabs: '+textStats.tabs+'; Total Whitespace: '+textStats.whitespace;
textStatsBar.value = textStatusStr;
//window.status = textStatusStr;
}

function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopped = true;
}


function respondToKp(event)
{
  if (event.keyCode == 9) 
  {
    insertIntoTextarea(textBox, tab_code);
    stopEvent(event);
  }
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
textBox.style.height = window.innerHeight-21+'px';
}
function storeText()
{
globalStorage[_host_].storedText = textBox.value;
}
/*
function clearStoredText()
{
globalStorage.namedItem(_host_).removeItem(storedText);
textBox.focus();
}
*/
if ( typeof document.addEventListener !== undefined ) {
	document.addEventListener("DOMContentLoaded", function() {
	startInit();
 }, false);
}