// Business End
function Game() {
  this.board = [["", "", ""],
                ["", "", ""],
                ["", "", ""]];
  this.players = "humans";
  this.currentTurn = ((Math.random() > 0.5) ? "alien" : "human");
}

Game.prototype.playerMove = function(spot) {
  this.board[spot[0]][spot[1]] = this.currentTurn;
  this.currentTurn = ((this.currentTurn === "alien") ? "human" : "alien");
  // return true;

  var winCheck = {}
  for (var r=0; r<3; r++) {
    winCheck = {};
    for (var c=0; c<3; c++) {
      winCheck[this.board[r][c]]++;
    }
    if (winCheck.values().includes(3)) {
      alert("You win!");
    }
  }
}


 //UI Logic
$(document).ready(function(){
  var freshGame = "";
  $("button#start").click(function(){

    $("div#startGame").hide();
    $("div#gameBoard").show();
    freshGame = new Game();

  });
  $(".col-sm-4").click(function(){
    var spot = this.id.split("");

    if ( !(freshGame.board[spot[0]][spot[1]]) ) {
      $(this).children().attr("src", "img/" + freshGame.currentTurn + ".png");
      freshGame.playerMove(spot);
    } else {
      alert("Cheaters never win.");
    }
  })
});
