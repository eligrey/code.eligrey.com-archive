(function () {
	var loc = location,
	next = document.querySelector('[rel~="next"]');
	
	if (next) {
		loc.href = next.href;
	} else {
		loc.href = loc.href.replace(/(\d+)(\D*)$/, function (match, number, end) {
			return +number + 1 + end;
		});
	}
}());