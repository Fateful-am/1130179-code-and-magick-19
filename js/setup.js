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
   * Обработка успешного события загрузки данных с сервера
   * @param {Array} wizards Массив магов с сервера
   */
  function onSuccessLoadData(wizards) {
    // массив для случайных магов от сервера
    var randomWizards = [];
    for (var i = 0; i < window.settings.RANDOM_WIZARDS_COUNT; i++) {
      randomWizards.push(window.utils.getRandomArraysElement(wizards, true));
    }

    window.wizards.renderWizards(randomWizards);
  }

  /**
   * Обработка ошибочного события загрузки данных с сервера
   * @param {String} errorMessage Сообщение об ошибке при загрузке данных с сервера
   */
  function onErrorLoadData(errorMessage) {
    onErrorHandler(errorMessage);
  }

  /**
   * Обработка события удочной отправки данных на сервер
   */
  function onSuccessSaveData() {
    window.index.closeSetupDialogActions();
  }

  /**
   * Обработка ошибочного события отправки данных на сервер
   * @param {String} errorMessage Сообщение об ошибке при загрузке данных с сервера
   */
  function onErrorSaveData(errorMessage) {
    onErrorHandler(errorMessage);
  }

  /**
   * Обработка отправки формы
   * @param {Event} evt
   */
  function onSetupFormSubmit(evt) {
    evt.preventDefault();
    var xhrErrorMessage = document.querySelector('.xhr-error-message');
    if (xhrErrorMessage) {
      xhrErrorMessage.remove();
    }
    window.backend.save(window.settings.FORM_SEND_URL, new FormData(window.settings.setupWizardForm), onSuccessSaveData, onErrorSaveData);
  }

  function onErrorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.className = 'xhr-error-message';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

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

    // Загрузка случайных данных с сервера
    window.backend.load(window.settings.DATA_URL, onSuccessLoadData, onErrorLoadData);

    // Добавляем обработчик отправки формы
    window.settings.setupWizardForm.addEventListener('submit', onSetupFormSubmit);
    // Получение массива случайных магов
    // var wizards = window.wizards.getRandomWizards(window.settings.RANDOM_WIZARDS_COUNT);
    // Отрисовка блока с похожими магами
    // window.wizards.renderWizards(wizards);


    // Сброс позиции диалога в значения по умолчанию
    window.settings.setupDialogWrapper.removeAttribute('style');
  }

  /**
   * Финализация модуля
   */
  function finish() {
    // Удаялем обработчик клика по персонажу
    setupWizard.removeEventListener('click', onSetupWizardClick);
    // Удаялем обработчик клика по файрболу
    setupFireballWrap.removeEventListener('click', onSetupFireballClick);
    // Удаялем обработчик нажатия кнопки мыши на аватар
    window.settings.setupUserName.removeEventListener('invalid', onInvalidUserNameInput);
    // Удаялем обработчик отправки формы
    window.settings.setupWizardForm.removeEventListener('submit', onSetupFormSubmit);
  }

})();


