const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const AVATAR_COUNT = 6;
const PHOTOS_PATH = 'photos/';
const IMG_PATH = 'img/avatar-';

const DESCRIPTION = [
  'Величественный горный пейзаж с кристально чистым озером.',
  'Роскошный закат, окрашивающий небо яркими оттенками.',
  'Мощный водопад, излучающий силу и энергию.',
  'Живописные поля с яркими цветами, вызывающими радость.',
  'Группа людей, празднующих особое событие с радостью.',
  'Цветущий сад с множеством ярких и ароматных цветов.',
  'Умиротворенное озеро, отражающее небо и деревья.',
  'Городская ночная панорама с огнями зданий и автомобилей.',
  'Красивый и мощный парусник на море.',
  'Впечатляющая архитектура старого замка.',
  'Мирное поле солнечных цветов, вдохновляющее спокойствием.',
  'Мощная молния, разрывающая небо с энергией.',
  'Величественная гора, покрытая снегом, символизирующая силу.',
  'Романтический закат на пляже, переполняющий теплом.',
  'Улыбающееся лицо ребенка, исполненное счастья.',
  'Горящий костер, создающий тепло и общение.',
  'Красивый закат в пустыне, вдохновляющий загадкой.',
  'Старинная деревянная церковь, окруженная зелеными холмами.',
  'Мощный водоворот, символизирующий движение и энергию.',
  'Граффити на стене, выражающее молодежную культуру.',
  'Лес в осенние краски, вызывающий умиротворение.',
  'Группа людей, занимающихся спортом с энтузиазмом.',
  'Впечатляющее небо с множеством звезд, таинственное и бесконечное.',
  'Счастливая молодая семья, улыбающаяся и наслаждающаяся моментом.',
  'Мирная деревня, окруженная прекрасной природой, воплощение гармонии.',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME = [
  'Петя',
  'Оля',
  'Коля',
  'Василий Иванович',
  'Ксюша',
  'Ксения Петровна',
  'КириллВсехПобил',
  'Олеся',
  'Карл',
  'Хорёк',
];


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

const newId = createNoReapeatRandomIndex(1, PHOTOS_COUNT);
const newUrl = createNoReapeatRandomIndex(1, PHOTOS_COUNT);
const comentsCount = getRandomNumber(1,5);
const maxNumbers = 100;
const commentsId = createNoReapeatRandomIndex(1, maxNumbers);

/**
 * Создает коментарии по шаблону
 * @param {number} id
 * @param {string} avatar
 * @param {string} message
 * @param {string} name
 * @returns {Obj} шаблонизатор для коментариев
 */
const createComments = () => ({
  id: Math.floor(commentsId()),
  avatar: IMG_PATH + getRandomNumber(1, AVATAR_COUNT),
  message: (comentsCount === 1) ? getRandomArrayElement(MESSAGE) : getRandomArrayElement(MESSAGE) + getRandomArrayElement(MESSAGE),
  name: NAME[getRandomNumber(1, NAME.length - 1)]
});

/**
 * Создает пост фотографии
 * @param {number} id
 * @param {string} url
 * @param {string} description
 * @param {number} likes
 * @param {string} comments
 * @returns {Obj} Пост фотографии
 */
const createPhotos = () => ({
  id: +newId(),
  url: `${PHOTOS_PATH + newUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: comentsCount}, createComments)
});


const similarPhotos = Array.from({length: PHOTOS_COUNT}, createPhotos);

