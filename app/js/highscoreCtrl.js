batmanPlannerApp.controller("HighscoreCtrl", function($scope, $firebaseArray, batmanModel) {
          
  var highscoreRef = new Firebase('https://batman-highscore.firebaseio.com/');
  $scope.scorelist = $firebaseArray(highscoreRef);

  var order = highscoreRef.orderByChild("score").limitToLast(10);

  $scope.highscore = $firebaseArray(order);

var userScore = function(){
  return batmanModel.getUserScore();
  };

  $scope.submitScore = function(username) {
      console.log(userScore)
         $scope.scorelist.$add({ name: username, score: userScore() });
     };

  // $scope.ScoreLenght=function(){
  //   return batmanModel.getUserScore();
  // }
      });


