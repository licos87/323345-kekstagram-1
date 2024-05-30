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

export {getRandomNumber, createNoReapeatRandomIndex, getRandomArrayElement, generatecommentsId};
