

//Setting default attempts to 10 (Easy mode).
var attemptsLeft = 10;
var randInt = -1;
var prevGuesses = [];
//Gets a random integer between 1 and 100 and sets it to randInt 
generateRandomNumber();

alert(randInt);

document.getElementById("attempts").innerHTML = "Attempts Left: " + attemptsLeft;
document.getElementById("restart").style.display = "none";

//Below function generates random integer.
function generateRandomNumber(){
    min = 0;
    max = 100;
    randInt = Math.floor(Math.random() * (max - min + 1)) + min;
}

//Below function checks if the Enter key is pressed. Only so, the answer will be validated.
function checkIfEnter(){
    if(event.code == 'Enter'){
        var userAnswerTextBox = document.getElementById("userAnswer");
        validate(userAnswerTextBox.value)
        prevGuesses.push(userAnswerTextBox.value);
        document.getElementById("guessedNumbers").innerHTML = "Your guesses: " + prevGuesses + " ";
        userAnswerTextBox.value = null;
    }
}

//Checks if the value entered by the user matches the generated number or not. Also, keeps an eye on the attempts left.
function validate(userAnswer){
    attemptsLeft--;
    if(userAnswer == randInt){
        document.getElementById("resultField").style.color = "green";
        document.getElementById("resultField").innerHTML = "You guessed it right!";
        document.getElementById("restart").style.display = "block";
        document.getElementById("userAnswer").disabled = true;
        document.getElementById("attempts").innerHTML = "Attempts Left: " + attemptsLeft;
        return;
    }
    else if(userAnswer > randInt){
        document.getElementById("attempts").innerHTML = "Attempts Left: " + attemptsLeft;
        document.getElementById("resultField").innerHTML = "Wrong! The number is lesser!";         
    }
    else{
        document.getElementById("attempts").innerHTML = "Attempts Left: " + attemptsLeft;
        document.getElementById("resultField").innerHTML = "Wrong! The number is greater!";         
    }
    
    if(attemptsLeft < 1){
        document.getElementById("resultField").style.color = "red";
        document.getElementById("resultField").innerHTML = "No Luck! The answer is: "+randInt+". Try Again!";
        document.getElementById("restart").style.display = "block";
        document.getElementById("userAnswer").disabled = true;
        document.getElementById("attempts").innerHTML = "Attempts Left: " + attemptsLeft;
        return;
    }
}

//Sets difficulty based in user selection.
function gameDifficulty(buttonID){
    switch(buttonID){
        case "easyButton":
            attemptsLeft = 10;
            break;

        case "hardButton":
            attemptsLeft = 5;
            break;
        case "insaneButton":
            attemptsLeft = 1;
            break;
        default:
            attemptsLeft = 10;
    }
    generateRandomNumber();
    document.getElementById("resultField").innerHTML = "Input your guess below and press Enter";
    document.getElementById("attempts").innerHTML = "Attempts Left: " + attemptsLeft;
    document.getElementById("guessedNumbers").innerHTML = "Your guesses: ";
    prevGuesses = [];
}

//Tippy tooltip animaitons.
tippy('#easyButton', {
    content: "Guess in 10 attempts(default)",
    animation: "scale",
    });

tippy('#hardButton', {
    content: "Guess in 5 attempts",
    animation: "scale",
    });

tippy('#insaneButton', {
    content: "You Only Get One Shot!",
    animation: "scale",
    });
