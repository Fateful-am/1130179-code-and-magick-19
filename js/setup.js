'use strict';
(function () {
  // svg персонажа
  var setupWizard = window.settings.setupDialogWrapper.querySelector('.setup-wizard');
  // Форма для ввода характеристик персонажа
  var setupWizardForm = window.settings.setupDialogWrapper.querySelector('.setup-wizard-form');
  // Контейнер для файрбола
  var setupFireballWrap = window.settings.setupDialogWrapper.querySelector('.setup-fireball-wrap');

  // Интерфейс модуля
  window.setup = {
    init: init, // Инициализация модуля
    finish: finish // Финализация модуля
  };

  /**
   * Обработчик для кастомизации внешнего вида персонажа
   * @param {MouseEvent} evt
   */
  function onSetupWizardClick(evt) {
    // Цвет заливки
    var fillColor;
    var target = evt.target;
    if (target.classList.contains('wizard-coat')) {
      fillColor = window.utils.getRandomArraysElement(window.settings.coatColors);
      setupWizardForm.querySelector('input[name=coat-color]').value = fillColor;
    } else if (target.classList.contains('wizard-eyes')) {
      fillColor = window.utils.getRandomArraysElement(window.settings.eyesColors);
      setupWizardForm.querySelector('input[name=eyes-color]').value = fillColor;
    }

    if (fillColor) {
      target.style.fill = fillColor;
    }
  }

  /**
   * Обработчик для кастомизации внешнего вида файрбола
   * @param {MouseEvent} evt
   */
  function onSetupFireballClick(evt) {
    // Цвет заливки
    var fillColor = window.utils.getRandomArraysElement(window.settings.fireballColor);
    var target = evt.target;
    target.style.backgroundColor = fillColor;
    setupWizardForm.querySelector('input[name=fireball-color]').value = fillColor;
  }

  /**
   * проверка введенного имени пользователя
   * @param {Element} userNameInput
   */
  function userNameValidity(userNameInput) {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Минимальное число символов в имени: ' + window.settings.MIN_USER_NAME_LENGTH);
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Максимальное число символов в имени: ' + window.settings.MAX_USER_NAME_LENGTH);
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Имя пользователя не может быть пустым');
    } else {
      userNameInput.setCustomValidity('');
    }
  }

  /**
   * Обработка некоректно введеного имени пользователя
   */
  function onInvalidUserNameInput() {
    userNameValidity(window.settings.setupUserName);
  }


  /**
   * Инициализация модуля
   */
  function init() {
    // Добавляем обработчик клика по персонажу
    setupWizard.addEventListener('click', onSetupWizardClick);
    // Добавляем обработчик клика по файрболу
    setupFireballWrap.addEventListener('click', onSetupFireballClick);
    // Добавляем обработчик на некоректно введеное имя пользователя
    window.settings.setupUserName.addEventListener('invalid', onInvalidUserNameInput);

    // Отрисовка блока с похожими магами
    window.wizards.renderWizards();
  }

  /**
   * Финализация модуля
   */
  function finish() {
    // Удаялем обработчик клика по персонажу
    setupWizard.removeEventListener('click', onSetupWizardClick);
    // Удаялем обработчик клика по файрболу
    setupFireballWrap.removeEventListener('click', onSetupFireballClick);
    window.settings.setupUserName.removeEventListener('invalid', onInvalidUserNameInput);
  }

})();


