batmanPlannerApp.controller("HighscoreCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray, batmanModel) {
          
  var highscoreRef = new Firebase('https://batman-highscore.firebaseio.com/');
  $scope.scorelist = $firebaseArray(highscoreRef);

  var order = highscoreRef.orderByChild("score").limitToLast(10);

  $scope.highscore = $firebaseArray(order);




  $scope.submitScore = function(username) {
      console.log(userScore)
         $scope.scorelist.$add({ name: username, score: userScore });
     }
        }
      ]);


