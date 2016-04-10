batmanPlannerApp.factory('batmanModel',function ($resource) {
	
	//var api_keys=[f9043525bd2e79300101a963676d0bdc40534402, bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8];

	var arrayObjects=[];
	var top12id=[6129,1696,4885,1698,1807,5555,1697,3715,1702,3718,3726,9589];
	var find;
	var searchArray=[];
	var enemiesArray=[];

	var findCharacter= this.findCharacter=function(filter){
		return $resource('https://www.comicvine.com/api/characters/?api_key=f9043525bd2e79300101a963676d0bdc40534402&format=json&filter=id:'+filter);
	}
	this.searchVillain= function(a){
		return $resource('https://www.comicvine.com/api/search/?api_key=f9043525bd2e79300101a963676d0bdc40534402&format=json&resources=character&query=batman,'+a);
	}
	var BatmanEnemies=this.BatmanEnemies=$resource('http://comicvine.com/api/character/4005-1699/?api_key=f9043525bd2e79300101a963676d0bdc40534402&field_list=character_enemies&format=json');

	this.getTop12 = function(){
		arrayObjects=[];
		for (var i=0;i<top12id.length;i++){
				findCharacter(top12id[i]).get(function(data){
				var a=data.results[0];
				arrayObjects.push({id:a.id,
							name:a.name,
							real_name:a.real_name,
							image:a.image,
							deck:a.deck,
							first_appeared_in_issue:a.first_appeared_in_issue,
							gender:a.gender,
							aliases:a.aliases});
				});

		}
		console.log("getTop");
	};

	this.setEnemiesArray=function(){
		BatmanEnemies.get(function(data){
			var enemies=data.results.character_enemies;
			for(var i=0; i<enemies.length; i++){
			enemiesArray.push({id:enemies[i].id,
						name:enemies[i].name});
 			}
		})
		return enemiesArray;
		
 	}
	// this.setArray=function(data){
	// 	for(var i=0; i<data.length; i++){
	// 		searchArray.push(data[i].id);
	// 	}
	// }

	this.setFiltered =function(data,query){
		arrayObjects=[];
		searchArray=[];
		for(var i=0; i<data.length; i++){
			searchArray.push(data[i].id);
		}
		
		for (var i=0;i<searchArray.length;i++){
			for(var j=0; j<enemiesArray.length;j++){

				var query = query.toLowerCase();
				var enemyname = enemiesArray[j].name.toLowerCase();

				if(searchArray[i]==enemiesArray[j].id && query==enemyname){
					findCharacter(searchArray[i]).get(function(data){
					var a=data.results[0];
					arrayObjects.push({id:a.id,
								name:a.name,
								real_name:a.real_name,
								image:a.image,
								deck:a.deck,
								first_appeared_in_issue:a.first_appeared_in_issue,
								gender:a.gender,
								aliases:a.aliases});
					});
				}

				else if (searchArray[i]==enemiesArray[j].id && enemyname.indexOf(query)!= -1){
					findCharacter(searchArray[i]).get(function(data){
					var a=data.results[0];
					arrayObjects.push({id:a.id,
								name:a.name,
								real_name:a.real_name,
								image:a.image,
								deck:a.deck,
								first_appeared_in_issue:a.first_appeared_in_issue,
								gender:a.gender,
								aliases:a.aliases});
					});
				}
			}
		}
	}

	this.getArray = function(){
		return arrayObjects;
	};

	this.setEnemiesArray();
	//function that returns a dish of specific ID
	return this;
});