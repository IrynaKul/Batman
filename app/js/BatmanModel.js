batmanPlannerApp.factory('batmanModel',function ($resource) {
	
	//var api_keys=[f9043525bd2e79300101a963676d0bdc40534402, bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8];

	var arrayObjects=[];
	var top12id=[6129,1696,4885,1698,1807,5555,1697,3715,1702,3718,3726,9589];
	var find;
	var searchArray=[];
	var enemiesArray=[];
	var character=[];
	var gifArray=[{id:6129, gifurl:'http://s1.gamewalkers.com/games/tabs/mugen/heroes/bane.gif'},
				{id:1696, gifurl:'http://i202.photobucket.com/albums/aa64/DARKTALBAIN/harley2ev1.gif'},
				{id:1807, gifurl:'http://i.imgur.com/bwz90US.gif'},
				{id:5555, gifurl:'http://i.imgur.com/qoeEe.gif'},
				{id:1697, gifurl:'http://i71.photobucket.com/albums/i143/esn23/ivystance-2.gif'},
				{id:3715, gifurl:'http://i255.photobucket.com/albums/hh135/afrikabambaataassf/DC%20SPRITES%20ANIMATION/mrfreeze.gif'},
				{id:1702, gifurl:'http://i282.photobucket.com/albums/kk255/super_joker/jokerstance2013sj_zps377b96af.gif'},
				{id:3726, gifurl:'http://i132.photobucket.com/albums/q17/beast96240/angelecksfix.gif'},
				{id:9589, gifurl:'http://orig00.deviantart.net/70f6/f/2015/302/a/a/clayface_walkcycle_by_bwwd-d9c1afs.gif'},
				{id:3718, gifurl:'http://i2.photobucket.com/albums/y32/thedudes/the-riddler-walk-1.gif'}
				];
	var characterId;
	var enemiesBeaten = []; //Lista med slagna skurkar
	var highscoreList = [];	//Temporär lista med highscore


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
		console.log("i setFiltered query ", typeof query, query);
		arrayObjects=[];
		searchArray=[];
		for(var i=0; i<data.length; i++){
			searchArray.push(data[i].id);
		}
		
		for (var i=0;i<searchArray.length;i++){
			for(var j=0; j<enemiesArray.length;j++){
				if(searchArray[i]==enemiesArray[j].id&&query.toLowerCase()==enemiesArray[j].name.toLowerCase()){
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
					break;
				}
			}
		}
	}

	this.getArray = function(){
		return arrayObjects;
	};

	this.setCharacter= function(data){
		character=[];
		character.push({id:data.id,
						name:data.name,
						real_name:data.real_name,
						image:data.image,
						deck:data.deck,
						first_appeared_in_issue:data.first_appeared_in_issue,
						gender:data.gender,
						aliases:data.aliases});

	};
	this.getCharacter=function(){
		return character;
	};

	this.getGif=function(id){
		var gif;
		for(var i=0;i<gifArray.length;i++){
			if(id==gifArray[i].id){
				gif=gifArray[i].gifurl;
				break;
			}
			else{
				if(id==character[0].id){
					gif=character[0].image.small_url;
				}
			}
		}

		return gif;
	};
	this.setCharacterId=function(id){
		characterId=id;
	};

	this.getCharacterId=function(){
		return characterId;
	};

//Lägger till skurken i listan enemiesBeaten när denna vunnits över
	this.addBeatenEnemy = function(enemy) {
		console.log("add")
		enemiesBeaten.push(enemy);
		console.log(enemiesBeaten);
	};

//Clearar listan med slagna skurkar då man förlorat
	this.clearBeatenEnemy = function(){
		enemiesBeaten = [];
		console.log("Game over! List cleared", enemiesBeaten)
	};

//Tar längden av listan med slagna skurkar och lägger till i highscore-listan
	this.submitHighscore = function(){
		var score = enemiesBeaten.length
		highscoreList.push(score)
		console.log(highscoreList)
	}


	this.setEnemiesArray();
	//function that returns a dish of specific ID
	return this;



});