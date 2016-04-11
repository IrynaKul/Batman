batmanPlannerApp.controller('infoCtrl', function ($scope,$routeParams,batmanModel){

var id=$routeParams.characterId;
batmanModel.setCharacterId(id);
console.log(id)

$scope.status = "Searching...";
console.log(id);
batmanModel.findCharacter(id).get(function(data){
  $scope.villain=data.results[0];
  if($scope.villain.real_name==null){
    $scope.real_name="Unknown";
  }
  else{
    $scope.real_name=$scope.villain.real_name;
  }
  batmanModel.setCharacter($scope.villain);
  console.log("infoCtrl ",$scope.villain);
  //batmanModel.setFiltered(data.results,id);
  $scope.status = "Showing " + data.results.length + " results";
  },function(data){
  $scope.status = "There was an error";
});
 
});