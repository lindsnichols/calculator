const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");
const runOps = document.querySelector(".runOperations");
const extras = document.querySelector(".extras");
const output = document.querySelector(".output");
const values = document.querySelector("#values");

let num1;
let num2;
let func;
let lastCalc;
reset();

function reset() {
  num1 = "";
  num2 = "";
  func = "";
}

function resetLastCalc() {
  lastCalc = 0;
}
function resetDisplay() {
  output.textContent = "0";
}

function display(str) {
  output.textContent = str;
}

operators.addEventListener("click", (event) => {
  let operator = event.target.id;
  if (!func) {
    func = getFunction(operator);
  } else {
    let val = runCurrentOperation();
    reset();
    num1 = val;
    func = getFunction(operator);
  }
});

runOps.addEventListener("click", (event) => {
  let op = event.target.id;
  getFunction(op)();
});

extras.addEventListener("click", (event) => {
  let op = event.target.id;
  let currentFunc = getFunction(op);
  if (!num2) {
    num1 = currentFunc(num1);
    display(num1);
  } else {
    num2 = currentFunc(num2);
    display(num2);
  }
});

numbers.addEventListener("click", (event) => {
  let number = event.target.id;
  if (!func) {
    num1 += number;
    display(num1);
  } else {
    num2 += number;
    display(num2);
  }
});

function evaluate() {
  let val = runCurrentOperation();
  display(val);
  reset();
}

function operate(first, second, operator) {
  return operator(Number(first), Number(second));
}

function runCurrentOperation() {
  if (!func) {
    lastCalc = 0;
  }
  if (num1 === "") num1 = lastCalc;
  if (num2 === "") return (lastCalc = num1);
  return (lastCalc = operate(num1, num2, func));
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function percentage(a) {
  return a / 100;
}

function negate(a) {
  return a * -1;
}

function clear() {
  reset();
  resetDisplay();
  resetLastCalc();
}

function getFunction(functionName) {
  switch (functionName) {
    case "add":
      return add;
    case "subtract":
      return subtract;
    case "multiply":
      return multiply;
    case "divide":
      return divide;
    case "clear":
      return clear;
    case "negate":
      return negate;
    case "percentage":
      return percentage;
    case "evaluate":
      return evaluate;
  }
}

document.addEventListener("click", () => {
  values.textContent = `${num1}    ${
    func.name || ""
  }   ${num2}   last:${lastCalc}`;
});
