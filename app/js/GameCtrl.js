batmanPlannerApp.controller('GameCtrl', function($scope, $location, batmanModel,$timeout){

$scope.getCharacterId=function(){
    return batmanModel.getCharacterId();
}
$scope.getUserScore=function(){
    return batmanModel.getUserScore();
}
$scope.getCharacter= function(){
    return batmanModel.getCharacter();
};
// console.log("id: ",$scope.getCharacterId());

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


$scope.Gif=function(){
    return batmanModel.getGif();
}
// Kollar om bilden är gif lr ej. Om inte gif (false) visa img tag med class .circle för att göra bilden rund
    $scope.getGif=function(){
        var gif = $scope.Gif();

        if (gif.slice(-1)=="f"){
            $scope.gif = true;
         }
         else {
            $scope.gif = false;
         }
        return gif;
    };



    $scope.setChoise = function(choise){
        batmanModel.setUserChoise(choise);
        batmanModel.compareChoices();
        $("#villain_choise_img").attr({
               "src": $scope.getPicture()
            });
        $scope.showMessage = false;
        $timeout(function(){
          $scope.showMessage = true;
        }, 2200);
        setTimeout(function(){
            setRound();
        }, 2500);
        
        setTimeout(function(){
            resetPosition(choise);
        }, 3000);

        setTimeout(function(){
            decideWinner();
        }, 3000);
        

        


        

        

    }

    decideWinner = function(){
        
        if ($scope.userWinning() == 2) {
            batmanModel.clearGameCookies();
            batmanModel.addBeatenEnemy($scope.getCharacter()[0].id);
            console.log("You win everything!!");
            $("#resultPicture").attr({
                //"src": "http://1.bp.blogspot.com/_x71ibPMLr4Y/TJvpHl796zI/AAAAAAAAAy0/-jJshPk9HOo/s1600/LIL+HAPPY+BATMAN.jpg"
                //"src": "https://media.giphy.com/media/11mkwYN8k9v5T2/giphy.gif"
                "src": "https://media.giphy.com/media/bdcTSZn3ECM4o/giphy.gif"
            });
            document.getElementById("resultText").innerHTML = "YOU WIN";

            var highscore_status = document.getElementById("highscore");
            var continue_status = document.getElementById("continue1");
            highscore_status.value="View highscore";
            continue_status.value="Next Villain";
            // document.getElementById("resultText2").innerHTML = "Hit continue to fight more villains!";
            $("#resultMenu").fadeIn();({
            });
            $("#continue1").css({
                display:'block'
            });
        }

        else if ($scope.computerWinning() == 2) {
            setTimeout(function(){
                $("#resultMenu").css({
                    display: 'block'
                });
            }, 3000);
            batmanModel.clearGameCookies();
            batmanModel.clearBeatenEnemy();
            console.log("You lose everything!!");
            $("#resultPicture").attr({
                "src":"https://media.giphy.com/media/VM5TVKbYSExcQ/giphy.gif"
                //"src": "http://cdn1-www.craveonline.com/assets/uploads/2012/01/file_181433_0_batman5cover658.jpg"
                // "src": "http://images-cdn.moviepilot.com/image/upload/c_limit,h_379,w_500/t_mp_quality/batman-v-superman-who-would-win-in-this-situation-superman-breaks-the-bat-jpeg-74958.jpg"
            });
            document.getElementById("resultText").innerHTML = "GAME OVER";

            var highscore_submit = document.getElementById("highscore");
            var continue_status = document.getElementById("continue2");
            highscore_submit.value="Submit highscore";
            continue_status.value="Start Over";

            // document.getElementById("resultText2").innerHTML = "Hit Game Over to start over. Hit  to submit your highscore";

            $("#resultMenu").fadeIn();({
            });
            $("#continue2").css({
                display:'block'
            })

        }

    }



    $scope.myScore = function(){
        console.log("score",batmanModel.getUserScore());
        return batmanModel.getUserScore();
    };    

//Högra knappen
    highscoreBtn = function(){
        var highscore_status = document.getElementById("highscore");
        if (highscore_status.value == "Submit highscore"){          //Förlust
            // $("#resultMenu").fadeOut();
            $("#viewHighscore").fadeIn();
            $(".continuebtn").hide();
            $("#startoverbtn").hide();
            $("#submitDiv").show();

        }
        else if (highscore_status.value == "View highscore"){        //Vinst
            $("#viewHighscore").fadeIn();
            $("#submitDiv").hide();
            $("#startoverbtn").hide();
            $(".continuebtn").show();
        }
    }

    exitHighscore = function(){
        $("#viewHighscore").fadeOut();
    }


    resetPosition = function(choise){
        $(".flipper").animate({
            left: '0'
        });

        if (choise == "rock") {
            $("#rock").animate({
                left: '125px'
            });
        }

        else if (choise == "paper") {
            $("#paper").animate({
                left: '90px'
            });
        }

        else if (choise == "scissors") {
            $("#scissors").animate({
                left: '16px'
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
$scope.showMessage = true;
$scope.message=function(){
    return batmanModel.returnMessage();
}



    
})