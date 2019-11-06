// Business End
function Game() {
  this.board = [["", "", ""],
                ["", "", ""],
                ["", "", ""]];
  this.players = "humans";
  this.currentPlayer = ((Math.random() > 0.5) ? "alien" : "human");
  this.turnNumber = 0;
}


Game.prototype.playerMove = function(spot, id) {
  this.turnNumber++;
  this.board[spot[0]][spot[1]] = this.currentPlayer;
  if (this.checkWin(spot, id)) {
    alert("YOU WIN");
  } else {
    this.currentPlayer = ((this.currentPlayer === "alien") ? "human" : "alien");
    return false;
  }
}

Game.prototype.checkWin = function(spot, id) {
  if (this.turnNumber <5){
    return false;
  }
  var rowCheck = 0;
  var colCheck = 0;
  for(var i = 0; i < 3; i++) {
    rowCheck += ((this.board[spot[0]][i] === this.currentPlayer) ? 1 : 0);
    colCheck += ((this.board[i][spot[1]] === this.currentPlayer) ? 1 : 0);
  }

  if ((rowCheck === 3) || colCheck === 3) return true;

  var diaCheck = 0;
    diaCheck += ((this.board[0][0] === this.currentPlayer) ? 1 : 0);
    diaCheck += ((this.board[1][1] === this.currentPlayer) ? 1 : 0);
    diaCheck += ((this.board[2][2] === this.currentPlayer) ? 1 : 0);
  if (diaCheck === 3) return true;

  diaCheck = 0;
    diaCheck += ((this.board[0][2] === this.currentPlayer) ? 1 : 0);
    diaCheck += ((this.board[1][1] === this.currentPlayer) ? 1 : 0);
    diaCheck += ((this.board[2][0] === this.currentPlayer) ? 1 : 0);
  if (diaCheck === 3) return true;

  return false;
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
      $(this).children().attr("src", "img/" + freshGame.currentPlayer + ".png");
      freshGame.playerMove(spot, this.id);
    } else {
      alert("Cheaters never win.");
    }
  })
});
