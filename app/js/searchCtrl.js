batmanPlannerApp.controller('SearchCtrl', function ($scope,Batman) {
	Batman.CharacterSearch.get(function(data){
     $scope.dishes=data.Results;
     $scope.status = "Showing " + data.Results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });


  $scope.search = function(query) {
   $scope.status = "Searching...";
   console.log(query);
   Batman.CharacterSearch.get({any_kw:query},function(data){
     $scope.dishes=data.Results;
     $scope.status = "Showing " + data.Results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
 }

})