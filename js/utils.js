// Общие функции

const TIMEOUT_DELAY = 500;
const ALERT_SHOW_TIME = 5000;

/**
 * Функция создания рандомного числа в диапазоне чисел от minNumber до maxNumber
 * @param {number} minNumber
 * @param {number} maxNumber
 * @returns random number
 */

const getRandomNumber = (min, max) => {
  const minNumber = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxNumber = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (maxNumber - minNumber + 1) + minNumber;
  return Math.floor(result);
};


/**
 * Функция проверки рандомного числа диапазона min - max, на повторение
 * @param {number} min
 * @param {number} max
 * @returns не повторяющееся число из диапазона min - max
 */
const createNoReapeatRandomIndex = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error(`Перебраны все числа из диапазона от ${ min } до ${ max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};


/**
 * Выбирает случайный элемент массива
 * @param {Obj} elements получает массив
 * @returns  случайный элемент массива
 */
const getRandomArrayElement = (elements) => {
  const newElement = createNoReapeatRandomIndex(0, elements.length - 1);
  return elements[newElement()];
};


/**
 * Счетчик id коментариев
 * @returns {number} число каждый раз +1
 */
const generatecommentsId = () => {
  let lastIdcomments = 1;
  return () => lastIdcomments++;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);
  };
};

const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '300';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, createNoReapeatRandomIndex, getRandomArrayElement, generatecommentsId, isEscapeKey, debounce, showAlert};
