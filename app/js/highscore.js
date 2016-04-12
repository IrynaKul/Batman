      var highscoreRef = new Firebase('https://batman-highscore.firebaseio.com/');
      

      function displayHighscore(name, score) {
          console.log("display", name, score)
          $("<p></p>").text(score).prepend($("<b></b>").text(name)).appendTo($('#highscoreDiv'));
       };


      highscoreRef.orderByChild("score").on('child_added', function(snapshot) {
        var highscore = snapshot.val();
        console.log(highscore.name, highscore.score);
        displayHighscore(highscore.name, highscore.score);
      });


        $('#scoreInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#scoreInput').val();
          highscoreRef.push({name: name, score: myScore()});
          $('#scoreInput').val('');
          console.log(myScore())
        }
      });