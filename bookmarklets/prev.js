(function () {
	var loc = location,
	prev = document.querySelector('[rel~="prev"]');
	
	if (prev) {
		loc.href = prev.href;
	} else {
		loc.href = loc.href.replace(/(\d+)\D*$/, function (match, number, end) {
			return number - 1 + end;
		});
	}
}());
