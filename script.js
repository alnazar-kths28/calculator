const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';
let previousInput = '';
let operation = null;
import { Analytics } from "@vercel/analytics/next"
function updateDisplay() {
  display.value = previousInput ? previousInput + ' ' + operation + ' ' + currentInput : currentInput;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operation = null;
      updateDisplay();
    } else if (value === '=') {
      if (operation && previousInput && currentInput) {
        const result = calculate(previousInput, currentInput, operation);
        display.value = result;
        currentInput = result;
        previousInput = '';
        operation = null;
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        if (previousInput && operation) {
          const result = calculate(previousInput, currentInput, operation);
          currentInput = result;
        }
        previousInput = currentInput;
        currentInput = '';
        operation = value;
        updateDisplay();
      }
    } else {
      currentInput += value;
      updateDisplay();
    }
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key >= '0' && key <= '9') {
    currentInput += key;
    updateDisplay();
  } else if (['+', '-', '*', '/'].includes(key)) {
    if (currentInput) {
      if (previousInput && operation) {
        const result = calculate(previousInput, currentInput, operation);
        currentInput = result;
      }
      previousInput = currentInput;
      currentInput = '';
      operation = key;
      updateDisplay();
    }
  } else if (key === 'Enter' || key === '=') {
    if (operation && previousInput && currentInput) {
      const result = calculate(previousInput, currentInput, operation);
      display.value = result;
      currentInput = result;
      previousInput = '';
      operation = null;
    }
  } else if (key === 'Escape' || key.toLowerCase() === 'c') {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
  } else if (key === '.') {
    if (!currentInput.includes('.')) {
      currentInput += key;
      updateDisplay();
    }
  }
});

function calculate(a, b, op) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  switch (op) {
    case '+': return numA + numB;
    case '-': return numA - numB;
    case '*': return numA * numB;
    case '/': return numB !== 0 ? numA / numB : 'Ошибка';
    default: return 0;
  }
} 