batmanPlannerApp.controller('SearchCtrl', function ($scope,batmanModel){
  $scope.top12=batmanModel.getTop12();
  $scope.array= function(){
    return batmanModel.getArray();
  }

  $scope.getObj = function(){
    return $scope.array();
  };

  $scope.waitingGif=function(){
    return batmanModel.randomiseWaitingGif();
  }

  $scope.search = function(query) {
   $(".villain").css({
      display: 'none'
   });
   console.log(query);
   batmanModel.setFiltered(query);
   
 }


});