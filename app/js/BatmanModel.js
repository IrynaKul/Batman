batmanPlannerApp.factory('batmanModel',function ($resource) {
	console.log("3");
	//var api_keys=[f9043525bd2e79300101a963676d0bdc40534402, bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8];

	var test = function (){
		var hej = this.Character(300)
		console.log(hej)
	}

	//function that returns a dish of specific ID
	this.CharacterSearch = $resource('http://www.comicvine.com/api/search',{api_key:'f9043525bd2e79300101a963676d0bdc40534402', limit:'25', query:"Batman", resources:"character"});
	this.Character = $resource('http://api.comicvine.com/api/character',{api_key:'f9043525bd2e79300101a963676d0bdc40534402',format: 'json'});

	this.bla =$resource('http://www.comicvine.com/api/character/?api_key=f9043525bd2e79300101a963676d0bdc40534402&format=json');
	
	console.log("4");
	return this;

});