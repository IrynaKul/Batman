batmanPlannerApp.factory('Batman',function ($resource,$cookieStore) {
	console.log("hej")
	//var api_keys=[f9043525bd2e79300101a963676d0bdc40534402, bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8];

	var test = function (){
		var hej = this.Character(300)
		console.log(hej)
	}

	//function that returns a dish of specific ID
	this.CharacterSearch = $resource('http://www.comicvine.com/api/search',{api_key:'bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8'});
	this.Character = $resource('http://www.comicvine.com/api/character:id',{api_key:'bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8'});

})