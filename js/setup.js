'use strict';
(function () {
  // svg персонажа
  var setupWizard = window.settings.setupDialogWrapper.querySelector('.setup-wizard');
  // Форма для ввода характеристик персонажа
  var setupWizardForm = window.settings.setupDialogWrapper.querySelector('.setup-wizard-form');
  // Контейнер для файрбола
  var setupFireballWrap = window.settings.setupDialogWrapper.querySelector('.setup-fireball-wrap');
  // Массив всех магов полученных с сервера
  var wizards = [];
  // Текущий внешний вид мага
  var wizardAppearance = {
    coatColor: window.settings.coatColors[0], // цвет мантии
    eyesColor: window.settings.eyesColors[0] // цвет глаз
  };
  // последний из запущенных таймеров
  var lastTimeout;

  // Интерфейс модуля
  window.setup = {
    init: init, // Инициализация модуля
    finish: finish // Финализация модуля
  };

  /**
   * Устанавливаем новые параметры внешности
   @param {Object} newWizardAppearance новые параметры внешности
   */
  function setNewWizardAppearance(newWizardAppearance) {
    wizardAppearance.coatColor = newWizardAppearance.coatColor || wizardAppearance.coatColor;
    wizardAppearance.eyesColor = newWizardAppearance.eyesColor || wizardAppearance.eyesColor;
    // Если таймер не сработал - удаляем
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    // выставляем новый таймер
    lastTimeout = window.setTimeout(function () {
      // отрисовываем похожих магов
      window.wizards.renderWizards(window.similarWizards.getSimilarWizards(wizards, wizardAppearance));
    }, window.settings.DEBOUNCE_INTERVAL);
  }

  /**
   * Обработчик для кастомизации внешнего вида персонажа
   * @param {MouseEvent} evt
   */
  function onSetupWizardClick(evt) {
    // Цвет заливки
    var fillColor;
    // Новый внешний вид мага
    var newWizardAppearance = {
      coatColor: undefined,
      eyesColor: undefined
    };
    var target = evt.target;
    if (target.classList.contains('wizard-coat')) {
      fillColor = wizardAppearance.coatColor;
      // случайным образом подбираем цвет мантии пока не станет отличным от текущего
      while (fillColor === wizardAppearance.coatColor) {
        fillColor = window.utils.getRandomArraysElement(window.settings.coatColors);
      }

      setupWizardForm.querySelector('input[name=coat-color]').value = fillColor;
      newWizardAppearance.coatColor = fillColor;
    } else if (target.classList.contains('wizard-eyes')) {
      fillColor = wizardAppearance.eyesColor;
      // случайным образом подбираем цвет мантии пока не станет отличным от текущего
      while (fillColor === wizardAppearance.eyesColor) {
        fillColor = window.utils.getRandomArraysElement(window.settings.eyesColors);
      }

      setupWizardForm.querySelector('input[name=eyes-color]').value = fillColor;
      newWizardAppearance.eyesColor = fillColor;
    }

    if (fillColor) {
      target.style.fill = fillColor;
      // устанавливаем новые параметры внешности
      setNewWizardAppearance(newWizardAppearance);
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
   * @param {Array} data Массив магов с сервера
   */
  function onSuccessLoadData(data) {
    wizards = data;
    setNewWizardAppearance(wizardAppearance);
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

  /**
   * Создаем узел в разметке содержащий сообщение об щшибке
   * @param {String} errorMessage сообщение об ошибке
   */
  function onErrorHandler(errorMessage) {
    // создаем элемент
    var node = document.createElement('div');
    // стилизуем элемент
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    // сообщение об ошибке и класс для последущей манипуляцией элементом
    node.className = 'xhr-error-message';
    node.textContent = errorMessage;
    // Встраиваем в блок body
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


