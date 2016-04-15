batmanPlannerApp.controller('infoCtrl', function ($scope,$routeParams,batmanModel){
$("#backbutton").click(function(){
  batmanModel.clearCookies();
})

var id=$routeParams.characterId;
batmanModel.setCharacterId(id);

$scope.status = "Searching...";
batmanModel.findCharacter(id).get(function(data){
  $scope.villain=data.results[0];
  $scope.aliases = $scope.villain.aliases;
  if($scope.aliases){
    $scope.alias = $scope.aliases.split("\n");
    for (var i=0; i < $scope.alias.length;i++){
     if (i==$scope.alias.length){
     }
     else if(i==0){

     }
     else{
       $scope.alias[i]=" "+$scope.alias[i]
     }
   }
   $scope.alias=String($scope.alias)
  }
  else{
    $scope.alias= "Unknown";
  }
  



  if($scope.villain.real_name==null){
    $scope.real_name="Unknown";
  }
  else{
    $scope.real_name=$scope.villain.real_name;
  }


  batmanModel.setCharacter($scope.villain);
  $scope.status = "Showing " + data.results.length + " results";
  },function(data){
  $scope.status = "There was an error";
});

});