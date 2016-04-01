batmanPlannerApp.controller('infoCtrl', function ($scope,$routeParams,batmanModel){

var id=$routeParams.characterId;
console.log(id)
  $scope.array= function(){
    return batmanModel.getArray();
  }

  $scope.getObj = function(){
    return $scope.array();
  };



   $scope.status = "Searching...";
   console.log(id);
   batmanModel.searchVillain(id).get(function(data){
     $scope.villain=data.results;
     console.log(data.results)
     batmanModel.setFiltered(data.results,id);
     $scope.status = "Showing " + data.results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
 




});