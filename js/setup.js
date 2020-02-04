'use strict';

// Минимальная длина имени пользователя
var MIN_USER_NAME_LENGTH = 2;
// Максимальная длина имени пользователя
var MAX_USER_NAME_LENGTH = 25;

// Коды клавиш
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

// Имена персонажей
var firstNames = ['Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
// Фамилии персонажей
var secondNames = ['да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
// Цвета мантий персонажей
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
// Цвет глаз персонажей
var eyesColors = ['black',
  'red',
  'blue',
  'yellow',
  'green'];

// Цвет файрбола
var fireballColor = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// Содержит ссылку на элемент с формой настроек персонажа
var setupDialog = document.querySelector('.setup');
// Контейнер открытия диалога настроек
var setupOpen = document.querySelector('.setup-open');
// Иконка открытия диалога настроек
var setupOpenIcon = document.querySelector('.setup-open-icon');
// Кнопка закрытия диалога настроек
var setupClose = document.querySelector('.setup-close');
// Блок для похожих персонажей
var setupSimilar = document.querySelector('.setup-similar');
// Имя мага
var userNameInput = setupDialog.querySelector('.setup-user-name');
// svg персонажа
var setupWizard = setupDialog.querySelector('.setup-wizard');
// форма для ввода характеристик персонажа
var setupWizardForm = setupDialog.querySelector('.setup-wizard-form');
// контейнер для файрбола
var setupFireballWrap = setupDialog.querySelector('.setup-fireball-wrap');


/**
 * Включение и выключение видимости элемента
 * @param {Element} element элемент для которого переключается видимость
 * @param {boolean} isVisible Признак видимости элемента
 */
function visibleToggle(element, isVisible) {
  if (isVisible) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

/**
 * Возвращает случайный элемент массива
 * @param {Array} array Входной массив
 * @return {string} случайный элемент массива
 */
function getRandomArraysElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Возвращает объект - Маг, с набором случайных параметров
 * @return {{eyesColor: string, name: string, coatColor: string}}
 */
function getRandomWizard() {
  return {
    // имя мага
    name: Math.random() >= 0.5 ? getRandomArraysElement(firstNames) + ' ' + getRandomArraysElement(secondNames) : getRandomArraysElement(secondNames) + ' ' + getRandomArraysElement(firstNames),
    // цвет мантии
    coatColor: getRandomArraysElement(coatColors),
    // цвет глаз
    eyesColor: getRandomArraysElement(eyesColors)
  };
}

/**
 * Возвращает массив объектов магов
 * @param {number} count размер массива
 * @return {Array}
 */
function getRandomWizards(count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push(getRandomWizard());
  }
  return wizards;
}

/**
 * Отрисовывает мага
 * @param {Object} wizard Объект - Маг
 * @return {Node} Узел с отрисованным магом
 */
function renderWizard(wizard) {
  // Шаблон для копирования магов
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

/**
 * Отрисовка всех похожих магов
 */
function renderWizards() {
  var wizards = getRandomWizards(4);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  // Элемент в который будем вставлять похожих магов
  var similarListElement = document.querySelector('.setup-similar-list');
  // Очистка предыдущих магов
  while (similarListElement.firstChild) {
    similarListElement.removeChild(similarListElement.firstChild);
  }

  similarListElement.appendChild(fragment);
}

/**
 * Действия необходимые при открытии окна настроек
 */
function openSetupDialogActions() {
  // Удаляем возможность фокусировки иконки пользователя
  setupOpenIcon.removeAttribute('tabindex');
  // Показ окна настроек персонажа
  visibleToggle(setupDialog, true);
  // Удаялем обработчик на открытие окна настроек
  setupOpen.removeEventListener('click', onClickOpenSetupDialog);
  // Добавляеи обработчик на закрытие окна настроек
  setupClose.addEventListener('click', onClickCloseSetupDialog);
  // Отрисовка блока с похожими магами
  renderWizards();
  visibleToggle(setupSimilar, true);
  // Добавляеи обработчик на закрытие окна настроек по Esc
  document.addEventListener('keydown', onSetupDialogKeyDown);
  // Добавляеи обработчик клика по персонажу
  setupWizard.addEventListener('click', onSetupWizardClick);
  // Добавляеи обработчик клика по файрболу
  setupFireballWrap.addEventListener('click', onSetupFireballClick);
}

/**
 * Действия необходимые при закрытии окна настроек
 */
function closeSetupDialogActions() {
  // Установка tabIndex, чтобы иконка была доступна через клавиатуру
  setupOpenIcon.tabIndex = 0;
  // Закрытие окна настроек
  visibleToggle(setupDialog, false);
  // Удаялем обработчик на закрытие окна настроек
  setupOpen.removeEventListener('click', onClickCloseSetupDialog);
  // Добавляем обработчик на открытие окна настроек
  setupOpen.addEventListener('click', onClickOpenSetupDialog);
  // Удаялем обработчик на закрытие окна настроек по Esc
  document.removeEventListener('keydown', onSetupDialogKeyDown);
  // Удаялем обработчик клика по персонажу
  setupWizard.removeEventListener('click', onSetupWizardClick);
  // Удаялем обработчик клика по файрболу
  setupFireballWrap.removeEventListener('click', onSetupFireballClick);
}

/**
 * Обработчик для кастомизации внешнего вида персонажа
 * @param {MouseEvent} evt
 */
function onSetupWizardClick(evt) {
  // Цвет заливки
  var fillColor;
  if (evt.target.classList.contains('wizard-coat')) {
    fillColor = getRandomArraysElement(coatColors);
    setupWizardForm.querySelector('input[name=coat-color]').value = fillColor;
  } else if (evt.target.classList.contains('wizard-eyes')) {
    fillColor = getRandomArraysElement(eyesColors);
    setupWizardForm.querySelector('input[name=eyes-color]').value = fillColor;
  }

  if (fillColor) {
    evt.target.style.fill = fillColor;
  }
}

/**
 * Обработчик для кастомизации внешнего вида файрбола
 * @param {MouseEvent} evt
 */
function onSetupFireballClick(evt) {
  // Цвет заливки
  var fillColor = getRandomArraysElement(fireballColor);
  evt.target.style.backgroundColor = fillColor;
  setupWizardForm.querySelector('input[name=fireball-color]').value = fillColor;
}

/**
 * Обработчик клика для открытия окна настроек
 */
function onClickOpenSetupDialog() {
  openSetupDialogActions();
}

/**
 * Обработчик клика для закрытия окна настроек
 */
function onClickCloseSetupDialog() {
  closeSetupDialogActions();
}

/**
 * Обработка не коректно введеного имени пользователя
 */
function onInvalidUserNameInput() {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Минимальное число символов в имени: ' + MIN_USER_NAME_LENGTH);
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Максимальное число символов в имени: ' + MAX_USER_NAME_LENGTH);
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Имя пользователя не может быть пустым');
  } else {
    userNameInput.setCustomValidity('');
  }
}

/**
 * Обработчик нажатия клавиш при открытом окне настроек по Esc
 * @param {KeyboardEvent} evt
 */
function onSetupDialogKeyDown(evt) {
  if (evt.key === ESC_KEY) {
    if (evt.target === userNameInput) {
      // Если фокус на инпуте ввода имени персонажа - не закрывать окно настроек
      evt.stopPropagation();
    } else {
      closeSetupDialogActions();
    }
  } else if (evt.key === ENTER_KEY) {
    if (evt.target === setupClose) {
      closeSetupDialogActions();
    }
  }
}

function initialisation() {
  // Установка tabIndex, чтобы иконка была доступна через клавиатуру
  setupOpenIcon.tabIndex = 0;
  // Обработчик открытия диалога по Enter
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      evt.stopPropagation();
      openSetupDialogActions();
    }
  });

  // Определяем url отправки формы
  setupWizardForm.action = 'https://js.dump.academy/code-and-magick';
  // Установка tabIndex, чтобы кнопка закрытия диалога настроек была доступна через клавиатуру
  setupClose.tabIndex = 0;
  // Установка ограничения на минимальную и максимальную длину имени персонажа
  userNameInput.minLength = MIN_USER_NAME_LENGTH;
  userNameInput.maxLength = MAX_USER_NAME_LENGTH;
  // Добавляем обработчик на открытие окна настроек
  setupOpen.addEventListener('click', onClickOpenSetupDialog);
  // Добавляем обработчик на некоректно введеное имя пользователя
  userNameInput.addEventListener('invalid', onInvalidUserNameInput);
}

initialisation();
