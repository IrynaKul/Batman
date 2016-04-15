batmanPlannerApp.controller('infoCtrl', function ($scope,$routeParams,batmanModel){
$("#backbutton").click(function(){
  batmanModel.clearCookies();
})

var id=$routeParams.characterId;
batmanModel.setCharacterId(id);
$scope.isDead=function(id){
  return batmanModel.setEnemyToDead(id);
 }
if($scope.isDead(id)[0].dead=="block"){
  $(".fightbtn").css({
    display:'none'
  })
}


$scope.status = "Searching...";
batmanModel.findCharacter(id).get(function(data){
  $scope.villain=data.results[0];
  $scope.aliases = $scope.villain.aliases;
  $scope.alias = $scope.aliases.split("\n");

  for (var i=0; i < $scope.alias.length;i++){
     if (i==$scope.alias.length){
     }
     else if(i==0){

     }
     else{
       $scope.alias[i]=" "+$scope.alias[i]
     }
   }
   $scope.alias=String($scope.alias)

  if($scope.villain.real_name==null){
    $scope.real_name="Unknown";
  }
  else{
    $scope.real_name=$scope.villain.real_name;
  }


  batmanModel.setCharacter($scope.villain);
  $scope.status = "Showing " + data.results.length + " results";
  },function(data){
  $scope.status = "There was an error";
});

});