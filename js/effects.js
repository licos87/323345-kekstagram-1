// Наложение эфектов.

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const BASE_EFFECT = EFFECTS[0];
let chosenEfect = BASE_EFFECT;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderConteinerElement = document.querySelector('.img-upload__effect-level');
const effectLevelElement = document.querySelector('.effect-level__value');

const isDefault = () => chosenEfect === BASE_EFFECT;

const toSliderShow = () => sliderConteinerElement.classList.remove('hidden');
const toSliderHide = () => sliderConteinerElement.classList.add('hidden');

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEfect.min,
      max: chosenEfect.max,
    },
    step: chosenEfect.step,
    start: chosenEfect.max,
  });
  if (isDefault()) {
    toSliderHide();
  } else {
    toSliderShow();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEfect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageElement.className = `effects__preview--${chosenEfect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = isDefault()
    ? BASE_EFFECT.style
    : `${chosenEfect.style}(${sliderValue}${chosenEfect.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEfect = BASE_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: BASE_EFFECT.min,
    max: BASE_EFFECT.max,
  },
  start: BASE_EFFECT.max,
  step:BASE_EFFECT.step,
  connect: 'lower',
});
toSliderHide();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);


export { resetEffects };
