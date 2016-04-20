batmanPlannerApp.controller('sideBarCtrl', function ($scope,$routeParams,batmanModel){

	//function activateSideMenu(){

		$("#sidebutton").click(function(){
			console.log("activate");
			var button_status = document.getElementById("sidebutton");
			console.log("status", button_status);
			if (button_status.value=="show sidebar"){
				console.log("if");
				button_status.value = "hide sidebar";
				$("#sidebar").animate({
					width: 'toggle'
				});
				$("#container").animate({
					width: '70%'
				});
			}

			else{
				console.log("else");
				button_status.value = "show sidebar";
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