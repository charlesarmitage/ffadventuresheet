(function(){

	$('.nav a').on('click', function(){
	    $(".navbar-toggle").click()
	});

	$('#menu-btn').on('click', function(){
	});

	$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
	   var hash = e.target.hash;
	   if(hash == '#Statistics'){
			$('#statistics-summary').hide()
		} else {
			$('#statistics-summary').show()
		}
	});

    $(document).on('deviceready', function(){
    	document.addEventListener("backbutton", onBackButton, false);
    	document.addEventListener("menubutton", onMenuKeyDown, false);
    });

	$(document).ready(function(){
		$('#statistics-summary').hide();
	});

	function onBackButton(){
		$(".navbar-toggle").click();
	}

	function onMenuKeyDown(){
		$(".navbar-toggle").click();
	}

})();