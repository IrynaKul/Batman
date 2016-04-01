batmanPlannerApp.controller('SearchCtrl', function ($scope,batmanModel){
  $scope.enemies=batmanModel.setEnemiesArray();
  $scope.top12=batmanModel.getTop12();
  $scope.array= function(){
    return batmanModel.getArray();
  }

  $scope.getObj = function(){
    return $scope.array();
  };

  $scope.search = function(query) {
   $scope.status = "Searching...";
   console.log(query);
   batmanModel.searchVillain(query).get(function(data){
     $scope.villain=data.results;
     console.log(data.results)
     batmanModel.setFiltered(data.results,query);
     $scope.status = "Showing " + data.results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
 }
});