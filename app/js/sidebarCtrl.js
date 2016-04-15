batmanPlannerApp.controller('sideBarCtrl', function ($scope,$routeParams,batmanModel){

	//function activateSideMenu(){


		$("#sidebutton").click(function(){
			var button_status = document.getElementById("sidebutton");
			if (button_status.value=="Show sidebar"){
				button_status.value = "Hide sidebar";
				$("#sidebar").animate({
					width: 'toggle'
				});
				$("#container").animate({
					width: '70%'
				});
			}

			else{
				button_status.value = "Show sidebar";
				$("#sidebar").animate({
					width: 'toggle'
				});
				$("#container").animate({
					width: '100%'
				});
			}

		})
		
		
	//}



});