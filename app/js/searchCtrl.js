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
   $("#waiting").attr({
      "src":$scope.waitingGif
    });

   $(".villain").css({
      display: 'none'
   });
   console.log(query);
   batmanModel.searchVillain(query).get(function(data){

    document.getElementById("waiting").removeAttribute("src");
     //console.log(data.results)
     batmanModel.setFiltered(data.results,query);
     $scope.status = "Showing " + data.results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
 }


});