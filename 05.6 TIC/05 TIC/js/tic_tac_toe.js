"use strict";

let flag = "pen-flag"; 
let counter = 9;
const squares = document.querySelectorAll(".square"); 
const message = document.getElementById("mgstext"); 


const msgPenTurn = '<p class="image"><img src="img/penguins.jpg" width="61px"></p><p class="text">Penguins Attack!</p>';
const msgBearTurn = '<p class="image"><img src="img/whitebear.jpg" width="61px"></p><p class="text">WhiteBear Attack!</p>';
const msgDraw = `
  <div class="image">
    <img src="img/penguins.jpg" width="61px">
    <img src="img/whitebear.jpg" width="61px">
  </div>
  <p class="text">It's a Draw!</p>
`;
const msgPenWin = '<p class="image"><img src="img/penguins.jpg" width="61px"></p><p class="text">Penguins Win!</p>';
const msgBearWin = '<p class="image"><img src="img/whitebear.jpg" width="61px"></p><p class="text">WhiteBear Win!</p>';
let gameSound = ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

const winPatterns = [
    ["a_1", "a_2", "a_3"],
    ["b_1", "b_2", "b_3"],
    ["c_1", "c_2", "c_3"],
    ["a_1", "b_1", "c_1"],
    ["a_2", "b_2", "c_2"],
    ["a_3", "b_3", "c_3"],
    ["a_1", "b_2", "c_3"],
    ["a_3", "b_2", "c_1"]
];


window.addEventListener("DOMContentLoaded", function () {
    setMessage("pen-turn");
}, false);


squares.forEach(square => {
    square.addEventListener("click", () => {
        isSelect(square);
    });
});


function isSelect(selectSquare) {
    if (selectSquare.classList.contains("js-unclickable")) {
        return;
    }

   
    if (flag === "pen-flag") {
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        setMessage("bear-turn");
        flag = "bear-flag";
    } else {
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        setMessage("pen-turn");
        flag = "pen-flag";
    }

    counter--;

   
    if (checkWinner(flag === "bear-flag" ? "js-pen-checked" : "js-bear-checked")) {
        highlightWinningLine(flag === "bear-flag" ? "js-pen_highlight" : "js-bear_highlight");
        gameOver(flag === "bear-flag" ? "penguins" : "bear");
        return;
    }


    if (counter === 0) {
        gameOver("draw");
    }
}


function setMessage(id) {
    switch (id) {
        case "pen-turn":
            message.innerHTML = msgPenTurn;
            break;
        case "bear-turn":
            message.innerHTML = msgBearTurn;
            break;
        case "pen-win":
            message.innerHTML = msgPenWin;
            break;
        case "bear-win":
            message.innerHTML = msgBearWin;
            break;
        case "draw":
            message.innerHTML = msgDraw;
            break;
    }
}


function checkWinner(className) {
    return winPatterns.some(pattern => {
        return pattern.every(id => {
            return document.getElementById(id).classList.contains(className);
        });
    });
}


function highlightWinningLine(highlightClass) {
    winPatterns.forEach(pattern => {
        if (pattern.every(id => document.getElementById(id).classList.contains(flag === "bear-flag" ? "js-pen-checked" : "js-bear-checked"))) {
            pattern.forEach(id => {
                document.getElementById(id).classList.add(highlightClass);
            });
        }
    });
}

function gameOver(winner) {
    let w_sound;
    switch (winner) {
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear" :
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
    
    squares.forEach(square => {
        square.classList.add("js-unclickable");
    });

    
    if (winner === "penguins") {
        message.innerHTML = msgPenWin;
        startSnowEffect("rgb(255,240,245)"); 
    } else if (winner === "bear") {
        message.innerHTML = msgBearWin;
        startSnowEffect("rgb(175,238,238)"); 
    } else if (winner === "draw") {
        message.innerHTML = msgDraw;
    }
}


function startSnowEffect(color) {
    $(document).snowfall({
        flakeColor: color,
        maxSpeed: 3,
        minSpeed: 1,
        maxSize: 20,
        minSize: 10,
        round: true
    });
}
