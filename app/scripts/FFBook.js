(function(ff){
	ff.book = {};

	function loadBranch() {
		if(localStorage.getItem('branch') === null){
			return 1;
		}
		return parseInt(localStorage.getItem('branch'));
	};

	ff.book.branch = ko.observable(loadBranch());
	ff.book.branch.subscribe(function(newValue){
		localStorage.setItem('branch', newValue);
	});

	ff.book.branch.reset = function(){
		ff.book.branch(1);
		localStorage.removeKey('branch');
	}

	ff.book.diceResult = ko.observable('Click to roll dice');

}(ff || {}));