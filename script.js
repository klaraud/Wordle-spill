
const gridElm = document.querySelector(".oppsett")

for (let i = 0; i < 5 * 6; i++) {
    const boksElm = document.createElement("div")
    gridElm.appendChild(boksElm)
}

const ord = ["banan", "bilde", "bjørn", "blåse", "brant", "bruke", "drage",
    "flink", "frisk", "fugle", "gitar", "huske", "hytte", "kasse", "klubb",
    "krane", "lytte", "måtte", "neste", "norsk", "oljen", "pakke", "piano", "radio", "rette",
    "sette", "skape", "skift", "skyte", "smake", "smykk", "snakk", "sovne", "spise", "stein",
    "strek", "støtt", "svart", "sykle", "tanke", "trene", "trøtt", "tusen", "varme", "verdt",
    "vifte", "vinter", "vokse", "vårens"]


let guessString = ord[Math.floor(Math.random() * ord.length)]
console.log(guessString)


let guessed = ""

const bokser = document.querySelectorAll(".oppsett > div")

for (let rad = 0; rad < 6; rad++) {

    for (let i = 0; i < 5; i++) {
        const boksElm = bokser[rad * 5 + i];
        const inputElm = document.createElement("input")
        inputElm.addEventListener("input", hopp)
        boksElm.appendChild(inputElm)
        inputElm.maxLength = 1
    }
}


//Funksjonen får den til å hoppe til input-elementet i neste rute etter man trykker enter
function hopp(event) {
    console.log(event)
    const target = event.target
    const bokstav = target.value
    guessed += bokstav

    console.log("Du gjettet:", guessed)
    //console.log(target.parentElement.nextSibling.children[0])

    const nesteInput = target.parentElement.nextSibling.children[0]

    if (nesteInput){
        nesteInput.focus()
    }

    if (guessed.length === 5){
        gjettOrd()
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
                styleboxNr(currentRow*5 +i, "green") // currentrow er rad, i er kolonner
            } else if (guessString.includes(guessed.charAt(i))) {
                styleboxNr(currentRow*5 +i, "yellow")
            }

        }

        //Nullstiller gjette og øker raden
        guessed = ""
        currentRow++

        //Hopp til første input i neste rad
        if (currentRow < 6) {
            bokser[currentRow * 5].children[0].focus()
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