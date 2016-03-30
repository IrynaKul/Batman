console.log("mjauuu");
batmanPlannerApp.controller('SearchCtrl', function ($scope,batmanModel){
  // batmanModel.bla.get(function(data){
  //   console.log(data);
  // })

	batmanModel.BatmanEnemies.get(function(data){
    //console.log("i CharacterSearch");
     $scope.character=data.results.character_enemies;
     //console.log("character", $scope.character);
     $scope.status = "Showing " + data.length + " results";
     batmanModel.setEnemiesArray(data.results.character_enemies);
   },function(data){
     $scope.status = "There was an error";
   });

  // batmanModel.AllCharacters.get(function(data){
  //     console.log("i AllCharacters");
  //    $scope.characters=data.results;
     
  //    console.log("allCharacters ", data.results);
  //    $scope.status = "Showing " + data.length + " results";
  //    batmanModel.setAllCharactersArray(data.results);
  //  },function(data){
  //    $scope.status = "There was an error";
  //  });

  $scope.allCharacters=function(){
    console.log("array ",batmanModel.mergeArrays());
    return batmanModel.mergeArrays();
  }


 //  $scope.search = function(query) {
 //   $scope.status = "Searching...";
 //   console.log(query);
 //   batman.CharacterSearch.get({any_kw:query},function(data){
 //     $scope.dishes=data.Results;
 //     $scope.status = "Showing " + data.Results.length + " results";
 //   },function(data){
 //     $scope.status = "There was an error";
 //   });
 // }

});