let addDOM = document.querySelector("#add");
let extractDOM = document.querySelector("#extract");
let multiplyDOM = document.querySelector("#multiply");
let divisionDOM = document.querySelector("#division");

addDOM.onclick = function() {
    let number1DOM = Number(document.querySelector("#number1").value);
    let number2DOM = Number(document.querySelector("#number2").value);
    let result = number1DOM + number2DOM;
    document.querySelector("#result").innerHTML = number1DOM + "+" + number2DOM + "=" + result
}

extractDOM.onclick = function() {
    let number1DOM = Number(document.querySelector("#number1").value);
    let number2DOM = Number(document.querySelector("#number2").value);
    let result = number1DOM - number2DOM;
    document.querySelector("#result").innerHTML = number1DOM + "-" + number2DOM + "=" + result
}
multiplyDOM.onclick = function() {
    let number1DOM = Number(document.querySelector("#number1").value);
    let number2DOM = Number(document.querySelector("#number2").value);
    let result = number1DOM * number2DOM;
    document.querySelector("#result").innerHTML = number1DOM + "*" + number2DOM + "=" + result
}

divisionDOM.onclick = function() {
    let number1DOM = Number(document.querySelector("#number1").value);
    let number2DOM = Number(document.querySelector("#number2").value);
    let result = number1DOM / number2DOM;
    document.querySelector("#result").innerHTML = number1DOM + "/" + number2DOM + "=" + result
}