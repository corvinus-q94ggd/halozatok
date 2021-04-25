var kérdések;
var kérdésszám;

function letöltés() {
    //fetch('/questions.json')
    //    .then(response => response.json())
    //    .then(data => letöltésBefejeződött(data));

    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kérdésMegjelenítés(data)
        );
}

//function letöltésBefejeződött(d) {
//    console.log("Sikeres letöltés")
//    console.log(d)
//    kérdések = d;
//    kérdésMegjelenítés(0);
//}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
    fetch(`/questions/${id}`)
        .then(válaszfeldolgozás)
        .then(kérdésMegjelenítés);
}   

function válaszfeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
}

//var kérdésMegjelenítés = function (kérdésSzáma) {
//    let kérdés_szöveg = document.getElementById("kérdés_szöveg");
//    let válasz1 = document.getElementById("válasz1");
//    let válasz2 = document.getElementById("válasz2");
//    let válasz3 = document.getElementById("válasz3");
//    let kép = document.getElementById("kép1");

//    kérdés_szöveg.innerHTML = kérdések[kérdésSzáma].questionText
//    kép.src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdésSzáma].image
//    válasz1.innerText = kérdések[kérdésSzáma].answer1
//    válasz2.innerText = kérdések[kérdésSzáma].answer2
//    válasz3.innerText = kérdések[kérdésSzáma].answer3
//}

window.onload = () => {
    letöltés();

    document.getElementById("vissza").onclick = function() {
        if (kérdésszám == 0) {
            kérdésszám = kérdések.length - 1;
            letöltés();
        }
        else {
            kérdésszám--;
            letöltés();
        }
    }

    document.getElementById("előre").onclick = function() {
        if (kérdésszám == kérdések.length - 1) {
            kérdésszám = 0;
            letöltés();
        }
        else {
            kérdésszám++;
            letöltés();
        }
    }

}