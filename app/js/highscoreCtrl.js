batmanPlannerApp.controller("HighscoreCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray, batmanModel) {
          
  var highscoreRef = new Firebase('https://batman-highscore.firebaseio.com/');
  $scope.scorelist = $firebaseArray(highscoreRef);

  var order = highscoreRef.orderByChild("score").limitToLast(10);

  $scope.highscore = $firebaseArray(order);
  console.log($scope.highscore)

  // for(var i=0;i<$scope.highscore.length;i++)



var userScore = 11;



  $scope.submitScore = function(username) {
      console.log(userScore)
         $scope.scorelist.$add({ name: username, score: userScore });
  //       $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;  //Funkar ej. Ska scrolla ner när nytt meddelande skrivs
     }
        }
      ]);


