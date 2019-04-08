    let dbref = firebase.database().ref().child("Answers");
    let randomNumber = Math.floor(Math.random() * 15)+1;
    let dbanswer = "";
    let dbclue = "";
    dbref.on("value", function(data) {
         let answerDatabase = data.val();
         let number = randomNumber;
         let fbanswer = answerDatabase[number]["Answer"]
         let fbclue = answerDatabase[number]["Clue"]
         dbanswer = fbanswer
         dbclue = fbclue
    });

    let answer_letters
    setTimeout(function(){ answer_letters = dbanswer; }, 500);
    setTimeout(function(){ document.getElementById('clue').innerHTML = dbclue }, 500);
    let blanks = "";
    let live = 7;
    let score = 0;

    let lives = document.getElementById('lives')
    let answer = document.getElementById('answer')
    let scores = document.getElementById('score')

    String.prototype.replaceAt=function(index, replacement) {
        return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
    }

    function makeUnderScore(){
        for (let blank = 0; blank < answer_letters.length; blank++) {
            blanks += '_';
        }
        return blanks
    }

    function makeButtons() {
        for (let i = 65; i < 91; i++) {
            let btn = document.createElement("button");
            document.getElementById("buttonSpace").appendChild(btn);
            btn.innerHTML = `<span>` + String.fromCharCode(i) + `</span>`;
            btn.id = String.fromCharCode(i);
            btn.className = "myButton"
            btn.addEventListener("click", function () {
                let clicked_letter = String.fromCharCode(i);
                if (isCorrectLetter(clicked_letter) == true){
                    correctLetter(clicked_letter);
                    if (blanks.indexOf('_') == -1 && live > 0) {
                        document.getElementById('win').click();
                    }
                } else {
                    wrongLetter(clicked_letter)
                }
            })
        }
    }

    function makeHeart(){
        for (let i = 0; i < 7; i++){
            let heart_img = document.createElement("img");
            document.getElementById("li_hearts").appendChild(heart_img);
            heart_img.src = "images/heart.png";
            heart_img.id = i;
            heart_img.className = "heartImage";
        }
    }


    function destroyHeart(){
        document.getElementById(live).src = "images/blackheart.png"
    }


    function initiateGame(){
        makeUnderScore();
        makeHeart();
        makeButtons();
        scores.innerHTML = "Score: " + score;
        answer.innerHTML = showLetters(makeUnderScore);
    }
    setTimeout(function(){ initiateGame(); }, 500);

    function isCorrectLetter(clicked_letter){
        for (let letter = 0; letter < answer_letters.length; letter++){
            if (answer_letters.includes(clicked_letter)) {
                return true
            } else {
                return false
            }
        }
    }

    function correctLetter(clicked_letter){
        document.getElementById(clicked_letter).disabled = true;         // disabled the button clicked
        for (let letter = 0; letter < answer_letters.length; letter++){
            if (clicked_letter == answer_letters[letter]) {
                blanks = blanks.replaceAt(letter, clicked_letter);       // Replace '_' to the correct letter
                score += 1;
                scores.innerHTML = "Score:" + score;
            }
        }
        document.getElementById('answer').innerHTML = showLetters(blanks);
    }

    function wrongLetter(clicked_letter){
        document.getElementById(clicked_letter).disabled = true;
        live -= 1;
        score -= 1;
        scores.innerHTML = "Score: " + score;
        destroyHeart();
        if (live == 0) {
            document.getElementById('gameover').click();
        }
    }

    function showLetters(letters){
        clean = '';
        for (let i = 0; i < blanks.length; i++) {
            clean += blanks[i] + ' ';
        }
        return clean
    }

    function softReset(){
    dbref = firebase.database().ref().child("Answers");
    randomNumber = Math.floor(Math.random() * 15)+1;
        dbref.on("value", function(data) {
             let answerDatabase = data.val();
             let number = randomNumber;
             let fbanswer = answerDatabase[number]["Answer"]
             let fbclue = answerDatabase[number]["Clue"]
             dbanswer = fbanswer
             dbclue = fbclue
        });
            setTimeout(function(){ answer_letters = dbanswer; }, 500);
            setTimeout(function(){ document.getElementById('clue').innerHTML = dbclue }, 500);
            live = 7;
            blanks = "";
            for (let i = 65; i < 90; i++){
                let btn = document.getElementById(String.fromCharCode(i));
                btn.disabled = false;
            }
            for (let i = 0; i < 7; i++){
                document.getElementById(i).src = "images/heart.png";
            }
            setTimeout(function(){ answer.innerHTML = showLetters(makeUnderScore()) }, 500);
            }

            function reset(){
                location.reload();
    }

