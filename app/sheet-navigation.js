(function(){

	$('.nav a').on('click', function(){
	    $(".navbar-toggle").click()
	    console.log(".nav a click");
	});

	$('#menu-btn').on('click', function(){
	    console.log("menu-btn click");
	});

	$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
	   var hash = e.target.hash;
	   if(hash == '#Statistics'){
			$('#statistics-summary').hide()
		} else {
			$('#statistics-summary').show()
		}
	});

	function onBackButton(){
		$(".navbar-toggle").click();
	}

    $(document).on('deviceready', function(){
    	document.addEventListener("backbutton", onBackButton, true);
    });

	$(document).ready(function(){
		$('#statistics-summary').hide();
	    console.log("statistics-summary hide");
	});

})();