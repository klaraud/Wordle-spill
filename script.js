
const gridElm = document.querySelector(".oppsett")

for (let i = 0; i < 5*6; i++) {
    const boksElm = document.createElement("div") 
    gridElm.appendChild(boksElm)
}

const ord = ["banan", "bilde", "bjørn", "blått", "brann", "bruke", "byggs", "drage", "fjell",
    "flink", "frisk", "fugle", "gitar", "glass", "grønn", "huske", "hytte", "kasse", "klubb",
    "krane", "lytte", "måtte", "neste", "norsk", "oljen", "pakke", "piano", "radio", "rette",
    "sette", "skape", "skift", "skyte", "smake", "smykk", "snakk", "sovne", "spise", "stein",
    "strek", "støtt", "svart", "sykle", "tanke", "trene", "trøtt", "tusen", "varme", "verdt",
    "vifte", "vinter", "vokse", "vårens"]


let guessString = ord[Math.floor(Math.random()* ord)]

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

    console.log("Du skrev:", bokstav)
    console.log(target.parentElement.nextSibling.children[0])

    const nesteInput = target.parentElement.nextSibling.children[0]
    
    target.addEventListener("keydown", function(event){
        if (event.key === "Enter" && nesteInput){
            nesteInput.focus()
        }
        
    })
}

function gjettOrd(){
    let ordet = guessString
    console.log(ordet)

}
