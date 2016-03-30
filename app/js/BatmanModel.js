batmanPlannerApp.factory('batmanModel',function ($resource) {
	console.log("3");
	//var api_keys=[f9043525bd2e79300101a963676d0bdc40534402, bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8];

	var test = function (){
		var hej = this.Character(300)
		console.log(hej)
	}

	var top10=[];
	var top10id=['1696','6129','4885'];

	var hej = function(){
		for (var i=0;i<top10id.length;i++){
			var j = top10id[i]
			this.hej = $resource('https://www.comicvine.com/api/characters/?api_key=f9043525bd2e79300101a963676d0bdc40534402&limit=10&format=json&filter=id:'+top10id[i]);
			this.hej.get(function(data){
				top10.push({id:data.results[0].id,
							name:data.results[0].name})
				console.log(data.results)
				console.log(top10)
			})
		}
		return top10;
	}
	hej();
	console.log(top10)
	//function that returns a dish of specific ID
	this.CharacterSearch = $resource('http://www.comicvine.com/api/search',{api_key:'f9043525bd2e79300101a963676d0bdc40534402', limit:'25', query:"Batman", resources:"character"});
	this.Character = $resource('http://api.comicvine.com/api/character',{api_key:'f9043525bd2e79300101a963676d0bdc40534402',format: 'json'});
	//this.villain = $resource('http://api.comicvine.com/api/characters',{api_key:'f9043525bd2e79300101a963676d0bdc40534402',filter: aaaray[i], format: 'json'});
	this.bla =$resource('https://www.comicvine.com/api/characters/?api_key=f9043525bd2e79300101a963676d0bdc40534402&filter=id:6129&limit=10&format=json');
	
	this.enemy =$resource('https://www.comicvine.com/api/character/4005-1699/?api_key=f9043525bd2e79300101a963676d0bdc40534402&field_list=&format=json')

	console.log("4");
	return this;
});