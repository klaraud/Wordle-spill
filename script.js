const gridElm = document.querySelector(".oppsett")

for (let i = 0; i < 5 * 6; i++) {
    const boksElm = document.createElement("div")
    gridElm.appendChild(boksElm)
}

const ord = ["banan", "bilde", "bjørn", "blåse", "brant", "bruke", "drage",
    "flink", "frisk", "fugle", "gitar", "huske", "harde", "krone", "klone",
    "krane", "lange", "magen", "neste", "norsk", "oljen", "prakt", "piano", "radio", "vrang",
    "senke", "skape", "skift", "skyte", "smake", "smake", "anker", "sovne", "spise", "stein",
    "strek", "trange", "svart", "sykle", "tanke", "trene", "våren", "tusen", "varme", "verdt",
    "vifte", "vokse"]


let guessString = ord[Math.floor(Math.random() * ord.length)]
console.log(guessString)


let guessed = ""

const bokser = document.querySelectorAll(".oppsett > div")

for (let rad = 0; rad < 6; rad++) {

    for (let i = 0; i < 5; i++) {
        const boksElm = bokser[rad * 5 + i];
        const inputElm = document.createElement("input")
        const className = "siste-rute-" + (i%5 == 4)
        inputElm.classList.add( className )
        inputElm.addEventListener("input", hopp)
        boksElm.appendChild(inputElm)
        inputElm.maxLength = 1
    }
}


//Funksjonen får den til å hoppe til input-elementet i neste rute etter man trykker enter
function hopp(event) {
    const target = event.target
    const bokstav = target.value

    if (bokstav == "" || bokstav == " ") {
        return
    }

    const sisteRute = target.classList.contains("siste-rute-true")
    console.log("hopp med sisteRute", sisteRute)

    guessed += bokstav


    console.log("Du gjettet:", guessed)
    //console.log(target.parentElement.nextSibling.children[0])

    const nesteInput = target.parentElement.nextSibling.children[0]


    if (nesteInput && sisteRute == false) {
        nesteInput.focus()
    }


}
document.addEventListener("keydown", trykkTast)

function trykkTast(event){
    if (event.key == "Enter"){
        trykkEnter()
    } else if (event.key == "Backspace")
        slettBokstav()
}

function slettBokstav(){
    if (guessed.length > 0){
        guessed = guessed.slice(0,-1) // fjerner siste boksta fra guessed strengen
        const currentInput = document.querySelectorAll(".oppsett > div")[currentRow*5 + guessed.length].children[0]
        currentInput.value =""
        currentInput.focus()
    }
    }

function trykkEnter() {
    if (guessed.length === 5) {
        gjettOrd()
        //Nullstiller gjette og øker raden
        guessed = ""
        currentRow++

        //Hopp til første input i neste rad
        if (currentRow < 6) {
            bokser[currentRow * 5].children[0].focus()
        }
    }

}

let currentRow = 0
function gjettOrd() {
    console.log("Function gjettOrd()")

    if (guessed === guessString) {
        //Lage hele raden grønn og avslutte spillet
        for (let i = 0; i < 5; i++) {
            styleboxNr(currentRow * 5 + i, "green")
        }
        avsluttSpill()
        return
    }

    for (let i = 0; i < guessed.length; i++) {
        if (guessString.charAt(i) == guessed.charAt(i)) { // charAt = character at position, om bokstaven er i posisjonen
            console.log("bokstav på posisjon", i, "er riktig")
            styleboxNr(currentRow * 5 + i, "green") // currentrow er rad, i er kolonner
        } else if (guessString.includes(guessed.charAt(i))) {

            styleboxNr(currentRow * 5 + i, "yellow")
        }

    }


}





function styleboxNr(nummer, farge) {
    const boksElm = bokser[nummer];
    boksElm.children[0].style.backgroundColor = farge

}

function avsluttSpill() {
    const overskrift = document.getElementById("header")
    overskrift.innerHTML = "Gratulerer, du fikk det til!"
}