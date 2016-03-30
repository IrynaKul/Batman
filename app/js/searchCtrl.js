batmanPlannerApp.controller('SearchCtrl', function ($scope,batmanModel){
 
  batmanModel.getTop10();
  $scope.array= batmanModel.getArray();

  $scope.getObj = function(){
    return $scope.array;
  };
});