console.log("mjauuu");
batmanPlannerApp.controller('SearchCtrl', function ($scope,batman) {
  console.log("hshhsh");

	batman.CharacterSearch.get(function(data){
      console.log("i CharacterSearch");
      console.log(data);
     $scope.dishes=data.Results;
     $scope.status = "Showing " + data.Results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });


 //  $scope.search = function(query) {
 //   $scope.status = "Searching...";
 //   console.log(query);
 //   batman.CharacterSearch.get({any_kw:query},function(data){
 //     $scope.dishes=data.Results;
 //     $scope.status = "Showing " + data.Results.length + " results";
 //   },function(data){
 //     $scope.status = "There was an error";
 //   });
 // }

});