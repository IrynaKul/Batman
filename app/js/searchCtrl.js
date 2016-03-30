batmanPlannerApp.controller('SearchCtrl', function ($scope,batmanModel){
 

  $scope.getTop=function(){
    return batmanModel.getTop10();
  }

});