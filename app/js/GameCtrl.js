batmanPlannerApp.controller('GameCtrl', function($scope, batmanModel){

$scope.getCharacterId=function(){
    return batmanModel.getCharacterId();
}

$scope.getCharacter= function(){
    return batmanModel.getCharacter();
};
console.log("id: ",$scope.getCharacterId());

$scope.getGif=function(){
    return batmanModel.getGif($scope.getCharacterId());
}

var userChoice = "";
var userWinning = 0;
var computerWinning = 0;
var choises = ["rock", "paper", "scissors"];

    $scope.setChoise = function(choise){
        userChoice = choise;
        // var computerChoice = choises[Math.floor(Math.random()*choises.length)];
        var computerChoice = 'rock';
        console.log("ditt val: " + userChoice);
        console.log("datorns val: " + computerChoice);

        if (computerChoice =='rock') {
            $("#villain_choise_img").attr({
                "src": "https://www.randomlists.com/img/rock-paper-scissors/rock.png"
            });
        }

        else if (computerChoice =='paper') {
            $("#villain_choise_img").attr({
                "src": "http://www.veryicon.com/icon/ico/System/Icons8%20Metro%20Style/Rock%20Paper%20Scissors%20Paper.ico"
            });
        }

        else if (computerChoice =='scissors') {
            $("#villain_choise_img").attr({
                "src": "http://megaicons.net/static/img/icons_sizes/8/178/256/rock-paper-scissors-scissors-icon.png"
            });
        }

        if(userChoice == "rock"){
            if(computerChoice == "rock"){
                console.log("TIE!");
            }
            else if(computerChoice == "paper"){
                console.log("Computer wins");
                computerWinning += 1;
                setTimeout(function(){setRound(false);}, 3000);
            }
            else if(computerChoice == "scissors"){
                console.log("You win");
                userWinning += 1;
                setTimeout(function(){setRound(true);}, 3000);
            }
        }

        else if(userChoice == "paper"){
            if(computerChoice == "rock"){
                console.log("You win!");
                userWinning += 1;
                setTimeout(function(){setRound(true);}, 3000);
            }
            else if(computerChoice == "paper"){
                console.log("TIE");
            }
            else if(computerChoice == "scissors"){
                console.log("You lose");
                computerWinning += 1;
                setTimeout(function(){setRound(false);}, 3000);
            }
        }

        else if(userChoice == "scissors"){
            if(computerChoice == "rock"){
                console.log("You lose!");
                computerWinning += 1;
                setTimeout(function(){setRound(false);}, 3000);
            }
            else if(computerChoice == "paper"){
                console.log("You win");
                userWinning += 1;
                setTimeout(function(){setRound(true);}, 3000);
            }
            else if(computerChoice == "scissors"){
                console.log("Tie");
            }
        }

        setTimeout(function(){
            resetPosition(choise);
        }, 3000);

        setTimeout(function(){
            decideWinner();
        }, 2500);

    }

    decideWinner = function(){
        if (userWinning == 2) {
            batmanModel.addBeatenEnemy($scope.getCharacter()[0].name);
            console.log("You win everything!!");
            $("#resultPicture").attr({
                "src": "http://1.bp.blogspot.com/_x71ibPMLr4Y/TJvpHl796zI/AAAAAAAAAy0/-jJshPk9HOo/s1600/LIL+HAPPY+BATMAN.jpg"
            });
            document.getElementById("resultText").innerHTML = "YOU WIN";

            var highscore_status = document.getElementById("highscore");
            var continue_status = document.getElementById("continue");
            highscore_status.value="View highscore"
            continue_status.value="Continue"
            // document.getElementById("resultText2").innerHTML = "Hit continue to fight more villains!";

            $("#resultMenu").fadeIn();({
            });
        }

        else if (computerWinning == 2) {
            console.log("You lose everything!!");
            $("#resultPicture").attr({
                "src": "http://cdn1-www.craveonline.com/assets/uploads/2012/01/file_181433_0_batman5cover658.jpg"
                // "src": "http://images-cdn.moviepilot.com/image/upload/c_limit,h_379,w_500/t_mp_quality/batman-v-superman-who-would-win-in-this-situation-superman-breaks-the-bat-jpeg-74958.jpg"
            });
            document.getElementById("resultText").innerHTML = "YOU LOSE";

            var highscore_status = document.getElementById("highscore");
            var continue_status = document.getElementById("continue");
            highscore_status.value="Submit highscore"
            continue_status.value="Game Over"
            // document.getElementById("resultText2").innerHTML = "Hit Game Over to start over. Hit  to submit your highscore";

            $("#resultMenu").fadeIn();({
            });
        }

    }

    resetPosition = function(choise){
        $(".flipper").animate({
            left: '0'
        });

        if (choise == "rock") {
            $("#rock").animate({
                left: '0px'
            });
        }

        else if (choise == "paper") {
            $("#paper").animate({
                left: '0px'
            });
        }

        else if (choise == "scissors") {
            $("#scissors").animate({
                left: '0px'
            });
        }

        setTimeout(function(){
            $(".flipper").css({
                transform: 'rotateY(0deg)'
            });
        }, 1000);
    }

    setRound = function(boolean){
        if (userWinning + computerWinning == 1) {
            if (boolean == true) {
                $("#roundcircle1").css({
                background: 'darkgreen'
                });
            }
            else {
                $("#roundcircle1").css({
                background: 'darkred'
                });
            }
        }
        else if (userWinning + computerWinning == 2) {
            if (boolean == true) {
                $("#roundcircle2").css({
                background: 'darkgreen'
                });
            }
            else {
                $("#roundcircle2").css({
                background: 'darkred'
                });
            }
        }
        else if (userWinning + computerWinning == 3) {
            if (boolean == true) {
                $("#roundcircle3").css({
                background: 'darkgreen'
                });
            }
            else {
                $("#roundcircle3").css({
                background: 'darkred'
                });
            }

        }

    }
    
})