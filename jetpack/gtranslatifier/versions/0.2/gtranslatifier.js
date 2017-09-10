/*
* GTranslatifier Jetpack feature v0.2
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
	name: "GTranslatifier",
	
	translate: function (clickEvent) {
		var tab = jetpack.tabs.focused,
		selection = String(tab.contentWindow.getSelection())
			.replace(/^\s+|\s+$/g, ""), // trim whitespace
		URI = tab.url,
		button = clickEvent.button,
		translatedURI = "http://translate.google.com/translate";
		
		if (tab.contentWindow.location.hostname === "translate.google.com") { // un-translate page
			tab.contentWindow.location.assign(decodeURIComponent(
				URI.split("u=")[1].split("&")[0]
			));
			return;
		}
		
		if (selection.length > 0) { // translate selection (open new tab)
			translatedURI +=
				  "_t"
				+ "?text=" + encodeURIComponent(selection)
				+ "&hl=" + gt.locales.menu
				+ "&langpair=" + gt.locales.from + "|" + gt.locales.to
				+ "&tbb=1";
			
			gt.open(translatedURI);
			return
		} else { // translate page
			translatedURI +=
				 "?u=" + encodeURIComponent(URI)
				+ "&hl=" + gt.locales.menu
				+ "&langpair=" + gt.locales.from + "|" + gt.locales.to
				+ "&tbb=1";
			
			if (button) // right or middle click, open in new tab
				gt.open(translatedURI);
			else // left click, open in same tab
				tab.contentWindow.location.assign(translatedURI);
			
			return;
		}
	},
	
	open: function (URI) {
		jetpack.tabs.open(URI).focus();
	},
	
	supportedLocales: [
		"sq",
		"ar",
		"bg",
		"ca",
		"zh-CN",
		"zh-TW",
		"hr",
		"cs",
		"da",
		"nl",
		"en",
		"et",
		"tl",
		"fi",
		"fr",
		"gl",
		"de",
		"el",
		"iw",
		"hi",
		"hu",
		"id",
		"it",
		"ja",
		"ko",
		"lv",
		"lt",
		"mt",
		"no",
		"pl",
		"pt",
		"ro",
		"ru",
		"sr",
		"sk",
		"sl",
		"es",
		"sv",
		"th",
		"tr",
		"uk",
		"vi"
	],
	
	icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFHhYvDfXF04kAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEhklEQVQ4y5WUW2xVVRCGv7X2Ppe2tJU2AaGAUuVS7lACFAwoFEVsoxgTEMULCAhKDBh8IITwwItajMYoCTEYJVI13hKLWFPBCFQBuVhooCUgAgXaYml7Ts/ZZ++91vhQTEiMIf4v8zL5Mpn5/1H1R88s27ylGqUAINmT9ruTCd91I5hQAIXRltxYzPm1buuucTPW0HDwXf5Tz7+0VXzflyAIxZhQgiAjJsiI73vieSnJpFPipXvkyLFmGT1tdQO3ke6TnYPjOiilwA+4tGoV/qUWVCSKimXRuW8vwdFjjBren7TnF94WaMQiiSSZht/p+OYr/vpgB4n9+7m4cgWNfftycX4FyaYmnGgEq2zkdkBXAO9sE21bt9JZtw+ASy+uInf2LPq/VUXBwkWk/QxBxseBfBEZDyQBuYXjASlA1Op12+TdquWgHFKnGjg7pYwR335NcKqR9oP1rGM4q1csAKWIx6JkfB+FwpoQC4jt5SaSKX7c35BwjbaIMfhtrbRWVWHSKZoWPY253g7ZOZwdFmde+WSsWKwxvW4wlkAAMYBgreBozS+HT3laW4XxQ5rGjKXnQD06FufeE0ewwF11tRDNBcAaQWFxHIfiHT3M3+0RWgEjaKURgSA0aKIOF19aTXzqZGK139OS8Tg3ZiIFS54iv6wM19UAKCUo5VDTmMRp6eTKyQ6uJQS0RhBEbO+V0VE6P6mm/6bNLFj5IEsm5dClNUXvv4dYSxgGvUCxiFh2HErS7w4HK1B1xCPuAlYQpXAcjTahIT5pPKOnT2fh9gpGvlHIK/cMQJI9NMyYifgGABHBt8LF9gzzJhcwZ1Sc7w910xkoRIG2NyeMYvm64lHW/ryJHj9JtE8Eu+o65UXFDMmk4WYkUXDoQob2bsOMoQ6vzsoj4sDukynUzabQGHTzmdNs2b6R1uvXOO81gwWlFI1lwsfLlkKkd4eOEjZ+14mbG2XuEIfB+Zr8bIfPjyfIioCxFoVCFw0azO4P96J/yuX08WbCpKF4Tyk1W/bw8vPP9trEBrSlhNbOgJgXMmHLZUpfv0oyFXL0sqXLEyxgrbj6WnuC0knjeXb5Ulp/uIHO0dT9VsuAorsYWzqOjqunQUeoP+fhOIqsgTlwZx56YB9ig/LI1vBabRJjDSISdVc+N7dm5NSXdSSqbPGQKRXaaaXk7QGUTCijcE4K5bSxfu0a5P4NOFrz5eNZ3J2nAQsOTH3H48zVABO6gEU/9sj0yraz1Y+0NO6qLC+ZueHMm1fQMUXJey59JsQZuKSAb4s+Y9sLDxB3NXe4AYmMoTtt6UyElA/VXOkI6fBAKY3zT7pFhPJ5cw/MH1F5/eTxU/MLZ+fg5mtMWlBRIbu0C7fmHEsXVyC29wjWGmJZLjsPZzhx1adfV3Ogbn09IoJSivXr1n+0t+GHZ7ruayE+xKHjUJLJfz7Ap1/sJDQg9qY3ETSQE4XQWtZsrE6p//prf5w7v334guLlefnZOBcmUjhgGKBEMDd6jaVvbTcI3ZUPT0v/CyQi/9Sx8yoeMoufeLKS/6G/ATVUMaMVk8YXAAAAAElFTkSuQmCC",
	
	userLocale: prefs.getBranch("general.useragent.")
					.getCharPref("locale") //or .getComplexValue("locale", Components.interfaces.nsIPrefLocalizedString).data;
};

if (gt.userLocale.indexOf("-") != -1 && gt.userLocale != "zh-CN" && gt.userLocale != "zh-TW") // contains a region specific language
	gt.userLocale = gt.userLocale.split(/-/)[0]; // Google Translate doesn't support region-specific locales (ie. en-US vs en-GB)

if (gt.supportedLocales.indexOf(gt.userLocale) === -1) // user has unsupported language
	gt.userLocale = "en"; // default to en (English)

gt.locales = {
	from: "auto",
	to: gt.userLocale,
	get menu() // menu should always be gt.userLocale
		gt.userLocale
};

// GTranslatifier widget
jetpack.statusBar.append({
	html: <img style="margin-top:3px" src={gt.icon} alt={gt.name} title={gt.name}/>.toXMLString(),
	width: 20,
	onReady: function (widget) {
		widget.addEventListener("click", gt.translate, false);
	}
});
