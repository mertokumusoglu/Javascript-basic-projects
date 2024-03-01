let counterDOM = document.querySelector("#counter");
let increaseDOM = document.querySelector("#increase");
let decreaseDOM = document.querySelector("#decrease");

let total_count = 0;

increaseDOM.addEventListener("click", changeFunc);
decreaseDOM.addEventListener("click", changeFunc);

function changeFunc() {
    if(this.id == "increase") {
        total_count +=1
        counterDOM.innerHTML = total_count
    }
    else {
        total_count -=1
        counterDOM.innerHTML = total_count
    }
}