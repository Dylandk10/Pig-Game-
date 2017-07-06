/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, holdDice, highestStreak;
 
menu();

document.querySelector(".btn-roll").addEventListener("click", function(){
    if(gamePlaying){
        // RANDOM DICE NUMBER
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
    
        // DISPLAY DICE WITH NUMBER
        var diceDom = document.querySelector(".dice");
        var diceDom2 = document.querySelector(".dice2");
        diceDom.style.display = "block";
        diceDom2.style.display = "block";
        diceDom.src = "dice-" + dice + ".png";
        diceDom2.src = "dice-" + dice2 + ".png";
        
        //UPDATE SCORE IF NUMBER IS NOT 1
        if(dice !== 1 && dice2 !== 1) {
            roundScore += (dice  + dice2);
            holdDice = 0;
            document.getElementById("holdDice").textContent = "Hold Dice: 0";
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
            // SEND TO HIGHSTREAK FUNCTION
            highStreak(roundScore);
            //ROLL A 6 TWO TIMES IN A ROW NEXT PLAYER
            if(dice === 6 || dice2 === 6) {
                holdDice += 6;
                document.getElementById("holdDice").textContent = "Hold Dice: " + holdDice;
                if(holdDice >= 12) {
                    nextPlayer();
                    console.log("You hit 6 two times in a row...");
                }
            }
            //ROLL DOUBLE 6'S NEXT PLAYER
            if(dice === 6 && dice2 === 6) {
                nextPlayer();
                console.log("Double 6's...");
            }
        } else {
            //ROLLED 1 NEXT PLAYER
            nextPlayer();
            console.log("you rolled a 1...")
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function(){ 
    if(gamePlaying){
    //ADD CURRENT SCORE TO GLOBAL SCORE
    scores[activePlayer] += roundScore;
    
    //UPDATE UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    
    //CHECK IF PLAYER WON THE GAME
    if(scores[activePlayer] >= document.getElementById("endScore").value) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;
    } else {
    //DIDN'T WIN NEXT PLAYER
    nextPlayer();
    }
    }
});




function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    holdDice = 0;
        
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    
    document.getElementById("holdDice").textContent = "Hold Dice: 0";
        
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
        
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
}


document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    holdDice = 0;
    gamePlaying = true;
    highestStreak = 0;

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");

}
function menu() {
    document.getElementById("game").style.display = "none";
    document.getElementById("rules").style.display = "none";
    document.getElementById("formSection").style.display = "none";
    document.getElementById("aboutSection").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
}


//HIGHEST ROUND SCORE FUNCTION +++++ NOT WORKING ++++++
//KEEPS HIGH SCORE ON BUST???
function highStreak(high) {
    if(high > highestStreak) {
        document.getElementById("highStreak").textContent = "Highest streak: " + high;
        highestStreak = high;
    } else if(highestStreak > high) {
        document.getElementById("highStreak").textContent = "Highest streak: " + highestStreak;
    } else {
        document.getElementById("highStreak").textContent = "Highest streak: " + highestStreak;
    }
}

//  MAIN MENU BUTTON EVENT LISTENERS!!!

document.getElementById("playNowBtn").addEventListener("click", function(){
        document.getElementById("mainMenu").style.display = "none";
        document.querySelector("#game").style.display = "block";
        init();
});

document.getElementById("homeBtn").addEventListener("click", menu);

document.getElementById("rulesBtn").addEventListener("click", function(){
        document.getElementById("mainMenu").style.display = "none";
        document.getElementById("rules").style.display = "block";
});
document.getElementById("contactBtn").addEventListener("click", function(){
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("formSection").style.display = "inline-block";
    document.getElementById("aboutSection").style.display = "inline-block";
});























