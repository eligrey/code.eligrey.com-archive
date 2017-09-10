/*
* Edit Page Jetpack feature v0.1
* By Elijah Grey, http://eligrey.com
*
* License: GNU GPL v3 and the X11/MIT license
*   See http://eligrey.com/blog/about/license
*/


const prefs = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService)
				.getBranch("extensions.jetpack.features.editpage."),

// jetpack.notifications.show doesn't allow skipping options with null
alert = Components.classes['@mozilla.org/alerts-service;1']
				.getService(Components.interfaces.nsIAlertsService)
				.showAlertNotification, // alert(icon, title, body)

toggleEditMode = function (editPageButton, doc, originalSpellcheck) {
	if (doc.designMode === "on" || doc.documentElement.contentEditable === true) {
		// page in editing mode, toggle off
		doc.designMode = "off";
		doc.documentElement.contentEditable = "inherit";
		doc.documentElement.spellcheck = originalSpellcheck;
		editPageButton.className = "";
	} else { // page not in editing mode, toggle on
		doc.designMode = "on";
		doc.documentElement.contentEditable = true;
		doc.documentElement.spellcheck = prefs.getBoolPref("spellcheck");
		editPageButton.className = "active";
	}
	
	alert(null,
	      "Edit Page",
	      "Editing mode "+ (doc.designMode === "on" ? "en":"dis") +"abled."
	     );
},

toggleSpellcheck = function (doc) {
	if (doc.designMode === "on" || doc.documentElement.contentEditable === true) {
		// only toggle spellcheck while in editing mode
		alert(null,
		      "Edit Page",
		      "Spellcheck "+ ((doc.documentElement.spellcheck = !doc.documentElement.spellcheck) ? "en":"dis") +"abled."
			 );
	}
};

if (prefs.getPrefType("spellcheck") !== prefs.PREF_BOOL) // check if spellcheck pref is set and bool
	prefs.setBoolPref("spellcheck", true); // set spellcheck pref to default of true

jetpack.statusBar.append({
	html: <>
			<style type="text/css">
			/*<![CDATA[*/
			button {
				margin-top: 2px;
				white-space: nowrap;
				padding-left: 0px;
				padding-right: 0px;
			}
			button.active:before {
				content: "[";
			}
			button.active:after {
				content: "]";
			}
			/*]]>*/
			</style><button>Edit Page</button>
		</>,
	width: 82,
	onReady: function(widget) {
		var doc, originalSpellcheck, previousClick = false;
		widget.addEventListener("click", function (evt) {
			if (!previousClick) { // only store spellcheck on first click to get original
				doc = jetpack.tabs.focused.contentDocument;
				originalSpellcheck = doc.spellcheck;
				previousClick = true;
			}
			
			if (evt.button === 0) // left click
				toggleEditMode(widget.documentElement.getElementsByTagName("button")[0], doc, originalSpellcheck);
			else if (evt.button === 2) // right click
				toggleSpellcheck(doc);
			else if (evt.button === 1) { // middle click, open help page
				jetpack.tabs.open("http://code.eligrey.com/jetpack/edit-page/").focus(); // open in new tab and focus it
			}
		}, false);
	}
});
