batmanPlannerApp.factory('batmanModel',function ($resource) {
	console.log("3");
	var enemiesArray=[];
	var popularCharacters=[6129,1696,4885,1698,1807,5555,1697,3715,1702,3718];
	var megaArray=[];

	//var api_keys=[f9043525bd2e79300101a963676d0bdc40534402, bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8];

	var test = function (){
		var hej = this.Character(300)
		console.log(hej)
	}

	//function that returns a dish of specific ID
	// this.CharacterSearch = $resource('http://www.comicvine.com/api/search',{api_key:'f9043525bd2e79300101a963676d0bdc40534402', limit:'25', query:"Batman", resources:"character"});
	// this.Character = $resource('http://api.comicvine.com/api/character',{api_key:'f9043525bd2e79300101a963676d0bdc40534402',format: 'json'});

	//this.bla =$resource('http://www.comicvine.com/api/search/?api_key=f9043525bd2e79300101a963676d0bdc40534402&query=Batman&resources=character&format=json');
	//this.CharacterSearch =$resource('http://www.comicvine.com/api/character/4005-1699/?api_key=f9043525bd2e79300101a963676d0bdc40534402&format=json');
	this.BatmanEnemies=$resource('http://comicvine.com/api/character/4005-1699/?api_key=f9043525bd2e79300101a963676d0bdc40534402&field_list=character_enemies&format=json');
	var SearchCharacters =this.SearchCharacters=function(x){
		$resource('http://comicvine.com/api/search/?api_key=f9043525bd2e79300101a963676d0bdc40534402&resources=character&query='+x+'&field_list=name,id&format=json');
	}
	this.setEnemiesArray=function(data){
		for(var i=0; i<data.length; i++){
			enemiesArray.push({id:data[i].id,
						name:data[i].name});
		}
		
		//console.log("enemiesArray ", enemiesArray);

	}

	// this.setAllCharactersArray=function(data){
	// 	for(var i=0; i<data.length; i++){
	// 		allCharacters.push({id:data[i].id,
	// 					name:data[i].name,
	// 					real_name:data[i].real_name,
	// 					dec:data[i].deck});
	// 	}
		
	// 	//console.log("allCharacters ", allCharacters);

	// }

	this.mergeArrays=function(){
		console.log("hejjjj");
		console.log(enemiesArray);
		for(var i=0; i<enemiesArray.length; i++){
			for(var j=0; j<popularCharacters.length; j++){
				if(enemiesArray[i].id==popularCharacters[j]){
					SearchCharacters(enemiesArray[i].name).get(function(data){
						console.log("data ",data);
						megaArray.push({id:data.results.id,
										name:data.results.name});
					})
				}
			}
		}
		console.log("megaArray ",megaArray);
		return megaArray;
	}





	console.log("4");
	return this;

});