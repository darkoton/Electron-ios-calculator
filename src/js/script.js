//< " CONNECTING JS COMPONENTS " >=============================================================================================================>//
import isWebp from './modules/webp.js'; //SUPPORT WEBP

import isDevice from './modules/device.js'; //DEFINE DEVICE

// import './modules/preloader.js'; // PRELOADER

// import "./modules/spoiler.js"  // SPOILERS

// import "./modules/dynamic_adap.js"  // DYNAMIC ADAPTIVE

// import "./modules/scroll_header.js"  // SCROLL HEADER

// import "./modules/swiper.js"  // SLIDER SWIPER

// import "./modules/animate_scroll.js"  // ANIMATE WITH SCROLL

// import "./modules/tabs.js"  // TABS

// import "./modules/parallax.js"  // PARALLAX EFFECT

//< " СКРИПТЫ " >=============================================================================================================>//

isWebp();
isDevice();

// CALCULATOR SCRIPT

const num1 = {
  value: '',
  element: document.querySelector('#big'),
  set _value(value) {
    this.value = String(value);
    this.element.textContent = value;
  },
  get _value() {
    return Number(this.value) || 0;
  },
};

const num2 = Object.assign({}, num1);

num2.element = document.querySelector('#small');

Object.defineProperty(num2, '_value', {
  set(value) {
    this.value = value;
    if (this.value) {
      this.element.textContent = this.value + symbol;
    } else {
      this.element.textContent = '';
    }
  },
  get() {
    return Number(this.value) || 0;
  },
});

const controls = {
  equals: () => {
    if (!action) {
      return;
    }
    actions[action]();
    reset();
  },
  c: () => {
    reset();
    num1._value = 0;
  },
  'plus-minus': () => {
    num1._value *= -1;
  },
  percent: () => {
    num1._value = parseFloat((num1._value / 100).toFixed(4));
  },
  dot: () => {
    if (action && num1.value.includes('.')) {
      num2._value = num1._value;
      num1._value = 0;
    } else if (num1.value.includes('.')) {
      return
    }
    num1._value += '.';
  },
};

const symbols = {
  divide: '÷',
  multiply: '×',
  minus: '-',
  plus: '+',
};

const actions = {
  divide: () => {
    num1._value = parseFloat((num2._value / num1._value).toFixed(5));
  },
  multiply: () => {
    num1._value = parseFloat((num2._value * num1._value).toFixed(5));
  },
  minus: () => {
    num1._value = num2._value - num1._value;
  },
  plus: () => {
    num1._value = num2._value + num1._value;
  },
};

let action = null;
let symbol = null;

function reset() {
  action = null;
  symbol = null;
  num2._value = null;
}

const buttons = document.querySelectorAll('.calculator__button');

buttons.forEach(button => {
  button.addEventListener('click', handleClick);
});

function handleClick(event, dataValue) {
  const target = event.target;
  const value = target.dataset.value || dataValue;

  if (actions[value]) {
    if (action && num2._value) {
      const currentAction = action;
      actions[currentAction]();
      reset();
    }
    action = value;
    symbol = symbols[action];
  } else if (controls[value]) {
    controls[value]();
  } else if (!isNaN(value)) {
    if (action && !num2._value) {
      num2._value = num1._value;
      num1._value = 0;
    }

    if (num1.value == '0') {
      num1._value = value;
    } else {
      num1._value = String(num1.value) + value;
    }
  }
}

const keyMappings = {
  Digit1: '1',
  Digit2: '2',
  Digit3: '3',
  Digit4: '4',
  Digit5: '5',
  Digit6: '6',
  Digit7: '7',
  Digit8: '8',
  Digit9: '9',
  Digit0: '0',
  Numpad1: '1',
  Numpad2: '2',
  Numpad3: '3',
  Numpad4: '4',
  Numpad5: '5',
  Numpad6: '6',
  Numpad7: '7',
  Numpad8: '8',
  Numpad9: '9',
  Numpad0: '0',
  Slash: 'divide',
  NumpadDivide: 'divide',
  Period: 'dot',
  NumpadDecimal: 'dot',
  Enter: 'equals',
  NumpadEnter: 'equals',
  Equal: 'plus',
  NumpadAdd: 'plus',
  'Equal.shift': 'plus',
  NumpadSubtract: 'minus',
  NumpadMultiply: 'multiply',
  Backspace: 'c',
  Delete: 'c',
};


window.addEventListener('keydown', event => {
  let code = event.code;
  if (event.shiftKey) {
    code += '.shift';
  }

  handleClick(event, keyMappings[code]);
});
