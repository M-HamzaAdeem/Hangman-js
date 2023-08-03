const image = document.getElementById('hangman-image');
const correctWords = document.getElementById('correct-letters');
const wrongWords = document.getElementById('wrong-letters');
const notificationBar = document.getElementById('notofocatoin-bar')
const popupElement = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupTextDetail = document.getElementById('popup-text-details');

const playAgainBtn = document.getElementById('play-again-btn');



var guessWord = ""
var dashedWord  = ""
let listOfWord = []

fetch("./listOfWords.txt")
.then(response => response.text())
.then(data => {

    try {
        listOfWord = data.split('\n'); // Try splitting using '\r\n'

        resetGame();
      } catch (err) {
        console.error('Error splitting using \\n: ', err);
      }
    
  })
  .catch(error => console.error('Error reading file:', error));



function changeImage(){
    if (image.src.match("1.png")) {
        image.src = "2.png";
    } else if (image.src.match("2.png")) {
        image.src = "3.png";
    } else if (image.src.match("3.png")) {
        image.src = "4.png";
    } else if (image.src.match("4.png")) {
        image.src = "5.png";
    } else if (image.src.match("5.png")) {
        image.src = "6.png";
    } else if (image.src.match("6.png")) {
        image.src = "7.png";
    }
   
    
}

function correctLetter(key,indexes){
    var indexes = [];
        for(let i=0; i<guessWord.length;i++){
            if(guessWord[i]==key){
                indexes.push(i);
                const start = dashedWord.slice(0, i);
                const end = dashedWord.slice(i + 1);
                dashedWord =  start + key + end;
            }
        }
      correctWords.innerHTML = dashedWord;

    if(dashedWord == guessWord){
        popup(true)
  
    }

}



function wrongLetter(key){

    wrongWords.innerHTML += key+", " ;
    changeImage()
    if(image.src.match("7.png")){
        popup(false);

    }
}


document.getElementById('hidden-input').addEventListener('input', mobileKeyboard);
document.body.addEventListener("keypress", desktopKeyboard);


function desktopKeyboard(event) {
    let desktopKeyPressed = event.key;
    updateLetters(desktopKeyPressed)
}


function mobileKeyboard(event) {
    let mobileKeyPressed = event.data;
    updateLetters(mobileKeyPressed)
    event.target.value = '';
}


function 
updateLetters(keyPress) {
 

    // Make sure keyPressed is not null and is a lowercase letter
    if (keyPress !== null && keyPress.toLowerCase() >= 'a' && keyPress.toLowerCase() <= 'z') {
        keyPressed = keyPress.toLowerCase();

        if(wrongWords.innerHTML.includes(keyPressed) || correctWords.innerHTML.includes(keyPressed)) {
           
            notification("notify-1");
        } else if (guessWord.includes(keyPressed)) {
            correctLetter(keyPressed);
        } else {
            wrongLetter(keyPressed);
        }
    } else {
        notification("notify-2");
    }

    
}


function notification(notify){
    document.getElementById('notification-bar').className = 'slide-up';
    document.getElementById(notify).style.display = 'block';
    setTimeout(() => {
        document.getElementById('notification-bar').classList.remove('slide-up');
        document.getElementById(notify).style.display = 'none';
      }, 4000);
}


function popup(isWin) {
  
    if (isWin) {
      popupText.textContent = 'You Win'
      document.getElementById('font-awesome').classList.add('fa-solid','fa-check', 'fa-2xl', 'fa-beat');
    } else {
      popupText.textContent = 'You Loss';
      document.getElementById('font-awesome').classList.add('fa-solid','fa-xmark', 'fa-2xl', 'fa-beat');
    }
    popupTextDetail.textContent ='The correct word was  "'+ guessWord.toUpperCase()+'"';
    document.getElementById('background').classList.add('blur-bg');
;
    popupElement.style.display = 'block';
  
    playAgainBtn.addEventListener('click', function() {
        document.getElementById('background').classList.remove('blur-bg');
        document.getElementById('font-awesome').removeAttribute('class');
      popupElement.style.display = 'none';
      resetGame();
    });
  }



function resetGame(){
    image.src = "1.png";
    wrongWords.innerHTML ="" ;
    guessWord = listOfWord[Math.floor(Math.random()*listOfWord.length )].replace(/[^a-z]/gi, '').toLowerCase();
    dashedWord  = ""
    for (let i = 0; i < guessWord.length; i++) {
        dashedWord += '_';
    }
    correctWords.innerHTML = dashedWord;

    
}

function switchMode(){
    if(document.body.classList.contains("bg-dark")){
        document.body.className = "bg-secondary";
        document.getElementById("modes").classList.add('black');
        document.getElementById("modes").classList.remove('grey');
    }else{
        document.body.className = "bg-dark";
        document.getElementById("modes").classList.add('grey');
        document.getElementById("modes").classList.remove('black');
    }
}

