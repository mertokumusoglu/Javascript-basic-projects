const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getRandomNumber = () => { 
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

const getRandomSymbol = () => {
    const symbols = "!*%&$@#"
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const resultDOM = document.querySelector("#result-area");

let randomFunc = {getRandomLower,getRandomUpper,getRandomSymbol,getRandomNumber};

function generatePassword() {
    const lengthDOM = document.querySelector("#passwordLength").value;
    result = ""
    if(!lengthDOM) {
        for(let i = 0; i < 12; i++) {
            result += Object.values(randomFunc)[Math.floor(Math.random() * 4)]()
        }
    }
    else if (lengthDOM > 40 || lengthDOM < 5) {
        alert("Lütfen 5 ile 40 arası bir sayı giriniz..")
    }
    else {
    for(let i = 0; i < lengthDOM; i++) {
        result += Object.values(randomFunc)[Math.floor(Math.random() * 4)]()
    }
}
    resultDOM.innerHTML = result
}
const generateBtnDOM = document.querySelector("#generateBtn");
generateBtnDOM.addEventListener("click", generatePassword)

function copy() {
    let result_area = resultDOM.innerText;
    const area = document.createElement("textarea");
    area.value = result_area;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy")
    area.remove()
    
}

const copyBtnDOM  = document.querySelector("#copyBtn")
copyBtnDOM.addEventListener("click", copy)