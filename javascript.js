//Variables
let n1 = "";
let n2 = "";
let oper = "";
let res = 0;

//Calculation Logic
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

//Rounds the answer to a few decimal points only if the result is a float
function roundConditionally(num) {
    if (num % 1 !== 0) {
        return Number(num.toFixed(13));
    }
    return num;
}

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

function deleteNum(n) {
    return n.slice(0, -1);
}

//All buttons logic
let keys = document.querySelectorAll(".char");
keys.forEach(key => {
    key.addEventListener("mouseover", () => key.style.backgroundColor = '  #e6e6e6')
    key.addEventListener("mouseout", () => key.style.backgroundColor = 'white')
    key.addEventListener("mousedown", () => key.style.backgroundColor = '#cccccc')
    key.addEventListener("mouseup", () => key.style.backgroundColor = '#e6e6e6')

})

let allBtns = document.querySelectorAll(".num");
allBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(res) {
            n1=n2=oper="";
            res="";
        }
        setVar(btn.textContent);
    })
})

let opers = document.querySelectorAll(".oper");
opers.forEach(operator => {
    operator.addEventListener("click", () => {
        res = ""
        if (n2) {
            if(Number(n2) === 0 && oper === "/"){
                setDisplay("Cannot divide by 0");
                n1=n2=oper="";
                return;
            }
            let fin = operate(Number(n1), oper, Number(n2));
            setDisplay(roundConditionally(fin));
            n1 = fin;
            n2 = "";
            oper = operator.textContent;
        }
        else
            oper = operator.textContent;
    }
)})

let ans = document.querySelector(".ans");
ans.addEventListener("click", () => {
    if(Number(n2) === 0 && oper === "/") {
        setDisplay("Cannot divide by 0");
        n1=n2=oper="";
        return;
    }
    let fin = operate(Number(n1), oper, Number(n2));
    setDisplay(roundConditionally(fin));
    n1 = fin;
    oper = n2 = "";
    res=1;
});

let clear = document.querySelector(".clr");
clear.addEventListener("click", () => {
    n1 = n2 = oper = "";
    setDisplay("");
})

let del = document.querySelector(".del");
del.addEventListener("click", () => {
    if(!oper) {
        n1 = deleteNum(n1);
        setDisplay(n1);
    }
    else {
        n2 = deleteNum(n2);
        setDisplay(n2);
    }
})

let pt = document.querySelector(".pt");
pt.addEventListener("click", () => {
    if(!oper) {
        n1 = String(n1) + ".";
        setDisplay(n1);
    }
    else {
        n2 = String(n2) + ".";
        setDisplay(n2);
    }
})

//Keyboard
document.addEventListener("keydown", (e) => {
    if (e.key >= '0' && e.key <= '9') {
        allBtns.forEach(btn => {
            if (btn.textContent === e.key) 
                btn.click();
        });
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        opers.forEach(op => {
            if (op.textContent === e.key) 
                op.click();
        });
    } else if (e.key === 'Enter' || e.key === '=') {
        ans.click();
    } else if (e.key === 'Backspace') {
        del.click();
    } else if (e.key === 'Escape') {
        clear.click();
    } else if (e.key === '.') {
        pt.click();
    }
});