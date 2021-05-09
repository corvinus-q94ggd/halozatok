var hotList = [];
var questionInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

function init() {
    for (let i = 0; i < questionInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswer: 0
        }

    }



    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    document.getElementById("előre").addEventListener("click", előre);
    document.getElementById("vissza").addEventListener("click", vissza);

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    if (hotList.length > 0) {
        for (let i = 0; i < questionInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        kérdésMegjelenítés();
    }
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/$(questionNumber)`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${result.status}`);
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswer = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotList ${destination}. helyére`);
            if (displayedQuestion===undefined && destination===0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        })
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerHTML = kérdés.questionText;
    document.getElementById("válasz1").innerHTML = kérdés.answer1;
    document.getElementById("válasz2").innerHTML = kérdés.answer2;
    document.getElementById("válasz3").innerHTML = kérdés.answer3;

    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }

    for (var i = 1; i <= 3; i++) document.getElementById("válasz" + i).classList.remove("jó", "rossz")
    document.getElementById("válaszok").style.pointerEvents = "auto";

}

document.addEventListener("DOMContentLoaded", init)

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionInHotList - 1;
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó")
        hotList[displayedQuestion].goodAnswer++;
        if (hotList[displayedQuestion].goodAnswer===3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;

        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó")
        hotList[displayedQuestion].goodAnswer=0;
    }

    document.getElementById("válaszok").style.pointerEvents = "nope";
    timerHandler = setTimeout(előre,3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);

}