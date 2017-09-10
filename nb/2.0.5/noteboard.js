/*  License
Noteboard - v2.0.4 - noteboard.eligrey.com
Creative Commons GNU Lesser General Public License
http://creativecommons.org/licenses/LGPL/2.1/
Author: Elijah Grey - eligrey.com
const Contact_Email_Address = ["\x65\x6c\x69\x6a\x61\x68","\x67\x72\x65\x79\x2e\x6e\x61\x6d\x65"].join("\x40");
*/

if ( typeof JSON == "undefined" ) {
	// YUI minified then packed json2.js
	eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3(!l.m){m={}}(5(){5 f(n){7 n<10?"0"+n:n}3(6 V.q.p!=="5"){V.q.p=5(a){7 l.1o()+"-"+f(l.1p()+1)+"-"+f(l.1q())+"T"+f(l.1r())+":"+f(l.1s())+":"+f(l.1t())+"Z"};L.q.p=1u.q.p=1v.q.p=5(a){7 l.1w()}}w e=/[\\1x\\W\\X-\\Y\\11\\12\\13\\14-\\15\\17-\\18\\19-\\1a\\1b\\1c-\\1d]/g,G=/[\\\\\\"\\1y-\\1z\\1A-\\1B\\W\\X-\\Y\\11\\12\\13\\14-\\15\\17-\\18\\19-\\1a\\1b\\1c-\\1d]/g,8,y,1e={"\\b":"\\\\b","\\t":"\\\\t","\\n":"\\\\n","\\f":"\\\\f","\\r":"\\\\r",\'"\':\'\\\\"\',"\\\\":"\\\\\\\\"},o;5 H(b){G.1f=0;7 G.M(b)?\'"\'+b.z(G,5(a){w c=1e[a];7 6 c==="I"?c:"\\\\u"+("1g"+a.1h(0).N(16)).1i(-4)})+\'"\':\'"\'+b+\'"\'}5 A(a,b){w i,k,v,h,B=8,9,2=b[a];3(2&&6 2==="x"&&6 2.p==="5"){2=2.p(a)}3(6 o==="5"){2=o.J(b,a,2)}1C(6 2){C"I":7 H(2);C"O":7 1D(2)?L(2):"D";C"1E":C"D":7 L(2);C"x":3(!2){7"D"}8+=y;9=[];3(P.q.N.1F(2)==="[x 1G]"){h=2.h;E(i=0;i<h;i+=1){9[i]=A(i,2)||"D"}v=9.h===0?"[]":8?"[\\n"+8+9.K(",\\n"+8)+"\\n"+B+"]":"["+9.K(",")+"]";8=B;7 v}3(o&&6 o==="x"){h=o.h;E(i=0;i<h;i+=1){k=o[i];3(6 k==="I"){v=A(k,2);3(v){9.1j(H(k)+(8?": ":":")+v)}}}}Q{E(k 1k 2){3(P.1l.J(2,k)){v=A(k,2);3(v){9.1j(H(k)+(8?": ":":")+v)}}}}v=9.h===0?"{}":8?"{\\n"+8+9.K(",\\n"+8)+"\\n"+B+"}":"{"+9.K(",")+"}";8=B;7 v}}3(6 m.R!=="5"){m.R=5(a,b,c){w i;8="";y="";3(6 c==="O"){E(i=0;i<c;i+=1){y+=" "}}Q{3(6 c==="I"){y=c}}o=b;3(b&&6 b!=="5"&&(6 b!=="x"||6 b.h!=="O")){1m 1n 1H("m.R")}7 A("",{"":a})}}3(6 m.S!=="5"){m.S=5(c,d){w j;5 U(a,b){w k,v,2=a[b];3(2&&6 2==="x"){E(k 1k 2){3(P.1l.J(2,k)){v=U(2,k);3(v!==1I){2[k]=v}Q{1J 2[k]}}}}7 d.J(a,b,2)}e.1f=0;3(e.M(c)){c=c.z(e,5(a){7"\\\\u"+("1g"+a.1h(0).N(16)).1i(-4)})}3(/^[\\],:{}\\s]*$/.M(c.z(/\\\\(?:["\\\\\\/1K]|u[0-1L-1M-F]{4})/g,"@").z(/"[^"\\\\\\n\\r]*"|1N|1O|D|-?\\d+(?:\\.\\d*)?(?:[1P][+\\-]?\\d+)?/g,"]").z(/(?:^|:|,)(?:\\s*\\[)+/g,""))){j=1Q("("+c+")");7 6 d==="5"?U({"":j},""):j}1m 1n 1R("m.S")}}})();',62,116,'||value|if||function|typeof|return|gap|partial||||||||length||||this|JSON||rep|toJSON|prototype||||||var|object|indent|replace|str|mind|case|null|for||escapable|quote|string|call|join|String|test|toString|number|Object|else|stringify|parse||walk|Date|u00ad|u0600|u0604|||u070f|u17b4|u17b5|u200c|u200f||u2028|u202f|u2060|u206f|ufeff|ufff0|uffff|meta|lastIndex|0000|charCodeAt|slice|push|in|hasOwnProperty|throw|new|getUTCFullYear|getUTCMonth|getUTCDate|getUTCHours|getUTCMinutes|getUTCSeconds|Number|Boolean|valueOf|u0000|x00|x1f|x7f|x9f|switch|isFinite|boolean|apply|Array|Error|undefined|delete|bfnrt|9a|fA|true|false|eE|eval|SyntaxError'.split('|'),0,{}));
}

//nbTitle & nbAppName should be declared before packed script
;;;var nbAppName = "Noteboard";
;;;var nbTitle = nbAppName;

//{ start
document.title = nbTitle;

//{ init vars
var host = location.hostname || (window.opener ? window.opener.location.hostname : false) || null,
nbArea,
statsBar,
tab_code = "\t",
isCtrl = false,
isAlt = false,
isShift = false,
current_doc = "",
statsBarContainer,
doc_head = document.getElementsByTagName("head")[0],
nbData = {},
storagePaused = false,
err = alert,
nbSettings = {},
isAutoloadURL = false,
dash = "\u2014\u2014";
//var lastKP

//}

if ( typeof(globalStorage) != "undefined" && typeof(localStorage) == "undefined" && host !== null ) {
	var localStorage = globalStorage[host];
}

function autoLoadDoc() {
	var docID, valid = false;
	if ( location.search.search(/doc=.+/) != -1 )
	{
		docID = decodeURIComponent(location.search.substr(location.search.search(/doc=.+/)+4));
		
		if ( nbData.docs[docID] )
		{
			isAutoloadURL = true;
			valid = true;
			loadDoc(docID);
		}
	} else if ( location.hash.search(/doc=.+/) != -1 ) {
		docID = decodeURIComponent(location.hash.substr(location.hash.search(/doc=.+/)+4));
		
		if ( nbData.docs[docID] )
		{
			isAutoloadURL = true;
			valid = true;
			loadDoc(docID);
		}
	}

	if ( valid == false )
		{
			isAutoloadURL = false;
			loadDoc("shortcuts");
		}
};

var welcomeText = ["Welcome to "+nbAppName+"; the online\u2014offline notepad. All of your text is stored offline on your computer. Nothing is stored on servers.",
"This is the 'shortcuts' document\n",
"Here are some useful keyboard shortcuts for using "+nbAppName+":",
"Save "+dash+" Ctrl (+ Alt) + S",
"Paste and Save "+dash+" Ctrl + V",
"Create New Document "+dash+" Alt + Shift + N or Alt + Shift + C",
"Open Document "+dash+" Ctrl + Alt + O or Alt + Shift + O",
"Rename Current Document "+dash+" Alt + Shift + R",
"Toggle Text Info Bar "+dash+" Alt + Ctrl + I",
"Delete a Document "+dash+" Alt + Shift + D",
"Delete ALL Data Stored by "+nbAppName+" \u2014 Alt + Ctrl + D",
"Insert Tab "+dash+" <tab key>",
"Import "+dash+" Ctrl + Alt + 1",
"Export "+dash+" Ctrl + Alt + 2",
"Get Document Autoload URL (using hash) "+dash+" Alt + Shift + U",
"Get Document Autoload URL (using query) "+dash+" Ctrl + Alt + U",
"Change Current Document Title "+dash+" Ctrl + Alt + T",
"Bookmark "+nbAppName+" "+dash+" Ctrl + D (Title will auto-change for bookmarking non-autoload URLs)",
"Quickly Access 'shortcuts' "+dash+" Ctrl + Alt + O and then push enter (leave prompt blank)"].join("\n");

var staticDocs = {
  "shortcuts": {
	"id": "shortcuts",
	"text": welcomeText,
	"title": "Shortcuts"
  }
};

function resetSettings() {
return {"width": window.innerWidth,
		"height": window.innerHeight};
};

function resetNB() {
	nbData = {"docs": {},
		"previous_doc": false,
		"statsBarOn": false};
	nbSettings = resetSettings();
};

function startInit() {
	nbArea = document.getElementById("storedTextBox");
	statsBar = document.getElementById("statsBar");
	statsBarContainer = document.getElementById("statsBarContainer");
	
	function basicResizeTextBox()
	{
		nbArea.style.height = window.innerHeight+"px";
	};
	
	window.onresize = basicResizeTextBox;
	basicResizeTextBox();
	
	nbArea.addEventListener("keydown", respondToKP, false);
	nbArea.focus();
	init();
};

function init() {
	/* // to save on every keyup, ect.
	nbArea.addEventListener("keyup", storeData);
	nbArea.addEventListener("mouseup", storeData);
	window.addEventListener("blur", storeData);
	*/
	Storage.prototype.itemExists = function itemExists(item) { return(this.getItem(item) !== null && typeof(this.getItem(item)) !== "undefined"); };
	if ( localStorage.itemExists("noteboard-data") !== false ) {
		window.nbData = eval(localStorage.getItem("noteboard-data"));
		window.onresize = resizeTextBox;
		showHideStatsBar(nbData.statsBarOn);
		
		if ( localStorage.itemExists("noteboard-settings") == false ) nbSettings = resetSettings();
		
		window.resizeTo(nbSettings.width, nbSettings.height);
		
		if ( nbData.previous_doc == "" || nbData.previous_doc == false ) nbData.previous_doc = "shortcuts";
		
		if ( location.search.search(/doc=.+/) != -1 || location.hash.search(/doc=.+/) != -1 ) autoLoadDoc();

		else if ( typeof nbData.docs[nbData.previous_doc] != "undefined" ) loadDoc(nbData.previous_doc);

		else loadDoc("shortcuts");
	} else {
		firstRun();
		window.onresize = resizeTextBox;
	}

	window.onunload = closingSave;
	nbArea.focus();
};

function firstRun() {
	resetNB();
	showHideStatsBar(nbData.statsBarOn);
	loadDoc("shortcuts");
};

startInit();

function loadDoc(docID, notInNB) {
	if ( !docID ) { docID = "shortcuts"; }
	var myDoc, validDoc = true;
	if ( docID === "" || docID.toLowerCase() == "shortcuts" ) {
		myDoc = staticDocs.shortcuts;
		current_doc = "shortcuts";
	} else if ( typeof(nbData.docs[docID]) != "undefined" ) {
		myDoc = nbData.docs[docID];
		current_doc = docID;
	} else if ( typeof(nbData.docs[docID.toLowerCase()]) != "undefined" ) {
		myDoc = nbData.docs[docID.toLowerCase()];
		current_doc = docID.toLowerCase();
	} else {
		validDoc = false;
		err("Invalid Document");
	}

	if ( validDoc == true ) {
		nbData.previous_doc = current_doc;
		nbArea.value = myDoc.text;
		if ( nbData.statsBarOn == true ) { statsBar.value = myDoc.stats; }
		current_doc = docID;
		if ( !myDoc.title ) { myDoc.title = docID.substr(0,1).toUpperCase()+docID.substr(1); }
		document.title = myDoc.title + " - " + nbTitle;
	}
};

function createNewDoc(docID, title, text) {
	if ( docID === "" || docID.toLowerCase() == "shortcuts" ) err("Invalid Document (Document name reserved.)");

	else {
		storeData();
		nbData.previous_doc = current_doc;
		current_doc = docID;
		nbData.docs[docID] = {};
		nbData.docs[docID].text = text || "";
		nbData.docs[docID].title = title || docID.substr(0,1).toUpperCase()+docID.substr(1);
		nbData.docs[docID].stats = getStats(nbData.docs[docID].text);
		loadDoc(docID);
		saveNB();
	}
};


function showHideStatsBar(toState) {
	nbData.statsBarOn = toState;
	resizeTextBox();
	
	if (nbData.statsBarOn == false) {
		//nbArea.removeEventListener("keyup", updateStatsBar);
		nbArea.onkeyup = undefined;
		//delete nbArea.onkeyup;
		statsBarContainer.style.display = "none";
	}
	else if (nbData.statsBarOn == true) {
		//nbArea.addEventListener("keyup", updateStatsBar);
		nbArea.onkeyup = updateStatsBar;
		statsBarContainer.style.display = "inline";
	}
};

function switchToDoc(docID) {
	if ( typeof(nbData.docs[current_doc]) != "undefined" ) storeData();
	loadDoc(docID);
};

function deleteDoc(docID, informUser) {
	var canDelete = true;
	if ( typeof informUser == "undefined" ){ informUser = true; }
	var delMsg = "The document, '"+docID+"', has been deleted.";
	if ( docID == "shortcuts" || docID == "" ) {
		canDelete = false;
		err("You cannot delete this document.\nPossible causes:\nYou are trying to delete a doc you are currently viewing.\nYou are trying to delete the protected 'shortcuts' document");
	} else if ( !nbData.docs[docID] ) {
		canDelete = false;
		err("Invalid document");
	} else if (current_doc == docID && nbData.previous_doc != current_doc ) {
		delete nbData.docs[docID];
		loadDoc(nbData.previous_doc);
	} else if (current_doc == docID && nbData.previous_doc == current_doc || nbData.previous_doc == "undefined" ) {
		loadDoc("shortcuts");
		delete nbData.docs[docID];
	} else if ( docID != current_doc ) {
		delete nbData.docs[docID];
	}
	storeData();
	if ( informUser == true && canDelete == true ) alert(delMsg);
};

function renameDoc(docID) {
	storeData();
	if ( current_doc != "shortcuts" && typeof(nbData.docs[current_doc]) != "undefined" ) {
		var oldName = current_doc;
		createNewDoc(docID, nbData.docs[current_doc].title, nbData.docs[current_doc].text);
		switchToDoc(docID);
		deleteDoc(oldName, false);
		storeData();
	} else err("You cannot rename this document.");
};

function changeDocTitle(newTitle) {
	if ( current_doc != "shortcuts" && typeof(nbData.docs[current_doc]) != "undefined" ) {
		nbData.docs[current_doc].title = newTitle;
		storeData();
		document.title = nbData.docs[current_doc].title + " - " + nbTitle;
	} else err("You cannot change the title of this document.");
};

function updateStatsBar() {
	statsBar.value = getStats();
};

function reloadDocOnce() {
	loadDoc(current_doc);
	nbArea.removeEventListener("focus", reloadDocOnce, false);
	nbArea.removeEventListener("blur", reloadDocOnce, false);
	nbArea.removeEventListener("keydown", reloadDocOnce, false);
};


//function getStats(text) {
//	var textStats = {}, textStatusStr;
//	var textStr = text || nbArea.value;
//	textStats.characters = textStr.length;
//	textStats.words = 0;
//	((textStr+" ").replace( /<.[^<>]*?>/g, " " ).replace( /&nbsp;/gi, " " ).replace( /[0-9.(),;:!?%#$¿""_+=\\/-]*/g, '" ).replace( /\S\s+/g, function(){textStats.words++;}));
//	textStats.lines = textStr.replace(/[^\n]/g,"").length+1;
//	//textStats.whitespace = textStr.replace(/[^\s]/g,"").length;
//	textStats.spaces = textStr.replace(/[^ ]/g,"").length;
//	//textStats.tabs = textStr.replace(/[^\t]/g,"").length;
//	textStats.numbers = textStr.replace(/[^0-9]/g,"").length;
//	textStatusStr = "Lines: "+textStats.lines+" \u2014 Words: "+textStats.words+" \u2014 Characters: "+textStats.characters+" \u2014 Spaces: "+textStats.spaces+" \u2014 Numbers: "+textStats.numbers/*+" \u2014 Tabs: "+textStats.tabs+" \u2014 All Whitespace: "+textStats.whitespace*/;
//	return textStatusStr;
//};

function stopEvent(evt) {
	evt.preventDefault();
	evt.stopPropagation();
	evt.stopped = true;
};


function exportNB() {
	return nbJSON();
};

function importNB(nbExport) {
	window.nbData = nbExport;
	showHideStatsBar(nbData.statsBarOn);
	loadDoc(nbData.previous_doc);
	nbData.previous_doc = current_doc;
	storeData();
};

function allModifersOff() {
	isShift = false;
	isCtrl = false;
	isAlt = false;
};

function respondToKP(e) {
	var isShift = isCtrl = isAlt = false;
	switch ( e.keyCode ) {
		case 16: isShift = true;
		case 17: isCtrl = true;
		case 18: isAlt = true;
	}

	if ( e.keyCode == 83 && isCtrl == true ) { // Ctrl + S
		checkIfStoragePaused();
		if ( current_doc != "" && current_doc != "shortcuts" && nbData.docs[current_doc] != "undefined" ) {
			storeData();
			alert("Saved");
			stopEvent(e);
			allModifersOff();
		} else err("Cannot save/change this document.");
	} else if ( e.keyCode == 86 && isCtrl == true ) { // Ctrl + V; you just pasted, don"t want to lose this
		checkIfStoragePaused();		
		storeData();
		allModifersOff();
	} else if ( e.keyCode == 68 && isCtrl == true && isShift == false && isAlt == false ) { // Ctrl + D; if not in autoload URI, fix title for bookmarking
		if ( isAutoloadURL == false ) {
			document.title = nbTitle;
			storeData();
			nbArea.addEventListener("focus", reloadDocOnce, false);
			nbArea.addEventListener("blur", reloadDocOnce, false);
			nbArea.addEventListener("keydown", reloadDocOnce, false);
			allModifersOff();
		}
	} else if ( e.keyCode == 84 && isCtrl == true && isAlt == true ) { // Ctrl + Alt + T; change document title
		checkIfStoragePaused();
		var docTitle = prompt("Change document title.");
		if (docTitle != "" && docTitle != null ) { changeDocTitle(docTitle); }
		stopEvent(e);
		allModifersOff();
	} else if ( e.keyCode == 79 && isAlt == true && ( isCtrl == true || isShift == true ) ) { // Ctrl + Alt + O or Alt + Shift + O; open doc
		var docName = prompt("Enter name of document to open (current document: "+current_doc+"):\n"+enumerateDocs().join("\n"));
		if ( docName != null ) { switchToDoc(docName); }
		stopEvent(e);
		allModifersOff();
	} else if ( e.keyCode == 85 && isAlt == true && ( isCtrl == true || isShift == true ) ) { // Alt + Shift + U and Ctrl + Alt + U; Get Document Autoload URLs,
		var autoLoadMethod = "#";
		var methodExpl = "hash";
		if ( isCtrl == true && isShift == false ) { autoLoadMethod = "?"; methodExpl = "query string"; }
		// Alt + Shift + U; get autoload URL using #
		// Alt + Ctrl + U; get autoload URL using ?
		var autoLoadURL = location.href;
		if ( location.hash != "" && location.search == "" ) { autoLoadURL = autoLoadURL.split(location.hash)[0]; }
		else if ( location.search != "" ) { autoLoadURL = autoLoadURL.split(location.search)[0]+autoLoadMethod+"doc="+current_doc; }
		if ( location.search == "" && location.hash == "" ) { autoLoadURL = autoLoadURL+autoLoadMethod+"doc="+current_doc; }
		prompt("Autoload URL for this document using a "+methodExpl+":", autoLoadURL);
		stopEvent(e);
		allModifersOff();
	} else if ( (e.keyCode == 78 || e.keyCode == 67) && isAlt == true && isShift == true ) { // Alt + Shift + N or Alt + Shift + C; new doc
		checkIfStoragePaused();
		var docName = prompt("Enter name of document to create (current document: "+current_doc+").\nExisting Documents:\n"+enumerateDocs().join("\n"));
		if (docName != "" && docName != null ) {
			var docTitle = prompt("Enter title for document being created.");
			if ( docTitle == "" || docTitle == null ) { docTitle = false; }
			createNewDoc(docName, docTitle);
		}
		stopEvent(e);
		allModifersOff();
	} else if ( e.keyCode == 49 && isCtrl == true && isAlt == true ) { // Ctrl + Shift + 1; import
		checkIfStoragePaused();
		var importStr = prompt("Import "+nbAppName+" Export\n\nEnter "+nbAppName+" export data here.");
		if (importStr != "" && importStr != null ) { importNB(importStr); }
		stopEvent(e);
		allModifersOff();
	} else if ( e.keyCode == 50 && isCtrl == true && isAlt == true ) { // Ctrl + Shift + 2; export
		var doExport = confirm("Get "+nbAppName+" export data?");
		if ( doExport == true ) prompt(nbAppName+"-Export data:",exportNB());
		stopEvent(e);
		allModifersOff();
	} else if ( e.keyCode == 82 && isAlt == true && isShift == true ) { // Alt + Shift + R; rename current doc
		checkIfStoragePaused();
		var docName = prompt("Enter name to rename current document ("+current_doc+") to.\nExisting Documents:\n"+enumerateDocs().join("\n"));
		if (docName != "" && docName != null ) { renameDoc(docName); }
		stopEvent(e);
		allModifersOff();
	} else if ( e.keyCode == 68 && isAlt == true && isShift == true && isCtrl == false ) { // Alt + Shift + D; delete a doc
		var docName = prompt("Enter name of document to delete (current document: "+current_doc+"):\n"+enumerateDocs().join("\n"));
		if ( docName != null && docName != "" ) {
			var reallyDelete = confirm("Are you sure you want to delete the document, '"+docName+"'?");
			if ( reallyDelete == true )
			{
				deleteDoc(docName);
			}
		}
		else if ( !nbData.docs[docName] && docName != "" && docName != null ) { err("Invalid document."); }
		else { alert("No documents deleted."); }
		stopEvent(e);
		allModifersOff();
	} else if ( e.keyCode == 73 && isAlt == true && isCtrl == true ) { // Alt + Ctrl + I; toggle text stats bar
		checkIfStoragePaused();
		showHideStatsBar(!nbData.statsBarOn);
		saveNB();
		stopEvent(e);
		allModifersOff();
	} else if ( e.keyCode == 68 && isAlt == true && isCtrl == true && isShift == false ) { // Alt + Ctrl + D; delete all data  w/ confirmation
		if ( storagePaused == false ) {
			var noneDeleted = "No documents deleted.";
			var doDelete = confirm("You are about to delete all data stored by "+nbAppName+" on "+host);
			if ( doDelete == true ) {
				var reallyDelete = confirm("Are you sure you want to delete all data stored by "+nbAppName+" on "+host+"?");
				if ( reallyDelete == true ) {
					deleteAllData();
					alert("All data stored by "+nbAppName+" on "+host+" deleted.");
				} else alert(noneDeleted);
			} else alert(noneDeleted);
			stopEvent(e);
			updateStatsBar();
			allModifersOff();
		}
	} else if ( e.keyCode == 9 ) { // <tab>
		insertIntoTextarea(nbArea, tab_code);
		stopEvent(e);
	}
	
	//lastKP = e.keyCode;

};

function enumerateDocs() {
	var docArr = [];
	if (nbData.docs) {
		for (var i in nbData.docs) {
			docArr.push(i);
		}
	}
	return docArr;
};

function insertIntoTextarea(field, val) {
	if (document.selection) {
		field.focus();
		sel = document.selection.createRange();
		sel.text = val;
	}
	else if (field.selectionStart || field.selectionStart == 0.) {
		var prev_scroll = field.scrollTop;
		var startPos = field.selectionStart;
		var endPos = field.selectionEnd;
		field.value = field.value.substr(0, startPos) + val + field.value.substr(endPos, field.value.length);
		field.selectionEnd = field.selectionStart = startPos+val.length;
		field.scrollTop = prev_scroll;
	}
};

function resizeTextBox() {
	var offset = 0;
	switch (nbData.statsBarOn) {
		case true: offset = 20; break;
		default: offset = 0; break;
	}
	nbArea.style.height = window.innerHeight-(offset)+"px";
	nbSettings.width = window.innerWidth;
	nbSettings.height = window.innerHeight;
};

function basicResizeTextBox() {
	nbArea.style.height = window.innerHeight+"px";
};

function nbJSON() {
	return JSON.stringify(nbData);
};

function saveNB() {
	localStorage.setItem("noteboard-data", (nbJSON()));
	localStorage.setItem("noteboard-settings", (JSON.stringify(nbSettings)));
};

function resumeStoringData() {
	saveNB();
	window.onunload = closingSave;
};

function deleteNB() {
	localStorage.removeItem("noteboard-data");
	localStorage.removeItem("noteboard-settings");
};

function checkIfStoragePaused() {
	if ( storagePaused == true ) {
		resumeStoringData();
	}
};

function storeData() {
	checkIfStoragePaused();
	if ( typeof(nbData.docs[current_doc]) != "undefined" ) {
		nbData.docs[current_doc].text = nbArea.value;
	}
	saveNB();
};

function closingSave() {
	nbData.previous_doc = current_doc;
	storeData();
};


function deleteAllData() {
	deleteNB();
	firstRun();
	storagePaused = true;
	//	nbArea.disabled = true;
	//	nbArea.style.cursor = "default";
	window.onunload = deleteNB;
	nbArea.focus();
};
