// Business End
function Game() {
  this.board = [["", "", ""],
                ["", "", ""],
                ["", "", ""]];
  this.players = "humans";
  this.currentPlayer = ((Math.random() > 0.5) ? "alien" : "human"); //Assigns Random Starting Player
  this.turnNumber = 0;
}

Game.prototype.playerMove = function(spot) {
  this.turnNumber++;
  this.board[spot[0]][spot[1]] = this.currentPlayer;     // Assigns board Value
  var result = this.checkWin(spot);
  if (this.checkWin(spot)) {
    return result;
  } else {
    this.currentPlayer = ((this.currentPlayer === "alien") ? "human" : "alien");  // Switches Player
    return result;
  }
}

Game.prototype.spotCheck = function(row, col) {
  return ((this.board[row][col] === this.currentPlayer) ? 1 : 0);
}

Game.prototype.checkWin = function(spot) {
  if (this.turnNumber < 5){
    return false; // Early Game Return
  }

  var winCheck = [0, 0, 0, 0]; // Checks for all winning possiblities
  for (var i = 0; i < 3; i++) {
    winCheck[0] += this.spotCheck(spot[0], i); //row check
    winCheck[1] += this.spotCheck(i, spot[1]); //col check
  }
  winCheck[2] = this.spotCheck(0, 0) + this.spotCheck(1, 1) + this.spotCheck(2, 2); //check diagonal one
  winCheck[3] = this.spotCheck(0, 2) + this.spotCheck(1, 1) + this.spotCheck(2, 0); //check diagonal two

  if (winCheck.includes(3)) return true;
  if (this.turnNumber === 9) return NaN;
  return false;
}


 //UI Logic
$(document).ready(function(){
  var freshGame = "";
  var winner = "";

  $("button#start").click(function(){

    $("div#startGame").hide();
    $("div#gameBoard").show();
    freshGame = new Game();

  });

  $(".col-sm-4").click(function(){
    var spot = this.id.split("");

    if ( !(freshGame.board[spot[0]][spot[1]]) ) {
      $(this).children().attr("src", "img/" + freshGame.currentPlayer + ".png");
      winner = freshGame.playerMove(spot);
    } else {
      alert("Cheaters never win."); // "unless they "R" smart"
    }

    if (winner !== winner) {
      alert("Cat always wins!");
    } else if (winner && (freshGame.currentPlayer === "alien")){
      alert ("Congratulations, you've conquered the Earth and ruined Humanity");
    } else if (winner && (freshGame.currentPlayer === "human")){
      alert("Thank you Mario but, our princess is in another Galaxy...........");
    }
  });

});
