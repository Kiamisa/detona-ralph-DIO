const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    action: {
        timerId: null,
        countdownTimerId: null,
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let square = state.view.squares[randomNumber];
    square.classList.add("enemy");
    state.values.hitPosition = square.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function countdown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.action.countdownTimerId);
        clearInterval(state.action.timerId);
        alert("Game Over! Your final score is " + state.values.result);
    }
}

function main() {
    state.action.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.action.countdownTimerId = setInterval(countdown, 1000);
    addListenerHitBox();
    state.view.timeLeft.textContent = state.values.currentTime; // Exibir o tempo inicial
}

function playSound(audioName){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.1;
    audio.play();
}

main();
