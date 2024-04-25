// Функции для проверки палиндрома

const isPalindrom = (text) => {
  let tempText = text.replaceAll(' ', ''); // убирает пробелы
  tempText = tempText.toLowerCase(); // приводит весь текст к одному регистру букв !!! можно было записать как tempText = text.replaceAll(' ', '').toLowerCase();
  let reverseText = '';

  for (let i = tempText.length - 1; i >= 0; i--) { // перебираем текст и записываем задом наперед
    reverseText += tempText[i];
  }

  return tempText === reverseText; // проверяет начальный текст и перевернутый
};

/*
const isPalindrom = (text) => {
	const tempText = text
		.replaceAll(' ', '')
		.toLowerCase();

	return tempText === tempText.split('').reverse().join('');

	Сокращеное написание.  Возвращает  и сравнивает tempText = метод переводит tempText в массив ( tempText.split('') ) метод переворачивает массив ( .reverse() ) метод обьеденяет массив в строку ( .join() )
*/

isPalindrom('Лёша на полке клопа нашёл ');

// Функция извлечения цифр

const extractNumber = (string) => {
  if (isNaN(string)) { // проверяем является числом, возвращает true если не число.
    string += '';
    const inNumber = string.match(/\d+/g).join(''); //  выбирает все цифры, равнозначно, что string.match(/[0-9]/g) !учить регулярные выражения. флаг /g показывает что надо перебрать все выражение.  .join('') склеивает все цифры в одно выражение
    const outNumber = inNumber ? parseInt(inNumber, 10) : NaN; // parseInt(откудаБерет, форматЧисел(десятичные\шестьнадцатиричные)). Если inNumber=true то parseInt иначе NaN,тернарные операторы учить
    return outNumber;
  } else {
    return parseInt(string.match(/\d+/g).join(''), 10); // возвращает положительное число.
  }
};

// проверка на число if (typeof string === 'number') {return string}

extractNumber('1 кефир, 0.5 батона');

// Функция формирования адресов файлов

const getAdress = (string, count, addSymbol) => {
  const variance = count - string.length; //  смотрим сколько символов добавить
  const sliceText = addSymbol.slice(0, variance); // обрезаем добавочный текст на разницу в колличестве символов
  let result = '';
  if (variance > addSymbol.length) { // проверяем длину необходимых добавленных символов, если больше чем addSymbol
    for (let i = 0; i < variance - addSymbol.length; i++) { // прогоняем столько раз сколько нехватает символов
      result += addSymbol.slice(0, variance - addSymbol.length); // добавляем символы сколько может поместиться в разницу
    }
    return result + addSymbol + string;
  } else {
    result = sliceText + string;
    return result;
  }
};

/*
  функция через repeat()
  const getAdress = (string, count, addSymbol) => {
    const actualPad = count - string.length;

    return actualPad <=0
    ? string       // если true возвращает только string, если false, то выполняет следующую строку
    : addSymbol.slice(0, actualPad % addSymbol.length) + addSymbol.repeat(actualPad / addSymbol.length) + string;

      // делает срез от 1 символа до  остатка от деления ( % <к примеру 5/2 = 2 и остаток 1>) + повторение addSymbol столько раз сколько будет actualPad / addSymbol.length (даже если это дробное число) + string
      // Метод repeat() конструирует и возвращает новую строку, содержащую указанное количество соединённых вместе копий строки, на которой он был вызван.
  }

  функция через цикл while
  const myPadStart = (string, minLength, pad) => {
    let result = string;
    while (result.length < minLength) {            // выполняет пока неравенство верно иначе сразу к return
      const newResultLength = result.length + pad.length;         // общая длина строки
      const actualPad = newResultLength <= minLength ? pad : pad.slice(0, minLength - newResultLength);  // если общая длина строки меньше ил равна заданой то приравнивает pad иначе делает срез от 0 до разницы длинны

      result = actualPad + result;
    }
    return result;
  }

*/

getAdress('q', 4, 'we');

// Функция проверки длины строки

const isStringLength = (string, length) => string.length <= length; // т.к проверка проходит в 1 строку  true||false, стрелочная функция сокращается и убираются все скобки и if

isStringLength('проверяемая строка', 10);
