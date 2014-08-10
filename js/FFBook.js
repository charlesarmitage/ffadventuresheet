(function(ff){
	ff.book = {};

	function loadInt(name) {
		if(localStorage.getItem(name) === null){
			return 0;
		}
		return parseInt(localStorage.getItem(name));
	};

	ff.book.branch = ko.observable(loadInt('branch'));
	ff.book.branch.subscribe(function(newValue){
		localStorage.setItem('branch', newValue);
	});

	ff.book.diceResult = ko.observable('...');

}(ff));