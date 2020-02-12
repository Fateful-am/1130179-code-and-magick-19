'use strict';
(function () {
// Блок для похожих персонажей
  var setupSimilar = document.querySelector('.setup-similar');

  // Интерфейс модуля
  window.wizards = {
    renderWizards: renderWizards, // Отрисовка всех похожих магов
    getRandomWizards: getRandomWizards // Возвращает массив случайных объектов магов
  };

  /**
   * Возвращает объект - Маг, с набором случайных параметров
   * @return {{eyesColor: string, name: string, coatColor: string}}
   */
  function getRandomWizard() {
    return {
      // имя мага
      name: Math.random() >= 0.5 ? window.utils.getRandomArraysElement(window.settings.firstNames) + ' ' +
        window.utils.getRandomArraysElement(window.settings.secondNames) : window.utils.getRandomArraysElement(window.settings.secondNames) + ' ' +
        window.utils.getRandomArraysElement(window.settings.firstNames),
      // цвет мантии
      colorCoat: window.utils.getRandomArraysElement(window.settings.coatColors),
      // цвет глаз
      colorEyes: window.utils.getRandomArraysElement(window.settings.eyesColors)
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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  /**
   * Отрисовка блока похожих магов
   * @param {Array} wizards Объект - Маг
   */
  function renderWizards(wizards) {
    // Фрагмент для вставки
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
    window.utils.visibleToggle(setupSimilar, true);
  }

})();
