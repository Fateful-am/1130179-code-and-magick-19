'use strict';
// Имена персонажей
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
// Фамилии персонажей
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
// Цвета мантий персонажей
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
// Цвет глаз персонажей
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * Вклюяение и выклюяение видимости элемента
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
 * @param {[]} array Входной массив
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
    name: Math.random() >= 0.5 ? getRandomArraysElement(firstNames) + ' ' + getRandomArraysElement(secondNames) : getRandomArraysElement(secondNames) + ' ' + getRandomArraysElement(firstNames),
    coatColor: getRandomArraysElement(coatColors),
    eyesColor: getRandomArraysElement(eyesColors)
  };
}

/**
 * Возвращает массив объектов магов
 * @param {number} count размер массива
 * @return {[]}
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
 * @param {{}} wizard Объект - Маг
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
 * Отрисовка всех магов
 */
function renderWizards() {
  var wizards = getRandomWizards(4);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  // Элемент в который будем вставлять похожих магов
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(fragment);
}

// Содержит ссылку на элемент с формой настроек персонажа
var setupDialog = document.querySelector('.setup');
// Блок для похожих персонажей
var setupSimilar = document.querySelector('.setup-similar');

visibleToggle(setupDialog, true);
renderWizards();
visibleToggle(setupSimilar, true);
