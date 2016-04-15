batmanPlannerApp.factory('batmanModel',function ($resource,$cookieStore) {
	
	//var api_keys=[f9043525bd2e79300101a963676d0bdc40534402, bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8];


	var arrayObjects=[];
	var top12id=[6129,1696,4885,1698,1807,5555,1697,3715,1702,3718,3726,9589];
	var find;
	var searchArray=[];
	var enemiesArray=[];
	var character=[];
	var arrayObjectsID=[];

	//APIs
	var findCharacter= this.findCharacter=function(filter){
		return $resource('https://www.comicvine.com/api/characters/?api_key=f9043525bd2e79300101a963676d0bdc40534402&limit=12&format=json&filter=id:'+filter);
	}
	this.searchVillain= function(a){
		return $resource('https://www.comicvine.com/api/search/?api_key=f9043525bd2e79300101a963676d0bdc40534402&format=json&resources=character&query='+a);
	}

	////// coockies funktions
	var characterId=$cookieStore.get('characterId');
	this.setCharacterId=function(id){
		characterId=id;
		$cookieStore.put('characterId',characterId);
		console.log("cookie id", $cookieStore.get("characterId"));
	};
	console.log("characterId modelen ", typeof characterId, characterId);

	var setCharacter=this.setCharacter= function(info){
		character=[];
		character.push({id:info.id,
						name:info.name,
						real_name:info.real_name,
						image:info.image,
						deck:info.deck,
						first_appeared_in_issue:info.first_appeared_in_issue,
						gender:info.gender,
						aliases:info.aliases});
	
	};
	
	if(typeof characterId!='undefined'){
		console.log("characterId ", typeof characterId,characterId);
		findCharacter(characterId).get(function(data){
		var info=data.results[0];
		character=[];
		character.push({id:info.id,
						name:info.name,
						real_name:info.real_name,
						image:info.image,
						deck:info.deck,
						first_appeared_in_issue:info.first_appeared_in_issue,
						gender:info.gender,
						aliases:info.aliases});
		})
	}
	console.log("show character ", character);

	//array with searching GIFs
	var waitingArray=["https://media.giphy.com/media/Mz5Oo0VSqaZlC/giphy.gif",
					"https://media.giphy.com/media/O3IHMKIYwLT8I/giphy.gif",
					"https://media.giphy.com/media/vgSJqTTWV7tC0/giphy.gif",
					"https://media.giphy.com/media/JDTbmhOGrx6es/giphy.gif",
					"https://media.giphy.com/media/SgBFcIje2WNkk/giphy.gif",
					"https://media.giphy.com/media/b1O5lApuMGEhi/giphy.gif",
					"https://media.giphy.com/media/VNONSuCtUMRdC/giphy.gif"]
	var waitingGif;

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


	var enemiesBeaten = $cookieStore.get("enemiesBeaten"); //Lista med slagna skurkar
	if(typeof enemiesBeaten=="undefined"){
		enemiesBeaten=[];
	}
	// var highscoreList = [];	//Temporär lista med highscore


	
	var BatmanEnemies=this.BatmanEnemies=$resource('http://comicvine.com/api/character/4005-1699/?api_key=f9043525bd2e79300101a963676d0bdc40534402&field_list=character_enemies&format=json');

	this.getTop12 = function(){
		// $cookieStore.remove('characterId');
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

	this.setFiltered =function(query){
		arrayObjects=[];
		var query = query.toLowerCase();			
		counter=0;
		hideshow=0;
		for(var j=0; j<enemiesArray.length;j++){
			var enemyname = enemiesArray[j].name.toLowerCase();
				if (enemyname.indexOf(query)!== -1 && counter<12){
					findCharacter(enemiesArray[j].id).get(function(data){
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
				counter+=1;

			}

			}
		if(counter>=12){
			hideshow=1;
		}
		else if(counter==0){
			hideshow=2;
		}
		return hideshow;
	}

	this.getMoreFiltered =function(query){
		var query = query.toLowerCase();
		hideshow=0;
		counter=0;
		for (var k=0;k<arrayObjects.length;k++){
			arrayObjectsID.push(arrayObjects[k].id)
		}
		for(var j=0; j<enemiesArray.length;j++){
			var enemyname = enemiesArray[j].name.toLowerCase();
			if (enemyname.indexOf(query)!==-1 && counter<12 && j<enemiesArray.length && arrayObjectsID.indexOf(enemiesArray[j].id)==-1){
				findCharacter(enemiesArray[j].id).get(function(data){
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
				counter+=1;
			}
			if(counter>=12){
				hideshow=1;
			}
		}
		return hideshow;
	}

	///////////////////////// måste fixas(kanske ändra attribut i enemies array till "dead":true/false);

	// this.checkIfDead=function(id){
	// 	for(var i=0;i<enemiesBeaten.length;i++){
	// 		if(id==enemiesBeaten[i].id){
	// 			$("#dead").css({
	// 				display: 'block'
	// 			});
	// 			// $("#villain_image").css({
	// 			// 	-webkit-filter: 'grayscale(100%)'
	// 			// });
	// 		}
	// 	}
	// }

	this.getArray = function(){
		return arrayObjects;
	};

	this.clearCookies=function(){
		$cookieStore.remove('characterId');
	};

	
	this.getCharacter=function(){
		return character;
	};

	this.getGif=function(){
		var gif;
		for(var i=0;i<gifArray.length;i++){
			if(characterId==gifArray[i].id){
				gif=gifArray[i].gifurl;
				break;
			}
		}
		if(typeof gif=="undefined"){
			gif=character[0].image.small_url;
		}
		return gif;
	};

//Lägger till skurken i listan enemiesBeaten när denna vunnits över
	this.addBeatenEnemy = function(enemy) {
		enemiesBeaten.push(enemy);
		$cookieStore.put("enemiesBeaten",enemiesBeaten);
		console.log("enemiesBeaten ", enemiesBeaten, "cookie ", $cookieStore.get("enemiesBeaten"));
	};

//Clearar listan med slagna skurkar då man förlorat
	this.clearBeatenEnemy = function(){
		enemiesBeaten = [];
		$cookieStore.remove("enemiesBeaten");
		console.log("Game over! List cleared", enemiesBeaten);
	};

//Tar ut listan med slagna skurkar
	this.getBeatenEnemies = function(){
		return enemiesBeaten;
	};

//Loppar genom enemies
	
	this.setEnemyToDead=function(id){
		var deadArray=[{dead:"none", grayscale:"0"}];
		for(var i=0;i<enemiesBeaten.length;i++){
			if(id==enemiesBeaten[i]){
				deadArray=[{dead:"block", grayscale:"100"}];
				break;
			}
		}
		return deadArray;
	}

//Tar längden av listan med slagna skurkar och lägger till i highscore-listan
	// this.setHighscore = function(){
	// 	var score = enemiesBeaten.length
	// 	highscoreList.push(score)
	// 	console.log(highscoreList)
	// };

//Tar ut score
 	this.getUserScore = function(){
		var score = enemiesBeaten.length;
		return score;
	};

//Hämtar ut en slumpad GIF från array med GIF:ar
	this.randomiseWaitingGif=function(){
		waitingGif=waitingArray[Math.floor(Math.random()*waitingArray.length)];
		return waitingGif;
	}
	this.setEnemiesArray();


////////////// Game /////////////////////////
	//$cookieStore.remove('userWinning');
	//$cookieStore.remove('computerWinning');
	var userChoice;
	//var userWinning = $cookieStore.get('userWinning');
	var userWinning=0;
	if(typeof userWinning=="undefined"){
		userWinning=0;
	}
	//var computerWinning = $cookieStore.get('computerWinning');
	var computerWinning=0;
	if(typeof computerWinning=="undefined"){
		computerWinning=0;
	}
	console.log("userWinning ", userWinning, "computerWinning ", computerWinning);
	var choises = ["rock", "paper", "scissors"];

	// var computerChoice = choises[Math.floor(Math.random()*choises.length)];
	var computerChoice = "rock";
	var setRoundChoice;

	this.setUserChoise= function(choise){
		userChoice = choise;
	}

	this.getPicture = function(){
		var src;
		if (computerChoice =='rock') {
			src="https://www.randomlists.com/img/rock-paper-scissors/rock.png";
        }

        else if (computerChoice =='paper') {
        	src="http://www.veryicon.com/icon/ico/System/Icons8%20Metro%20Style/Rock%20Paper%20Scissors%20Paper.ico";
        }

        else if (computerChoice =='scissors') {
        	src="http://megaicons.net/static/img/icons_sizes/8/178/256/rock-paper-scissors-scissors-icon.png";
        }
        return src;
	}

	this.compareChoices=function(){

		// computerChoice= choises[Math.floor(Math.random()*choises.length)];

		if(userChoice == "rock"){
            if(computerChoice == "rock"){
                console.log("TIE!");
            }
            else if(computerChoice == "paper"){
                console.log("Computer wins(papper slår rock)");
                computerWinning += 1;
                setRoundChoice=false;
            }
            else if(computerChoice == "scissors"){
                console.log("You win(rock slår scissors)");
                userWinning += 1;
                setRoundChoice=true;
            }
        }
        
        else if(userChoice == "paper"){
            if(computerChoice == "rock"){
                console.log("You win(paper slår rock)");
                userWinning += 1;
                setRoundChoice=true;
            }
            else if(computerChoice == "paper"){
                console.log("TIE");
            }
            else if(computerChoice == "scissors"){
                console.log("Computer wins(rock slår scissors)");
                computerWinning += 1;
                setRoundChoice=false;
            }
        }
        
        else if(userChoice == "scissors"){
            if(computerChoice == "rock"){
                console.log("Computer wins(rock slår scissors)");
                computerWinning += 1;
                setRoundChoice=false;
                
            }
            else if(computerChoice == "paper"){
                console.log("You win(scissors slår paper)");
                userWinning += 1;
                setRoundChoice=true;
            }
            else if(computerChoice == "scissors"){
                console.log("Tie");
            }
        }
        // $cookieStore.put('userWinning',userWinning);
        // $cookieStore.put('computerWinning',computerWinning);
        //console.log("user ", $cookieStore.get('userWinning'));
        //console.log("computer ", $cookieStore.get('computerWinning'));
	}
	this.clearGameCookies=function(){
		//console.log("userWinning ", $cookieStore.get("userWinning"),"computerWinning", $cookieStore.get("computerWinning"));
		userWinning=0;
		computerWinning=0;
		// $cookieStore.remove('userWinning');
		// $cookieStore.remove('computerWinning');
	}

	var setRound= this.setRound = function(){
		var background;
        if (setRoundChoice == true) {
        	background="darkgreen";
        }
        else {
        	background="darkred";
        }
        return background;
    }

    this.getUserWinning=function(){
    	return userWinning;
    }

    this.getComputerWinning=function(){
    	return computerWinning;
    }

    this.getRoundChoice=function(){
    	return setRoundChoice;
    }

    this.getSumResult=function(){
    	return userWinning+computerWinning;
    }





	return this;



});