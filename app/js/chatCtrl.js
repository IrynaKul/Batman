batmanPlannerApp.controller("ChatCtrl", function($scope, $firebaseArray, batmanModel) {
          
  var chatRef = new Firebase("https://burning-fire-174.firebaseio.com/");
  $scope.messages = $firebaseArray(chatRef);

  $scope.addMessage = function(e) {
    if (e.keyCode === 13 && $scope.msg) {
        var name = $scope.name || "anonymous";
        $scope.messages.$add({ name: name, text: $scope.msg });
        $scope.msg = "";
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;  //Funkar ej. Ska scrolla ner när nytt meddelande skrivs
      }
    }
        }
      );