/* Initalization */
let game = new jp30Test();
let canvas = document.getElementById("game-bounds");
let ctx = canvas.getContext('2d');

//Question type selection div
const typeSelection = document.getElementById("type-selection")

//Type select buttons
const nounsBtn = document.getElementById("nouns-btn");
const adjBtn = document.getElementById("adj-btn");
const verbsBtn = document.getElementById("verbs-btn");
const jp30wordsBtn = document.getElementById("jp30words-btn");
const hintCheck = document.getElementById("show-hint");
const hiraCheck = document.getElementById("show-hira");

//Guessing game div
const testOptions = document.getElementById("test-options")
const inputText = document.getElementById("romaji-input")
const successConfirm = document.getElementById("success-confirm")

//Guessing game buttons
const submitBtn = document.getElementById("submit-btn")
const continueBtn = document.getElementById("continue-btn")
const skipBtn = document.getElementById("skip-btn")

//active game vars
let cardCount;
let round;
let order;
let cardIndex;

//Window finishes loading after custom font has been loaded
window.onload = function () {
    startScreen();
}

/*  Event functions */

//Before guessing game.
nounsBtn.addEventListener("click",function(){
    game.setTestType(0);
    clearCanvas();
    startScreen();
});
verbsBtn.addEventListener("click",function(){
    game.setTestType(1);
    clearCanvas();
    startScreen();
});
adjBtn.addEventListener("click",function(){
    game.setTestType(2);
    clearCanvas();
    startScreen();
});
jp30wordsBtn.addEventListener("click",function(){
    game.setTestType(3);
    clearCanvas();
    startScreen();
});

//During guessing game.
inputText.addEventListener("input",function(k){
    inputText.style.backgroundColor = "white";
})
inputText.addEventListener("keypress",function(k){
    inputText.style.backgroundColor = "white";
    if (game.gameState == 1){
        if (k.key === 'Enter'){
            checkInputAnswer()
        }
    }
})
canvas.addEventListener("click",function(){
    if (game.gameState == 0){
        gameStateChange(game.newGame());
    }
});
submitBtn.addEventListener("click",function(){
    if (game.gameState == 1){
        checkInputAnswer()
    }
})
continueBtn.addEventListener("click",function(){
    if (game.gameState == 1){
        nextRound();
    }
    else if (game.gameState == 2){
        resetGame()
    }
})
skipBtn.addEventListener("click",function(){
    if (game.gameState == 1){
        skipWord();
    }
})

/*  Drawing Functions   */
function toggleVisible(element){
    if (element.hasAttribute("hidden",true)){
        element.removeAttribute("hidden",false)
    }else{
        element.setAttribute("hidden",true)
    }
}

function drawBoundbox(){
    ctx.fillStyle = "black";
    ctx.strokeRect(0,0,400,400);
}

function drawCard(word, wordHira, hint){
    ctx.lineWidth = 2;

    const cardX = canvas.width/4;
    const cardY = canvas.height/5;
    const cardW = 200;
    const cardH = 250;

    ctx.strokeRect(cardX,cardY,cardW,cardH);
    ctx.textAlign = "center";
    ctx.font = "30px Noto_Sans_JP";
    ctx.fillText(word,cardX+cardW/2,cardY+40);
    ctx.font = "22px Noto_Sans_JP";
    if (hiraCheck.checked || game.gameState != 1){
        ctx.fillText("("+wordHira+")",cardX+cardW/2,cardY+70);
    }
    ctx.fillText("?",cardX+cardW/2,cardY+cardH/2+10);

    if (hintCheck.checked || game.gameState != 1){
        ctx.fillText(hint,cardX+cardW/2,cardY+cardH-50);
    }
}

function drawCardFull(word, wordHira, hint, answer){
    ctx.lineWidth = 2;

    const cardX = canvas.width/4;
    const cardY = canvas.height/5;
    const cardW = 200;
    const cardH = 250;

    ctx.strokeRect(cardX,cardY,cardW,cardH);
    ctx.textAlign = "center";
    ctx.font = "30px Noto_Sans_JP";
    ctx.fillText(word,cardX+cardW/2,cardY+40);
    ctx.font = "22px Noto_Sans_JP";
    ctx.fillText("("+wordHira+")",cardX+cardW/2,cardY+70);
    ctx.fillText(answer,cardX+cardW/2,cardY+cardH/2+10);

    ctx.fillText(hint,cardX+cardW/2,cardY+cardH-50);
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoundbox()
}

/*  Game Logic Functions    */
function startScreen(){
    continueBtn.value = "Next"
    //window.requestAnimationFrame(render);
    ctx.fillStyle = "black";
    ctx.font = "24px Noto_Sans_JP";
    ctx.textAlign = "center";
    ctx.fillText("Click anywhere to begin!",canvas.width/2,50);

    //boundbox
    drawBoundbox()

    drawCard("新しいゲーム","あたらしいゲーム","New game");
    ctx.fillText("Current test: "+game.getTestType(),canvas.width/2, canvas.height-30);
}

function gameStateChange(state){
    switch(state){
        case 0: //0: Start screen, full reset.
            startScreen();
            break;
        case 1: //1: Guessing game.
            startGame();
            break;
        default:
            break;
    }
}

function startGame(){
    toggleVisible(testOptions);
    toggleVisible(typeSelection);
    cardCount = game.wordCount;
    round = 0;
    order = game.getOrder();
    cardIndex = order[round];
    if (round < cardCount){
        clearCanvas();
        ctx.font = "30px Noto_Sans_JP";
        ctx.fillText("What is this word?",canvas.width/2,40);
        ctx.font = "20px Noto_Sans_JP";
        ctx.fillText("(Type the Romanji)",canvas.width/2,65);
        drawCard(game.words[cardIndex],game.wordsHira[cardIndex],game.wordsHint[cardIndex]);
    }
}

function checkInputAnswer(){
    let inputAnswer = inputText.value
    let answer = game.getAnswer(cardIndex)
    if (game.gameState == 1){
        console.log("Here is your answer: "+inputText.value);
        if (inputAnswer.toLowerCase() === answer.toLowerCase()){
            answerCorrect(answer);
        }else{
            answerIncorect(inputText.value);
        }
    }
}

function answerCorrect(answer){
    game.increaseScore();
    clearCanvas();
    toggleVisible(testOptions);
    toggleVisible(successConfirm);
    ctx.fillStyle = "green";
    ctx.font = "30px Noto_Sans_JP";
    ctx.fillText("You are correct!",canvas.width/2,40);
    ctx.font = "20px Noto_Sans_JP";
    ctx.fillText(game.correct+" out of "+game.wordCount,canvas.width/2,65);
    ctx.fillStyle = "black";
    drawCardFull(game.words[cardIndex],game.wordsHira[cardIndex],game.wordsHint[cardIndex],answer);
    inputText.value = "";
}

function answerIncorect(input){
    clearCanvas();
    drawCard(game.words[cardIndex],game.wordsHira[cardIndex],game.wordsHint[cardIndex]);
    ctx.fillStyle = "red";
    ctx.font = "30px Noto_Sans_JP";
    ctx.fillText("What is this word?",canvas.width/2,40);
    ctx.font = "20px Noto_Sans_JP";
    ctx.fillText("(Type the Romanji)",canvas.width/2,65);
    ctx.font = "20px Noto_Sans_JP";
    ctx.fillText(input+" is incorrect!",canvas.width/2, canvas.height-30);
    ctx.fillStyle = "black";
    inputText.style.backgroundColor = "red";
}

function nextRound(){
    toggleVisible(successConfirm);
    toggleVisible(testOptions);
    round++;
    cardIndex = order[round];
    if (round < cardCount){
        clearCanvas();
        ctx.font = "30px Noto_Sans_JP";
        ctx.fillText("What is this word?",canvas.width/2,40);
        ctx.font = "20px Noto_Sans_JP";
        ctx.fillText("(Type the Romanji)",canvas.width/2,65);
        drawCard(game.words[cardIndex],game.wordsHira[cardIndex],game.wordsHint[cardIndex]);
    }else{
        gameStateChange(game.endGame());
        stopGame();
    }
}

function skipWord(){
    game.loseScore();
    console.log(game.wrong);
    //These toggles keep the buttons from disappearing
    toggleVisible(testOptions);
    toggleVisible(successConfirm);
    nextRound()
}

function stopGame(){
    clearCanvas();
    toggleVisible(testOptions);
    toggleVisible(successConfirm);
    ctx.fillStyle = "green";
    if (game.wrong >= 5*(game.wordCount/10)){
        ctx.fillStyle = "red";
        drawCardFull("Too bad!",game.correct+" out of "+game.wordCount,"Don't give up!","Try again");
    }
    else if (game.wrong >= 3*(game.wordCount/10)){
        drawCardFull("Not bad!",game.correct+" out of "+game.wordCount,game.getTestType()+"!","You completed");
    }
    else if (game.wrong >= 2*(game.wordCount/10)){
        drawCardFull("Good work!",game.correct+" out of "+game.wordCount,game.getTestType()+"!","You completed");
    }
    else if (game.wrong >= 1*(game.wordCount/10)){
        drawCardFull("Great work!",game.correct+" out of "+game.wordCount,game.getTestType()+"!","You completed");
    }
    else if (game.wrong == 0){
        ctx.fillStyle = "gold";
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "green";
        drawCardFull("Congrats!",game.correct+" out of "+game.wordCount,game.getTestType()+"!","You completed");
        drawBoundbox()
    }
    
    continueBtn.value = "Return to Menu";
}

function resetGame(){
    game = new jp30Test();
    clearCanvas();
    startScreen();
    toggleVisible(typeSelection);
    toggleVisible(successConfirm);
}