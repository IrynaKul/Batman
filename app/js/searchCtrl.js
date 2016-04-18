batmanPlannerApp.controller('SearchCtrl', function ($scope,batmanModel){
  $scope.top12=batmanModel.getTop12();
  $("#top12").show();
  $("#morebutton").hide();
   $(".noresults").hide();
  $scope.array= function(){
    return batmanModel.getArray();
  }

  $scope.getObj = function(){
    return $scope.array();
  };

  $scope.waitingGif=function(){
    return batmanModel.randomiseWaitingGif();
  }

  $scope.enterclick = function(keyEvent) {
    console.log("enterclick")
  if (keyEvent.which === 13)
    console.log("enterif");
}

  $scope.search = function(query) {
  $(".noresults").hide();
  $("#top12").hide();
   $(".villain").css({
      display: 'none'
   });
   $scope.abc=batmanModel.setFiltered(query);
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
  $(".noresults").hide();
   $("#morebutton").show();
  }
  else if($scope.abc==2){
    $(".noresults").show();
  }
  else{
   $("#morebutton").hide();
   $(".noresults").hide();
 }
}

});