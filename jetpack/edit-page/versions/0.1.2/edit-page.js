/*
* Edit Page Jetpack feature v0.1.2
* By Elijah Grey, http://eligrey.com
*
* License: GNU GPL v3 and the X11/MIT license
*   See http://purl.eligrey.com/license
*/


const prefs = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService)
				.getBranch("extensions.jetpack.features.editpage."),

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
	
	jetpack.notifications.show({
		title: "Edit Page",
		body: "Editing mode "+ (doc.designMode === "on" ? "en":"dis") +"abled."
	});
},

toggleSpellcheck = function (doc) {
	if (doc.designMode === "on" || doc.documentElement.contentEditable === true) {
		// only toggle spellcheck while in editing mode
		jetpack.notifications.show({
			title: "Edit Page",
			body: "Spellcheck "+ ((doc.documentElement.spellcheck = !doc.documentElement.spellcheck) ? "en":"dis") +"abled."
		});
	}
};

if (prefs.getPrefType("spellcheck") !== prefs.PREF_BOOL) { // check if spellcheck pref is set and bool
	prefs.setBoolPref("spellcheck", true); // set spellcheck pref to default of true
}

jetpack.statusBar.append({
	html: <>
			<style type="text/css">
			/*<![CDATA[*/
			button {
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
	onReady: function(widget) {
		var button = widget.documentElement.getElementsByTagName("button")[0],
		previousClick = false,
		originalSpellcheck;
		widget.addEventListener("click", function (evt) {
			var doc = jetpack.tabs.focused.contentDocument;
			if (!previousClick) { // only store spellcheck on first click to get original
				originalSpellcheck = doc.spellcheck;
				previousClick = true;
			}
			
			if (evt.button === 0) { // left click
				toggleEditMode(button, doc, originalSpellcheck);
			} else if (evt.button > 0) { // right or middle click
				toggleSpellcheck(doc);
			}
		}, false);
	}
});
