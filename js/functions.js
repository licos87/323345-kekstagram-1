// Функции для проверки палиндрома

function getPalindrom (text) {
  let primary = text.replaceAll(' ', ''); // убирает пробелы
  primary = primary.toLowerCase(); // приводит весь текст к маленьким буквам
  let second = '';

  for (let i = primary.length - 1; i >= 0; i--) { // перебираем текст и записываем сзадом наперед
    second += primary[i];
  }

  return (primary.replace(' ', '') === second.replace(' ', '')); // проверяет начальный текст и перевернутый
}


// Функция извлечения цифр

function getNumber (string) {
  if (isNaN(string)) { // проверяем является числом, возвращает true если не число.
    const inNumber = string.match(/\d+/g).join(''); //  равнозначно, что string.match(/[0-9]/g) !учить регулярные выражения. флаг /g показывает что надо перебрать все выражение.  .join('') склеивает все цифры в одно выражение
    const outNumber = inNumber ? parseInt(inNumber, 10) : NaN; // parseInt(откудаБерет, форматЧисел(десятичные\шестьнадцатиричные)). Если inNumber=true то parseInt иначе NaN,тернарные операторы учить
    return outNumber;
  } else {
    return string;
  }
}


// Функция формирования адресов файлов

function getAdress (string, count, addSymbol) {
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
}


// Функция проверки длины строки

function stringLength (string, number) {
  return (string.length <= number);
}
