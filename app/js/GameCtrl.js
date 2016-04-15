batmanPlannerApp.controller('GameCtrl', function($scope, batmanModel){

// $scope.getCharacterId=function(){
//     return batmanModel.getCharacterId();
// }

$scope.getCharacter= function(){
    return batmanModel.getCharacter();
};
// console.log("id: ",$scope.getCharacterId());

$scope.getGif=function(){
    return batmanModel.getGif();
}

$scope.getPicture=function(){
    return batmanModel.getPicture();
}

$scope.userWinning=function(){
    return batmanModel.getUserWinning();
}
$scope.computerWinning=function(){
    return batmanModel.getComputerWinning();
}

$scope.getColor=function() {
    return batmanModel.setRound();
}

$scope.result=function(){
    return batmanModel.getSumResult();
}

    $scope.setChoise = function(choise){
        batmanModel.setUserChoise(choise);
        $("#villain_choise_img").attr({
               "src": $scope.getPicture()
            });
        batmanModel.compareChoices();

        
        setTimeout(function(){
            resetPosition(choise);
        }, 3000);

        setTimeout(function(){
            decideWinner();
        }, 2500);

        setTimeout(function(){
            setRound();
        },3000);

    }

    decideWinner = function(){
        //console.log("userWinning ",$scope.userWinning());
        if ($scope.userWinning() == 2) {
            batmanModel.addBeatenEnemy($scope.getCharacter()[0].id);

            console.log("You win everything!!");
            $("#resultPicture").attr({
                //"src": "http://1.bp.blogspot.com/_x71ibPMLr4Y/TJvpHl796zI/AAAAAAAAAy0/-jJshPk9HOo/s1600/LIL+HAPPY+BATMAN.jpg"
                "src": "https://media.giphy.com/media/11mkwYN8k9v5T2/giphy.gif"
            });
            document.getElementById("resultText").innerHTML = "YOU WIN";

            var highscore_status = document.getElementById("highscore");
            var continue_status = document.getElementById("continue");
            highscore_status.value="View highscore";
            continue_status.value="Continue";
            // document.getElementById("resultText2").innerHTML = "Hit continue to fight more villains!";

            $("#resultMenu").fadeIn();({
            });
        }

        else if ($scope.computerWinning() == 2) {
            console.log("You lose everything!!");
            $("#resultPicture").attr({
                "src": "http://cdn1-www.craveonline.com/assets/uploads/2012/01/file_181433_0_batman5cover658.jpg"
                // "src": "http://images-cdn.moviepilot.com/image/upload/c_limit,h_379,w_500/t_mp_quality/batman-v-superman-who-would-win-in-this-situation-superman-breaks-the-bat-jpeg-74958.jpg"
            });
            document.getElementById("resultText").innerHTML = "YOU LOSE";

            var highscore_submit = document.getElementById("highscore");
            var continue_status = document.getElementById("continue");
            highscore_submit.value="Submit highscore";
            continue_status.value="Game Over";

            // document.getElementById("resultText2").innerHTML = "Hit Game Over to start over. Hit  to submit your highscore";

            $("#resultMenu").fadeIn();({
            });

        }

    }



    $scope.myScore = function(){
        console.log("score",batmanModel.getUserScore());
        return batmanModel.getUserScore();
    };    

//Vänstra knappen
    continueBtn = function(){
        var continue_status = document.getElementById("continue");
        if (continue_status.value == "Game Over"){                  //Förlust
            batmanModel.clearBeatenEnemy();
            batmanModel.clearGameCookies();
        }
        else if (continue_status.value == "Continue"){              //Vinst
            batmanModel.clearGameCookies();
            // back to search
        }
        console.log("game over/continue", continue_status.value); 
    };

//Högra knappen
    highscoreBtn = function(){
        var highscore_status = document.getElementById("highscore");
        if (highscore_status.value == "Submit highscore"){          //Förlust
            $("#resultMenu").fadeOut();
             $("#viewHighscore").fadeIn();

        }
        else if (continue_status.value == "View highscore"){        //Vinst
            // view highscore
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

    setRound=function(){
    if($scope.result()==1){
        $("#roundcircle1").css({
            background: $scope.getColor()
        })
    }
    else if($scope.result()==2){
        $("#roundcircle2").css({
            background: $scope.getColor()
        })
    }
    else if($scope.result()==3){
        $("#roundcircle3").css({
            background: $scope.getColor()
        })
    }
}

    
})