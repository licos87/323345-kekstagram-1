import {getRandomNumber} from './utils.js';
import {getRandomArrayElement} from './utils.js';
import {createNoReapeatRandomIndex} from './utils.js';
import {generatecommentsId} from './utils.js';

const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const DESCRIPTIONS = [
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

const AVATAR_COUNT = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
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


// Создаем коментарии

/**
 * Анонимная функция для генерации коментариев из массива MESSAGES
 * @returns {string} 1 или 2 коментария
*/
const createMessage = () => Array.from({ length: getRandomNumber(1, 2) }, () => getRandomArrayElement(MESSAGES)).join(' ');

/**
 * Создает коментарии по шаблону
 * @param {number} id
 * @param {string} avatar
 * @param {string} message
 * @param {string} name
 * @returns {Obj} шаблонизатор для коментариев
*/
const createComments = () => ({
  id: generatecommentsId(),
  avatar: `img/avatar- + ${getRandomNumber(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: NAMES[getRandomNumber(1, NAMES.length - 1)]
});

const newId = createNoReapeatRandomIndex(1, PHOTOS_COUNT);
const newUrl = createNoReapeatRandomIndex(1, PHOTOS_COUNT);
const comentsCount = getRandomNumber(1,5);


// Создаем пост с фотографиями и коментариями

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
  id: newId(),
  url: `photos/ +${newUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: comentsCount}, createComments)
});

const similarPhotos = () => Array.from({length: PHOTOS_COUNT}, createPhotos);

similarPhotos();
