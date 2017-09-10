/*  License
Noteboard - v2.0.3 - noteboard.eligrey.com - Some Rights Reserved (cc) Elijah Grey
Creative Commons GNU Lesser General Public License
http://creativecommons.org/licenses/LGPL/2.1/
Author: Elijah Grey - www.eligrey.com
const Contact_Email_Address = ['\x65\x6c\x69\x6a\x61\x68','\x67\x72\x65\x79\x2e\x6e\x61\x6d\x65'].join('\x40');
*/

//Not going to implement support for Google Gears, Flash storage, or any other third-party storage interface.

//nbTitle & nbAppName should be declared before packed script
;;;var nbAppName = 'Noteboard';
;;;var nbTitle = nbAppName;


//{ start
document.title = nbTitle;

//{ init vars
var host = location.hostname || (window.opener ? window.opener.location.hostname : false) || null,
nbArea,
statsBar,
tab_code = '\t',
isCtrl = false,
isAlt = false,
isShift = false,
current_doc,
statsBarContainer,
doc_head = document.getElementsByTagName('head')[0],
nb = null,
storagePaused = false,
isAutoloadURL = false;
/*var lastKP = null
,lastKU = null*/
//}

/* https://bugzilla.mozilla.org/show_bug.cgi?id=459338
if ( typeof(window.crypto.alert) != 'undefined' )
	{
	// alert box without extra 'The page at {host} says:' and then add '{app} at {host} says:'
	alert = function(msg){ window.crypto.alert(nbAppName+' at ' + host + (msg?' says:\n\n'+msg:'')) };
	}
*/

var Base64={'_keyStr':"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",'encode':function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}return output;},'decode':function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}if(enc4!=64){output=output+String.fromCharCode(chr3);}}output=Base64._utf8_decode(output);return output;},'_utf8_encode':function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;},'_utf8_decode':function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}return string;}};

/* https://bugzilla.mozilla.org/show_bug.cgi?id=439711
if ( typeof(window.btoa) != 'undefined' && typeof(window.atob) != 'undefined' )
{
Base64.encode = window.btoa;
Base64.decode = window.atob;
}
*/

// adv err func for debug
err = function err(err_msg, lineN, uriOverride)
{
	if ( err_msg.constructor.name == 'Array' ){err_report = err_msg[1]; err_msg = err_msg[0];}
	alert(err_msg);
	throw new Error(err_msg,'data:text/plain;error-report;uri='+encodeURIComponent(uriOverride||location.href)+';charset=utf-8;base64,'+Base64.encode((err_report?'':'Error: ')+(err_report||err_msg)+'\n\nTime of error: '+new Date()), lineN||1);
};

if ( typeof(globalStorage) != 'undefined' && typeof(localStorage) == 'undefined' && host !== null )
{
	var localStorage = globalStorage[host];
}

//var storageInterface = localStorage;

function loadJSCode(data) // using this instead of eval so then generated source includes nb object JSON
{
	if ( document.getElementById('nbdata') ) // Check for previous <script id="nbdata"> and delete if found
	{
		var oldJSC = document.getElementById('nbdata');
		//oldData.remove(oldJSC);
		doc_head.removeChild(oldJSC);
	}

	if ( !document.getElementById('nbdata') )
	{
		var jsc = document.createElement('script');
		jsc.setAttribute('type', 'text/javascript');
		jsc.setAttribute('id', 'nbdata');
		jsc.innerHTML = data;
		doc_head.appendChild(jsc);
	}
};

function autoLoadDoc()
{
	var docID, valid = false;
	if ( location.search.search(/doc=.+/) != -1 )
	{
		docID = decodeURIComponent(location.search.substr(location.search.search(/doc=.+/)+4));
		
		if ( nb.docs[docID] )
		{
			isAutoloadURL = true;
			valid = true;
			loadDoc(docID);
		}
	}

	else if ( location.hash.search(/doc=.+/) != -1 )
	{
		docID = decodeURIComponent(location.hash.substr(location.hash.search(/doc=.+/)+4));
		
		if ( nb.docs[docID] )
		{
			isAutoloadURL = true;
			valid = true;
			loadDoc(docID);
		}
	}

	if ( valid == false )
		{
			isAutoloadURL = false;
			loadDoc('shortcuts');
		}
};

var welcomeText = ['Welcome to '+nbAppName+'; the online\u2014offline notepad. All of your text is stored offline on your computer. Nothing is stored on servers.',
"This is the 'shortcuts' document\n",
'Here are some useful keyboard shortcuts for using '+nbAppName+':',
'Save \u2014 Ctrl (+ Alt) + S\nPaste and Save \u2014 Ctrl + V',
'Create New Document \u2014 Alt + Shift + N or Alt + Shift + C',
'Open Document \u2014 Ctrl + Alt + O or Alt + Shift + O',
'Rename Current Document \u2014 Alt + Shift + R',
'Toggle Text Info Bar \u2014 Alt + Ctrl + I',
'Delete a Document \u2014 Alt + Shift + D',
'Delete ALL Data Stored by '+nbAppName+' \u2014 Alt + Ctrl + D',
'Insert Tab \u2014 <tab key>',
'Import \u2014 Ctrl + Alt + 1',
'Export \u2014 Ctrl + Alt + 2',
'Get Document Autoload URL (using hash) \u2014 Alt + Shift + U',
'Get Document Autoload URL (using query) \u2014 Ctrl + Alt + U',
'Change Current Document Title \u2014 Ctrl + Alt + T',
'Bookmark '+nbAppName+' \u2014 Ctrl + D (Title will auto-change for bookmarking non-autoload URLs)',
'Quickly Access "shortcuts" \u2014 Ctrl + Alt + O and then push enter (leave prompt blank)'].join('\n');

var staticDocs = {'shortcuts':
	{
		'id': 'shortcuts',
		'text': welcomeText,
		'title': 'Shortcuts',
		'stats': getStats(welcomeText)
	}
};

function startInit()
{
	nbArea = document.getElementById('storedTextBox');
	statsBar = document.getElementById('statsBar');
	statsBarContainer = document.getElementById('statsBarContainer');
	
	function basicResizeTextBox()
	{
		nbArea.style.height = window.innerHeight+'px';
	}
	
	window.onresize = basicResizeTextBox;
	basicResizeTextBox();
	
	nbArea.addEventListener('keydown',respondToKP,false);
	nbArea.addEventListener('keyup',respondToKU,false);
	nbArea.focus();
	init();
};

function init()
{
	/* // to save on every keyup, ect.
	nbArea.addEventListener('keyup', storeData);
	nbArea.addEventListener('mouseup', storeData);
	window.addEventListener('blur', storeData);
	*/
	if ( localStorage.getItem('nb') !== null && localStorage.getItem('nb') !== undefined )
	{
		
		loadJSCode('var nb ='+localStorage.getItem('nb'));
		window.onresize = resizeTextBox;
		//nb = localStorage.getItem('nb');
		showHideStatsBar(nb.statsBarOn);
		
		if ( nb.previous_doc == '' || nb.previous_doc == false )
		{
			nb.previous_doc = 'shortcuts';
		}
		
		if ( location.search.search(/doc=.+/) != -1 || location.hash.search(/doc=.+/) != -1 )
		{
			autoLoadDoc();
		}
		else if ( nb.docs[nb.previous_doc] )
		{
			loadDoc(nb.previous_doc);
		}
		else
		{
			loadDoc('shortcuts');
		}
	}

	else
	{
		window.onresize = resizeTextBox;
		firstRun();
	}

	window.onunload = closingSave;
	nbArea.focus();
};

function resetNB()
{
	nb = {	'docs': {},
		'previous_doc':false,
		'statsBarOn':false};
}

function firstRun()
{
	resetNB();
	showHideStatsBar(nb.statsBarOn);
	loadDoc('shortcuts');
};

// uncomment if script tag is in <head>
//if ( typeof(document.addEventListener) !== undefined )
//{
//	document.addEventListener("DOMContentLoaded", function() {
startInit();
//	});
//};

function loadDoc(docID, notInNB)
{
	if ( !docID ) { docID = 'shortcuts'; }
	var myDoc, validDoc = true;
	if ( docID === '' || docID.toLowerCase() == 'shortcuts' )
	{
		myDoc = staticDocs.shortcuts;
		current_doc = 'shortcuts';
	}

	else if ( typeof(nb.docs[docID]) != 'undefined' )
	{
		myDoc = nb.docs[docID];
		current_doc = docID;
	}
	else if ( typeof(nb.docs[docID.toLowerCase()]) != 'undefined' )
	{
		myDoc = nb.docs[docID.toLowerCase()];
		current_doc = docID.toLowerCase();
	}
	else
	{
		validDoc = false;
		alert('Invalid Document');
	}

	if ( validDoc == true )
	{
		nb.previous_doc = current_doc;
		nbArea.value = myDoc.text;
		if ( nb.statsBarOn == true ) { statsBar.value = myDoc.stats; }
		current_doc = docID;
		if ( !myDoc.title ) { myDoc.title = docID.substr(0,1).toUpperCase()+docID.substr(1); }
		document.title = myDoc.title + ' - ' + nbTitle;
	}
};

function createNewDoc(docID, title, text)
{
	if ( docID === '' || docID.toLowerCase() == 'shortcuts' )
	{
		alert('Invalid Document (Document name reserved.)');
	}

	else
	{
		storeData();
		nb.previous_doc = current_doc;
		current_doc = docID;
		nb.docs[docID] = {};
		nb.docs[docID].text = text || '';
		nb.docs[docID].title = title || docID.substr(0,1).toUpperCase()+docID.substr(1);
		nb.docs[docID].stats = getStats(nb.docs[docID].text);
		loadDoc(docID);
		saveNB();
	}
};


function showHideStatsBar(toState)
{
	nb.statsBarOn = toState;
	resizeTextBox();
	
	if (nb.statsBarOn == false)
	{
		//nbArea.removeEventListener('keyup', updateStatsBar);
		nbArea.onkeyup = undefined;
		//delete nbArea.onkeyup;
		statsBarContainer.style.display = "none";
	}
	else if (nb.statsBarOn == true)
	{
		//nbArea.addEventListener('keyup', updateStatsBar);
		nbArea.onkeyup = updateStatsBar;
		statsBarContainer.style.display = "inline";
	}
};

function switchToDoc(docID)
{
	if ( typeof(nb.docs[current_doc]) != 'undefined' ) { storeData(); }
	loadDoc(docID);
};

function deleteDoc(docID)
{
	var delMsg = 'The document, "'+docID+'", has been deleted.';
	if ( docID == 'shortcuts' || docID == '' )
	{
		alert('You cannot delete this document.\nPossible causes:\nYou are trying to delete a doc you are currently viewing.\nYou are trying to delete the protected "shortcuts" document');
	}
	else if ( !nb.docs[docID] )
	{
		alert('Invalid document');
	}
	else if (current_doc == docID && nb.previous_doc != current_doc )
	{
		delete nb.docs[docID];
		loadDoc(nb.previous_doc);
	}
	else if (current_doc == docID && nb.previous_doc == current_doc || nb.previous_doc == 'undefined' )
	{
		loadDoc('shortcuts');
		delete nb.docs[docID];
		alert(delMsg);
	}
	else if ( docID != current_doc )
	{
		delete nb.docs[docID];
		alert(delMsg);
	}
	storeData();
};

function renameDoc(docID)
{
	storeData();
	if ( current_doc != 'shortcuts' && typeof(nb.docs[current_doc]) != 'undefined' )
	{
		var oldName = current_doc;
		createNewDoc(docID, nb.docs[current_doc].title, nb.docs[current_doc].text);
		switchToDoc(docID);
		deleteDoc(oldName);
		storeData();
	}
	else
	{
		alert('You cannot rename this document.');
	}
};

function changeDocTitle(newTitle)
{
	if ( current_doc != 'shortcuts' && typeof(nb.docs[current_doc]) != 'undefined' )
	{
		nb.docs[current_doc].title = newTitle;
		storeData();
		document.title = nb.docs[current_doc].title + ' - ' + nbTitle;
	}
	else
	{
		alert('You cannot change the title of this document.');
	}
};

function updateStatsBar()
{
	statsBar.value = getStats();
};

function reloadDocOnce()
{
	loadDoc(current_doc);
	nbArea.removeEventListener('focus', reloadDocOnce, false);
	nbArea.removeEventListener('blur', reloadDocOnce, false);
	nbArea.removeEventListener('keydown', reloadDocOnce, false);
};

function getStats(text)
{
	var textStats = {}, textStatusStr;
	var textStr = text || nbArea.value;
	textStats.characters = textStr.length;
	textStats.words = 0;
	((textStr+' ').replace( /<.[^<>]*?>/g, ' ' ).replace( /&nbsp;/gi, ' ' ).replace( /[0-9.(),;:!?%#$¿'"_+=\\/-]*/g, '' ).replace( /\S\s+/g, function(){textStats.words++;}));
	textStats.lines = textStr.replace(/[^\n]/g,'').length+1;
	/*textStats.whitespace = textStr.replace(/[^\s]/g,'').length;*/
	textStats.spaces = textStr.replace(/[^ ]/g,'').length;
	/*textStats.tabs = textStr.replace(/[^\t]/g,'').length;*/
	textStats.numbers = textStr.replace(/[^0-9]/g,'').length;
	textStatusStr = 'Lines: '+textStats.lines+' \u2014 Words: '+textStats.words+' \u2014 Characters: '+textStats.characters+' \u2014 Spaces: '+textStats.spaces+' \u2014 Numbers: '+textStats.numbers/*+' \u2014 Tabs: '+textStats.tabs+' \u2014 All Whitespace: '+textStats.whitespace*/;

return textStatusStr;
};

function stopEvent(event)
{
	event.preventDefault();
	event.stopPropagation();
	event.stopped = true;
};


function exportNB()
{
	return Base64.encode(nbJSON());
};

function importNB(nbExport)
{
	loadJSCode('var nb = '+Base64.decode(nbExport));
	showHideStatsBar(nb.statsBarOn);
	loadDoc(nb.previous_doc);
	nb.previous_doc = current_doc;
	storeData();
};

function allModifersOff()
{
	isShift = false;
	isCtrl = false;
	isAlt = false;
};

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
		checkIfStoragePaused();
		if ( current_doc != '' && current_doc != 'shortcuts' && nb.docs[current_doc] != 'undefined' )
		{
			storeData();
			alert('Saved');
			stopEvent(e);
			allModifersOff();
		}
		else
		{
			alert('Cannot save/change this document.');
		}
	}

	if ( e.keyCode == 86 && isCtrl == true ) // Ctrl + V; you just pasted, don't want to lose this
	{
		storeData();
		allModifersOff();
	}

	if ( e.keyCode == 68 && isCtrl == true && isShift == false && isAlt == false ) // Ctrl + D; if not in autoload URI, fix title for bookmarking
	{
		if ( isAutoloadURL == false )
		{
			document.title = nbTitle;
			storeData();
			nbArea.addEventListener('focus', reloadDocOnce, false);
			nbArea.addEventListener('blur', reloadDocOnce, false);
			nbArea.addEventListener('keydown', reloadDocOnce, false);
			allModifersOff();
		}
	}


	if ( e.keyCode == 84 && isCtrl == true && isAlt == true ) // Ctrl + Alt + T; change document title
	{
		checkIfStoragePaused();
		var docTitle = prompt('Change document title.');
		if (docTitle != '' && docTitle != null ) { changeDocTitle(docTitle); }
		stopEvent(e);
		allModifersOff();
	}

	if ( e.keyCode == 79 && isAlt == true && ( isCtrl == true || isShift == true ) ) // Ctrl + Alt + O or Alt + Shift + O; open doc
	{
		var docName = prompt('Enter name of document to open (current document: '+current_doc+'):\n'+docList().join('\n'));
		if ( docName != null ) { switchToDoc(docName); }
		stopEvent(e);
		allModifersOff();
	}
	
	if ( e.keyCode == 85 && isAlt == true && ( isCtrl == true || isShift == true ) )  // Alt + Shift + U and Ctrl + Alt + U; Get Document Autoload URLs,
	{
		var autoLoadMethod = '#';
		var methodExpl = 'hash';
		if ( isCtrl == true && isShift == false ) { autoLoadMethod = '?'; methodExpl = 'query string'; }
		// Alt + Shift + U; get autoload URL using #
		// Alt + Ctrl + U; get autoload URL using ?
		var autoLoadURL = location.href;
		if ( location.hash != '' && location.search == '' ) { autoLoadURL = autoLoadURL.split(location.hash)[0]; }
		else if ( location.search != '' ) { autoLoadURL = autoLoadURL.split(location.search)[0]+autoLoadMethod+'doc='+current_doc; }
		if ( location.search == '' && location.hash == '' ) { autoLoadURL = autoLoadURL+autoLoadMethod+'doc='+current_doc; }
		prompt('Autoload URL for this document using a '+methodExpl+':', autoLoadURL);
		stopEvent(e);
		allModifersOff();
	}

	if ( (e.keyCode == 78 || e.keyCode == 67) && isAlt == true && isShift == true ) // Alt + Shift + N or Alt + Shift + C; new doc
	{
		checkIfStoragePaused();
		var docName = prompt('Enter name of document to create (current document: '+current_doc+').\nExisting Documents:\n'+docList().join('\n'));
		if (docName != '' && docName != null )
		{
			var docTitle = prompt('Enter title for document being created.');
			if ( docTitle == '' || docTitle == null ) { docTitle = false; }
			createNewDoc(docName, docTitle);
		}
		stopEvent(e);
		allModifersOff();
	}

	if ( e.keyCode == 49 && isCtrl == true && isAlt == true ) // Ctrl + Shift + 1; import
	{
		checkIfStoragePaused();
		var importStr = prompt('Import '+nbAppName+' Export\n\nEnter '+nbAppName+' export data here.');
		if (importStr != '' && importStr != null ) { importNB(importStr); }
		stopEvent(e);
		allModifersOff();
	}

	if ( e.keyCode == 50 && isCtrl == true && isAlt == true ) // Ctrl + Shift + 2; export
	{
		var doExport = confirm('Get '+nbAppName+' export data?');
		if ( doExport == true ) { prompt(nbAppName+'-Export data:',exportNB()); }
		stopEvent(e);
		allModifersOff();
	}

	if ( e.keyCode == 82 && isAlt == true && isShift == true ) // Alt + Shift + R; rename current doc
	{
		checkIfStoragePaused();
		var docName = prompt('Enter name to rename current document ('+current_doc+') to.\nExisting Documents:\n'+docList().join('\n'));
		if (docName != '' && docName != null ) { renameDoc(docName); }
		stopEvent(e);
		allModifersOff();
	}

	if ( e.keyCode == 68 && isAlt == true && isShift == true && isCtrl == false ) // Alt + Shift + D; delete a doc
	{
		var docName = prompt('Enter name of document to delete (current document: '+current_doc+'):\n'+docList().join('\n'));
		if ( docName != null && docName != '' )
		{
			var reallyDelete = confirm('Are you sure you want to delete the document, "'+docName+'"?');
			if ( reallyDelete == true )
			{
				deleteDoc(docName);
			}
		}
		else if ( !nb.docs[docName] && docName != '' && docName != null ) { alert('Invalid document.'); }
		else { alert('No documents deleted.'); }
		stopEvent(e);
		allModifersOff();
	}
	
	if ( e.keyCode == 73 && isAlt == true && isCtrl == true ) // Alt + Ctrl + I; toggle text stats bar
	{
		checkIfStoragePaused();
		showHideStatsBar(!nb.statsBarOn);
		saveNB();
		stopEvent(e);
		allModifersOff();
	}
	
	if ( e.keyCode == 68 && isAlt == true && isCtrl == true && isShift == false ) // Alt + Ctrl + D; delete all data  w/ confirmation
	{
		if ( storagePaused == false )
		{
			var noneDeleted = 'No documents deleted.';
			var doDelete = confirm('You are about to delete all data stored by '+nbAppName+' on '+host);
			if ( doDelete == true )
			{
				var reallyDelete = confirm('Are you sure you want to delete all data stored by '+nbAppName+' on '+host+'?');
				if ( reallyDelete == true )
				{
					deleteAllData();
					alert('All data stored by '+nbAppName+' on '+host+' deleted.');
				}
				else
				{
					alert(noneDeleted);
				}
			}
			else
			{
				alert(noneDeleted);
			}
			stopEvent(e);
			updateStatsBar();
			allModifersOff();
		}
	}
	
	else if ( e.keyCode == 9 ) // <tab>
	{
		insertIntoTextarea(nbArea, tab_code);
		stopEvent(e);
	}
	
	//lastKP = e.keyCode;

};

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

};

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
};

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
		field.value = field.value.substr(0, startPos) + val + field.value.substr(endPos, field.value.length);
		field.selectionEnd = field.selectionStart = startPos+val.length;
		field.scrollTop = prev_scroll;
	}
};

function resizeTextBox()
{
	var offset = 0;

	switch (nb.statsBarOn)
	{
		case true: offset = 20; break;
		default: offset = 0; break;
	}

	nbArea.style.height = window.innerHeight-(offset)+'px';
};

function basicResizeTextBox()
{
	nbArea.style.height = window.innerHeight+'px';
};

function nbJSON()
{
	return JSON.stringify(nb);
};

function saveNB()
{
	localStorage.setItem('nb', (nbJSON()));
};

function resumeStoringData()
{
	saveNB();
	window.onunload = closingSave;
};

function deleteNB()
{
	localStorage.removeItem('nb');
};

function checkIfStoragePaused()
{
	if ( storagePaused == true )
	{
		resumeStoringData();
	}
};

function storeData()
{
	checkIfStoragePaused();
	if ( typeof(nb.docs[current_doc]) != 'undefined' )
	{
		nb.docs[current_doc].text = nbArea.value;
		nb.docs[current_doc].stats = getStats();
	}
	saveNB();
};

function closingSave()
{
	nb.previous_doc = current_doc;
	storeData();
};


function deleteAllData()
{
	deleteNB();
	firstRun();
	storagePaused = true;
	//	nbArea.disabled = true;
	//	nbArea.style.cursor = 'default';
	window.onunload = deleteNB;
	nbArea.focus();
};

//{ JSON.stringify for making nb into JSON
// select portions of http://www.json.org/json2.js - only stringify is needed

var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		gap,
		indent,
		meta = {    // table of character substitutions
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"' : '\\"',
			'\\': '\\\\'
		},
		rep;

var JSON = {};
	function quote(string) {

		escapeable.lastIndex = 0;
		return escapeable.test(string) ?
			'"' + string.replace(escapeable, function (a) {
				var c = meta[a];
				if (typeof c === 'string') {
					return c;
				}
				return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			}) + '"' :
			'"' + string + '"';
	}

function str(key, holder) {

		var i,          // The loop counter.
			k,          // The member key.
			v,          // The member value.
			length,
			mind = gap,
			partial,
			value = holder[key];

		if (value && typeof value === 'object' &&
				typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}

		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}

		switch (typeof value) {
		case 'string':
			return quote(value);

		case 'number':

			return isFinite(value) ? String(value) : 'null';

		case 'boolean':
		case 'null':

			return String(value);

		case 'object':

			if (!value) {
				return 'null';
			}

			gap += indent;
			partial = [];

			if (typeof value.length === 'number' &&
					!value.propertyIsEnumerable('length')) {

				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || 'null';
				}

				v = partial.length === 0 ? '[]' :
					gap ? '[\n' + gap +
							partial.join(',\n' + gap) + '\n' +
								mind + ']' :
						'[' + partial.join(',') + ']';
				gap = mind;
				return v;
			}

			if (rep && typeof rep === 'object') {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					k = rep[i];
					if (typeof k === 'string') {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			} else {

				for (k in value) {
					if (Object.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			}

			v = partial.length === 0 ? '{}' :
				gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
						mind + '}' : '{' + partial.join(',') + '}';
			gap = mind;
			return v;
		}
	}

JSON.stringify = function (value, replacer, space) {

			var i;
			gap = '';
			indent = '';

			if (typeof space === 'number') {
				for (i = 0; i < space; i += 1) {
					indent += ' ';
				}

			} else if (typeof space === 'string') {
				indent = space;
			}

			rep = replacer;
			if (replacer && typeof replacer !== 'function' &&
					(typeof replacer !== 'object' ||
					typeof replacer.length !== 'number')) {
				throw new alertor('JSON.stringify');
			}

			return str('', {'': value});
		};

//} JSON.stringify

//} end

