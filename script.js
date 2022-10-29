const players = document.querySelectorAll(".player");
const btnRoll = document.querySelector(".btn--roll");
const diceImg = document.querySelector(".dice");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const winner = document.querySelector(".winner");
const overlay = document.querySelector(".overlay");
const winnerModal = document.querySelector(".winner-modal");

let current = 0; // default current point for each player

// random dice creator
const randomDice = () => {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    const imgSrc = `img/dice-${randomNum}.png`;

    return {
        randomNum,
        imgSrc
    }
}

// start new game 
const startNewGame = () => {
    current = 0;
    // clear values
    players.forEach(player => {
        player.querySelector(".score").innerHTML = "0";
        player.querySelector(".current-score").innerHTML = "0";
        player.classList.remove("player--active");
        diceImg.classList.remove("dice--active");
    });

    // set first player as active player
    players[0].classList.add("player--active");

    // close modal
    overlay.classList.remove("overlay--active");
    winnerModal.classList.remove("modal--active");
}

// start new game from btn's click
document.querySelector(".modal-btn--new").addEventListener('click', startNewGame);
btnNew.addEventListener('click', startNewGame);

// roll dice event
btnRoll.addEventListener('click', () => {
    // find active player and create dice
    const activePlayer = document.querySelector(".player--active");
    const diceInfo = randomDice();

    const currentScore = activePlayer.querySelector(".current-score");
    // set dice image
    diceImg.setAttribute('src', diceInfo.imgSrc);
    diceImg.classList.add("dice--active");

    // check if dice num == 1 and switch players
    if (diceInfo.randomNum === 1) {
        currentScore.innerHTML = "0";
        switchPlayers();
    } else {
        current += diceInfo.randomNum;
        currentScore.innerHTML = current;
    }

});

// hold points event
btnHold.addEventListener('click', () => {
    const activePlayer = document.querySelector(".player--active");

    // add points to total score of player
    const totalScore = activePlayer.querySelector(".score");
    totalScore.innerHTML = Number(totalScore.textContent) + current;

    // set current score to default (0)
    activePlayer.querySelector(".current-score").innerHTML = "0";

    // show winner
    if (Number(totalScore.textContent) >= 100) {
        winner.innerHTML = `${activePlayer.querySelector(".name").textContent} Wins 🎉`;
        overlay.classList.add("overlay--active");
        winnerModal.classList.add("modal--active");
        return;
    }

    switchPlayers();
});

// switch players
const switchPlayers = () => {
    current = 0;
    players.forEach(player => {
        if (player.classList.contains("player--active")) {
            player.classList.remove("player--active");
        } else {
            player.classList.add("player--active");
        }
    });
}