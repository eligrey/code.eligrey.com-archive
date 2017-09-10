/*
* GTranslatifier Jetpack feature v0.2.1.1
* Translate pages or selected text using Google Translate.
* 
* By Elijah Grey, http://eligrey.com
* 
* Inspired by "Jetpack: Google Translator" version 0.1 by Florian CROUZAT:
*   http://jetpack.floriancrouzat.net/google-translator/google-translator.html
* 
* License: GNU GPL v3 and the X11/MIT license
*   See http://purl.eligrey.com/license
*/


const prefs = Components.classes["@mozilla.org/preferences-service;1"]
                .getService(Components.interfaces.nsIPrefService),

gt = { // GTranslatifier namespace
	name: "GTranslatifier",
	
	translate: function (clickEvent) {
		var tab = jetpack.tabs.focused,
		selection = String(tab.contentWindow.getSelection())
			.replace(/^\s+|\s+$/g, ""), // trim whitespace
		URI = tab.url,
		button = clickEvent.button,
		translatedURI = "http://translate.google.com/translate";
		
		if (tab.contentWindow.location.hostname === "translate.google.com") {
			// un-translate page
			tab.contentWindow.location.assign(decodeURIComponent(
				URI.split("u=")[1].split("&")[0]
			));
			return;
		}
		
		if (selection.length > 0) { // translate selection (open new tab)
			translatedURI +=
				  "_t"
				+ "?text=" + encodeURIComponent(selection)
				+ "&hl=" + gt.userLocale
				+ "&langpair=auto|" + gt.userLocale
				+ "&tbb=1";
			
			gt.open(translatedURI);
			return
		} else { // translate page
			translatedURI +=
				 "?u=" + encodeURIComponent(URI)
				+ "&hl=" + gt.userLocale
				+ "&langpair=auto|" + gt.userLocale
				+ "&tbb=1";
			
			if (button) { // right or middle click, open in new tab
				gt.open(translatedURI);
			} else { // left click, open in same tab
				tab.contentWindow.location.assign(translatedURI);
			}
			return;
		}
	},
	
	open: function (URI) {
		jetpack.tabs.open(URI).focus();
	},
	
	supportedLocales: [
		"sq", "ar", "bg", "ca", "zh-CN", "zh-TW", "hr", "cs",
		"da", "nl", "en", "et", "tl", "fi", "fr", "gl", "de",
		"el", "iw", "hi", "hu", "id", "it", "ja", "ko", "lv",
		"lt", "mt", "no", "pl", "pt", "ro", "ru", "sr", "sk",
		"sl", "es", "sv", "th", "tr", "uk", "vi", "cy", "yi"
	],
	
	// 17x18 Google Translate icon
	icon: <![CDATA[
		data:image/png;base64,
		iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/o
		L2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAA7xJREFUOMt1k21olXUYxn///3mec87Ozoubm246NebWws
		Z8QUWSEqZSWjO33ihFV1iRKaQoZl9SWYQtJFSS+hKlVBapSYk0cinaMl2IpjgnnWi6HTen29k5Zzt7nud
		/92GWH8of3F8vLq7rutV3TWde/3TfMYJBG8fx3GRqIKu1Fs8VUAqUBJyse6zpUMNV7sVr63fJP7i93SKZ
		ARER8cSIm7wtyd5bsuzlRhlTvnysiPB/Z+WGQgA4/UmubdxEbMmT6ILRpM+2kr3aTumm9fgCFt3xTnMvI
		5bnuZgzLXTs/JDbBw+SajmNf1IJ1oQJFCyYD/l5pFNpNr61bBTQBwigAA8wABZodFUVYzZuYOhKOwVLa7
		D9fq7FO/jgRoAFFzpZuughYtHQ90eazmaN54iREanBoax3/OeLGctogUAuw4kETtd1rjfuQDJpenSQtlW
		TeXttncycXoaIlAeVkPUEx/MQMeQEA7Seu9yrtVFkT50gXvc0TqKb+344gms8JjX/iMm4AMqnUMGATcGe
		NPXNw4T9CttnYVkWruuJNu4wiS1bsHbt4PTias7PmkPR5jeJTq1CGW8kONvH1+dSxHr66LjYR0dK4dMgY
		kAptPEUvW1X+ST+K9vKz/NVUYSJW7eR2Pc5Rus7+QtfnB1galkYRyn2nhvEthUAPp9Ga7/NbzULSZcmqV
		5dxtE1MRpeqMfX0ADBHABSQx7xG1nqZkdYOSuXlrYMPSmDQvA8g25ru8T2K03kT4/S199HdJrL1l8+46d
		nnsXvOQDsOZkk4WiWT7F5YkqQ+C2X3zuzI0WLiC4pmcg7LzXSduBPum52MebQ/Xy7+yBPrVuLkx0E4Pz1
		YSLGMHd7B3Ufd9M7YLjSYwDBGLF030DWXbT4MbeycKbJJlyOXzgh48dN5sHpFSi3h0Qabg545E/IRYqi2
		CURxo4Psbd1kPYeBxHxWyuem7cjOqpGyiujFQUvFi8ZvTOmpz0+W4of1epS6Es2v1vEX/46DqyKUVFsgT
		KcalfU73dIZkZGq0RkpIA/CM9YXdmYmpt4JTrHrwfbDVaRovPoTZyOtbR+tIGCWAgxhmv9Lq9+k+Hh8hD
		pk/vT+t8vKiW1Lb77jbLLM44MHw6igojT71AYypOtteOkpDBMJOQnEg5QPi7E+7V5VD+QA2jfXSd3WFO7
		LrZw5by9te/V1hSGC8ntmsGUimn4c2xEBMXIPmwfaBgsHl+c+o/IHarmL6o+HbYjjxxu1hcmlYZtxxkSU
		Cjumh8acmTF8/Plb9ryzxIEOhH4AAAAAElFTkSuQmCC
	]]>.toString().replace(/\s/g, ""),
	
	userLocale: prefs.getBranch("general.useragent.").getCharPref("locale")
};

if (gt.supportedLocales.indexOf(gt.userLocale) === -1) {
	// Google Translate doesn't support the language, try non-region-specific
	gt.userLocale = gt.userLocale.split("-")[0];
	if (gt.supportedLocales.indexOf(gt.userLocale) === -1) { // still not supported
		gt.userLocale = "en"; // default to en (English)
	}
}

// GTranslatifier widget
jetpack.statusBar.append({
	html: <img src={gt.icon} alt={gt.name} title={gt.name}/>.toXMLString(),
	onReady: function (widget) {
		widget.addEventListener("click", gt.translate, false);
	}
});
