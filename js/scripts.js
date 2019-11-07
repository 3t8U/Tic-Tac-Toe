// Business End
function Game() {
  this.board = [["", "", ""],
                ["", "", ""],
                ["", "", ""]];
  this.currentPlayer = ((Math.random() > 0.5) ? "alien" : "human"); //randomize start player
  this.turnNumber = 0;
  this.cheatR = {human: 0, alien: 0};
}

Game.prototype.playerMove = function(spot) {
  this.turnNumber++;
  this.board[spot[0]][spot[1]] = this.currentPlayer;  // assign value on board
  var result = this.checkWin(spot);
  if (!result) {
    this.currentPlayer = ((this.currentPlayer === "alien") ? "human" : "alien");  // switch player
  }
  return result;
}

Game.prototype.spotCheck = function(row, col) {
  return ((this.board[row][col] === this.currentPlayer) ? 1 : 0);
}

Game.prototype.checkWin = function(spot) {
  if (this.turnNumber < 5) return false;  // early game return

  var winCheck = [0, 0, 0, 0];
  for (var i = 0; i < 3; i++) {
    winCheck[0] += this.spotCheck(spot[0], i);  //row check
    winCheck[1] += this.spotCheck(i, spot[1]);  //col check
    winCheck[2] += this.spotCheck(i, i);  //diagonal one check
    winCheck[3] += this.spotCheck(i, 2-i);  //diagonal two check
  }

  if (winCheck.includes(3)) return true;
  if (this.turnNumber === 9) return NaN;
  return false;
}


 //UI Logic
$(document).ready(function(){
  var freshGame = "";
  var winner = "";

  $("div#start").click(function(){

    $("div#startGame").fadeOut(1000); // Fade in function in lieu of click
    $("div#gameBoard").fadeIn(1000);
    freshGame = new Game();

  });

  $("div.col-sm-4").click(function(){  // Click function to set id of current turn
    var spot = this.id.split("");

    //checks if something is on current spot and if someone has won //
    if ( !(freshGame.board[spot[0]][spot[1]]) && (!winner)) {
      $(this).children().attr("src", "img/" + freshGame.currentPlayer + ".png");
      winner = freshGame.playerMove(spot);
    } else {
      alert("Cheaters never win."); // "unless they "R" smart"
    }

    if (winner !== winner) {  // Conpletes action on win
      $("div#gameBoard").fadeOut(1000);
      $("body").attr("class", "catBody");
      $("div#catWin").fadeIn(1000);
    } else if (winner && (freshGame.currentPlayer === "alien")){
      alert("Thank you Mario but, our princess is in another Galaxy...........");
    } else if (winner && (freshGame.currentPlayer === "human")){
      // $("div#humanWin");
      $("div#humanWin").fadeIn(1000);
      $("div#gameBoard").fadeOut(1000);
    }

  });
  $("span#cheatR").click(function(){
    freshGame.cheatR[freshGame.currentPlayer]++;
  });

});
