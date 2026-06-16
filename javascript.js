function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

let n1 = "";
let n2 = "";
let oper = "";

function operate (a, op, b) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

let keys = document.querySelectorAll(".char");
keys.forEach(key => {
    key.addEventListener("mouseover", () => key.style.backgroundColor = '  #e6e6e6')
    key.addEventListener("mouseout", () => key.style.backgroundColor = 'white')
    key.addEventListener("mousedown", () => key.style.backgroundColor = '#cccccc')
    key.addEventListener("mouseup", () => key.style.backgroundColor = '#e6e6e6')
})

let allBtns = document.querySelectorAll(".num");
allBtns.forEach(btn => {
    btn.addEventListener("click", () => setVar(btn.textContent))
})

function setVar(digit) {
    if (!oper) {
        n1 += digit;
        setDisplay(n1); 
    }
    else {
        n2 += digit;
        setDisplay(n2);
    }
}

function setDisplay(ans){
    let display = document.querySelector(".result");
    display.textContent = ans;
}

let opers = document.querySelectorAll(".oper");
opers.forEach(operator => {
    operator.addEventListener("click", () => oper = operator.textContent);
})

let ans = document.querySelector(".ans");
ans.addEventListener("click", () => {
    let fin = operate(Number(n1), oper, Number(n2));
    setDisplay(fin.toFixed(13));
});

let clear = document.querySelector(".clr");
clear.addEventListener("click", () => {
    n1 = n2 = oper = "";
    setDisplay("");
})