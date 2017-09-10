/*
Noteboard - v1.1.0 - noteboard.eligrey.com
Creative Commons (CC) License:
Attribution-Noncommercial-Share Alike 3.0 Unported
http://creativecommons.org/licenses/by-nc-sa/3.0/
Author: Elijah Grey - www.eligrey.com
*/
var _host_ = document.domain || location.hostname || (window.opener ? window.opener.document.domain : false) || null
,nbArea
,statsBar
,tab_code = '\t'
,isCtrl = false
,isAlt = false
,isShift = false
,nb
,current_doc
,statsBarContainer
/*,lastKP = null
,lastKU = null*/;

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
		loadDoc(nb.previous_doc, true);
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
	var welcomeText = ['Welcome to Noteboard; the online, offline notepad. All of your text is stored offline. Nothing is stored on servers.\n'
	,'Here are some useful keyboard shortcuts for using Noteboard:\n'
	,'Save - Ctrl (+ Alt) + S\nPaste and Save - Ctrl + V'
	,'Create New Document - Alt + Shift + N or Alt + Shift + C'
	,'Open Document - Ctrl + Alt + O or Alt + Shift + O'
	,'Rename Current Document - Alt + Shift + R'
	,'Toggle Text Info Bar - Alt + Ctrl + I'
	,'Delete a Document - Alt + Shift + D'
	,'Delete ALL Data Stored by Noteboard - Alt + Ctrl + D'
	,'Insert Tab - <tab key>'].join('\n');
	nb = {'docs': 
		{'welcome': 
			{
				'text': welcomeText
				,'stats': getStats(welcomeText)
			}
		}
		,'previous_doc':false
		,'statsBarOn':false};
	window.onresize = resizeTextBox;
	showHideStatsBar(nb.statsBarOn);
	loadDoc('welcome', true);
	function getDocName(p)
	{
		var docName = prompt(p||'Welcome to Noteboard. It seems that you do not have any existing documents.\nPlease name this document:','main');
		if ( docName == '' || docName == null ) { return getDocName('Sorry, that name was invalid. Please enter a valid name.'); }
		else { return docName; }
	}
	renameDoc(getDocName());
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

function loadDoc(docID, isFirstLoad)
{
	if ( !isFirstLoad && nb.docs[docID] != 'undefined' ) { nb.previous_doc = current_doc; }

	if ( nb.docs[docID] )
	{
		isValidDoc = true;
		nbArea.value = nb.docs[docID].text;
		//	statsBar.value = nb.docs[docID].stats;
		current_doc = docID;
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
	if (current_doc == docID) { nbArea.value = ''; updateStatsBar(); }
	delete nb.docs[docID];
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

	if ( (e.keyCode == 78 || e.keyCode == 67) && isAlt == true && isShift == true ) // Alt + Shift + N or Alt + Shift + C; new doc
	{
		var docName = prompt('Enter name of document to create.\nExisting Documents:\n'+docList().join('\n'));
		if (docName != '' && docName != null ) { createNewDoc(docName); }
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

function saveNB()
{
	storageInterface.setItem('nb', 'nb = '+uneval({'docs': nb.docs, 'previous_doc':nb.previous_doc, 'statsBarOn':nb.statsBarOn}));
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

function resumeStoringData()
{
	saveNB();
	window.onunload = closingSave;
	nbArea.removeEventListener('keydown',resumeStoringData,false);
}

function deleteAllData_Basic()
{
	storageInterface.removeItem('nb');
}


function deleteAllData()
{
	storageInterface.removeItem('nb');
	nbArea.value = '';
	window.onunload = function(){};
	nbArea.addEventListener('keydown',resumeStoringData,false);
	nbArea.focus();
}


if ( typeof document.addEventListener !== undefined ) {
	document.addEventListener("DOMContentLoaded", function() {
		startInit();
	}, false);
}