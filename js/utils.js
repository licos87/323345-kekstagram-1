// Общие функции
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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '10px';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#f75353';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, createNoReapeatRandomIndex, getRandomArrayElement, generatecommentsId, isEscapeKey, showAlert};
