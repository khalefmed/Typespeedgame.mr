// Array of words


const easy = [
    "Hena",
    "Amal",
    "Weva",
    "Hello",
    "Bien",
    "try",
    "easy",
    "Word"
]

const normal = [
    "Country",
    "Village",
    "Trading",
    "Revision",
    "Linkedin",
    "Facebook",
    "Cristiano"
]

const hard = [
    "Programming",
    "Informatique",
    "Javascript",
    "Knowledge",
    "Whatsapp",
    "Cybersecurity"
]



//Setting Levels
const lvls ={
    "easy" : 5,
    "normal" : 3,
    "hard" : 2,
};

//Default Level 


// Catch Selectors 
let container = document.querySelector(".container");
let containerIndex = document.querySelector(".container-index");
let selectedLevel = document.querySelector(".select-level");
let okbutton = document.querySelector(".ok");
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let ScoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".total");
let finishMessage = document.querySelector(".finish");
let correct = document.querySelector(".correct");
let error = document.querySelector(".error");
let correctFinal = document.querySelector(".correct-final");

let defaultLevelSeconds;
// Select the level
let words = [""];
okbutton.onclick = function() {
    if(selectedLevel.value === ""){
        alert("Select your level ");
    }

    

    else {

        if(selectedLevel.value === "easy"){
            words = easy;
            defaultLevelSeconds = 5;
        }

        else if(selectedLevel.value === "normal"){
            words =  normal ;
            defaultLevelSeconds = 4;
        }

        else if(selectedLevel.value === "hard"){
            words = hard;
            defaultLevelSeconds = 3;
        }

        let defaultLevelName = selectedLevel.value; //Change Level from here
        // let defaultLevelSeconds = lvls[selectedLevel.value];

        lvlNameSpan.innerHTML = defaultLevelName;
        secondsSpan.innerHTML = defaultLevelSeconds;
        timeLeftSpan.innerHTML = defaultLevelSeconds;
        scoreTotal.innerHTML = words.length;
        

        containerIndex.style.cssText = "display : none;";
        container.style.cssText = "display : block;";

        
    }
    console.log(selectedLevel.value);
}

// Setting level Names + seconds + Score



// Disable paste event
input.onpaste = function() {
    return false;
}

// Start Game 

startButton.onclick = function() {
    this.remove();
    input.focus();
    genWords();
}

// Generate word function 
function genWords(){
    //Get random word from array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //Get word index
    let wordIndex = words.indexOf(randomWord);
    console.log(wordIndex);
    // remove word from array
    words.splice(wordIndex,1);
    // Showing the word
    theWord.innerHTML = randomWord;
    upcomingWords.innerHTML= '';
    //Generate words
    for(let i=0;i<words.length;i++){
        //Generate div element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    startPlay();
}

 // Start Play function
function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() =>{
        
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML === "0"){
            //Stop timer
            clearInterval(start);
            // Compare words
            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value= '';
                //increase Score
                ScoreGot.innerHTML++;
                
                if (words.length > 0) {
                    genWords();
                    correct.play();
                }
                else {
                    let span = document.createElement("span");
                    span.className= "good";
                    let spanText = document.createTextNode("Congratulations !");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    correctFinal.play();
                }
            }
            else {
                let span = document.createElement("span");
                span.className= "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
                error.play();
                
            }
        }
    }, 1000);
}


