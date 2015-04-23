(function(){

	$('.nav a').on('click', function(){
	    $(".navbar-toggle").click()
	});

	$('#menu-btn').on('click', function(){
	});

	var isNavOpen = false;
	$('.navbar-collapse').on('shown.bs.collapse', function () {
	  isNavOpen = true;
	});

	$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
	   var hash = e.target.hash;
	   if(hash == '#Statistics'){
			$('#statistics-summary').hide()
		} else {
			$('#statistics-summary').show()
		}
	});

	$(document).ready(function(){
		$('#statistics-summary').hide();
	});

	document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady(){
    	document.addEventListener("backbutton", onBackButton, false);
    	document.addEventListener("menubutton", onMenuKeyDown, false);
    };

	function onBackButton(){
		if(isNavOpen){ // Avoid first back button press opening the navbar-collapse
			$(".navbar-collapse").collapse('hide');
    		isNavOpen = false;
		}
	}

	function onMenuKeyDown(){
		$(".navbar-toggle").click();
	}
})();