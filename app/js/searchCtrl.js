batmanPlannerApp.controller('SearchCtrl', function ($scope,batmanModel){
  $scope.top12=batmanModel.getTop12();
  $("#morebutton").hide();
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
   $scope.abc=batmanModel.setFiltered(query);
   console.log($scope.abc);
   hideshow();
   
 }

 $scope.getMore = function(query){
  console.log(query)
  $scope.abc=batmanModel.getMoreFiltered(query);
  hideshow();
 };

 $scope.isDead=function(id){
  return batmanModel.setEnemyToDead(id);
 }


var hideshow=function(){

 if ($scope.abc==1) {
   $("#morebutton").show();
  }
  else{
   $("#morebutton").hide();
 }
}

});