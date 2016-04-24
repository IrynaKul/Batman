batmanPlannerApp.controller("HighscoreCtrl", function($scope, $firebaseArray, $location, batmanModel) {
          
  var highscoreRef = new Firebase('https://batman-highscore.firebaseio.com/');
  $scope.scorelist = $firebaseArray(highscoreRef);

  var order = highscoreRef.orderByChild("score").limitToLast(10);

  $scope.highscore = $firebaseArray(order);

  // $scope.getUserScore1= function(){
  //   return batmanModel.getUserScore();
  // } 
  

$scope.userScore = function(){
  return batmanModel.getUserScore();
  };

      // console.log("hejjj ",$('#yourScore1').css('display'),$('#yourScore2').css('display'));

      //   if($('#yourScore1').css('display') == 'block'){
      //       $('#yourScoreInHighscore').innerHTML= $('#yourScore1').innerHTML;
      //   }
      //   else if($('#yourScore2').css('display') == 'block'){
      //       $('#yourScoreInHighscore').innerHTML= $('#yourScore2').innerHTML;
      //   }
  $scope.submitScore = function(username) {
      console.log($score.userScore())
         $scope.scorelist.$add({ name: username, score: $scope.userScore() });
          $("#submitDiv").hide();
          $("#startoverbtn").show();

     };


});

