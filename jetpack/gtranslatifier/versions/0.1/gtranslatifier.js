/*
* GTranslatifier Jetpack feature v0.1
* Translate pages or selected text using Google Translate.
* 
* By Elijah Grey, http://eligrey.com
* 
* Inspired by "Jetpack: Google Translator" version 0.1 by Florian CROUZAT:
*   http://jetpack.floriancrouzat.net/google-translator/google-translator.html
* 
* License: GNU GPL v3 and the X11/MIT license
*   See http://eligrey.com/blog/about/license
*/

const prefs = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefService),

gt = { // GTranslatifier namespace
	name: "GTranslatifier"
};

gt.localeTable = {
	sq: "Albanian",
	ar: "Arabic",
	bg: "Bulgarian",
	ca: "Catalan",
	"zh-CN": "Chinese (Simplified)",
	"zh-TW": "Chinese (Traditional)",
	hr: "Croatian",
	cs: "Czech",
	da: "Danish",
	nl: "Dutch",
	en: "English",
	et: "Estonian",
	tl: "Filipino",
	fi: "Finnish",
	fr: "French",
	gl: "Galician",
	de: "German",
	el: "Greek",
	iw: "Hebrew",
	hi: "Hindi",
	hu: "Hungarian",
	id: "Indonesian",
	it: "Italian",
	ja: "Japanese",
	ko: "Korean",
	lv: "Latvian",
	lt: "Lithuanian",
	mt: "Maltese",
	no: "Norwegian",
	pl: "Polish",
	pt: "Portuguese",
	ro: "Romanian",
	ru: "Russian",
	sr: "Serbian",
	sk: "Slovak",
	sl: "Slovenian",
	es: "Spanish",
	sv: "Swedish",
	th: "Thai",
	tr: "Turkish",
	uk: "Ukrainian",
	vi: "Vietnamese"
};

gt.userLocale = prefs.getBranch("general.useragent.")
					.getCharPref("locale");
					//or .getComplexValue("locale", Components.interfaces.nsIPrefLocalizedString).data;

if (gt.userLocale.indexOf("-") != -1 && gt.userLocale != "zh-CN" && gt.userLocale != "zh-TW") // contains a region specific language
	gt.userLocale = gt.userLocale.split(/-/)[0]; // Google Translate doesn't support region-specific locales (ie. en-US vs en-GB)

if (!(gt.userLocale in gt.localeTable))
	gt.userLocale = "en"; // default to en (English)

gt.locales = {
	from: "auto",
	to: gt.userLocale,
	get menu()
		gt.userLocale
};

gt.locales.options = <></>;

for (var locale in gt.localeTable) // convert locale lists to XML lists
	if (gt.localeTable.hasOwnProperty(locale)) {
		gt.locales.options += <option value={locale}>{gt.localeTable[locale]||locale}</option>;
	}

gt.translate = function () {
	var tab = jetpack.tabs.focused,
	selection = String(tab.contentWindow.getSelection())
		.replace(/^\s+|\s+$/g, ""), // trim whitespace
	uri = tab.url;
	
	if (selection.length > 0) // translate selection (open new tab)
		jetpack.tabs.open("http://translate.google.com/translate_t"
			+ "?text=" + encodeURIComponent(selection)
			+ "&hl=" + gt.locales.menu
			+ "&langpair=" + gt.locales.from + "|" + gt.locales.to
			+ "&tbb=1"
		).focus();
	else { // translate page (load in same tab)
		tab.contentWindow.location.assign("http://translate.google.com/translate"
			+ "?u=" + encodeURIComponent(uri)
			+ "&hl=" + gt.locales.menu
			+ "&langpair=" + gt.locales.from+"|"+gt.locales.to
			+ "&tbb=1"
		);
		tab.focus(); // in case the tab lost focus
	}
};

// GTranslatifier widget
jetpack.statusBar.append({
	html: <>
		<meta charset="utf-8"/>
		<style type="text/css">
		/*<![CDATA[*/
		* {
			white-space: nowrap;
		}
		/*]]>*/
		</style>
		<button style="padding-left:0px;padding-right:0px;">Translate</button>
		<select style="max-width:23px;position:absolute;right:0px;">
			<optgroup label="Translate to">
				<!--<option selected="selected" disabled="disabled" value={gt.locales.to}>to</option>-->
				<option selected="selected" value={gt.userLocale}>{gt.localeTable[gt.userLocale]}</option>
				<option disabled="disabled">&#8212;</option>
				{gt.locales.options}
			</optgroup>
		</select>
	</>,
	width: 90,
	onReady: function (widget) {
		widget.documentElement.getElementsByTagName("select")[0].addEventListener("change", function () {
			gt.locales.to = this.options[this.selectedIndex].value;
			gt.translate();
		}, false);
		widget.documentElement.getElementsByTagName("button")[0].addEventListener("click", gt.translate, false);
	}
});
