//Countries names to guess
let countries = [  
     "BRUNEI",
     "Cambodia",
     "INDONESIA",
     "LAOS",
     "MALAYSIA",
     "MYANMAR",
     "PHILIPPINES",
     "SINGAPORE",
     "THAILAND",
     "VIETNAM"]

//UI keyboard show with split and array map method
let keyboard = document.getElementById("keyboard");

//Fuction Keyboard UI
function keyboardDiv() {
    keyboard.innerHTML = "";
    let keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
        keyboard.innerHTML += `<button class="btn btn-outline-secondary m-2" onclick="checkAnswer('${letter}')" id="${letter}">${letter}</button>`;
    });
}

//Chances to guess the answer
let chances = 6 ;

//Show user the left chances
function updateChance() {
    document.getElementById("chance").innerHTML = chances;
}

let answer = [];
//Generate Answer
function generate_answer() {
    answer = countries[Math.floor(Math.random()*10)];
    console.log(answer);
}

//Guessed answer Array Variable And Answer Status
let guessed_answer = [];
let wordStatus = null ;

//Show Answer_field
function show_answerField() {
    wordStatus = answer.split("").map((letter) => (guessed_answer.indexOf(letter) >= 0 ? letter : " _ ")).join("");
    document.getElementById("answer_field").innerHTML = wordStatus;
}

//Check Answer 
function checkAnswer(letter) {
    //Add letter to guessed_answer array
    guessed_answer.indexOf(letter) === -1 ? guessed_answer.push(letter):null;
    //Make button disable
    document.getElementById(letter).setAttribute("disabled",true);

    //input letter == answer letter ?
    if (answer.indexOf(letter)>=0) {
        show_answerField();
        setTimeout(checkWin(),300);
    }else if (answer.indexOf(letter) === -1) {
        chances -- ;
        picStatus++;
        updatePic();
        updateChance();
        setTimeout(checkLose(),300);
    }
}

//Check Win
function checkWin() {
    if (wordStatus === answer) {
        Swal.fire({
            title: 'Congratulation!',
            text: 'You win the game.',
            imageUrl: './image/Congratulations.gif',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonText : 'Restart the game',
          }).then(_ => {
            restart();
          })
    }
    
}

//Check Lose 
function checkLose() {
    if (chances === 0) {
        Swal.fire({
            title: 'Ohh!',
            text: 'You lost the game.',
            imageUrl: './image/lost.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            confirmButtonText : 'Restart the game',
        }).then(_ => {
            restart();
        })
    }   
    
}

//Restart Function
function restart() {
    picStatus = 0 ;
    document.getElementById("hangMan").src = `./image/${picStatus}.jpg`;
    chances = 6;
    answer = [];
    guessed_answer = [];
    wordStatus = null ;
    generate_answer();
    show_answerField();
    updateChance();
    keyboardDiv();
}


//For image update
let picStatus = 0 ;

function updatePic() {
    document.getElementById("hangMan").src = `./image/${picStatus}.jpg`;
}


generate_answer();
show_answerField();
updateChance();
keyboardDiv();