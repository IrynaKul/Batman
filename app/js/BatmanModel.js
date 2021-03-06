batmanPlannerApp.factory('batmanModel',function ($resource,$cookieStore) {
	
	//var api_keys=[f9043525bd2e79300101a963676d0bdc40534402, bad0d77f8c20f0671597ccd9a8bcdf3b3c680fb8];


	var arrayObjects=[];
	var top12id=[6129,1696,4885,1698,1807,5555,1697,3715,1702,3718,3726,9589];
	var find;
	var searchArray=[];
	var enemiesArray=[];
	var character=[];
	var arrayObjectsID=[];
	var score;

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


	var gifArray=[{id:6129, gifurl:'http://s1.gamewalkers.com/games/tabs/mugen/heroes/bane.gif'},
				{id:1807, gifurl:'http://i.imgur.com/bwz90US.gif'},
				{id:5555, gifurl:'http://i.imgur.com/qoeEe.gif'},
				{id:1697, gifurl:'http://i71.photobucket.com/albums/i143/esn23/ivystance-2.gif'},
				{id:3715, gifurl:'http://i255.photobucket.com/albums/hh135/afrikabambaataassf/DC%20SPRITES%20ANIMATION/mrfreeze.gif'},
				{id:1702, gifurl:'http://i282.photobucket.com/albums/kk255/super_joker/jokerstance2013sj_zps377b96af.gif'},
				{id:3718, gifurl:'http://i2.photobucket.com/albums/y32/thedudes/the-riddler-walk-1.gif'}
				];


	var enemiesBeaten = $cookieStore.get("enemiesBeaten"); //Lista med slagna skurkar
	if(typeof enemiesBeaten=="undefined"){
		enemiesBeaten=[];
	}
	if(enemiesBeaten.length!==0){
		score = enemiesBeaten.length;
	}
	else{
		score=0;
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
					console.log(a.image)
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
		if(typeof character[0]=="undefined"){
			gif="https://business.comcast.com/img/preloader.gif";
		}
		if(typeof gif=="undefined"){
			gif=character[0].image.small_url;

			//Här nåt med class circle
		}
		return gif;

	};

//Lägger till skurken i listan enemiesBeaten när denna vunnits över
	this.addBeatenEnemy = function(enemy) {
		// message="Choose a fight icon!";
		enemiesBeaten.push(enemy);
		$cookieStore.put("enemiesBeaten",enemiesBeaten);
		score = enemiesBeaten.length;
		console.log("enemiesBeaten ", enemiesBeaten, "cookie ", $cookieStore.get("enemiesBeaten"));
	};

//Clearar listan med slagna skurkar då man förlorat
	this.clearBeatenEnemy = function(){
		score=0;
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

//Tar ut score
 	this.getUserScore = function(){
		return score;
	};

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
	var choises = ["rock", "paper", "scissors"];

	// var computerChoice = choises[Math.floor(Math.random()*choises.length)];
	var setRoundChoice;
	var message="Choose a Fight Icon!";

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

		computerChoice= choises[Math.floor(Math.random()*choises.length)];

		if(userChoice == "rock"){
            if(computerChoice == "rock"){
                //console.log("TIE!");
                message="It's a tie!"
            }
            else if(computerChoice == "paper"){
                //console.log("Computer wins(papper slår rock)");
                computerWinning += 1;
                setRoundChoice=false;
                message="You lose this round!"
            }
            else if(computerChoice == "scissors"){
                //console.log("You win(rock slår scissors)");
                userWinning += 1;
                setRoundChoice=true;
                message="You win this round!"
            }
        }
        
        else if(userChoice == "paper"){
            if(computerChoice == "rock"){
                //console.log("You win(paper slår rock)");
                userWinning += 1;
                setRoundChoice=true;
                message="You win this round!"
            }
            else if(computerChoice == "paper"){
                //console.log("TIE");
                message="It's a tie!"
            }
            else if(computerChoice == "scissors"){
                //console.log("Computer wins(rock slår scissors)");
                computerWinning += 1;
                setRoundChoice=false;
                message="You lose this round!"
            }
        }
        
        else if(userChoice == "scissors"){
            if(computerChoice == "rock"){
                //console.log("Computer wins(rock slår scissors)");
                computerWinning += 1;
                setRoundChoice=false;
                message="You lose this round!"
                
            }
            else if(computerChoice == "paper"){
                //console.log("You win(scissors slår paper)");
                userWinning += 1;
                setRoundChoice=true;
                message="You win this round!"
            }
            else if(computerChoice == "scissors"){
                //console.log("Tie");
                message="It's a tie!"
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
		message="Choose a Fight Icon!";
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

    this.returnMessage=function(){
    	return message;
    }

    this.getSumResult=function(){
    	return userWinning+computerWinning;
    }





	return this;



});