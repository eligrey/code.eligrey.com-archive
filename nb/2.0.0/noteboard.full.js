/*  License
Noteboard - v2.0.0 - noteboard.eligrey.com
Creative Commons (CC) License:
Attribution-Noncommercial-Share Alike 3.0 Unported
http://creativecommons.org/licenses/by-nc-sa/3.0/
Author: Elijah Grey - www.eligrey.com
*/
var nbTitle = 'Noteboard';


//{ start
document.title = nbTitle;
//{ init vars
var _host_ = document.domain || location.hostname || (window.opener ? window.opener.document.domain : false) || null,
nbArea,
statsBar,
tab_code = '\t',
isCtrl = false,
isAlt = false,
isShift = false,
nb,
current_doc,
statsBarContainer,
version = '2.0.0';

/*var lastKP = null
,lastKU = null*/
//} init vars

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

function loadNB(data)
{
	var e = document.createElement('script');
	e.setAttribute('type', 'text/javascript');
	e.innerHTML = data;
	document.getElementsByTagName('head')[0].appendChild(e);
}

function autoLoadDoc()
{
	if ( location.search.search(/doc=.+/) != -1 )
	{
		loadDoc(decodeURIComponent(location.search.substr(location.search.search(/doc=.+/)+4)));
	}

	else if ( location.href.search(/#doc=.+/) != -1 )
	{ 
		loadDoc(decodeURIComponent(location.href.substr(location.href.search(/#doc=.+/)+5)));
	}
}

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
	statsBar = document.getElementById('statsBar');
	statsBarContainer = document.getElementById('statsBarContainer');
	nbArea.addEventListener('keydown',respondToKP,false);
	nbArea.addEventListener('keyup',respondToKU,false);
	nbArea.focus();
	try
	{
		init();
	}
	catch(e) {}
}
function init()
{
	/* // save like crazy
	nbArea.addEventListener('keyup', storeData, false);
	nbArea.addEventListener('mouseup', storeData, false);
	nbArea.addEventListener('blur', storeData, false);
	*/
	if ( storageInterface.getItem('nb') != null )
	{
		loadNB(storageInterface.getItem('nb'));
		window.onresize = resizeTextBox;
		//nb = storageInterface.getItem('nb');
		showHideStatsBar(nb.statsBarOn);
		if ( location.search.search(/doc=.+/) != -1 || location.href.search(/#doc=.+/) != -1 )
				{
					autoLoadDoc();
				}
				else
				{
					loadDoc(nb.previous_doc);
				}
				nbArea.value = nb.docs[current_doc].text;
				statsBar.value = nb.docs[current_doc].stats;
			}
			else
			{
				firstRun();
			}
			window.onunload = closingSave;
			nbArea.focus();
		}

		function firstRun()
		{
			nb = {'version':version,
				'docs': 
				{'shortcuts': 
					{
						'text': welcomeText,
						'stats': getStats(welcomeText)
					}
				},
				'previous_doc':false,
				'statsBarOn':false};
			window.onresize = resizeTextBox;
			showHideStatsBar(nb.statsBarOn);
			loadDoc('shortcuts');
		}

function createNewDoc(docID, text)
{
	storeData();
	nb.previous_doc = current_doc;
	current_doc = docID;
	nb.docs[docID] = {};
	nb.docs[docID].text = text || '';
	nb.docs[docID].stats = getStats(nb.docs[docID].text);
	loadDoc(docID);
}

function loadDoc(docID)
{
	if ( !current_doc ) { current_doc = docID; }
	nb.previous_doc = current_doc;

	if ( nb.docs[docID] )
	{
		isValidDoc = true;
		nbArea.value = nb.docs[docID].text;
		//	statsBar.value = nb.docs[docID].stats;
		current_doc = docID;
		document.title = docID.substr(0,1).toUpperCase()+docID.substr(1) + ' - ' + nbTitle;
	}
	else if ( !nb.docs[docID] )
	{
		alert('Invalid document.');
	}
}

function showHideStatsBar(toState)
{
	nb.statsBarOn = toState;
	resizeTextBox();
	
	if (nb.statsBarOn == false)
	{
		//nbArea.removeEventListener('keyup', updateStatsBar, false);
		nbArea.onkeyup = undefined;
		statsBarContainer.style.display = "none";
	}
	else if (nb.statsBarOn == true)
	{
		//nbArea.addEventListener('keyup', updateStatsBar, false);
		nbArea.onkeyup = updateStatsBar;
		statsBarContainer.style.display = "inline";
	}
}

function switchToDoc(docID)
{
	if ( nb.docs[current_doc] ) { storeData(); }
	loadDoc(docID);
}

function deleteDoc(docID)
{
	delete nb.docs[docID];
	if (current_doc == docID) { nbArea.value = ''; updateStatsBar(); document.title = nbTitle; loadDoc(nb.previous_doc); }
}

function renameDoc(docID)
{
	storeData();
	var oldName = current_doc;
	createNewDoc(docID, nb.docs[current_doc].text);
	switchToDoc(docID);
	deleteDoc(oldName);
}

function updateStatsBar()
{
	statsBar.value = getStats();
}

function getStats(text)
{
	var textStats = {}, textStatusStr;
	var textStr = text || nbArea.value;
	textStats.characters = textStr.length;
	textStats.words = 0;
	((textStr+' ').replace( /<.[^<>]*?>/g, ' ' ).replace( /&nbsp;/gi, ' ' ).replace( /[0-9.(),;:!?%#$¿'"_+=\\/-]*/g, '' ).replace( /\S\s+/g, function(){textStats.words++;} ));
textStats.lines = textStr.replace(/[^\n]/g,'').length+1;
textStats.whitespace = textStr.replace(/[^\s]/g,'').length;
textStats.spaces = textStr.replace(/[^ ]/g,'').length;
/*textStats.tabs = textStr.replace(/[^\t]/g,'').length;*/
textStats.numbers = textStr.replace(/[^0-9]/g,'').length;
textStatusStr = 'Lines: '+textStats.lines+'; Words: '+textStats.words+'; Characters: '+textStats.characters+'; Spaces: '+textStats.spaces+'; Numbers: '+textStats.numbers+/*'; Tabs: '+textStats.tabs+*/'; All Whitespace: '+textStats.whitespace;
return textStatusStr;
}

function stopEvent(event) {
	event.preventDefault();
	event.stopPropagation();
	event.stopped = true;
}

var Base64={'_keyStr':"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",'encode':function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}return output;},'decode':function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}if(enc4!=64){output=output+String.fromCharCode(chr3);}}output=Base64._utf8_decode(output);return output;},'_utf8_encode':function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;},'_utf8_decode':function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}return string;}};

function exportNB()
{
	return Base64.encode(uneval(nbObj()));
}

function importNB(nbExport)
{
	loadNB('nb = '+Base64.decode(nbExport));
	showHideStatsBar(nb.statsBarOn);
	loadDoc(nb.previous_doc, true);
	nb.previous_doc = current_doc;
}

function allModifersOff()
{
isShift = false;
isCtrl = false;
isAlt = false;
}

function respondToKP(e)
{
if ( e.keyCode == 17 )
	{
		isCtrl = true;
	}

if ( e.keyCode == 18 )
	{
		isAlt = true;
	}

if ( e.keyCode == 18 )
	{
		isAlt = true;
	}
	
if ( e.keyCode == 16 )
	{
		isShift = true;
	}

if ( e.keyCode == 83 && isCtrl == true ) // Ctrl + S
	{
		storeData(nb);
		alert('Saved');
		stopEvent(e);
		allModifersOff();
	}

if ( e.keyCode == 86 && isCtrl == true ) // Ctrl + V; you just pasted, don't want to lose this
	{
		storeData();
		allModifersOff();
	}

if ( e.keyCode == 79 && isAlt == true && ( isCtrl == true || isShift == true ) ) // Ctrl + Alt + O or Alt + Shift + O; open doc
	{
		var docName = prompt('Enter name of document to open:\n'+docList().join('\n'));
		if (docName != '' && docName != null ) { switchToDoc(docName); }
		stopEvent(e);
		allModifersOff();
	}
	
if ( e.keyCode == 85 && isAlt == true && ( isCtrl == true || isShift == true ) ) 
	{
		var autoLoadMethod = '#';
		var methodExpl = '"#"';
		if ( isCtrl == true && isShift == false ) { autoLoadMethod = '?'; methodExpl = 'a query string'; }
		// Alt + Shift + U; get autoload URL using #
		// Alt + Ctrl + U; get autoload URL using ?
		var autoLoadURL = location.href;
		if ( location.href.search(/#/) != -1 && location.search == '' ) { autoLoadURL = autoLoadURL.split(location.href.search(/#/))[0]; }
		else if ( location.search != '' ) { autoLoadURL = autoLoadURL.split(location.search)[0]+autoLoadMethod+'doc='+current_doc; }
		if ( location.search == '' && location.href.search(/#/) == -1 ) { autoLoadURL = autoLoadURL+autoLoadMethod+'doc='+current_doc; }
		prompt('Autoload URL for this document using '+methodExpl+':', autoLoadURL);
		stopEvent(e);
		allModifersOff();
	}

if ( (e.keyCode == 78 || e.keyCode == 67) && isAlt == true && isShift == true ) // Alt + Shift + N or Alt + Shift + C; new doc
	{
		var docName = prompt('Enter name of document to create.\nExisting Documents:\n'+docList().join('\n'));
		if (docName != '' && docName != null ) { createNewDoc(docName); }
		stopEvent(e);
		allModifersOff();
	}

if ( e.keyCode == 49 && isCtrl == true && isShift == true ) // Ctrl + Shift + 1; import
	{
		var importStr = prompt('Import a Noteboard Export\n\nEnter Noteboard export data here.');
		if (importStr != '' && importStr != null ) { importNB(importStr); }
		stopEvent(e);
		allModifersOff();
	}

if ( e.keyCode == 50 && isCtrl == true && isShift == true ) // Ctrl + Shift + 2; export
	{
		var doExport = confirm('Get Noteboard export data?');
		if ( doExport == true ) { prompt('Noteboard-Export data:',exportNB()); }
		stopEvent(e);
		allModifersOff();
	}

if ( e.keyCode == 82 && isAlt == true && isShift == true ) // Alt + Shift + R; rename current doc
	{
		var docName = prompt('Enter name to rename current document ('+current_doc+') to.\nExisting Documents:\n'+docList().join('\n'));
		if (docName != '' && docName != null ) { renameDoc(docName); }
		stopEvent(e);
		allModifersOff();
	}

if ( e.keyCode == 68 && isAlt == true && isShift == true ) // Alt + Shift + D; delete a doc
	{
		var docName = prompt('Enter name of document to delete:\n'+docList().join('\n'));
		if (docName != '' && docName != null && nb.docs[docName] )
		{
			deleteDoc(docName);
			alert('The document, "'+docName+'", has been deleted.');
		}
		else if ( !nb.docs[docName] && docName != '' && docName != null ) { alert('Invalid document.'); }
		else { alert('No documents deleted.'); }
		stopEvent(e);
		allModifersOff();
	}
	
if ( e.keyCode == 73 && isAlt == true && isCtrl == true ) // Alt + Ctrl + I; toggle text stats bar
	{
		showHideStatsBar(!nb.statsBarOn);
		saveNB();
		stopEvent(e);
		allModifersOff();
	}
	
if ( e.keyCode == 68 && isAlt == true && isCtrl == true ) // Alt + Ctrl + D; delete all data  w/ confirmation
	{
		var reallyDelete = confirm('You are about to delete all data stored by Noteboard on '+_host_);
		if ( reallyDelete == true )
		{
			deleteAllData();
			alert('All Noteboard data on '+_host_+' deleted.');
		}
		else { alert('No documents deleted.'); }
		stopEvent(e);
		updateStatsBar();
		allModifersOff();
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

if ( e.keyCode == 16 )
	{
		isShift = false;
	}

	//lastKU = e.keyCode;

}

function docList()
{
	var docArr = [];
if (nb.docs)
	{
	for (var i in nb.docs)
		{
			docArr.push(i);
		}
	}
	return docArr;
}

function insertIntoTextarea(field, val)
{
if (document.selection)
	{
		field.focus();
		sel = document.selection.createRange();
		sel.text = val;
	}
else if (field.selectionStart || field.selectionStart == 0.)
	{
		var prev_scroll = field.scrollTop;
		var startPos = field.selectionStart;
		var endPos = field.selectionEnd;
		field.value = field.value.substring(0, startPos) + val + field.value.substring(endPos, field.value.length);
		field.selectionEnd = field.selectionStart = startPos+val.length;
		field.scrollTop = prev_scroll;
	}
}

function resizeTextBox()
{
	//	nbArea.style.height = window.innerHeight-21+'px';
	var offset;
switch (nb.statsBarOn)
	{
	case true: offset = 21; break;
	default: offset = 0; break;
	}
	nbArea.style.height = window.innerHeight-(offset)+'px';
}

function nbObj()
{
	return ({'version':version, /*'host':_host_,*/ 'docs': nb.docs, 'previous_doc':nb.previous_doc, 'statsBarOn':nb.statsBarOn});
}

function saveNB()
{
	storageInterface.setItem('nb', 'nb = '+uneval(nbObj()));
	//	storageInterface.setItem('nb', ({docs: nb.docs, previous_doc:nb.previous_doc}));
}

function storeData()
{
	nb.docs[current_doc].text = nbArea.value;
	nb.docs[current_doc].stats = getStats();
	saveNB();
}

function closingSave()
{
	nb.previous_doc = current_doc;
	storeData();
}

/*

function resumeStoringData()
{
	saveNB();
	window.onunload = closingSave;
	nbArea.removeEventListener('keydup',resumeStoringData,false);
}

*/

function deleteNB()
{
	storageInterface.removeItem('nb');
}


function deleteAllData()
{
	storageInterface.removeItem('nb');
	nbArea.value = '';
	nbArea.disabled = true;
	nbArea.style.cursor = 'default';
	window.onunload = deleteNB;
	showHideStatsBar(false);
	document.title = nbTitle;
//	nbArea.addEventListener('keyup',resumeStoringData,false);
//	nbArea.focus();
}


if ( typeof document.addEventListener !== undefined ) {
	document.addEventListener("DOMContentLoaded", function() {
		startInit();
	}, false);
}

var welcomeText = ['Welcome to Noteboard; the online\u2014offline notepad. All of your text is stored offline on your computer. Nothing is stored on servers.',
"This is the 'shortcuts' document\n",
'Here are some useful keyboard shortcuts for using Noteboard:',
'Save \u2014 Ctrl (+ Alt) + S\nPaste and Save \u2014 Ctrl + V',
'Create New Document \u2014 Alt + Shift + N or Alt + Shift + C',
'Open Document \u2014 Ctrl + Alt + O or Alt + Shift + O',
'Rename Current Document \u2014 Alt + Shift + R',
'Toggle Text Info Bar \u2014 Alt + Ctrl + I',
'Delete a Document \u2014 Alt + Shift + D',
'Delete ALL Data Stored by Noteboard \u2014 Alt + Ctrl + D',
'Insert Tab \u2014 <tab key>',
'Import \u2014 Ctrl + Shift + 1',
'Export \u2014 Ctrl + Shift + 2',
'Get Document Autoload URL (using "#") \u2014 Alt + Shift + U',
'Get Document Autoload URL (using query) \u2014 Ctrl + Alt + U'].join('\n');
//} end

